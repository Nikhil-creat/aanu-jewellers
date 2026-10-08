#!/usr/bin/env python3
"""Add many designs from catalog.csv (copy catalog_template.csv). The image column can be a local file path or an http(s) URL.
Only use images you own or have written permission/licence to use. Then run: python tools/build_catalog.py
Columns: segment,type,style,name,karat,gold_g,silver_g,extra_tags,image"""
import csv, os, re, shutil, sys, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
n = 0
for r in csv.DictReader(open(os.path.join(ROOT, "catalog.csv"), encoding="utf-8")):
    img = (r.get("image") or "").strip()
    if not img: continue
    nm = re.sub(r"[^A-Za-z0-9]+", "-", r["name"]).strip("-"); spec = ""
    if r.get("karat") and float(r.get("gold_g") or 0): spec += "_%sK_%sg" % (r["karat"], r["gold_g"])
    if float(r.get("silver_g") or 0): spec += "_925_%sg" % r["silver_g"]
    tags = "".join("+" + t.strip() for t in (r.get("extra_tags") or "").split(",") if t.strip())
    ext = (os.path.splitext(img.split("?")[0])[1] or ".jpg").lower()
    d = os.path.join(ROOT, "originals", r["segment"].strip(), r["type"].strip(), (r.get("style") or "Traditional").strip()); os.makedirs(d, exist_ok=True)
    dst = os.path.join(d, nm + spec + tags + ext)
    if os.path.exists(dst): continue
    try:
        if img.startswith("http"): open(dst, "wb").write(urllib.request.urlopen(urllib.request.Request(img, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read())
        else: shutil.copy(img, dst)
        n += 1
    except Exception as e: print("FAILED", r["name"], e)
print(n, "images added to originals/. Now run: python tools/build_catalog.py")
