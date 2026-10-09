#!/usr/bin/env python3
"""Update rates.json from free public feeds (gold-api.com spot + USD/INR), calibrated to YOUR local board.
  python tools/fetch_rates.py                         update rates.json
  python tools/fetch_rates.py --calibrate 14359 255   run once: today's 24K gold/g and 92.5 silver/g on your board
Indian retail rates include import duty/premium, so a one-time calibration factor is stored in tools/rate_config.json."""
import json, os, sys, urllib.request, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CF = os.path.join(ROOT, "tools", "rate_config.json"); RJ = os.path.join(ROOT, "rates.json"); OZ = 31.1034768
def get(u):
    return json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "aanu-rates/1.0"}), timeout=20))
def fx():
    for u in ("https://open.er-api.com/v6/latest/USD", "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR", "https://api.frankfurter.app/latest?from=USD&to=INR"):
        try: return float(get(u)["rates"]["INR"])
        except Exception as e: print("FX source failed:", u, e)
    sys.exit("No USD/INR source reachable")
def raw():
    r = fx(); xau = float(get("https://api.gold-api.com/price/XAU")["price"]); xag = float(get("https://api.gold-api.com/price/XAG")["price"])
    return xau * r / OZ, xag * r / OZ * 0.925  # INR per gram: 24K gold, 92.5 silver (before local premium)
def main():
    cfg = json.load(open(CF)); g, s = raw()
    if "--calibrate" in sys.argv:
        i = sys.argv.index("--calibrate"); cfg["gold_factor"] = float(sys.argv[i + 1]) / g; cfg["silver_factor"] = float(sys.argv[i + 2]) / s
        json.dump(cfg, open(CF, "w"), indent=2); print("Calibrated:", cfg["gold_factor"], cfg["silver_factor"]); return
    if not cfg["gold_factor"] or not cfg["silver_factor"]: sys.exit("Run once first: python tools/fetch_rates.py --calibrate <24K gold/g> <92.5 silver/g>")
    g24 = g * cfg["gold_factor"]; R = cfg["ratios"]
    out = {"gold24": round(g24), "gold22": round(g24 * R["22"]), "gold20": round(g24 * R["20"]), "gold18": round(g24 * R["18"]), "silver": round(s * cfg["silver_factor"])}
    try: old = json.load(open(RJ))
    except Exception: old = {}
    for k in out:
        if old.get(k) and abs(out[k] / old[k] - 1) * 100 > cfg["max_move_pct"] and "--force" not in sys.argv: sys.exit("Rate %s moved more than %s%%, not updating (use --force)" % (k, cfg["max_move_pct"]))
    ist = datetime.datetime.utcnow() + datetime.timedelta(hours=5, minutes=30)
    out["updated"] = ist.strftime("%d %b %Y, %I:%M %p IST"); out["source"] = "gold-api.com spot x USDINR, calibrated"
    json.dump(out, open(RJ, "w")); open(RJ, "a").write("\n"); print(out)
if __name__ == "__main__": main()
