#!/usr/bin/env python3
"""AANU catalogue builder.
Put 4K originals in  originals/<segment>/<type>/<Style>/<Name>_<spec>.jpg
  segment: kids ladies men family marriage festival events daily
  type:    ring bangle chain necklace earrings anklet pendant set
  spec:    _22K_8.5g (gold)  _925_30g (silver)  _20K_15g_925_25g (combination)
  extra tags: add +marriage+festival to the file name, e.g. Lakshmi-Haram_22K_65g+marriage.jpg
Optional exact 3D scan: models/<same file name>.glb
Run:  python tools/build_catalog.py     (creates assets/img/t|m|l/*.webp and data/products.json)"""
import os, re, json, sys
from PIL import Image, ImageOps
SEG = {"kids","ladies","men","family","marriage","festival","events","daily"}
TYP = {"ring","bangle","chain","necklace","earrings","anklet","pendant","set"}
SZ = {"ring":"Ring 6,Ring 7,Ring 8,Ring 9","bangle":"Bangle 2.2,Bangle 2.4,Bangle 2.6,Bangle 2.8","chain":"16 in,18 in,20 in,22 in","pendant":"16 in,18 in"}
OUT = [("t",480,78),("m",1280,82),("l",2560,84)]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(root, "originals"); rows = []; seen = set(); skipped = 0
for dp, _, fs in os.walk(src):
    for f in sorted(fs):
        stem, ext = os.path.splitext(f)
        if ext.lower() not in (".jpg",".jpeg",".png",".webp"): continue
        parts = os.path.relpath(dp, src).split(os.sep)
        if len(parts) < 2 or parts[0] not in SEG or parts[1] not in TYP:
            print("SKIP (folder must be segment/type[/Style]):", os.path.join(dp, f)); skipped += 1; continue
        seg, typ = parts[0], parts[1]; style = parts[2] if len(parts) > 2 else "Traditional"
        g = re.search(r"_(18|20|22|24)K_([\d.]+)g", stem); s = re.search(r"_925_([\d.]+)g", stem)
        if not g and not s:
            print("SKIP (no weight like _22K_8.5g or _925_30g):", f); skipped += 1; continue
        tags = [seg] + [t for t in re.findall(r"\+([a-z]+)", stem) if t in SEG and t != seg]
        name = re.sub(r"[_-]+", " ", re.split(r"_(?:18|20|22|24)K|_925|\+", stem)[0]).strip()
        slug = re.sub(r"[^a-z0-9]+", "-", f"{seg}-{typ}-{name}".lower()).strip("-"); base = slug; n = 2
        while slug in seen: slug = f"{base}-{n}"; n += 1
        seen.add(slug); img = slug + ".webp"
        im = None
        for d, w, q in OUT:
            o = os.path.join(root, "assets", "img", d, img)
            if os.path.exists(o) and os.path.getmtime(o) > os.path.getmtime(os.path.join(dp, f)): continue
            if im is None: im = ImageOps.exif_transpose(Image.open(os.path.join(dp, f))).convert("RGB")
            c = im.copy(); c.thumbnail((w, w)); os.makedirs(os.path.dirname(o), exist_ok=True); c.save(o, "WEBP", quality=q, method=6)
        glb = stem + ".glb"
        rows.append([name, typ, ",".join(tags), int(g.group(1)) if g else 0, float(g.group(2)) if g else 0, float(s.group(1)) if s else 0, SZ.get(typ, "Free"), style, img, glb if os.path.exists(os.path.join(root, "models", glb)) else ""])
os.makedirs(os.path.join(root, "data"), exist_ok=True)
json.dump(rows, open(os.path.join(root, "data", "products.json"), "w"), ensure_ascii=False, separators=(",", ":"))
print(f"{len(rows)} designs written to data/products.json ({skipped} skipped)")
