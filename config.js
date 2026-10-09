
/* ===== STORE SETTINGS: edit, then republish ===== */
var CFG={phone:"916300556301",rateDate:"07 Oct 2026",gold24:14359,gold22:13675,gold20:12538,gold18:11401,silver:255,ratesUrl:"https://raw.githubusercontent.com/Nikhil-creat/aanu-jewellers/main/rates.json",makingGold:0.10,makingSilver:0.15,gst:0.03,groqModel:"llama-3.3-70b-versatile"};
/* Rates for 18/20/24K derive from 22K. Making %, silver rate are placeholders: set real values. */

CFG.imgBase="assets/img/"; /* point to a CDN URL (ending with /) if images are hosted elsewhere */
CFG.api=""; /* "" = same server. If the site is on another host than the API, put the API origin here, e.g. "https://aanu-api.onrender.com" */
CFG.store={hours:"",delivery:"",returns:"",exchange:"",payments:"",gstin:""}; /* fill in what applies to your shop; the assistant answers from these. Empty = it tells customers to confirm on WhatsApp */
CFG.place={name:"AANU Jewellers",street:"",landmark:"",plus:"HMJ6+WJQ",town:"Thorrur",district:"Mahabubabad",state:"Telangana",pin:"506163",lat:17.582343,lng:79.661595};
/* street = shop/door number and road (add it here); landmark e.g. "Near ..."; coordinates are the exact Google Maps pin */
