# AANU Jewellers: website

Static site (works on GitHub Pages) with an optional Node + Postgres backend (Vercel / Render / Netlify / Docker).

## Files you edit
| File | What |
|---|---|
| `settings.js` | Hours, delivery, returns, exchange, payments, GSTIN, UPI id, shop email, street, landmark, social links. Never overwritten by updates. |
| `rates.json` | Gold/silver rates per gram (`gold24`, `gold22`, `gold20`, `gold18`, `silver`, `updated`). |
| `data/products.json` | Your real designs (photos). Sample illustrations (`data/demo_products.json`) show after them. |
| `index.html` | Page text and sections. |

Rates: `sh tools/update_rates.sh 14359 13675 11401 255` (24K, 22K, 18K, silver) updates `rates.json` and pushes.

## Add real designs
`originals/<segment>/<type>/<Style>/Name_22K_8.5g.jpg` (silver `_925_30g`, combination `_20K_15g_925_25g`), then `pip install pillow` and `python tools/build_catalog.py`. It writes WebP sizes to `assets/img/t|m|l` and `data/products.json`. Weight `0` shows "On request". Crop camera watermarks and other people's labels first. Bulk: fill `catalog.csv` (see `catalog_template.csv`) and run `python tools/import_csv.py`.

## Stamp and bills
`/stamp.html` makes the round or rectangular stamp (SVG or PNG). Paste the generated `CFG.stamp=...` line into `settings.js`. After an order the customer can print a bill with GST split, locked rates and the stamp. With a GSTIN set it reads TAX INVOICE, otherwise ESTIMATE / BILL.

## Check before publishing
`python tools/check_site.py` (missing files, bad JSON, missing images, empty settings, site size).

## Update from a zip (Termux)
`sh tools/apply_update.sh ~/storage/downloads/<zip name>.zip "message"` unzips without touching `settings.js`, `rates.json`, `data/products.json`, runs the check and pushes.

## Backend (optional)
See `.env.example`, `render.yaml`, `vercel.json`, `netlify.toml`, `docker-compose.yml`. Database orders, admin panel (`/admin.html`), server-side rate lock, Groq proxy and visual search (`ml/`). GitHub Pages runs without it: orders go to WhatsApp and the bill is created in the browser.

## Notes
Images from the demo catalogue are generated illustrations, not photos. Policies in `policies.html` are templates: have them reviewed. Keep secrets (`GROQ_API_KEY`, `ADMIN_PASSWORD`) in host environment variables, never in the repo.
