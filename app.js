var ON=0,DEMO=0;

/* name, shape, tags, karat(0=none), gold g, silver g, sizes */
var D=[
["Little Prince Bangle","bangle","kids,family",22,8.5,0,"Bangle 2.2,Bangle 2.4","Traditional"],
["Princess Floral Studs","earrings","kids,festival",22,3.2,0,"Free","Casual"],
["Baby Silver Anklets","anklet","kids,daily",0,0,25,"Free","Casual"],
["Lucky Charm Pendant","pendant","kids,daily",22,2.5,0,"16 in","Minimal"],
["Naming Ceremony Set","bangle","kids,family,events",22,1.5,30,"Bangle 2.2","Traditional"],
["Daily Gold Chain","chain","men,daily",22,12,0,"18 in,20 in,22 in","Minimal"],
["Lion Motif Kada","bangle","men,festival",22,40,0,"Bangle 2.6,Bangle 2.8","Antique"],
["Signet Ring","ring","men,events",22,9,0,"Ring 8,Ring 9,Ring 10","Modern"],
["Silver Link Chain","chain","men,daily",0,0,30,"20 in,22 in","Modern"],
["Groom's Heavy Chain","chain","men,marriage",22,32,0,"22 in,24 in","Bridal"],
["Gold-Silver Kada","bangle","men,events",20,15,25,"Bangle 2.6,Bangle 2.8","Modern"],
["Lakshmi Kasu Haram","necklace","ladies,marriage,festival",22,65,0,"Free","Temple"],
["Bridal Temple Set","set","ladies,marriage",22,120,0,"Free","Temple"],
["Mangalsutra Chain","chain","ladies,marriage",22,22,0,"20 in,22 in","Traditional"],
["Bridal Bangles Pair","bangle","ladies,marriage,festival",22,48,0,"Bangle 2.2,Bangle 2.4,Bangle 2.6","Bridal"],
["Temple Jhumkas","earrings","ladies,festival,events",22,18.5,0,"Free","Temple"],
["Solitaire-style Ring","ring","ladies,events,marriage",18,4.5,0,"Ring 6,Ring 7,Ring 8","Modern"],
["Rose Gold Pendant","pendant","ladies,daily",18,3.8,0,"16 in,18 in","Minimal"],
["Light Daily Studs","earrings","ladies,daily",20,2.2,0,"Free","Casual"],
["Silver Payal Anklets","anklet","ladies,daily,festival",0,0,45,"Free","Traditional"],
["Gold-Silver Fusion Necklace","necklace","ladies,events",18,8,20,"Free","Modern"],
["24K Lakshmi Coin Pendant","pendant","family,festival,marriage",24,10,0,"Free","Temple"],
["Couple Rings Pair","ring","family,events,marriage",18,8,0,"Ring 6,Ring 7,Ring 9","Minimal"],
["Silver Pooja Set","set","family,festival",0,0,250,"Free","Traditional"],
["Antique Nakshi Haram","necklace","ladies,marriage,festival",22,48,0,"Free","Antique"],
["Kundan Bridal Choker","necklace","ladies,marriage",22,36,0,"Free","Kundan"],
["Kundan Drop Earrings","earrings","ladies,marriage,events",22,12,0,"Free","Kundan"],
["Antique Peacock Jhumkas","earrings","ladies,festival",22,16,0,"Free","Antique"],
["Stackable Minimal Rings","ring","ladies,daily",18,2.8,0,"Ring 6,Ring 7,Ring 8","Minimal"],
["Everyday Gold Bangles Set","bangle","ladies,daily",20,24,0,"Bangle 2.2,Bangle 2.4,Bangle 2.6","Casual"],
["Boy's Gold Bracelet","bangle","kids,events",22,6,0,"Bangle 2.2,Bangle 2.4","Modern"],
["Kids Silver Chain","chain","kids,daily",0,0,12,"16 in,18 in","Casual"],
["Men's Antique Ring","ring","men,festival",22,11,0,"Ring 8,Ring 9,Ring 10,Ring 11","Antique"],
["Men's Silver Kada","bangle","men,daily",0,0,60,"Bangle 2.6,Bangle 2.8","Modern"],
["Gold Rope Chain","chain","men,events",22,18,0,"20 in,22 in,24 in","Traditional"],
["Heavy Silver Bridal Anklets","anklet","ladies,marriage",0,0,90,"Free","Bridal"],
["Temple Lakshmi Pendant","pendant","ladies,festival",22,6,0,"16 in,18 in","Temple"],
["Silver Gifting Coin Set","set","family,festival",0,0,100,"Free","Traditional"]];
function main(){
var P=D.map(function(r,i){return{id:r[10]||i+1,im:r[8]||"",m:r[9]||"",x:r[11]||{},n:r[0],y:r[1],t:r[2].split(","),k:r[3],g:r[4],s:r[5],z:r[6].split(","),d:r[7],w:Math.round((r[4]+r[5])*10)/10}});
var STY=[];P.forEach(function(p){if(STY.indexOf(p.d)<0)STY.push(p.d)});STY.sort();
var TAB=[["all","All"],["saved","\u2665 Saved"],["kids","Kids"],["ladies","Ladies"],["men","Men"],["family","Family"],["marriage","Marriage"],["festival","Festivals"],["events","Functions & Events"],["daily","Daily Wear"]];
function hs(s){var h=7;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function qc(x0,y0,x1,y1,Y,t){var u=1-t;return[u*u*x0+2*u*t*50+t*t*x1,u*u*y0+2*u*t*Y+t*t*y1]}
function beads(x0,y0,x1,y1,Y,n,r,c){var o="";for(var i=0;i<n;i++){var p=qc(x0,y0,x1,y1,Y,(i+1)/(n+1));o+='<circle class="'+c+'" cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+r+'"/>'}return o}
var SH={
ring:function(h){var g=h>>2&3;return'<circle cx="50" cy="62" r="22" stroke-width="'+(3+h%3)+'"/>'+(g===0?'<path class="a" d="M42 38l8-14 8 14-8 8z"/>':g===1?'<circle class="a" cx="50" cy="34" r="9"/>':g===2?'<path class="a" d="M50 22l7 10-7 10-7-10z"/><circle class="a" cx="36" cy="40" r="4"/><circle class="a" cx="64" cy="40" r="4"/>':'<rect class="a" x="40" y="26" width="20" height="14" rx="3"/>')},
bangle:function(h){var n=3+h%5,o='<ellipse cx="50" cy="55" rx="36" ry="30"/><ellipse cx="50" cy="55" rx="27" ry="21"/>';for(var i=0;i<n;i++){var a=i*6.283/n;o+='<circle class="a" cx="'+(50+31.5*Math.cos(a)).toFixed(1)+'" cy="'+(55+25.5*Math.sin(a)).toFixed(1)+'" r="3.4"/>'}return o},
chain:function(h){var d=h%3,Y=88+h%14;return'<path d="M10 22Q50 '+Y+' 90 22" stroke-dasharray="'+(d===1?"7 5":"0.1 "+(d?11:8))+'" stroke-width="'+(d===1?4:7)+'"/>'+(h>>4&1?beads(10,22,90,22,Y,3,3.5,"a"):"")},
necklace:function(h){var Y=70+h%22;return'<path d="M14 22Q50 '+Y+' 86 22"/>'+beads(14,22,86,22,Y,3+h%5,4,"a")+'<circle class="a" cx="50" cy="'+(19+Y/2).toFixed(1)+'" r="'+(7+h%3)+'"/>'},
earrings:function(h){var k=h%3;return k===2?'<circle cx="30" cy="40" r="9"/><circle cx="70" cy="40" r="9"/><circle class="a" cx="30" cy="40" r="4"/><circle class="a" cx="70" cy="40" r="4"/><path d="M30 49v18M70 49v18"/><circle class="a" cx="30" cy="72" r="5"/><circle class="a" cx="70" cy="72" r="5"/>':k===1?'<path d="M18 30Q30 80 42 30"/><path d="M58 30Q70 80 82 30"/><circle class="a" cx="30" cy="68" r="5"/><circle class="a" cx="70" cy="68" r="5"/><path d="M30 14v10M70 14v10"/>':'<path d="M30 14v14M70 14v14"/><path d="M20 82Q20 48 30 32Q40 48 40 82Z"/><path class="a" d="M60 82Q60 48 70 32Q80 48 80 82Z"/>'},
anklet:function(h){var n=2+h%3,o='<path d="M8 52q10-22 21 0t21 0 21 0 21 0"/>';for(var i=0;i<n;i++)o+='<circle class="a" cx="'+(22+i*56/(n-1)).toFixed(1)+'" cy="62" r="'+(3+h%2)+'"/>';return o},
pendant:function(h){var k=h%3,Y=48+h%12,cy=(9+Y/2).toFixed(0),o='<path d="M16 14Q50 '+Y+' 84 14"/>';return o+(k===0?'<path class="a" d="M50 '+cy+'c-13 14-13 30 0 36 13-6 13-22 0-36z"/>':k===1?'<circle class="a" cx="50" cy="'+(+cy+20)+'" r="14"/><circle cx="50" cy="'+(+cy+20)+'" r="6"/>':'<path class="a" d="M50 '+(+cy+34)+'c-24-16-18-34-8-34 5 0 8 3 8 6 0-3 3-6 8-6 10 0 16 18-8 34z"/>')},
set:function(h){var Y=78+h%14;return'<path d="M10 14Q50 '+Y+' 90 14"/>'+beads(10,14,90,14,Y,3+h%4,4,"a")+'<circle class="a" cx="50" cy="'+(16+Y/2).toFixed(1)+'" r="9"/><circle cx="22" cy="86" r="5"/><circle cx="78" cy="86" r="5"/>'}};
var SC2={Ruby:"#e0115f",Emerald:"#10b981",Pearl:"#e7e5e4",CZ:"#7dd3fc","Diamond-look":"#bae6fd",Kundan:"#fcd34d"};
function enq(p){wa("Hello AANU Jewellers, I am interested in "+p.n+(p.x.code?" (design "+p.x.code+")":"")+". Please share the weight, purity and price.")}
function addr(){var q=CFG.place||{};return[q.street,q.landmark,q.plus?"Plus Code "+q.plus:"",q.town,(q.district?q.district+" district":""),q.state+" "+q.pin].filter(Boolean).join(", ")}
function mapUrl(){var q=CFG.place;return"https://www.google.com/maps/search/?api=1&query="+q.lat+","+q.lng}
function dirUrl(){var q=CFG.place;return"https://www.google.com/maps/dir/?api=1&destination="+q.lat+","+q.lng}
function lk(el,t){el.textContent="";String(t).split(/(https?:\/\/[^\s]+)/).forEach(function(x,i){if(i%2){var a=document.createElement("a");a.href=x;a.textContent=x.indexOf("/dir/")>0?"Get directions":x.indexOf("google.com/maps")>0?"Open map":x;a.target="_blank";a.rel="noopener";a.style.color="var(--gd)";el.appendChild(a)}else el.appendChild(document.createTextNode(x))})}
function stc(p){return p.x&&SC2[p.x.stone]?"--ac:"+SC2[p.x.stone]+";":""}
function xr(p){var x=p.x||{},o="";[["Design code",x.code],["Motif",x.motif],["Stone",x.stone],["Finish",x.finish]].forEach(function(r){if(r[1]&&r[1]!=="None")o+='<div class="bd"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'});return o}
var WL=[],CP=[];try{WL=JSON.parse(localStorage.getItem("aanu_wl")||"[]")}catch(e){}
function toggleWL(id){var i=WL.indexOf(id);if(i<0)WL.push(id);else WL.splice(i,1);ls("s","aanu_wl",JSON.stringify(WL))}
function toggleCP(id){var i=CP.indexOf(id);if(i>=0)CP.splice(i,1);else if(CP.length<3)CP.push(id);else toast("Compare up to 3 designs");cmpUI()}
function cmpUI(){var b=$("cmpb");b.style.display=CP.length?"inline-flex":"none";b.textContent="Compare ("+CP.length+")"}
function calcVal(v,g){var s=v==="s",r=s?CFG.silver:gr(+v),b=g*r,mk=b*(s?CFG.makingSilver:CFG.makingGold),gs=(b+mk)*CFG.gst;return g+" g of "+(s?"92.5 silver":v+"K gold")+" at "+inr(r)+"/g: metal "+inr(b)+" + making "+inr(mk)+" + GST "+inr(gs)+" = about "+inr(b+mk+gs)+" (estimate; the final bill is confirmed by the store)."}
function findP(n){n=String(n||"").toLowerCase();return P.filter(function(p){return p.n.toLowerCase().indexOf(n)>=0}).slice(0,1)}
function planB(b,oc){var sh=[["necklace",.4],["earrings",.15],["bangle",.25],["chain",.1],["ring",.1]],out=[],left=b;sh.forEach(function(x){var cap=Math.min(left,b*x[1]),c=P.filter(function(p){return p.w>0&&p.y===x[0]&&(!oc||p.t.indexOf(oc)>=0)&&price(p)<=cap}).sort(function(p,q){return price(q)-price(p)})[0];if(c){out.push(c.n+" ("+mtl(c)+", "+c.w+" g, "+inr(price(c))+")");left-=price(c)}});return out.length?"Suggested within "+inr(b)+": "+out.join("; ")+". Remaining about "+inr(left)+".":"Nothing fits that budget for that occasion; try a higher budget or silver pieces."}
function simSearch(){var f=this.files[0];if(!f)return;var fd=new FormData();fd.append("file",f);toast("Finding similar designs...");fetch((CFG.api||"")+"/api/similar",{method:"POST",body:fd}).then(function(r){return r.json()}).then(function(j){if(!j.results||!j.results.length)return toast(j.error||"No similar designs. Add photos and enable the ML service.");F.sim=j.results.map(function(x){return x.img});grid()}).catch(function(){toast("Visual search unavailable")})}
var $=function(i){return document.getElementById(i)};
var F={tag:"all",metal:"",kt:"",wt:"",sz:"",pr:"",ty:"",so:""};
var cart=[];
var BASE=(function(){var o=null;try{o=JSON.parse(localStorage.getItem("aanu_pv2"))}catch(e){}return o||{g:CFG.gold22,s:CFG.silver}})();
function gr(k){return CFG["gold"+k]||Math.round(CFG.gold22*k/22)}
function price(p){var g=p.g*(p.k?gr(p.k):0),s=p.s*CFG.silver;return Math.round((g*(1+CFG.makingGold)+s*(1+CFG.makingSilver))*(1+CFG.gst))}
function inr(n){return "\u20B9 "+Math.round(n).toLocaleString("en-IN")}
function mtl(p){return p.k&&p.s?p.k+"K Gold + Silver":p.k?p.k+"K Gold":"92.5 Silver"}
function cls(p){return p.k&&p.s?"m":p.k?"":"s"}
function toast(t){var e=$("ts");e.textContent=t;e.className="on";setTimeout(function(){e.className=""},2600)}
function ls(a,k,v){try{if(a==="s")localStorage.setItem(k,v);else return localStorage.getItem(k)}catch(e){}return null}
function rangeOK(w,v){var r={a:[0,5],b:[5,10],c:[10,25],d:[25,50],e:[50,1e5]}[v];return w>=r[0]&&w<r[1]}
function prOK(x,v){var r={a:[0,25000],b:[25000,100000],c:[100000,1e9]}[v];return x>=r[0]&&x<r[1]}
function match(p){
 if(F.tag==="saved"?WL.indexOf(p.id)<0:F.tag!=="all"&&p.t.indexOf(F.tag)<0)return false;
 if(F.q&&(p.n+" "+p.d+" "+p.y+" "+(p.x.stone||"")+" "+(p.x.finish||"")+" "+(p.x.motif||"")).toLowerCase().indexOf(F.q)<0)return false;
 if(F.sim&&F.sim.indexOf(p.im)<0)return false;
 if(F.st&&p.d!==F.st)return false;
 if(F.ty&&p.y!==F.ty)return false;
 if(F.metal==="gold"&&!(p.k&&!p.s))return false;
 if(F.metal==="silver"&&p.k)return false;
 if(F.metal==="combo"&&!(p.k&&p.s))return false;
 if(F.kt&&p.k!==+F.kt)return false;
 if(F.wt&&(p.w<=0||!rangeOK(p.w,F.wt)))return false;
 if(F.maxw&&(p.w<=0||p.w>F.maxw))return false;
 if(F.sz&&p.z.indexOf(F.sz)<0)return false;
 if(F.pr&&(p.w<=0||!prOK(price(p),F.pr)))return false;
 if(F.maxp&&(p.w<=0||price(p)>F.maxp))return false;
 return true}
function list(){var a=P.filter(match);if(F.sim)a.sort(function(x,y){return F.sim.indexOf(x.im)-F.sim.indexOf(y.im)});if(F.so==="pl")a.sort(function(x,y){return(price(x)||1e12)-(price(y)||1e12)});if(F.so==="ph")a.sort(function(x,y){return price(y)-price(x)});if(F.so==="wl")a.sort(function(x,y){return(x.w||1e9)-(y.w||1e9)});if(F.so==="wh")a.sort(function(x,y){return y.w-x.w});return a}
function opts(a){return a.map(function(o){return'<option value="'+o[0]+'">'+o[1]+'</option>'}).join("")}
function sel(id,lab,a){return'<div><label for="'+id+'">'+lab+'</label><select id="'+id+'">'+opts([["","Any"]].concat(a))+'</select></div>'}
function filters(){
 var szs=[],tys=[];P.forEach(function(p){p.z.forEach(function(z){if(szs.indexOf(z)<0&&z!=="Free")szs.push(z)});if(tys.indexOf(p.y)<0)tys.push(p.y)});
 $("fl").innerHTML=sel("fy","Type",tys.map(function(t){return[t,t[0].toUpperCase()+t.slice(1)]}))+sel("fm","Metal",[["gold","Gold"],["silver","Silver"],["combo","Gold + Silver"]])+sel("fk","Gold karat",[["18","18K"],["20","20K"],["22","22K"],["24","24K"]])+sel("fw","Weight",[["a","Under 5 g"],["b","5 - 10 g"],["c","10 - 25 g"],["d","25 - 50 g"],["e","50 g +"]])+sel("fz","Size",szs.sort().map(function(z){return[z,z]}))+sel("fp","Price",[["a","Under \u20B925,000"],["b","\u20B925k - \u20B91 lakh"],["c","Above \u20B91 lakh"]])+sel("fd","Design style",STY.map(function(t){return[t,t]}))+sel("fs","Sort",[["pl","Price: low to high"],["ph","Price: high to low"],["wl","Weight: low to high"],["wh","Weight: high to low"]])+'<div><label for="fq">Search designs</label><input id="fq" placeholder="Name, stone, style"></div><div><label for="fv">Search by photo</label><input id="fv" type="file" accept="image/*"></div>'+'<div style="display:flex;align-items:end"><button class="btn o" id="fr" style="width:100%;justify-content:center">Reset</button></div>';
 var map={fy:"ty",fm:"metal",fk:"kt",fw:"wt",fz:"sz",fp:"pr",fd:"st",fs:"so"};
 Object.keys(map).forEach(function(id){$(id).onchange=function(){F[map[id]]=this.value;if(map[id]==="wt")F.maxw=0;if(map[id]==="pr")F.maxp=0;grid()}});
 $("fq").oninput=function(){F.q=this.value.toLowerCase();grid()};$("fv").onchange=simSearch;
 $("fr").onclick=function(){F={tag:"all",metal:"",kt:"",wt:"",sz:"",pr:"",ty:"",so:""};sync();grid()}}
function sync(){var m={fy:"ty",fm:"metal",fk:"kt",fw:"wt",fz:"sz",fp:"pr",fd:"st",fs:"so"};Object.keys(m).forEach(function(id){$(id).value=F[m[id]]||""});$("fq").value=F.q||"";tabs();orn()}
function tabs(){$("tabs").innerHTML="";TAB.forEach(function(c){var b=document.createElement("button");b.className="tab"+(F.tag===c[0]?" on":"");b.textContent=c[1];b.onclick=function(){F.tag=c[0];tabs();grid()};$("tabs").appendChild(b)})}
function im(p,z){return p.im?'<img loading="lazy" decoding="async" src="'+CFG.imgBase+z+"/"+p.im+'" alt="'+p.n+'" onerror="this.remove()">':""}
function art(p){var h=hs(p.n);return'<svg viewBox="0 0 100 100" aria-hidden="true" style="stroke-width:'+(3+(h>>7)%3)+'"><g transform="rotate('+((h>>9)%7-3)*2+' 50 50)">'+SH[p.y](h)+'</g></svg>'}
var LIM=36;function grid(){LIM=36;paint()}
function paint(){
 var all=list(),a=all.slice(0,LIM),g=$("grid");g.innerHTML="";$("rc").textContent=all.length+" design"+(all.length===1?"":"s")+" found"+(DEMO?" (real photo designs first, then sample illustrations)":"");
 if(!all.length)g.innerHTML='<p class="mut">Nothing matches these filters. Try Reset, or ask the AI assistant.</p>';
 a.forEach(function(p){var d=document.createElement("div");d.className="card";
  d.innerHTML='<div class="pi '+cls(p)+'" style="'+stc(p)+'"><button class="hb" aria-label="Save">'+(WL.indexOf(p.id)>=0?"\u2665":"\u2661")+'</button><button class="cb" aria-label="Compare">\u21C4</button>'+art(p)+''+im(p,"t")+'<span class="k">'+mtl(p)+'</span>'+(p.x.demo?'<span class="k" style="top:auto;bottom:8px">Sample</span>':"")+'</div><div class="pb"><h3>'+p.n+'</h3><small>'+(p.w>0?p.w+' g':'weight on request')+' &middot; '+p.d+' '+p.y+' &middot; '+p.z.join(" / ")+'</small><div class="pr"><div><small>Estimated &middot; tap for details</small><br><b>'+(p.w>0?inr(price(p)):"On request")+'</b></div><button class="btn gb">'+(p.w>0?"Add":"Enquire")+'</button></div></div>';
  d.querySelector(".pr button").onclick=function(e){e.stopPropagation();p.w>0?add(p.id):enq(p)};var hb=d.querySelector(".hb"),cb=d.querySelector(".cb");hb.onclick=function(e){e.stopPropagation();toggleWL(p.id);hb.textContent=WL.indexOf(p.id)>=0?"\u2665":"\u2661"};if(CP.indexOf(p.id)>=0)cb.className="cb on";cb.onclick=function(e){e.stopPropagation();toggleCP(p.id);cb.className="cb"+(CP.indexOf(p.id)>=0?" on":"")};d.style.cursor="pointer";d.onclick=function(){detail(p.id)};g.appendChild(d)});if(all.length>LIM){var mb=document.createElement("button");mb.className="btn o";mb.style.cssText="grid-column:1/-1;justify-content:center";mb.textContent="Show more ("+(all.length-LIM)+" left)";mb.onclick=function(){LIM+=36;paint()};g.appendChild(mb);if(window.IntersectionObserver)new IntersectionObserver(function(e,o){if(e[0].isIntersecting){o.disconnect();LIM+=36;paint()}},{rootMargin:"500px"}).observe(mb)}}
function pOf(id){return P.filter(function(x){return x.id===id})[0]}
function save(){ls("s","aanu_cart3",JSON.stringify(cart))}
function add(id,z){var p=pOf(id);z=z||p.z[0];var e=cart.filter(function(x){return x.id===id&&x.z===z})[0];if(e)e.q++;else cart.push({id:id,q:1,z:z});save();badge();toast("Added "+p.n)}
function badge(){$("cnt").textContent=cart.reduce(function(a,x){return a+x.q},0)}
function ist(){return new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true})}
function draw(){var c=$("ci"),tot=0;c.innerHTML=cart.length?"":'<p class="mut" style="text-align:center;padding:30px 0">Your bag is empty.</p>';
 cart.forEach(function(x,i){var p=pOf(x.id),l=price(p)*x.q;tot+=l;var d=document.createElement("div");d.className="it";
  d.innerHTML='<div><b>'+p.n+'</b><br><small class="mut">'+mtl(p)+' &middot; '+p.w+' g'+(x.z!=="Free"?' &middot; '+x.z:'')+'</small></div><div style="text-align:right"><b>'+inr(l)+'</b><div class="q"><button data-a="-">&minus;</button> '+x.q+' <button data-a="+">+</button></div></div>';
  d.querySelectorAll("button").forEach(function(b){b.onclick=function(){x.q+=b.dataset.a==="+"?1:-1;if(x.q<1)cart.splice(i,1);save();badge();draw()}});c.appendChild(d)});
 $("cu").style.display=ON?"grid":"none";$("tt").textContent=inr(tot);$("lk").textContent="Prices follow the live store rate until you tap Confirm. At that exact time the rates are locked and billed."}
function wa(m){window.open("https://wa.me/"+CFG.phone+"?text="+encodeURIComponent(m),"_blank")}
$("bagBtn").onclick=function(){draw();$("dr").className="open"};$("xb").onclick=function(){$("dr").className=""};$("dr").onclick=function(e){if(e.target===$("dr"))$("dr").className=""};
function legacy(){
 var n=new Date(),t=ist(),ref="AANU-"+n.toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.random().toString(36).slice(2,6).toUpperCase(),tot=0;
 var m="Hello AANU Jewellers,\nORDER "+ref+"\nPlaced: "+t+" (IST)\n\n";
 cart.forEach(function(x,i){var p=pOf(x.id),l=price(p)*x.q;tot+=l;m+=(i+1)+". "+p.n+" ("+mtl(p)+", "+p.w+" g"+(x.z!=="Free"?", "+x.z:"")+") x"+x.q+" = "+inr(l)+"\n"});
 m+="\nRATES LOCKED AT "+t+":\n24K "+inr(gr(24))+"/g, 22K "+inr(CFG.gold22)+"/g, 20K "+inr(gr(20))+"/g, 18K "+inr(gr(18))+"/g, Silver "+inr(CFG.silver)+"/g\nEstimated total: "+inr(tot)+"\nPlease bill at the rates above and confirm availability.";
 wa(m);toast("Rates locked at "+t.split(", ").pop())}
$("co").onclick=function(){if(!cart.length)return toast("Your bag is empty");if(!ON)return legacy();
 var nm=$("on").value.trim(),ph=$("op").value.replace(/\D/g,"");if(!nm||ph.length<10)return toast("Enter your name and 10-digit phone");
 fetch((CFG.api||"")+"/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:nm,phone:ph,items:cart.map(function(x){return{id:x.id,qty:x.q,size:x.z}})})}).then(function(r){return r.json()}).then(function(o){
  if(!o.ref)return toast(o.error||"Order failed, please try again");
  var m="Hello AANU Jewellers,\nORDER "+o.ref+"\nPlaced: "+o.placedAt+" (IST)\nName: "+nm+"\nPhone: "+ph+"\n\n";
  o.lines.forEach(function(l,i){m+=(i+1)+". "+l.name+(l.size&&l.size!=="Free"?" ("+l.size+")":"")+" x"+l.qty+" = "+inr(l.unit*l.qty)+"\n"});
  var Q=o.rates;m+="\nRATES LOCKED AT "+o.placedAt+":\n24K "+inr(Q.gold24)+"/g, 22K "+inr(Q.gold22)+"/g, 20K "+inr(Q.gold20)+"/g, 18K "+inr(Q.gold18)+"/g, Silver "+inr(Q.silver)+"/g\nTotal: "+inr(o.total)+" (incl. making + GST)\nPlease confirm availability and final bill.";
  wa(m);cart=[];save();badge();draw();$("dr").className="";toast("Order "+o.ref+" saved")}).catch(function(){toast("Network error, please try again")})};
var TI={ring:"Measure finger circumference at the end of the day when fingers are largest. Ask the store about resizing.",bangle:"Bangle size is the inner diameter in inches: 2.2 small, 2.4 medium, 2.6 large, 2.8 extra large. Measure across your closed knuckles.",chain:"Length guide: 16 in sits at the collarbone, 18 in is standard for women, 20 to 24 in suits men.",necklace:"Sits on the chest; pairs well with matching earrings.",earrings:"Check the fastening type with the store before ordering if you have sensitive ears.",anklet:"Usually worn as a pair; measure ankle circumference and add about 1 cm for comfort.",pendant:"Sold without a chain unless stated; pair with any chain from our collection.",set:"A complete matching set; the weight shown is the total."};
var SI={Temple:"Inspired by South Indian temple art with deity, lotus and peacock motifs. A classic for weddings and festivals.",Antique:"A matte, aged finish with an heirloom feel that hides daily wear well.",Kundan:"A rich, stone-studded look made for brides and grand functions.",Modern:"Clean geometry that suits contemporary outfits.",Minimal:"Light and understated, easy to wear every day.",Bridal:"A heavy statement design for weddings and engagements.",Traditional:"Time-honoured patterns that carry across generations.",Casual:"Lightweight and comfortable for everyday use."};
var KI={24:"99.9% pure gold. Very soft, best for coins and gifting rather than daily wear.",22:"91.6% gold. The traditional standard for jewellery, balancing purity and strength.",20:"83.3% gold. Stronger, suits intricate and stone-set designs.",18:"75% gold. Most durable, ideal for daily wear and modern designs."};
function detail(id,zs){var p=pOf(id),gv=p.g*(p.k?gr(p.k):0),sv=p.s*CFG.silver,mk=gv*CFG.makingGold+sv*CFG.makingSilver,sub=gv+sv+mk,gs=sub*CFG.gst;
 var kinfo=(p.k?KI[p.k]:"")+(p.k&&p.s?" ":"")+(p.s?"Silver part is 92.5% sterling silver.":"");
 var rows=(p.g?'<div class="bd"><span>Gold '+p.g+' g @ '+inr(gr(p.k))+'</span><b>'+inr(gv)+'</b></div>':"")+(p.s?'<div class="bd"><span>Silver '+p.s+' g @ '+inr(CFG.silver)+'</span><b>'+inr(sv)+'</b></div>':"")+'<div class="bd"><span>Making charges</span><b>'+inr(mk)+'</b></div><div class="bd"><span>GST ('+CFG.gst*100+'%)</span><b>'+inr(gs)+'</b></div><div class="bd"><span><b>Estimated total</b></span><b>'+inr(price(p))+'</b></div>';
 $("pc").innerHTML='<div class="pi '+cls(p)+'" style="height:170px;'+stc(p)+'">'+art(p)+''+im(p,"m")+'<span class="k">'+mtl(p)+'</span></div><div style="padding:18px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:start"><h2 style="margin:0;font-size:24px">'+p.n+'</h2><button class="ic" id="pmx" aria-label="Close">&times;</button></div>'
 +'<p style="margin:8px 0">'+p.t.map(function(t){return'<span class="chip">'+t+'</span>'}).join("")+'<span class="chip">'+p.d+' style</span><span class="chip">'+p.y+'</span></p>'
 +'<p class="mut" style="font-size:14px">'+SI[p.d]+' '+TI[p.y]+'</p><p class="mut" style="font-size:14px"><b>Purity:</b> '+kinfo+' Hallmark details are available in store.</p>'
 +'<div class="bd"><span>Total weight</span><b>'+(p.w>0?p.w+' g':'To be confirmed')+'</b></div>'+(p.w>0?rows:'<div class="bd"><span>Price</span><b>On request (ask for weight and price)</b></div>')+xr(p)
 +'<div style="margin:14px 0"><label for="pz">Size</label><select id="pz">'+p.z.map(function(z){return'<option>'+z+'</option>'}).join("")+'</select></div>'
 +'<p style="display:flex;gap:10px;flex-wrap:wrap;margin:0"><button class="btn gb" id="pa">'+(p.w>0?"Add to bag":"Enquire on WhatsApp")+'</button><button class="btn o" id="pq">Ask AI about this</button><button class="btn o" id="p3">View in 3D</button>'+(p.im?'<a class="btn o" target="_blank" rel="noopener" href="'+CFG.imgBase+'l/'+p.im+'">Full resolution</a>':"")+'</p><p class="mut" style="font-size:11px">Estimate at the live store rate. The final bill uses the rate at the time you place the order.</p></div>';
 if(p.x.imgs&&p.x.imgs.length>1){var gl=document.createElement("div");gl.style.cssText="display:flex;gap:8px;padding:8px 18px 0;overflow-x:auto";p.x.imgs.forEach(function(n){var t=document.createElement("img");t.src=CFG.imgBase+"t/"+n;t.alt=p.n;t.style.cssText="height:56px;border-radius:8px;cursor:pointer;border:1px solid var(--line)";t.onclick=function(){var mi=document.querySelector("#pc .pi img");if(mi)mi.src=CFG.imgBase+"m/"+n};gl.appendChild(t)});document.querySelector("#pc .pi").after(gl)}
 if(zs)$("pz").value=zs;$("pm").className="open";
 $("pmx").onclick=function(){$("pm").className=""};$("pa").onclick=function(){if(p.w>0){add(p.id,$("pz").value);$("pm").className=""}else enq(p)};$("pq").onclick=function(){$("pm").className="";chat(true);send("Tell me about "+p.n+" and who it suits")};$("p3").onclick=function(){view3d(p)}}
$("pm").onclick=function(e){if(e.target===$("pm"))$("pm").className=""};

function js(u,cb){var s=document.createElement("script");s.src=u;s.onload=cb;s.onerror=function(){toast("3D needs an internet connection")};document.head.appendChild(s)}
function load3d(cb){window.THREE?cb():js("https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",cb)}
function view3d(p){load3d(function(){
 var w=Math.min(560,innerWidth-36);
 $("pc").innerHTML='<div style="padding:16px"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0;font-size:22px">'+p.n+' &middot; 3D</h2><button class="ic" id="tx" aria-label="Close">&times;</button></div><div id="tvw" style="touch-action:none;margin:10px auto;width:'+w+'px;height:'+Math.round(w*.8)+'px;border-radius:16px;overflow:hidden;background:#15110c"></div><p id="tb" style="display:flex;gap:8px;flex-wrap:wrap;margin:0"></p><p class="mut" style="font-size:11px">Drag to rotate, wheel or +/- to zoom. Shown as a parametric model of the design type; add a real scan as models/&lt;file&gt;.glb to show the exact piece.</p></div>';
 var el=$("tvw"),W=el.clientWidth,H=el.clientHeight,R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(W,H);R.toneMapping=THREE.ACESFilmicToneMapping;R.outputEncoding=THREE.sRGBEncoding;el.appendChild(R.domElement);
 var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,W/H,.1,50),es=new THREE.Scene();cam.position.set(0,.3,6);es.background=new THREE.Color(0x2a251f);
 [[0,5,3,6],[-5,1,2,3],[5,1,-2,3],[0,-4,4,2]].forEach(function(l){var m=new THREE.Mesh(new THREE.BoxGeometry(l[3],.4,l[3]),new THREE.MeshBasicMaterial({color:new THREE.Color(7,7,7)}));m.position.set(l[0],l[1],l[2]);es.add(m)});
 sc.environment=new THREE.PMREMGenerator(R).fromScene(es,.03).texture;
 var DS=THREE.DoubleSide,gm=new THREE.MeshStandardMaterial({color:p.k?0xe3b84f:0xd9dde2,metalness:1,roughness:.2,side:DS}),sm=new THREE.MeshStandardMaterial({color:0xd9dde2,metalness:1,roughness:.16,side:DS}),gem=new THREE.MeshStandardMaterial({color:0x9fe8ff,metalness:.1,roughness:.04,flatShading:true}),mn=p.k?gm:sm,ac=p.k&&p.s?sm:gm,G=new THREE.Group();
 function M(g,m,x,y,z,P){var o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);(P||G).add(o);return o}
 function arc(r,a,y0,n,m){for(var i=0;i<n;i++){var t=-a+2*a*i/(n-1),o=M(new THREE.TorusGeometry(.13,.04,10,20),m,r*Math.sin(t),y0-r*Math.cos(t),0);o.rotation.z=t;o.rotation.y=i%2?Math.PI/2:0}}
 function drop(x,y,s){var g=new THREE.Group(),pt=[];for(var i=0;i<=16;i++){var t=i/16;pt.push(new THREE.Vector2(.1+.6*Math.pow(t,.8),.75-1.5*t))}M(new THREE.LatheGeometry(pt,40),mn,0,0,0,g);M(new THREE.SphereGeometry(.1,16,16),ac,0,.85,0,g);M(new THREE.SphereGeometry(.08,16,16),ac,0,-.85,0,g);g.position.set(x,y,0);g.scale.setScalar(s);G.add(g)}
 var y=p.y;
 if(p.m){js("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js",function(){new THREE.GLTFLoader().load("models/"+p.m,function(g){var o=g.scene,b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3()),h=new THREE.Group();o.position.sub(c);h.add(o);h.scale.setScalar(3/Math.max(sz.x,sz.y,sz.z));G.add(h)})})}
 else if(y==="ring"){M(new THREE.TorusGeometry(1.1,.2,32,96),mn);var g1=M(new THREE.OctahedronGeometry(.4),gem,0,1.3,0);g1.scale.y=1.2}
 else if(y==="bangle"){M(new THREE.TorusGeometry(1.5,.2,32,120),mn);M(new THREE.TorusGeometry(1.5,.07,16,120),ac,0,0,.24);M(new THREE.TorusGeometry(1.5,.07,16,120),ac,0,0,-.24)}
 else if(y==="chain")arc(2.2,1.15,1.6,46,mn);
 else if(y==="necklace"||y==="set"){arc(2.3,1.1,1.5,40,mn);M(new THREE.OctahedronGeometry(.38),gem,0,-1.1,0);M(new THREE.TorusGeometry(.28,.05,12,40),ac,0,-.85,0);if(y==="set"){drop(-1.9,-1.4,.4);drop(1.9,-1.4,.4)}}
 else if(y==="pendant"){arc(1.6,.9,1.4,26,mn);var pt=[];for(var i=0;i<=20;i++){var t=i/20*Math.PI;pt.push(new THREE.Vector2(Math.sin(t)*(.5-.28*Math.cos(t)),.75*Math.cos(t)))}M(new THREE.LatheGeometry(pt,40),mn,0,-.5,0)}
 else if(y==="earrings"){drop(-1,0,1);drop(1,0,1)}
 else{for(var i=0;i<44;i++){var t=i/44*6.283,o=M(new THREE.TorusGeometry(.13,.04,10,20),mn,1.7*Math.cos(t),0,1.7*Math.sin(t));o.rotation.y=-t+(i%2?1.57:0);if(i%6===0)M(new THREE.SphereGeometry(.16,16,16),ac,1.7*Math.cos(t),-.2,1.7*Math.sin(t))}}
 sc.add(G);var rx=.45,ry=0,auto=1,z=6,dr=0,lx=0,ly=0,cv=R.domElement;
 cv.onpointerdown=function(e){dr=1;lx=e.clientX;ly=e.clientY;auto=0};cv.onpointermove=function(e){if(dr){ry+=(e.clientX-lx)*.01;rx+=(e.clientY-ly)*.01;lx=e.clientX;ly=e.clientY}};cv.onpointerup=cv.onpointerleave=function(){dr=0};cv.onwheel=function(e){e.preventDefault();z=Math.max(3,Math.min(10,z+e.deltaY*.005))};
 var FN={Gold:[0xe3b84f,0xd9dde2],"Rose gold":[0xe0a08a,0xd9dde2],Silver:[0xd9dde2,0xe3b84f]};
 [["Gold",function(){gm.color.setHex(0xe3b84f)}],["Rose gold",function(){gm.color.setHex(0xe0a08a)}],["Silver",function(){gm.color.setHex(0xd9dde2)}],["+",function(){z=Math.max(3,z-1)}],["\u2212",function(){z=Math.min(10,z+1)}],["Spin",function(){auto=!auto}],["Back",function(){detail(p.id)}]].forEach(function(b){var e=document.createElement("button");e.className="btn o";e.textContent=b[0];e.onclick=b[1];$("tb").appendChild(e)});
 $("tx").onclick=function(){$("pm").className=""};
 (function tick(){if(!document.body.contains(el)||$("pm").className!=="open"){R.dispose();return}if(auto)ry+=.008;G.rotation.set(rx,ry,0);cam.position.z+=(z-cam.position.z)*.1;R.render(sc,cam);requestAnimationFrame(tick)})()})}
