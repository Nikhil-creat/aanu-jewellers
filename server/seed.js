// node server/seed.js data/sample_products.json [--replace]   (needs DATABASE_URL)
const { Pool } = require("pg"), fs = require("fs"), f = process.argv[2];
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
(async () => { const rows = JSON.parse(fs.readFileSync(f, "utf8")); if (process.argv.includes("--replace")) await pool.query("truncate products restart identity");
  for (const r of rows) await pool.query("insert into products(name,type,tags,karat,gold_g,silver_g,sizes,style,img,model) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8] || "", r[9] || ""]);
  console.log(rows.length + " products added"); await pool.end(); })().catch(e => { console.error(e); process.exit(1); });
