# AANU Jewellers: fullstack website

Front-end (repo root) + Node/Express API (`server/`) + Postgres. Works on Render, Vercel, Netlify or Docker.

## What it does
- Catalogue from the database (admin can hide/delete/import), paging and search for thousands of designs, 3D viewer, AI assistant.
- **Orders are priced on the server at the moment the customer taps Confirm** (rate lock). Each order stores the rates and the IST time, shows in `/admin.html`, and opens WhatsApp with the same details.
- Gold/silver rates: set by you in `/admin.html`, or auto (market spot x USD/INR, calibrated to your board).
- **Groq key stays on the server** (`GROQ_API_KEY`). Customers never see it.
- PWA, SEO tags, custom-order requests saved, admin login (HMAC token), rate limiting.

## Set up (same for every host)
1. Free Postgres: neon.tech (or supabase.com). Copy the connection string = `DATABASE_URL`.
2. Env vars: copy `.env.example`. Required: `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`. Optional: `GROQ_API_KEY`, `CRON_SECRET`.
3. Deploy (below), open `https://<your-site>/admin.html`, log in, Products > import `data/sample_products.json` (or your own `products.json`).
4. Rates: edit and Save. For auto: type today's 24K and silver board rates, Calibrate, tick Auto-update, Save.

## Deploy
- **Render**: New > Blueprint (uses `render.yaml`) or Web Service: build `npm install`, start `node server/index.js`. Add env vars. Free plan sleeps when idle.
- **Vercel**: Import the GitHub repo. Framework: Other. No build command. Add env vars. (`vercel.json` already routes /api.)
- **Netlify**: Import repo; publish `.` (repo root), functions `netlify/functions` (`netlify.toml` sets it). Add env vars.
- **Docker**: `docker compose up --build` then http://localhost:3000 (edit passwords in docker-compose.yml first).
- Auto rates on serverless hosts: add a free cron (cron-job.org) hitting `https://<site>/api/cron/rates?key=<CRON_SECRET>` every 30 min. The first visitor after 30 min also triggers a refresh.

## Photos and bulk designs
Put 4K originals in `originals/<segment>/<type>/<Style>/Name_22K_8.5g.jpg`, run `pip install pillow` and `python tools/build_catalog.py` (writes WebP to `assets/img` and `data/products.json`), commit, then import `products.json` in the admin page. Or fill `catalog.csv` (see `catalog_template.csv`) and run `python tools/import_csv.py` first. For thousands of images use a CDN and set `CFG.imgBase` in `config.js`.

## Before going live
Change ADMIN_PASSWORD/SESSION_SECRET, set real making % and GST in admin, check hallmark/price-protection wording with your accountant, and add your own product photos.

## Same repo, GitHub Pages still works
GitHub Pages keeps serving the static version (no database): products come from `data/products.json` or the built-in sample, orders go straight to WhatsApp. Vercel/Render/Netlify run the full version from this same repo.