var OL=[["ring","Rings"],["bangle","Bangles & Kadas"],["chain","Chains"],["necklace","Necklaces"],["earrings","Earrings"],["anklet","Anklets"],["pendant","Pendants"],["set","Sets"]];
function orn(){$("orn").innerHTML="";OL.forEach(function(o){var b=document.createElement("button");b.className=F.ty===o[0]?"on":"";b.innerHTML='<svg viewBox="0 0 100 100">'+SH[o[0]](5)+'</svg>'+o[1]+'<br><small>'+P.filter(function(p){return p.y===o[0]}).length+' designs</small>';b.onclick=function(){F.ty=F.ty===o[0]?"":o[0];sync();grid()};$("orn").appendChild(b)})}
$("cf").onsubmit=function(e){e.preventDefault();if(ON)fetch((CFG.api||"")+"/api/custom",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$("cn").value,metal:$("cm").value,whom:$("cg").value,details:$("cd").value})}).catch(function(){});wa("Hello AANU Jewellers,\n*CUSTOM ORDER (Customize Mawa)*\nName: "+$("cn").value+"\nMetal: "+$("cm").value+"\nFor: "+$("cg").value+"\nDetails: "+$("cd").value+"\n\nPlease share a quotation at today's rate.");toast("Opening WhatsApp...");this.reset()};

