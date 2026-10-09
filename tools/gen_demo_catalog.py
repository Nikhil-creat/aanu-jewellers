#!/usr/bin/env python3
"""Generate a DEMO catalogue (52 designs per category) for UI testing: python tools/gen_demo_catalog.py -> data/demo_products.json
Entries are sample data, not real stock. Replace with real designs via tools/build_catalog.py."""
import json, os, random
R = random.Random(2026); N = 52
LAB = {"ring": "Ring", "bangle": "Bangle", "chain": "Chain", "necklace": "Necklace", "earrings": "Earrings", "anklet": "Anklet", "pendant": "Pendant", "set": "Set"}
RNG = {"ring": (2, 9), "bangle": (8, 60), "chain": (6, 40), "necklace": (15, 120), "earrings": (2, 25), "anklet": (20, 110), "pendant": (2, 15), "set": (30, 200)}
MOT = {"ring": ["Solitaire", "Floral", "Band", "Signet", "Cocktail", "Eternity", "Couple", "Peacock"], "bangle": ["Kada", "Plain", "Nakshi", "Filigree", "Kangan", "Twisted", "Stone-set", "Lion"],
 "chain": ["Rope", "Box", "Curb", "Fox-tail", "Singapore", "Figaro", "Link", "Wheat"], "necklace": ["Haram", "Choker", "Kasu", "Mango", "Lakshmi", "Peacock", "Chandraharam", "Addigai"],
 "earrings": ["Jhumka", "Stud", "Chandbali", "Drop", "Hoop", "Kammalu", "Floral", "Jimikki"], "anklet": ["Payal", "Chain", "Ghungroo", "Pattilu", "Bridal", "Beaded", "Twisted", "Plain"],
 "pendant": ["Lakshmi", "Om", "Heart", "Ganesha", "Drop", "Floral", "Evil-eye", "Coin"], "set": ["Bridal", "Temple", "Kundan", "Antique", "Light", "Haram", "Choker", "Vaddanam"]}
STY = ["Temple", "Antique", "Kundan", "Modern", "Minimal", "Bridal", "Traditional", "Casual"]
STONE = {"Temple": ["Ruby", "Emerald", "Pearl", "None"], "Antique": ["None", "Ruby", "Pearl"], "Kundan": ["Kundan", "Ruby", "Emerald"], "Modern": ["CZ", "None", "Diamond-look"], "Minimal": ["None", "CZ"], "Bridal": ["Ruby", "Emerald", "Kundan", "CZ"], "Traditional": ["None", "Pearl", "Ruby"], "Casual": ["None", "CZ"]}
TAG = {"Temple": ["ladies", "festival", "marriage"], "Antique": ["ladies", "festival"], "Kundan": ["ladies", "marriage", "events"], "Modern": ["ladies", "events", "daily"], "Minimal": ["ladies", "daily"], "Bridal": ["ladies", "marriage"], "Traditional": ["ladies", "festival", "family"], "Casual": ["ladies", "daily"]}
MEN = {"Signet", "Kada", "Rope", "Box", "Curb", "Fox-tail", "Figaro", "Link", "Wheat", "Lion", "Plain", "Band", "Twisted"}
def sizes(t):
    if t == "ring": return ",".join("Ring %d" % i for i in range(6, 6 + R.randint(3, 5)))
    if t == "bangle": return ",".join(["Bangle 2.2", "Bangle 2.4", "Bangle 2.6", "Bangle 2.8"][:R.randint(2, 4)])
    if t == "chain": return ",".join(["16 in", "18 in", "20 in", "22 in", "24 in"][R.randint(0, 1):R.randint(3, 5)])
    if t == "pendant": return "16 in,18 in"
    return "Free"
rows = []
for n in range(1, N + 1):
    for t in LAB:
        sty = R.choice(STY); mot = MOT[t][(n + R.randint(0, 7)) % 8]; lo, hi = RNG[t]; w = round(R.uniform(lo, hi), 1)
        tags = list(TAG[sty]); r = R.random()
        if t in ("ring", "bangle", "chain") and mot in MEN and r < .55: tags = ["men", R.choice(["daily", "events", "festival"])]
        elif t in ("anklet", "bangle", "earrings", "pendant", "chain") and w < 12 and r < .25: tags = ["kids", R.choice(["daily", "family", "events"])]
        elif r > .93: tags.append("family")
        m = R.random(); silver_p = .8 if t == "anklet" else (.28 if t in ("ring", "pendant", "chain", "bangle") else .12)
        kt = R.choices([22, 18, 20, 24], [.55, .2, .15, .1] if sty not in ("Modern", "Minimal") else [.3, .5, .15, .05])[0]
        if m < silver_p: k, g, s = 0, 0, round(w * 1.3, 1)
        elif m < silver_p + .1 and t != "anklet": k, g, s = kt, round(w * .55, 1), round(w * .45, 1)
        else: k, g, s = kt, w, 0
        stone = R.choice(STONE[sty]); fin = R.choice(["Polished", "Matte", "Antique", "Two-tone"] if sty != "Antique" else ["Antique", "Matte"])
        rows.append(["%s %s %s #%02d" % (sty, mot, LAB[t], n), t, ",".join(tags), k, g, s, sizes(t), sty, "", "", 0, {"stone": stone, "finish": fin, "motif": mot, "code": "AN-%s-%03d" % (t[:2].upper(), n)}])
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json.dump(rows, open(os.path.join(root, "data", "demo_products.json"), "w"), ensure_ascii=False, separators=(",", ":"))
print(len(rows), "demo designs ->", "data/demo_products.json")
