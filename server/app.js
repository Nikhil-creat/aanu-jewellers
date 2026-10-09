const express = require("express"), crypto = require("crypto"), path = require("path"), { Pool } = require("pg");
const { price } = require("./pricing");
const E = process.env, app = express();
const pool = E.DATABASE_URL ? new Pool({ connectionString: E.DATABASE_URL, ssl: E.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false }, max: 3 }) : null;
app.disable("x-powered-by"); app.use(express.json({ limit: "3mb" }));
app.use((q, s, n) => { q.url = q.url.replace(/^\/\.netlify\/functions\/api/, "/api"); s.set({ "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" });
  if (E.CORS_ORIGIN) { s.set({ "Access-Control-Allow-Origin": E.CORS_ORIGIN, "Access-Control-Allow-Headers": "Content-Type,Authorization", "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE" }); if (q.method === "OPTIONS") return s.sendStatus(204); } n(); });
const DEF = { gold24: 14359, gold22: 13675, gold20: 12538, gold18: 11401, silver: 255, makingGold: 0.10, makingSilver: 0.15, gst: 0.03, mode: "manual", updated: "07 Oct 2026" };
const SCHEMA = `create table if not exists products(id serial primary key,name text not null,type text not null,tags text not null,karat int default 0,gold_g numeric default 0,silver_g numeric default 0,sizes text default 'Free',style text default 'Traditional',img text default '',model text default '',in_stock boolean default true);
create table if not exists orders(id serial primary key,ref text unique not null,name text,phone text,items jsonb not null,rates jsonb not null,total int not null,status text default 'new',created_at timestamptz default now());
create table if not exists custom_requests(id serial primary key,name text,phone text,metal text,whom text,details text,created_at timestamptz default now());
create table if not exists settings(key text primary key,value jsonb not null);
alter table products add column if not exists extra jsonb default '{}';`;
let ready; const init = () => ready || (ready = pool.query(SCHEMA));
const wrap = f => async (q, s) => { try { if (!pool) return s.status(503).json({ error: "DATABASE_URL not set" }); await init(); await f(q, s); } catch (e) { console.error(e); ready = null; s.status(500).json({ error: "server error" }); } };
const getSet = async (k, d) => { const r = await pool.query("select value from settings where key=$1", [k]); return r.rows[0] ? r.rows[0].value : d; };
const setSet = (k, v) => pool.query("insert into settings(key,value) values($1,$2) on conflict(key) do update set value=$2", [k, JSON.stringify(v)]);
const ist = () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
const str = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n);
const hits = new Map(); const limit = n => (q, s, nx) => { const k = (q.ip || "") + q.path, t = Date.now(), a = (hits.get(k) || []).filter(x => t - x < 60000); if (a.length >= n) return s.status(429).json({ error: "Too many requests" }); a.push(t); hits.set(k, a); nx(); };
// ---- live rates (spot x USDINR x your calibration)
const jget = async u => { const r = await fetch(u, { headers: { "User-Agent": "aanu/1" }, signal: AbortSignal.timeout(15000) }); if (!r.ok) throw Error(u + " " + r.status); return r.json(); };
async function raw() { let fx; for (const u of ["https://open.er-api.com/v6/latest/USD", "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR"]) { try { fx = (await jget(u)).rates.INR; if (fx) break; } catch (e) {} } if (!fx) throw Error("no fx");
  const [a, b] = await Promise.all([jget("https://api.gold-api.com/price/XAU"), jget("https://api.gold-api.com/price/XAG")]); return { g: a.price * fx / 31.1034768, s: b.price * fx / 31.1034768 * 0.925 }; }
async function rates(force) { const R = { ...DEF, ...(await getSet("rates", {})) }; if (!force && (R.mode !== "auto" || Date.now() - (R.ts || 0) < 30 * 60e3)) return R;
  const c = await getSet("calib", null); if (!c) return R; R.ts = Date.now();
  try { const { g, s } = await raw(), g24 = g * c.g, n = { ...R, gold24: Math.round(g24), gold22: Math.round(g24 * 0.9524), gold20: Math.round(g24 * 0.8732), gold18: Math.round(g24 * 0.794), silver: Math.round(s * c.s), updated: ist() };
    if (Math.abs(n.gold24 / R.gold24 - 1) > 0.1) throw Error("rate jump, ignored"); await setSet("rates", n); return n; } catch (e) { console.error("rates:", e.message); await setSet("rates", R); return R; } }