/* ===== AI assistant: local RAG + agent tools + optional Groq ===== */
var KB=[
["Store","AANU Jewellers is at "+addr()+". Phone and WhatsApp +91 63005 56301. We sell hallmarked gold, sterling silver and custom jewellery."],
["Pricing","Price = metal weight x today's rate + making charges + 3% GST. Gold making is "+(CFG.makingGold*100)+"% and silver making is "+(CFG.makingSilver*100)+"% on this site. Prices are estimates; the store confirms the final bill."],
["Rate lock","Your order is billed at the store rate at the exact time you tap Confirm on WhatsApp; that time and the rates are written into the order message (an order at 1:22 PM uses the 1:22 PM rate). If rates fall before delivery the store refunds the difference as per its price-protection policy; ask the store for written terms. If rates rise you pay the locked price."],
["Karats","24K is purest gold (about 99.9%) and soft, good for coins and gifting. 22K (91.6%) is the standard for traditional jewellery. 20K and 18K have more alloy so they are harder and cheaper per gram, good for daily wear and stone-set pieces."],
["Silver","Silver pieces are 92.5 sterling silver. Combination pieces mix gold and silver and are priced separately for each metal weight."],
["Hallmark","Gold is sold as hallmarked. Ask the store for hallmark details on any piece."],
["Custom orders","Use Customize Mawa to describe your design, metal and weight. It opens WhatsApp and our craftsmen send a quotation at the day's rate. Send reference photos in the chat."],
["Occasions","Marriage: haram, bridal sets, mangalsutra, bangles pairs, groom's chain. Festivals: kasu haram, jhumkas, 24K coins, silver pooja set. Events: rings, fusion necklace, couple rings. Daily wear: light studs, chains, pendants. Kids: bangles, studs, anklets, ceremony sets."],
["Ordering","Add items to the bag and tap Confirm on WhatsApp. No online payment is taken on this site. Visit the showroom to see pieces and confirm sizes."],
["Care","Store gold and silver separately in soft pouches, avoid perfume and chemicals, and wipe silver with a soft cloth. Visit us for cleaning and polishing."]];
KB=KB.concat(kbx());
P.forEach(function(p){KB.push([p.n,p.n+": "+p.d+" style, "+mtl(p)+(p.x.stone&&p.x.stone!=="None"?", "+p.x.stone+" stone":"")+(p.x.finish?", "+p.x.finish+" finish":"")+", "+p.w+" g, "+p.y+", for "+p.t.join(", ")+", sizes "+p.z.join(", ")+". Estimated price "+inr(price(p))+"."])});
function kbx(){var S=CFG.store||{},ask=" Please confirm on WhatsApp +91 63005 56301.",v=function(k,t){return S[k]?S[k]:t+ask};
return[
["Help what can you do","I can help with rates, price calculation, designs by occasion, weight, karat or budget, size guides, care, custom orders, order tracking and store information."],
["Opening hours timings open close","Store hours: "+v("hours","Hours are not listed on this site yet.")],
["Delivery shipping courier home delivery","Delivery: "+v("delivery","Delivery details are not listed on this site yet.")],
["Returns refund policy","Returns and refunds: "+v("returns","The returns policy is not listed on this site yet.")],
["Exchange old gold buyback sell resale","Old gold exchange and buyback: "+v("exchange","Exchange terms are not listed on this site yet.")],
["Payment modes UPI card EMI cash","Payments: "+v("payments","Payment modes are not listed on this site yet.")+" No payment is taken on this website."],
["GST invoice bill GSTIN","A GST invoice is issued at purchase. 3% GST applies on jewellery value."+(S.gstin?" GSTIN: "+S.gstin+".":"")],
["Hallmark BIS HUID purity","In India, BIS hallmarking with a 6-character HUID code is required for gold jewellery sold by jewellers in notified areas. Ask the store to show the hallmark and HUID, and you can verify it on the BIS Care app."],
["Karat 18K 20K 22K 24K difference","24K is about 99.9% pure and soft; 22K is 91.6% for traditional jewellery; 20K is 83.3% and 18K is 75%, which are stronger and better for stone-set and daily wear pieces. Lower karat has more alloy so it costs less per gram."],
["Making charges wastage value addition","Making charges pay for design and labour. They are usually a percentage of the gold value and are higher for hand-made or intricate pieces. This site estimates "+Math.round(CFG.makingGold*100)+"% for gold and "+Math.round(CFG.makingSilver*100)+"% for silver; the final bill is confirmed by the store."],
["Why price is different from gold rate","Price = metal weight x karat rate + making charges + 3% GST, so a piece costs more than the plain gold rate."],
["Rate source update frequency","Rates shown are the store board rates and refresh on this site every minute. They can differ slightly from other websites because retail rates include local factors."],
["Rate lock price protection","Your order is billed at the store rate at the exact time you tap Confirm. The time and rates are written into the order message. For refund-if-rates-fall terms, ask the store for the written policy."],
["Track order status","Share your order reference and phone number and I can check the status."],
["Custom design order Customize","Use Customize Mawa on this page or WhatsApp us your idea, metal and approximate weight. We reply with a quotation at the day's rate."],
["Ring size finder","Measure finger circumference in mm. About 51.8 mm is US size 6, 54.4 mm is size 7 and 57 mm is size 8. Measure at the end of the day and confirm at the store."],
["Bangle size guide","Bangle size is the inner diameter in inches: 2.2 small, 2.4 medium, 2.6 large, 2.8 extra large. Measure across your closed knuckles."],
["Chain length size guide","16 in sits at the collarbone, 18 in is standard for women, 20 to 24 in suits men. Pendants look best on 16 to 18 in."],
["Anklet size guide","Measure the ankle circumference and add about 1 cm. Anklets are usually worn as a pair."],
["Gold vs silver sterling 925","Gold keeps value and suits traditional and bridal wear. 92.5 sterling silver is lighter on the pocket for daily wear, gifts and anklets, but it tarnishes and needs polishing."],
["Care cleaning silver tarnish polish","Keep silver in an airtight pouch, wipe with a soft cloth after wearing and avoid perfume and chemicals. For gold, soak in lukewarm water with mild soap and brush gently. The store can polish pieces."],
["Skin allergy sensitive skin","Lower karat gold and silver contain other metals. If your skin is sensitive, choose higher karat gold or ask the store about the alloy."],
["Check real gold authenticity fake genuine","Check the BIS hallmark and HUID, ask for a proper bill with weight and purity, and buy from a registered jeweller. Do not use acid or scratch tests at home."],
["Safe storage insurance locker","Store jewellery in separate soft pouches, keep valuables in a bank locker or safe, and consider home insurance for high-value items."],
["Wedding bridal marriage jewellery checklist","Bride: haram or necklace set, choker, jhumkas, bangles, mangalsutra (pustelu), vaddanam (waist belt), maang tikka, nose stud, anklets and rings. Groom: chain, ring and kada. Plan weights and budget early and use the rate lock when you order."],
["Baby naming ceremony ear piercing kids jewellery","For kids choose light gold or silver: small bangles, screw-back studs, anklets and ceremony sets. Check size and finish for comfort."],
["Festival buying Akshaya Tritiya Dhanteras Ugadi Dasara Diwali","Many families prefer to buy gold on Akshaya Tritiya, Dhanteras, Ugadi and Dasara. Coins, pendants and light sets are popular festival choices."],
["Gift ideas by relation and budget","Mother or wife: jhumkas, pendant or bangles. Sister: studs or pendant. Newborn: small bangle or silver anklets. Groom: chain or ring. For a budget, use the Price filter or tell me the amount and occasion."],
["Gold investment coins bars","Coins and 24K pieces suit gifting and saving, but jewellery making charges are usually not recovered on resale. This is general information, not financial advice."],
["Telugu jewellery names glossary pustelu vaddanam kammalu gajulu pattilu addigai nethichutti mukkera","Pustelu = mangalsutra, vaddanam = waist belt, kammalu or jimikki = earrings or jhumkas, gajulu = bangles, pattilu = anklets, addigai = choker, nethichutti = maang tikka, mukkera = nose stud, kasulaperu = coin necklace."],
["3D view photos illustrations","Open any design and tap View in 3D to rotate and zoom a model. Illustrations are shown until real photos are added; visit the store to see a piece in person."],
["Visual search by photo similar designs","Use Search by photo in the filters to upload a picture and find similar designs when the visual search service is enabled."],
["Privacy and safety","Please do not share card numbers, OTPs or passwords in this chat. Orders are confirmed on WhatsApp and no payment is taken on this site."],
["Contact location address directions how to reach map","AANU Jewellers, "+addr()+". Phone and WhatsApp +91 63005 56301. Directions: "+dirUrl()+" Map: "+mapUrl()],
["Language Telugu Hindi English","You can ask in English or Telugu-English. With the AI mode on I reply in the same style."]]}
var SYN={pustelu:"mangalsutra",pustela:"mangalsutra",thadu:"mangalsutra",kammalu:"earrings jhumkas",jimikki:"jhumkas",gajulu:"bangles",pattilu:"anklets",addigai:"choker",nethichutti:"tikka",mukkera:"nose",kasulaperu:"coin necklace",rates:"price",cost:"price",expensive:"price",cheap:"price budget",return:"returns refund",refund:"returns",sell:"exchange buyback",resale:"exchange buyback",timing:"hours",timings:"hours",open:"hours",shipping:"delivery",courier:"delivery",pay:"payments",payment:"payments",upi:"payments",card:"payments",emi:"payments",bill:"invoice gst",invoice:"gst invoice",purity:"hallmark karat",pure:"hallmark karat",real:"authenticity",fake:"authenticity",genuine:"authenticity",wedding:"bridal marriage",bride:"bridal",baby:"kids newborn",child:"kids",gift:"gift ideas",present:"gift ideas",clean:"care cleaning",polish:"care cleaning",tarnish:"care silver",allergy:"skin sensitive",address:"location contact",phone:"contact",whatsapp:"contact",fit:"size guide",locker:"storage safe",insurance:"storage",coin:"coins investment",invest:"investment",track:"order status",status:"order status",opening:"hours",closing:"hours",hours:"timings"};
var STOP="the a an is are of to for and or in on at my me you your what how do does can i it with about please tell".split(" ");
function words(t){var o=[];(t.toLowerCase().match(/[a-z0-9]+/g)||[]).forEach(function(w){if(STOP.indexOf(w)<0&&w.length>1){o.push(w);if(SYN[w])o.push.apply(o,SYN[w].split(" "))}});return o}
function retrieve(q,n){var qs=words(q),N=KB.length,df={},hit=function(x,w){return x===w||(w.length>3&&x.indexOf(w)===0)};qs.forEach(function(w){df[w]=0});
 KB.forEach(function(d){if(!d[2])d[2]=words(d[0]+" "+d[0]+" "+d[1]);qs.forEach(function(w){if(d[2].some(function(x){return hit(x,w)}))df[w]++})});
 return KB.map(function(d){var s=0;qs.forEach(function(w){var c=d[2].filter(function(x){return hit(x,w)}).length;if(c)s+=(1+Math.log(1+c))*Math.log(1+N/df[w])});return[s,d]}).filter(function(x){return x[0]>0}).sort(function(a,b){return b[0]-a[0]}).slice(0,n).map(function(x){return x[1]})}
