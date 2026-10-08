const rateFor = (R, k) => R["gold" + k] || Math.round(R.gold22 * k / 22);
const price = (R, p) => Math.round(((+p.gold_g) * (p.karat ? rateFor(R, p.karat) : 0) * (1 + R.makingGold) + (+p.silver_g) * R.silver * (1 + R.makingSilver)) * (1 + R.gst));
module.exports = { rateFor, price };
