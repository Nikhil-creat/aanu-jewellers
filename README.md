# AANU Jewellers: website + catalogue tools

## 1. Add your designs (1000+ per segment is fine)
Keep 4K originals on your computer in `originals/` (this folder is NOT uploaded):

    originals/<segment>/<type>/<Style>/<Name>_<spec>.jpg
    segment: kids ladies men family marriage festival events daily
    type:    ring bangle chain necklace earrings anklet pendant set
    Style:   Temple Antique Kundan Modern Minimal Bridal Traditional Casual
    spec:    _22K_8.5g   (gold, karat 18/20/22/24 + grams)
             _925_30g    (silver)
             _20K_15g_925_25g  (gold + silver combination)
    extra tags: add +marriage+festival, e.g. Lakshmi-Haram_22K_65g+marriage.jpg
    exact 3D scan (optional): models/<same file name>.glb

Then run once (any time you add photos):

    pip install pillow
    python tools/build_catalog.py

It creates web-ready WebP in `assets/img/t` (480px thumbs), `m` (1280px), `l` (2560px, the zoom / "Full resolution" image) and writes `data/products.json`. The site loads it automatically, with paging and search for thousands of designs.

## 2. Daily rates
Edit `rates.json` (`gold22`, `silver`, `updated`). The site re-reads it every 60 seconds and the scrolling ticker updates. Making %, GST, phone are in `config.js`.

## 3. Upload to GitHub and publish with GitHub Pages
1. Create a free account at github.com, then New repository: name `aanu-jewellers`, Public, no README.
2. Upload the files:
   - Small start (under ~100 files): on the repo page tap "uploading an existing file", drag the extracted folder CONTENTS (index.html at the top level), Commit.
   - With your photos (thousands of files) use git, in the extracted folder:

         git init
         git add .
         git commit -m "AANU site"
         git branch -M main
         git remote add origin https://github.com/<your-username>/aanu-jewellers.git
         git push -u origin main

     (Login with a Personal Access Token as password: GitHub > Settings > Developer settings > Tokens. For huge catalogues push in batches: add one segment folder, commit, push, repeat.)
3. Repo > Settings > Pages > Source: "Deploy from a branch", Branch `main`, folder `/ (root)`, Save.
4. After 1 to 3 minutes your site is live at `https://<your-username>.github.io/aanu-jewellers/`. Later updates: add files, `git add . && git commit -m update && git push`.
5. Custom domain (optional): Settings > Pages > Custom domain, then add the DNS records GitHub shows.

## Limits to plan for
- GitHub Pages sites should stay under 1 GB; one file max 100 MB. About 0.6 MB per design (3 sizes) means roughly 1500 designs fit. For more, host `assets/img` on Cloudflare R2 / Cloudinary / Bunny and set `CFG.imgBase` in `config.js` to that URL (ending with /).
- Never upload `originals/` (4K raw files); it is already in `.gitignore`.
- AI chatbot: open the chat, tap the gear, paste your free Groq key (console.groq.com). It is stored only in that visitor's browser. For a public shop, put the key behind a small proxy server instead.
- 3D: the viewer needs internet (three.js from a CDN). It shows a parametric model per design type; add `.glb` scans for exact pieces.

## Helper scripts (Termux friendly)
- `sh tools/update_rates.sh 7250 118` updates rates.json (22K gold, silver) and pushes.
- `sh tools/deploy.sh "new designs"` rebuilds the catalogue from originals/ and pushes.
- The site is installable as an app (PWA) from the browser menu: Add to Home screen.