function parse(q){
 var s=q.toLowerCase(),f={},m;
 var T={kids:/kid|child|baby|boy|girl|infant/,men:/\bmen\b|\bmens\b|\bmale\b|gents|groom/,ladies:/ladies|\blady\b|women|woman|female|bride/,marriage:/marriage|wedding|bridal|bride/,festival:/festival|diwali|pooja|puja|ugadi|dasara|dussehra|bathukamma|lakshmi/,events:/event|function|party|engagement|anniversary|ceremony|birthday|housewarming/,family:/family|couple|gift/,daily:/daily|office|everyday/};
 Object.keys(T).forEach(function(k){if(T[k].test(s)&&!f.tag)f.tag=k});
 var Y={ring:/\bring/,bangle:/bangle|kada|bracelet/,chain:/chain/,necklace:/necklace|haram/,earrings:/earring|stud|jhumka/,anklet:/anklet|payal/,pendant:/pendant|locket/,set:/\bset\b/};
 Object.keys(Y).forEach(function(k){if(Y[k].test(s)&&!f.ty)f.ty=k});
 if(m=s.match(/\b(18|20|22|24)\s*(k|kt|karat|carat)/)){f.kt=m[1]}
 if(/combin|fusion|two.?tone|mixed/.test(s))f.metal="combo";else if(/silver/.test(s))f.metal="silver";else if(/gold/.test(s)||f.kt)f.metal="gold";
 if(m=s.match(/(under|below|less than|within|upto|up to|max)\s*(\d+(?:\.\d+)?)\s*(g|gm|gms|gram|grams)\b/)){f.maxw=+m[2];s=s.replace(m[0]," ")}
 if(m=s.match(/(under|below|less than|within|upto|up to|budget)\s*(?:\u20B9|rs\.?|inr)?\s*(\d[\d,]*(?:\.\d+)?)\s*(k|thousand|lakh|lakhs|l)?\b/)){var v=+m[2].replace(/,/g,"");if(/^(k|thousand)$/.test(m[3]||""))v*=1000;else if(/^l/.test(m[3]||""))v*=1e5;if(v>=500)f.maxp=v}
 return f}
