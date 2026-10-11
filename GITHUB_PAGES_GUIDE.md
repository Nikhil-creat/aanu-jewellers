# GitHub Pages guide (Termux)

## First time
1. github.com > New repository `aanu-jewellers`, Public, empty.
2. `cd ~ && unzip ~/storage/downloads/<zip name>.zip -d aanu-jewellers && cd aanu-jewellers`
3. `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`
4. `git init && git add . && git commit -m "AANU site" && git branch -M main`
5. `git remote add origin https://github.com/<username>/aanu-jewellers.git` then `git push -u origin main` (password = personal access token with `repo` scope).
6. Repo > Settings > Pages > Source: Deploy from a branch > `main` / `(root)` > Save.
7. After 1 to 3 minutes: `https://<username>.github.io/aanu-jewellers/`

## Every update
`cd ~/aanu-jewellers && sh tools/apply_update.sh ~/storage/downloads/<zip name>.zip "what changed"`

## Daily rates
`sh tools/update_rates.sh <24K> <22K> <18K> <silver>`

## If something looks wrong
- Old page: hard refresh, or clear site data (the app caches files).
- 404 on images: file names are case-sensitive; run `python tools/check_site.py`.
- Push rejected: `git pull --rebase origin main` then `git push`.
- Pages not building: Settings > Pages shows the error; Actions tab > "pages build and deployment".
- Limits: about 1 GB site size, files under 100 MB. Use a CDN for thousands of photos (`CFG.imgBase`).

## Custom domain (optional)
Settings > Pages > Custom domain, add the DNS records GitHub shows, tick Enforce HTTPS. Then change the URLs in `index.html` (canonical, og tags, JSON-LD), `sitemap.xml` and `robots.txt`.
