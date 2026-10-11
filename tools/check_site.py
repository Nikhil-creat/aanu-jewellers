#!/usr/bin/env python3
"""Pre-flight check before publishing: python tools/check_site.py"""
import json, os, re, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); bad = warn = 0
def ok(m): print("  ok   ", m)
def no(m):
    global bad; bad += 1; print("  FAIL ", m)
def wr(m):
    global warn; warn += 1; print("  warn ", m)
for f in ["index.html", "app.js", "config.js", "settings.js", "style.css", "sw.js", "manifest.webmanifest", "rates.json", "404.html", "stamp.js", "bill.js", "policies.html"]:
    ok(f) if os.path.exists(os.path.join(root, f)) else no("missing " + f)
for f in ["rates.json", "data/products.json", "manifest.webmanifest"]:
    p = os.path.join(root, f)
    if os.path.exists(p):
        try: json.load(open(p)); ok(f + " is valid JSON")
        except Exception as e: no(f + " invalid JSON: " + str(e))
try:
    rows = json.load(open(os.path.join(root, "data", "products.json")))
    for r in rows:
        x = r[11] if len(r) > 11 and isinstance(r[11], dict) else {}
        for n in x.get("imgs", []) + ([r[8]] if r[8] else []):
            for d in "tml":
                if not os.path.exists(os.path.join(root, "assets", "img", d, n)): no("image missing: assets/img/%s/%s" % (d, n))
        if not (r[4] or r[5]): wr("%s has no weight yet (shows 'On request')" % r[0])
    ok("%d real designs checked" % len(rows))
except Exception as e: wr("could not read data/products.json: %s" % e)
s = open(os.path.join(root, "settings.js")).read() if os.path.exists(os.path.join(root, "settings.js")) else ""
for k in ["hours", "delivery", "returns", "exchange", "payments", "gstin", "street"]:
    if re.search(k + r'\s*:\s*""', s): wr("settings.js: %s is empty (assistant will say 'ask on WhatsApp')" % k)
size = sum(os.path.getsize(os.path.join(dp, f)) for dp, dn, fs in os.walk(root) if ".git" not in dp and "originals" not in dp and "node_modules" not in dp for f in fs)
(wr if size > 800e6 else ok)("site size %.1f MB (GitHub Pages limit about 1000 MB)" % (size / 1e6))
print("\n%d problem(s), %d warning(s)" % (bad, warn)); sys.exit(1 if bad else 0)
