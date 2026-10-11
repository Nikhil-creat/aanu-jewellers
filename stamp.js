/* AANU stamp generator: AANU_STAMP.svg(options) returns an SVG string (round seal or rectangular address stamp) */
(function () {
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var D = { name: "AANU JEWELLERS", tag: "GOLD & SILVER", town: "THORRUR", line2: "MAHABUBABAD DT. TELANGANA", phone: "63005 56301", gstin: "", color: "#1d3b8b", shape: "round", ink: 1, tilt: -6, size: 0 };
  function svg(o) {
    o = Object.assign({}, D, (window.CFG && CFG.stamp) || {}, o || {});
    var id = "k" + Math.random().toString(36).slice(2, 7), c = esc(o.color), round = o.shape !== "rect", cx = round ? 120 : 150, cy = round ? 120 : 75;
    var f = o.ink ? ' filter="url(#' + id + ')"' : "", rot = o.tilt ? ' transform="rotate(' + (+o.tilt) + ' ' + cx + ' ' + cy + ')"' : "";
    var defs = '<defs><filter id="' + id + '" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="8" result="m"/><feColorMatrix in="m" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.8 1.75" result="k"/><feComposite in="d" in2="k" operator="in"/></filter>' +
      (round ? '<path id="' + id + 'a" d="M46 120a74 74 0 0 1 148 0" fill="none"/><path id="' + id + 'b" d="M28 120a92 92 0 0 0 184 0" fill="none"/>' : "") + '</defs>';
    var font = ' font-family="Georgia,\'Times New Roman\',serif" text-anchor="middle" fill="' + c + '"', g;
    var nm = esc(String(o.name).toUpperCase()), tw = Math.min(round ? 200 : 250, String(o.name).length * (round ? 14.2 : 17));
    if (round) {
      var bt = esc((o.town + " \u2022 " + (o.line2 || "")).replace(/ \u2022 $/, "").toUpperCase()), bw = Math.min(250, bt.length * 10.5);
      g = '<circle cx="120" cy="120" r="112" fill="none" stroke="' + c + '" stroke-width="4"/><circle cx="120" cy="120" r="106" fill="none" stroke="' + c + '" stroke-width="1.2"/><circle cx="120" cy="120" r="68" fill="none" stroke="' + c + '" stroke-width="1.4"/>' +
        '<text' + font + ' font-size="21" font-weight="700" letter-spacing="1.5"><textPath href="#' + id + 'a" xlink:href="#' + id + 'a" startOffset="50%" textLength="' + tw + '" lengthAdjust="spacingAndGlyphs">' + nm + '</textPath></text>' +
        '<text' + font + ' font-size="11.5" font-weight="700" letter-spacing="1"><textPath href="#' + id + 'b" xlink:href="#' + id + 'b" startOffset="50%" textLength="' + bw + '" lengthAdjust="spacingAndGlyphs">' + bt + '</textPath></text>' +
        '<circle cx="32" cy="120" r="3" fill="' + c + '"/><circle cx="208" cy="120" r="3" fill="' + c + '"/>' +
        '<g fill="none" stroke="' + c + '" stroke-width="1.5" stroke-linejoin="round"><path d="M120 66l22 17-22 30-22-30z"/><path d="M98 83h44M110 83l10-17 10 17M110 83l10 30 10-30"/></g>' +
        '<text' + font + ' font-size="11" font-weight="700" letter-spacing="1.8" x="120" y="133">' + esc(String(o.tag).toUpperCase()) + '</text>' +
        '<text' + font + ' font-size="12" x="120" y="150">Ph: ' + esc(o.phone) + '</text>' + (o.gstin ? '<text' + font + ' font-size="8" x="120" y="162">GSTIN: ' + esc(o.gstin) + '</text>' : "");
    } else {
      g = '<rect x="4" y="4" width="292" height="142" rx="9" fill="none" stroke="' + c + '" stroke-width="4"/><rect x="11" y="11" width="278" height="128" rx="5" fill="none" stroke="' + c + '" stroke-width="1.2"/>' +
        '<text' + font + ' font-size="28" font-weight="700" letter-spacing="1" x="150" y="53" textLength="' + tw + '" lengthAdjust="spacingAndGlyphs">' + nm + '</text>' +
        '<text' + font + ' font-size="11" font-weight="700" letter-spacing="3" x="150" y="72">' + esc(String(o.tag).toUpperCase()) + '</text><path d="M40 82h220" stroke="' + c + '" stroke-width="1.2"/>' +
        '<text' + font + ' font-size="12" x="150" y="100">' + esc(o.town) + ', ' + esc(o.line2) + '</text><text' + font + ' font-size="13" font-weight="700" x="150" y="119">Ph: ' + esc(o.phone) + '</text>' +
        (o.gstin ? '<text' + font + ' font-size="10" x="150" y="134">GSTIN: ' + esc(o.gstin) + '</text>' : "");
    }
    var vb = round ? "0 0 240 240" : "0 0 300 150", sz = o.size ? ' width="' + o.size + '"' : "";
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' + vb + '"' + sz + ' role="img" aria-label="' + esc(o.name) + ' stamp">' + defs + '<g' + f + rot + ' opacity="0.93">' + g + '</g></svg>';
  }
  window.AANU_STAMP = { svg: svg, defaults: D };
})();