function say(t,act){var d=document.createElement("div");d.className="m "+(act==="u"?"u":"b");lk(d,t);$("cl").appendChild(d);$("cl").scrollTop=1e9;return d}
function agent(q){
 var s=q.toLowerCase(),f=parse(q),m,keys=Object.keys(f);
 if(/^(hi|hello|hey|namaste|namaskaram|hola)\b/.test(s)&&s.length<30)return{t:"Namaste! I can help with gold and silver rates, price calculation, finding designs by occasion, weight, karat or budget, size guides, care tips, custom orders and store information. What would you like to know?"};
 if((m=s.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|gms|gram|grams)\b/))&&/price|cost|value|how much|calculate|worth/.test(s)&&(f.kt||/silver|gold/.test(s)))return{t:calcVal(/silver/.test(s)&&!f.kt?"s":(f.kt||22),+m[1]),tool:1};
 if(m=s.match(/(\d{2}(?:\.\d)?)\s*mm/)){var mm=+m[1];if(mm>=40&&mm<=75)return{t:"Tool ring_size: circumference "+mm+" mm is about US ring size "+(Math.round((6+(mm-51.8)/2.55)*2)/2)+". Please confirm with our store sizer before ordering.",tool:1}}
 if(/gold rate|silver rate|today.?s rate|rate today|\brates?\b/.test(s)&&!keys.length&&!/lock/.test(s))return{t:"Tool get_rates (updated "+CFG.rateDate+"): 24K "+inr(gr(24))+"/g, 22K "+inr(CFG.gold22)+"/g, 20K "+inr(gr(20))+"/g, 18K "+inr(gr(18))+"/g, silver "+inr(CFG.silver)+"/g.",tool:1};
 if(keys.length&&(f.tag||f.ty||f.metal||f.kt||f.maxw||f.maxp)&&/show|find|suggest|need|want|looking|have|any|under|below|for|gold|silver|ring|chain|bangle|necklace|earring|anklet|pendant/.test(s)){
  F={tag:f.tag||"all",metal:f.metal||"",kt:f.kt||"",wt:"",sz:"",pr:"",ty:f.ty||"",so:"",maxw:f.maxw||0,maxp:f.maxp||0};sync();grid();
  var a=list().slice(0,3);
  return{t:"Tool filter_products applied "+JSON.stringify(f)+". "+(a.length?"Top matches: "+a.map(function(p){return p.n+" ("+mtl(p)+", "+p.w+" g, "+inr(price(p))+")"}).join("; ")+". I have filtered the collection for you.":"No piece matches that. Try a wider weight or budget, or use Customize Mawa."),tool:1,scroll:1}}
 if(/order|buy|book|human|talk|call|whatsapp|contact/.test(s))return{t:"You can reach the store on +91 63005 56301. Tap below to open WhatsApp.",wa:1};
 var r=retrieve(q,3);return{t:r.length?r.map(function(d){return d[1]}).join("\n\n"):"I may not have that detail yet. I can help with rates, price calculation, design search by occasion, weight, karat or budget, size guides, care, custom orders and store info. For anything else please ask on WhatsApp +91 63005 56301.",ctx:r}}