const pub = R => { const { ts, ...r } = R; return r; };
app.get("/api/rates", wrap(async (q, s) => { s.set("Cache-Control", "public, max-age=30"); s.json(pub(await rates())); }));
app.get("/api/cron/rates", wrap(async (q, s) => { if (!E.CRON_SECRET || q.query.key !== E.CRON_SECRET) return s.sendStatus(401); s.json(pub(await rates(true))); }));
// ---- catalogue
const row = p => [p.name, p.type, p.tags, p.karat, +p.gold_g, +p.silver_g, p.sizes, p.style, p.img, p.model, p.id, p.extra || {}];
app.get("/api/products", wrap(async (q, s) => { s.set("Cache-Control", "public, max-age=60"); s.json((await pool.query("select * from products where in_stock order by id")).rows.map(row)); }));
// ---- orders: priced on the server at the moment of ordering (rate lock)
app.post("/api/orders", limit(10), wrap(async (q, s) => {
  const b = q.body || {}, name = str(b.name, 60), phone = String(b.phone || "").replace(/\D/g, "").slice(-10), items = (Array.isArray(b.items) ? b.items : []).slice(0, 40);
  if (!name || phone.length !== 10 || !items.length) return s.status(400).json({ error: "Name, 10-digit phone and items are required" });
  const R = await rates(), pr = (await pool.query("select * from products where id=any($1) and in_stock", [items.map(i => parseInt(i.id) || 0)])).rows; let total = 0; const lines = [];
  for (const i of items) { const p = pr.find(x => x.id === parseInt(i.id)); if (!p) continue; const qty = Math.min(10, Math.max(1, parseInt(i.qty) || 1)), unit = price(R, p); if (!unit) continue; total += unit * qty; lines.push({ id: p.id, name: p.name, size: str(i.size, 20), qty, unit, grams: +p.gold_g + +p.silver_g }); }
  if (!lines.length) return s.status(400).json({ error: "Items not available" });
  const ref = "AANU-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + crypto.randomBytes(2).toString("hex").toUpperCase(), placedAt = ist(), snap = { ...pub(R), placedAt };
  await pool.query("insert into orders(ref,name,phone,items,rates,total) values($1,$2,$3,$4,$5,$6)", [ref, name, phone, JSON.stringify(lines), JSON.stringify(snap), total]);
  s.json({ ref, total, lines, placedAt, rates: snap }); }));
app.get("/api/order-status", limit(10), wrap(async (q, s) => { const ref = str(q.query.ref, 40), ph = String(q.query.phone || "").replace(/\D/g, "").slice(-10);
  const r = (await pool.query("select status,total,created_at from orders where ref=$1 and phone=$2", [ref, ph])).rows[0]; if (!r) return s.status(404).json({ error: "No order found for that reference and phone" }); s.json(r); }));
app.post("/api/similar", limit(6), async (q, s) => { try { if (!E.ML_URL) return s.status(503).json({ error: "Visual search is not enabled" }); if (+q.headers["content-length"] > 6e6) return s.status(413).json({ error: "Image too large" });
  const r = await fetch(E.ML_URL + "/search", { method: "POST", headers: { "content-type": q.headers["content-type"] }, body: q, duplex: "half", signal: AbortSignal.timeout(30000) }); s.status(r.status).json(await r.json()); } catch (e) { s.status(502).json({ error: "Visual search unavailable" }); } });
app.post("/api/custom", limit(5), wrap(async (q, s) => { const b = q.body || {}; if (!str(b.details, 1000)) return s.status(400).json({ error: "details required" });
  await pool.query("insert into custom_requests(name,phone,metal,whom,details) values($1,$2,$3,$4,$5)", [str(b.name, 60), str(b.phone, 15), str(b.metal, 40), str(b.whom, 40), str(b.details, 1000)]); s.json({ ok: 1 }); }));
