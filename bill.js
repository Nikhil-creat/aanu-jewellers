/* AANU_BILL.open(order): printable bill/estimate with shop header, GST split, rates and stamp */
(function () {
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function inr(n) { return "\u20B9 " + Math.round(n).toLocaleString("en-IN"); }
  function words(n) {
    var a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"], b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    function t(x) { return x < 20 ? a[x] : b[x / 10 | 0] + (x % 10 ? " " + a[x % 10] : ""); }
    function h(x) { return (x > 99 ? a[x / 100 | 0] + " Hundred" + (x % 100 ? " " : "") : "") + (x % 100 ? t(x % 100) : ""); }
    n = Math.round(n); var s = "", c = n / 1e7 | 0, l = (n / 1e5 | 0) % 100, k = (n / 1e3 | 0) % 100, r = n % 1000;
    if (c) s += t(c) + " Crore "; if (l) s += t(l) + " Lakh "; if (k) s += t(k) + " Thousand "; if (r) s += h(r);
    return (s.trim() || "Zero") + " Rupees Only";
  }
  function open(o) {
    var P = CFG.place || {}, S = CFG.store || {}, gst = CFG.gst || 0.03, tot = +o.total || 0, tv = Math.round(tot / (1 + gst)), tax = tot - tv, half = tax / 2, R = o.rates || {};
    var addr = [P.street, P.landmark, "Plus Code " + P.plus, P.town + ", " + P.district + " district", P.state + " " + P.pin].filter(Boolean).join(", ");
    var rows = (o.lines || []).map(function (l, i) { return "<tr><td>" + (i + 1) + "</td><td>" + esc(l.name) + (l.size && l.size !== "Free" ? " <small>(" + esc(l.size) + ")</small>" : "") + (l.grams ? "<br><small>" + esc(l.grams) + " g</small>" : "") + "</td><td>7113</td><td class=r>" + esc(l.qty) + "</td><td class=r>" + inr(l.unit) + "</td><td class=r>" + inr(l.unit * l.qty) + "</td></tr>"; }).join("");
    var terms = [S.returns && "Returns: " + S.returns, S.exchange && "Exchange: " + S.exchange].filter(Boolean).map(esc).join("<br>");
    var h = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bill ' + esc(o.ref) + '</title><style>@page{size:A4;margin:12mm}body{font:13px Arial,sans-serif;color:#111;margin:0;background:#eee}.pg{max-width:780px;margin:12px auto;background:#fff;padding:22px;border:1px solid #ccc}h1{font:700 26px Georgia,serif;margin:0;color:#8a6a2b;letter-spacing:2px}table{width:100%;border-collapse:collapse;margin:12px 0}th,td{border:1px solid #bbb;padding:6px;text-align:left;vertical-align:top}th{background:#f4efe6}.r{text-align:right}.hd{display:flex;justify-content:space-between;gap:12px;border-bottom:2px solid #c5a059;padding-bottom:10px}.g{display:grid;grid-template-columns:1fr 1fr;gap:10px}.sig{text-align:center}.np{margin:10px auto;display:block;padding:10px 22px;font-size:15px}small{color:#555}@media print{body{background:#fff}.pg{border:0;margin:0;padding:0}.np{display:none}}</style></head><body><button class="np" onclick="print()">Print / Save as PDF</button><div class="pg">' +
      '<div class="hd"><div><h1>AANU JEWELLERS</h1><div>' + esc(addr) + '</div><div>Phone / WhatsApp: +91 63005 56301' + (S.email ? " &middot; " + esc(S.email) : "") + '</div>' + (S.gstin ? '<div><b>GSTIN: ' + esc(S.gstin) + '</b></div>' : "") + '</div><div style="text-align:right"><b style="font-size:18px">' + (S.gstin ? "TAX INVOICE" : "ESTIMATE / BILL") + '</b><div>No: ' + esc(o.ref) + '</div><div>Date: ' + esc(o.placedAt) + '</div></div></div>' +
      '<p><b>Customer:</b> ' + esc(o.name) + ' &nbsp; <b>Phone:</b> ' + esc(o.phone) + '</p>' +
      '<table><tr><th>#</th><th>Description</th><th>HSN</th><th class=r>Qty</th><th class=r>Rate (incl. making &amp; GST)</th><th class=r>Amount</th></tr>' + rows + '</table>' +
      '<div class="g"><div><p><b>Rates locked at ' + esc(o.placedAt) + '</b> (per gram)<br>24K ' + inr(R.gold24 || 0) + ' &middot; 22K ' + inr(R.gold22 || 0) + ' &middot; 20K ' + inr(R.gold20 || 0) + ' &middot; 18K ' + inr(R.gold18 || 0) + ' &middot; Silver 92.5 ' + inr(R.silver || 0) + '</p><p><b>Amount in words:</b><br>' + words(tot) + '</p></div>' +
      '<table><tr><td>Taxable value (metal + making)</td><td class=r>' + inr(tv) + '</td></tr><tr><td>CGST @ ' + (gst * 50) + '%</td><td class=r>' + half.toFixed(2) + '</td></tr><tr><td>SGST @ ' + (gst * 50) + '%</td><td class=r>' + half.toFixed(2) + '</td></tr><tr><th>Total</th><th class=r>' + inr(tot) + '</th></tr></table></div>' +
      '<div class="g" style="align-items:end;margin-top:14px"><div><small>' + (terms ? terms + "<br>" : "") + 'This bill is generated from your website order using the rates locked at the time above. The final invoice and payment are completed at the store. Please check weight and hallmark on delivery.</small></div><div class="sig">For <b>AANU JEWELLERS</b><br>' + (window.AANU_STAMP ? AANU_STAMP.svg({ size: 170 }) : "") + '<br><small>Authorised Signatory</small></div></div></div></body></html>';
    var w = window.open("", "_blank"); if (!w) { alert("Please allow pop-ups to view the bill"); return; } w.document.write(h); w.document.close();
  }
  window.AANU_BILL = { open: open, words: words };
})();