var H=[],TL=[{type:"function",function:{name:"filter_products",description:"Filter the shop and list matching pieces",parameters:{type:"object",properties:{tag:{type:"string",enum:["kids","ladies","men","family","marriage","festival","events","daily"]},type:{type:"string",enum:["ring","bangle","chain","necklace","earrings","anklet","pendant","set"]},metal:{type:"string",enum:["gold","silver","combo"]},karat:{type:"number",enum:[18,20,22,24]},style:{type:"string",enum:STY},max_weight_g:{type:"number"},max_price_inr:{type:"number"}}}}},{type:"function",function:{name:"get_rates",description:"Current gold and silver rates per gram",parameters:{type:"object",properties:{}}}},{type:"function",function:{name:"ring_size",description:"Approx US ring size from finger circumference in mm",parameters:{type:"object",properties:{mm:{type:"number"}},required:["mm"]}}}];
TL.push({type:"function",function:{name:"calculate_price",description:"Estimate price of gold or silver by weight",parameters:{type:"object",properties:{metal:{type:"string",enum:["gold","silver"]},karat:{type:"number",enum:[18,20,22,24]},grams:{type:"number"}},required:["metal","grams"]}}},{type:"function",function:{name:"compare_products",description:"Compare 2 or 3 designs by name",parameters:{type:"object",properties:{names:{type:"array",items:{type:"string"}}},required:["names"]}}},{type:"function",function:{name:"plan_budget",description:"Suggest a jewellery set within a budget",parameters:{type:"object",properties:{budget_inr:{type:"number"},occasion:{type:"string",enum:["kids","ladies","men","family","marriage","festival","events","daily"]}},required:["budget_inr"]}}},{type:"function",function:{name:"order_status",description:"Check order status with reference and phone",parameters:{type:"object",properties:{ref:{type:"string"},phone:{type:"string"}},required:["ref","phone"]}}});
var SC=0;
function runTool(n,a){
 if(n==="calculate_price")return calcVal(a.metal==="silver"?"s":(a.karat||22),+a.grams||0);
 if(n==="compare_products"){var ps=[].concat(a.names||[]).reduce(function(o,x){return o.concat(findP(x))},[]);return ps.length?ps.map(function(p){return p.n+": "+mtl(p)+", "+p.w+" g, "+p.d+" style, stone "+(p.x.stone||"none")+", price "+inr(price(p))}).join("\n"):"No matching designs"}
 if(n==="plan_budget")return planB(+a.budget_inr||0,a.occasion);
 if(n==="order_status")return fetch((CFG.api||"")+"/api/order-status?ref="+encodeURIComponent(a.ref||"")+"&phone="+encodeURIComponent(a.phone||"")).then(function(r){return r.json()}).then(function(j){return j.status?"Order status: "+j.status+", total "+inr(j.total):(j.error||"Not found")}).catch(function(){return"Order tracking is unavailable right now"});
 if(n==="get_rates")return"24K "+inr(gr(24))+"/g, 22K "+inr(CFG.gold22)+"/g, 20K "+inr(gr(20))+"/g, 18K "+inr(gr(18))+"/g, silver "+inr(CFG.silver)+"/g, as of "+CFG.rateDate;
 if(n==="ring_size")return"About US size "+(Math.round((6+(a.mm-51.8)/2.55)*2)/2)+" (confirm in store)";
 if(n==="filter_products"){F={tag:a.tag||"all",metal:a.metal||"",kt:a.karat?String(a.karat):"",wt:"",sz:"",pr:"",ty:a.type||"",st:a.style||"",so:"",maxw:a.max_weight_g||0,maxp:a.max_price_inr||0};sync();grid();SC=1;var r=list();return r.length+" matches. "+r.slice(0,5).map(function(p){return p.n+" ("+mtl(p)+", "+p.w+" g, "+inr(price(p))+")"}).join("; ")}
 return"unknown tool"}