// ---- AI assistant proxy: the Groq key stays on the server
app.post("/api/groq", limit(20), async (q, s) => { try { if (!E.GROQ_API_KEY) return s.status(503).json({ error: "no key" }); const b = q.body || {};
  const body = { model: E.GROQ_MODEL || "llama-3.3-70b-versatile", temperature: 0.3, max_tokens: 400, messages: (Array.isArray(b.messages) ? b.messages : []).slice(-16) }; if (Array.isArray(b.tools)) { body.tools = b.tools.slice(0, 8); body.tool_choice = "auto"; }
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + E.GROQ_API_KEY }, body: JSON.stringify(body), signal: AbortSignal.timeout(25000) }); s.status(r.status).json(await r.json()); } catch (e) { s.status(502).json({ error: "upstream" }); } });
// ---- admin
const SEC = E.SESSION_SECRET || "change-me", sign = p => p + "." + crypto.createHmac("sha256", SEC).update(p).digest("hex");
const same = (a, b) => { a = Buffer.from(String(a)); b = Buffer.from(String(b)); return a.length === b.length && crypto.timingSafeEqual(a, b); };
const auth = (q, s, n) => { const t = (q.get("authorization") || "").slice(7), e = t.split(".")[0]; if (e && same(sign(e), t) && +e > Date.now()) return n(); s.status(401).json({ error: "auth" }); };
app.post("/api/admin/login", limit(8), (q, s) => { if (!E.ADMIN_PASSWORD) return s.status(503).json({ error: "ADMIN_PASSWORD not set" }); if (!same((q.body || {}).password || "", E.ADMIN_PASSWORD)) return s.status(401).json({ error: "wrong password" }); s.json({ token: sign(String(Date.now() + 12 * 3600e3)) }); });
const A = f => [auth, wrap(f)];
app.get("/api/admin/orders", ...A(async (q, s) => s.json((await pool.query("select * from orders order by id desc limit 200")).rows)));
app.patch("/api/admin/orders/:id", ...A(async (q, s) => { await pool.query("update orders set status=$1 where id=$2", [str(q.body.status, 20), parseInt(q.params.id)]); s.json({ ok: 1 }); }));
app.get("/api/admin/custom", ...A(async (q, s) => s.json((await pool.query("select * from custom_requests order by id desc limit 100")).rows)));
app.get("/api/admin/products", ...A(async (q, s) => s.json((await pool.query("select * from products order by id desc limit 3000")).rows)));
app.patch("/api/admin/products/:id", ...A(async (q, s) => { await pool.query("update products set in_stock=$1 where id=$2", [!!q.body.in_stock, parseInt(q.params.id)]); s.json({ ok: 1 }); }));
app.delete("/api/admin/products/:id", ...A(async (q, s) => { await pool.query("delete from products where id=$1", [parseInt(q.params.id)]); s.json({ ok: 1 }); }));
app.post("/api/admin/products/bulk", ...A(async (q, s) => { const rows = Array.isArray(q.body.rows) ? q.body.rows : []; if (q.body.replace) await pool.query("truncate products restart identity");
  for (let i = 0; i < rows.length; i += 100) { const ch = rows.slice(i, i + 100), ps = [], vals = []; ch.forEach((r, j) => { ps.push("(" + Array.from({ length: 11 }, (_, k) => "$" + (j * 11 + k + 1)).join(",") + ")");
      vals.push(str(r[0], 120), str(r[1], 20), str(r[2], 100), +r[3] || 0, +r[4] || 0, +r[5] || 0, str(r[6], 120) || "Free", str(r[7], 30) || "Traditional", str(r[8], 200), str(r[9], 200), JSON.stringify(r[11] && typeof r[11] === "object" ? r[11] : {})); });
    await pool.query("insert into products(name,type,tags,karat,gold_g,silver_g,sizes,style,img,model,extra) values" + ps.join(","), vals); }
  s.json({ added: rows.length }); }));
app.put("/api/admin/rates", ...A(async (q, s) => { const b = q.body || {}, R = { ...DEF, ...(await getSet("rates", {})) }; for (const k of ["gold24", "gold22", "gold20", "gold18", "silver", "makingGold", "makingSilver", "gst"]) if (b[k] != null && +b[k] > 0) R[k] = +b[k];
  R.mode = b.mode === "auto" ? "auto" : "manual"; R.updated = ist(); R.ts = Date.now(); await setSet("rates", R); s.json(pub(R)); }));
app.post("/api/admin/calibrate", ...A(async (q, s) => { const { g, s: sv } = await raw(); await setSet("calib", { g: +q.body.gold24 / g, s: +q.body.silver / sv }); s.json({ ok: 1 }); }));
app.post("/api/admin/refresh", ...A(async (q, s) => s.json(pub(await rates(true)))));
app.use("/api", (q, s) => s.status(404).json({ error: "not found" }));
const ROOT = path.join(__dirname, "..");
app.use((q, s, n) => /^\/(server|api|netlify|tools|originals|node_modules)(\/|$)|^\/(package(-lock)?\.json|Dockerfile|docker-compose\.yml|render\.yaml|netlify\.toml|vercel\.json|catalog_template\.csv)$/.test(q.path) ? s.status(404).sendFile(path.join(ROOT, "404.html")) : n());
app.use(express.static(ROOT, { extensions: ["html"] }));
app.use((q, s) => s.status(404).sendFile(path.join(ROOT, "404.html")));
module.exports = app;