async function groq(q){var k=ls("g","aanu_gk");if(!k&&!ON)return null;try{
 var docs=retrieve(q,4).map(function(d){return d[1]}).join("\n");
 var ms=[{role:"system",content:"You are the AI assistant of AANU Jewellers, Thorrur, Mahabubabad district, Telangana. Use tools to filter the shop, fetch rates or compute ring size. Use the context and tools for store facts, prices and policies, and your general jewellery knowledge for educational questions; be brief and friendly, in the user's language style (English or Telugu-English). Never invent prices or policies; if unsure, suggest WhatsApp +91 63005 56301. Orders are billed at the rate at the exact time the customer taps Confirm on WhatsApp.\nContext:\n"+docs}].concat(H.slice(-6),[{role:"user",content:q}]);
 for(var i=0;i<3;i++){var r=await fetch(ON?(CFG.api||"")+"/api/groq":"https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:ON?{"Content-Type":"application/json"}:{"Content-Type":"application/json",Authorization:"Bearer "+k},body:JSON.stringify(ON?{messages:ms,tools:TL}:{model:CFG.groqModel,temperature:.3,max_tokens:400,messages:ms,tools:TL,tool_choice:"auto"})});var j=await r.json();var m=j.choices[0].message;
  if(m.tool_calls&&m.tool_calls.length){ms.push(m);for(var ci=0;ci<m.tool_calls.length;ci++){var c=m.tool_calls[ci],a={};try{a=JSON.parse(c.function.arguments||"{}")}catch(e){}ms.push({role:"tool",tool_call_id:c.id,content:String(await runTool(c.function.name,a))})}continue}
  return m.content}return null}catch(e){return null}}
async function send(q){
 q=q.trim();if(!q)return;say(q,"u");var th=say("...");SC=0;var out=await groq(q),a=null;
 if(out){H.push({role:"user",content:q},{role:"assistant",content:out})}else{a=agent(q);out=a.t;if(a.scroll)SC=1}
 lk(th,out);
 if(a&&a.wa){var b=document.createElement("button");b.className="btn gb";b.textContent="Open WhatsApp";b.onclick=function(){wa("Hello AANU Jewellers, I have a question.")};$("cl").appendChild(b)}
 if(SC)$("collections").scrollIntoView();$("cl").scrollTop=1e9}
function chat(open){$("cp").className=open?"open":"";if(open&&!$("cl").children.length){say("Namaste! I am the AANU assistant. Ask me about rates, karats, occasions, or say things like \"22K gold chain for men under 20 grams\" and I will filter the collection.");}}
$("botBtn").onclick=function(){chat(!$("cp").className)};$("askBtn").onclick=function(){chat(true)};$("cx").onclick=function(){chat(false)};
$("kb").onclick=function(){var e=$("ck");e.style.display=e.style.display==="block"?"none":"block"};
$("gk").value=ls("g","aanu_gk")||"";$("gk").onchange=function(){ls("s","aanu_gk",this.value.trim());toast(this.value?"Groq key saved in this browser":"Groq key removed")};
$("cf2").onsubmit=function(e){e.preventDefault();var v=$("cq").value;$("cq").value="";send(v)};
["22K gold chain for men under 20 grams","Bridal necklace with ruby","Price of 10 grams 22K gold","Wedding jewellery checklist","What is HUID?","Can I exchange old gold?"].forEach(function(t){var b=document.createElement("button");b.textContent=t;b.onclick=function(){send(t)};$("cc").appendChild(b)});

function showRates(){
 var d=CFG.gold22-BASE.g,ds=CFG.silver-BASE.s;
 function ar(x){x=Math.round(x);return x>0?' <i class="up">\u25B2 '+x+'</i>':x<0?' <i class="dn">\u25BC '+Math.abs(x)+'</i>':""}
 var h=[24,22,20,18].map(function(k){return'<span><b>'+k+'K Gold</b> '+inr(gr(k))+'/g'+ar(d*k/22)+'</span>'}).join("")+'<span><b>Silver</b> '+inr(CFG.silver)+'/g'+ar(ds)+'</span><span>Store rates as of '+CFG.rateDate+' (changes vs your last visit)</span>';
 $("tk").innerHTML='<div class="tki">'+h+h+'</div>';
 [["g24",gr(24)],["g22",CFG.gold22],["g20",gr(20)],["g18",gr(18)],["sv",CFG.silver]].forEach(function(x){$(x[0]).textContent=inr(x[1])});$("rd").textContent=CFG.rateDate;
 ls("s","aanu_pv2",JSON.stringify({g:CFG.gold22,s:CFG.silver}))}
function applyRates(j){if(!j||!(j.gold22||j.gold24))return false;var ch=false;["gold24","gold22","gold20","gold18","silver"].forEach(function(k){if(j[k]&&+j[k]!==CFG[k]){CFG[k]=+j[k];ch=true}});["makingGold","makingSilver","gst"].forEach(function(k){if(j[k]!=null&&+j[k]!==CFG[k]){CFG[k]=+j[k];ch=true}});if(j.updated&&j.updated!==CFG.rateDate){CFG.rateDate=j.updated;ch=true}return ch}
function loadRates(){var u=[(CFG.api||"")+"/api/rates",CFG.ratesUrl,"rates.json"];(function t(i){if(i>=u.length)return;try{fetch(u[i]+(i?"":"?t="+Date.now()),{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j)return t(i+1);if(applyRates(j)){showRates();grid();if($("dr").className)draw()}}).catch(function(){t(i+1)})}catch(e){t(i+1)}})(0)}
showRates();loadRates();setInterval(loadRates,60000);
$("wab").href="https://wa.me/"+CFG.phone+"?text="+encodeURIComponent("Hello AANU Jewellers, I would like to enquire about your jewellery.");
try{var v=JSON.parse(ls("g","aanu_cart3")||"[]");if(Array.isArray(v))cart=v.filter(function(x){return pOf(x.id)&&x.q>0})}catch(e){}
$("thm").onclick=function(){var d=document.documentElement,c=d.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),n=c==="dark"?"light":"dark";d.setAttribute("data-theme",n);ls("s","aanu_th",n)};var t0=ls("g","aanu_th");if(t0)document.documentElement.setAttribute("data-theme",t0);
$("cmpb").onclick=function(){var ps=CP.map(pOf);$("pc").innerHTML='<div style="padding:16px"><div style="display:flex;justify-content:space-between"><h2 style="margin:0;font-size:22px">Compare</h2><button class="ic" id="cx2" aria-label="Close">&times;</button></div><div style="overflow-x:auto"><table class="cmpt" style="width:100%;border-collapse:collapse"><tr><th></th>'+ps.map(function(p){return"<th>"+p.n+"</th>"}).join("")+"</tr>"+[["Metal",mtl],["Weight",function(p){return p.w+" g"}],["Price",function(p){return inr(price(p))}],["Style",function(p){return p.d}],["Stone",function(p){return p.x.stone||"-"}],["Finish",function(p){return p.x.finish||"-"}],["Sizes",function(p){return p.z.join(", ")}]].map(function(r){return"<tr><th>"+r[0]+"</th>"+ps.map(function(p){return"<td>"+r[1](p)+"</td>"}).join("")+"</tr>"}).join("")+'</table></div><p><button class="btn o" id="cc2">Clear</button></p></div>';$("pm").className="open";$("cx2").onclick=function(){$("pm").className=""};$("cc2").onclick=function(){CP=[];cmpUI();paint();$("pm").className=""}};
$("df").onsubmit=function(e){e.preventDefault();wa("Hello AANU Jewellers, I like design number "+$("dn").value+" from the bangle tray (Tray 3). Please share the weight, purity and price.")};
filters();tabs();orn();grid();badge();cmpUI();
}
function jf(u){return fetch(u,{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).catch(function(){return null})}
jf((CFG.api||"")+"/api/products").then(function(j){if(Array.isArray(j)&&j.length){D=j;ON=1;return}return jf("data/products.json").then(function(k){k=k||[];return jf("data/demo_products.json").then(function(m){m=(m||[]).map(function(r){r=r.slice();r[11]=Object.assign({},r[11],{demo:1});return r});if(m.length)DEMO=1;if(k.length+m.length)D=k.concat(m)})})}).then(main);
(function(){function rt(v){return v==="s"?CFG.silver:(CFG["gold"+v]||Math.round(CFG.gold22*v/22))}
function f(n){return"\u20B9 "+Math.round(n).toLocaleString("en-IN")}
function go(){var v=document.getElementById("qm").value,g=+document.getElementById("qg").value,o=document.getElementById("qo");if(!g||g<=0){o.textContent="Enter the weight in grams.";return}
var r=rt(v),b=g*r,mk=b*(v==="s"?CFG.makingSilver:CFG.makingGold),gs=(b+mk)*CFG.gst;
o.innerHTML="Metal value "+f(b)+" ("+g+" g @ "+f(r)+"/g)<br>Making "+f(mk)+"<br>GST "+f(gs)+"<br><b>Estimated total "+f(b+mk+gs)+"</b>"}
document.getElementById("qb").onclick=go;document.getElementById("qg").oninput=go})();
if("serviceWorker" in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register("sw.js").catch(function(){});
(function(){var q=CFG.place,e=function(i){return document.getElementById(i)};if(!q||!e("adr"))return;
e("adr").textContent=[q.street,q.landmark,"Plus Code "+q.plus,q.town+", "+q.district+" district",q.state+" "+q.pin].filter(Boolean).join(", ");
e("mapb").href="https://www.google.com/maps/search/?api=1&query="+q.lat+","+q.lng;e("dirb").href="https://www.google.com/maps/dir/?api=1&destination="+q.lat+","+q.lng;
e("mapf").src="https://maps.google.com/maps?q="+q.lat+","+q.lng+"&z=17&output=embed"})();

