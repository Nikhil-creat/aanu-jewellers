
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
var P=D.map(function(r,i){return{id:i+1,im:r[8]||"",m:r[9]||"",n:r[0],y:r[1],t:r[2].split(","),k:r[3],g:r[4],s:r[5],z:r[6].split(","),d:r[7],w:Math.round((r[4]+r[5])*10)/10}});
var STY=[];P.forEach(function(p){if(STY.indexOf(p.d)<0)STY.push(p.d)});STY.sort();
var TAB=[["all","All"],["kids","Kids"],["ladies","Ladies"],["men","Men"],["family","Family"],["marriage","Marriage"],["festival","Festivals"],["events","Functions & Events"],["daily","Daily Wear"]];
var SH={ring:'<circle cx="50" cy="62" r="22"/><path class="a" d="M42 38l8-14 8 14-8 8z"/>',bangle:'<ellipse cx="50" cy="55" rx="36" ry="30"/><ellipse class="a" cx="50" cy="55" rx="27" ry="21"/>',chain:'<path d="M10 22Q50 98 90 22" stroke-dasharray="0.1 8" stroke-width="7"/>',necklace:'<path d="M14 22Q50 82 86 22"/><circle class="a" cx="50" cy="68" r="8"/>',earrings:'<path d="M30 14v14M70 14v14"/><path d="M20 82Q20 48 30 32Q40 48 40 82Z"/><path class="a" d="M60 82Q60 48 70 32Q80 48 80 82Z"/>',anklet:'<path d="M8 52q10-22 21 0t21 0 21 0 21 0"/><circle class="a" cx="29" cy="60" r="4"/><circle class="a" cx="71" cy="60" r="4"/>',pendant:'<path d="M16 14Q50 58 84 14"/><path class="a" d="M50 52c-13 14-13 30 0 36 13-6 13-22 0-36z"/>',set:'<path d="M10 14Q50 92 90 14"/><circle class="a" cx="50" cy="68" r="9"/><circle cx="22" cy="84" r="5"/><circle cx="78" cy="84" r="5"/>'};
var $=function(i){return document.getElementById(i)};
var F={tag:"all",metal:"",kt:"",wt:"",sz:"",pr:"",ty:"",so:""};
var cart=[];
var BASE=(function(){var o=null;try{o=JSON.parse(localStorage.getItem("aanu_pv"))}catch(e){}return o||{g:CFG.gold22,s:CFG.silver}})();
function gr(k){return Math.round(CFG.gold22*k/22)}
function price(p){var g=p.g*(p.k?gr(p.k):0),s=p.s*CFG.silver;return Math.round((g*(1+CFG.makingGold)+s*(1+CFG.makingSilver))*(1+CFG.gst))}
function inr(n){return "\u20B9 "+Math.round(n).toLocaleString("en-IN")}
function mtl(p){return p.k&&p.s?p.k+"K Gold + Silver":p.k?p.k+"K Gold":"92.5 Silver"}
function cls(p){return p.k&&p.s?"m":p.k?"":"s"}
function toast(t){var e=$("ts");e.textContent=t;e.className="on";setTimeout(function(){e.className=""},2600)}
function ls(a,k,v){try{if(a==="s")localStorage.setItem(k,v);else return localStorage.getItem(k)}catch(e){}return null}
function rangeOK(w,v){var r={a:[0,5],b:[5,10],c:[10,25],d:[25,50],e:[50,1e5]}[v];return w>=r[0]&&w<r[1]}
function prOK(x,v){var r={a:[0,25000],b:[25000,100000],c:[100000,1e9]}[v];return x>=r[0]&&x<r[1]}
function match(p){
 if(F.tag!=="all"&&p.t.indexOf(F.tag)<0)return false;
 if(F.q&&(p.n+" "+p.d+" "+p.y).toLowerCase().indexOf(F.q)<0)return false;
 if(F.st&&p.d!==F.st)return false;
 if(F.ty&&p.y!==F.ty)return false;
 if(F.metal==="gold"&&!(p.k&&!p.s))return false;
 if(F.metal==="silver"&&p.k)return false;
 if(F.metal==="combo"&&!(p.k&&p.s))return false;
 if(F.kt&&p.k!==+F.kt)return false;
 if(F.wt&&!rangeOK(p.w,F.wt))return false;
 if(F.maxw&&p.w>F.maxw)return false;
 if(F.sz&&p.z.indexOf(F.sz)<0)return false;
 if(F.pr&&!prOK(price(p),F.pr))return false;
 if(F.maxp&&price(p)>F.maxp)return false;
 return true}
function list(){var a=P.filter(match);if(F.so==="pl")a.sort(function(x,y){return price(x)-price(y)});if(F.so==="ph")a.sort(function(x,y){return price(y)-price(x)});if(F.so==="wl")a.sort(function(x,y){return x.w-y.w});if(F.so==="wh")a.sort(function(x,y){return y.w-x.w});return a}
function opts(a){return a.map(function(o){return'<option value="'+o[0]+'">'+o[1]+'</option>'}).join("")}
function sel(id,lab,a){return'<div><label for="'+id+'">'+lab+'</label><select id="'+id+'">'+opts([["","Any"]].concat(a))+'</select></div>'}
function filters(){
 var szs=[],tys=[];P.forEach(function(p){p.z.forEach(function(z){if(szs.indexOf(z)<0&&z!=="Free")szs.push(z)});if(tys.indexOf(p.y)<0)tys.push(p.y)});
 $("fl").innerHTML=sel("fy","Type",tys.map(function(t){return[t,t[0].toUpperCase()+t.slice(1)]}))+sel("fm","Metal",[["gold","Gold"],["silver","Silver"],["combo","Gold + Silver"]])+sel("fk","Gold karat",[["18","18K"],["20","20K"],["22","22K"],["24","24K"]])+sel("fw","Weight",[["a","Under 5 g"],["b","5 - 10 g"],["c","10 - 25 g"],["d","25 - 50 g"],["e","50 g +"]])+sel("fz","Size",szs.sort().map(function(z){return[z,z]}))+sel("fp","Price",[["a","Under \u20B925,000"],["b","\u20B925k - \u20B91 lakh"],["c","Above \u20B91 lakh"]])+sel("fd","Design style",STY.map(function(t){return[t,t]}))+sel("fs","Sort",[["pl","Price: low to high"],["ph","Price: high to low"],["wl","Weight: low to high"],["wh","Weight: high to low"]])+'<div><label for="fq">Search designs</label><input id="fq" placeholder="Name or style"></div>'+'<div style="display:flex;align-items:end"><button class="btn o" id="fr" style="width:100%;justify-content:center">Reset</button></div>';
 var map={fy:"ty",fm:"metal",fk:"kt",fw:"wt",fz:"sz",fp:"pr",fd:"st",fs:"so"};
 Object.keys(map).forEach(function(id){$(id).onchange=function(){F[map[id]]=this.value;if(map[id]==="wt")F.maxw=0;if(map[id]==="pr")F.maxp=0;grid()}});
 $("fq").oninput=function(){F.q=this.value.toLowerCase();grid()};
 $("fr").onclick=function(){F={tag:"all",metal:"",kt:"",wt:"",sz:"",pr:"",ty:"",so:""};sync();grid()}}
function sync(){var m={fy:"ty",fm:"metal",fk:"kt",fw:"wt",fz:"sz",fp:"pr",fd:"st",fs:"so"};Object.keys(m).forEach(function(id){$(id).value=F[m[id]]||""});$("fq").value=F.q||"";tabs();orn()}
function tabs(){$("tabs").innerHTML="";TAB.forEach(function(c){var b=document.createElement("button");b.className="tab"+(F.tag===c[0]?" on":"");b.textContent=c[1];b.onclick=function(){F.tag=c[0];tabs();grid()};$("tabs").appendChild(b)})}
function im(p,z){return p.im?'<img loading="lazy" decoding="async" src="'+CFG.imgBase+z+"/"+p.im+'" alt="'+p.n+'" onerror="this.remove()">':""}
function art(p){return'<svg viewBox="0 0 100 100" aria-hidden="true">'+SH[p.y]+'</svg>'}
var LIM=36;function grid(){LIM=36;paint()}
function paint(){
 var all=list(),a=all.slice(0,LIM),g=$("grid");g.innerHTML="";$("rc").textContent=all.length+" design"+(all.length===1?"":"s")+" found";
 if(!all.length)g.innerHTML='<p class="mut">Nothing matches these filters. Try Reset, or ask the AI assistant.</p>';
 a.forEach(function(p){var d=document.createElement("div");d.className="card";
  d.innerHTML='<div class="pi '+cls(p)+'">'+art(p)+''+im(p,"t")+'<span class="k">'+mtl(p)+'</span></div><div class="pb"><h3>'+p.n+'</h3><small>'+p.w+' g &middot; '+p.d+' '+p.y+' &middot; '+p.z.join(" / ")+'</small><div class="pr"><div><small>Estimated &middot; tap for details</small><br><b>'+inr(price(p))+'</b></div><button class="btn gb">Add</button></div></div>';
  d.querySelector("button").onclick=function(e){e.stopPropagation();add(p.id)};d.style.cursor="pointer";d.onclick=function(){detail(p.id)};g.appendChild(d)});if(all.length>LIM){var mb=document.createElement("button");mb.className="btn o";mb.style.cssText="grid-column:1/-1;justify-content:center";mb.textContent="Show more ("+(all.length-LIM)+" left)";mb.onclick=function(){LIM+=36;paint()};g.appendChild(mb);if(window.IntersectionObserver)new IntersectionObserver(function(e,o){if(e[0].isIntersecting){o.disconnect();LIM+=36;paint()}},{rootMargin:"500px"}).observe(mb)}}
function pOf(id){return P.filter(function(x){return x.id===id})[0]}
function save(){ls("s","aanu_cart3",JSON.stringify(cart))}
function add(id,z){var p=pOf(id);z=z||p.z[0];var e=cart.filter(function(x){return x.id===id&&x.z===z})[0];if(e)e.q++;else cart.push({id:id,q:1,z:z});save();badge();toast("Added "+p.n)}
function badge(){$("cnt").textContent=cart.reduce(function(a,x){return a+x.q},0)}
function ist(){return new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true})}
function draw(){var c=$("ci"),tot=0;c.innerHTML=cart.length?"":'<p class="mut" style="text-align:center;padding:30px 0">Your bag is empty.</p>';
 cart.forEach(function(x,i){var p=pOf(x.id),l=price(p)*x.q;tot+=l;var d=document.createElement("div");d.className="it";
  d.innerHTML='<div><b>'+p.n+'</b><br><small class="mut">'+mtl(p)+' &middot; '+p.w+' g'+(x.z!=="Free"?' &middot; '+x.z:'')+'</small></div><div style="text-align:right"><b>'+inr(l)+'</b><div class="q"><button data-a="-">&minus;</button> '+x.q+' <button data-a="+">+</button></div></div>';
  d.querySelectorAll("button").forEach(function(b){b.onclick=function(){x.q+=b.dataset.a==="+"?1:-1;if(x.q<1)cart.splice(i,1);save();badge();draw()}});c.appendChild(d)});
 $("tt").textContent=inr(tot);$("lk").textContent="Prices follow the live store rate until you tap Confirm. At that exact time the rates are locked and billed."}
function wa(m){window.open("https://wa.me/"+CFG.phone+"?text="+encodeURIComponent(m),"_blank")}
$("bagBtn").onclick=function(){draw();$("dr").className="open"};$("xb").onclick=function(){$("dr").className=""};$("dr").onclick=function(e){if(e.target===$("dr"))$("dr").className=""};
$("co").onclick=function(){if(!cart.length)return toast("Your bag is empty");
 var n=new Date(),t=ist(),ref="AANU-"+n.toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.random().toString(36).slice(2,6).toUpperCase(),tot=0;
 var m="Hello AANU Jewellers,\nORDER "+ref+"\nPlaced: "+t+" (IST)\n\n";
 cart.forEach(function(x,i){var p=pOf(x.id),l=price(p)*x.q;tot+=l;m+=(i+1)+". "+p.n+" ("+mtl(p)+", "+p.w+" g"+(x.z!=="Free"?", "+x.z:"")+") x"+x.q+" = "+inr(l)+"\n"});
 m+="\nRATES LOCKED AT "+t+":\n24K "+inr(gr(24))+"/g, 22K "+inr(CFG.gold22)+"/g, 20K "+inr(gr(20))+"/g, 18K "+inr(gr(18))+"/g, Silver "+inr(CFG.silver)+"/g\nEstimated total: "+inr(tot)+"\nPlease bill at the rates above and confirm availability.";
 wa(m);toast("Rates locked at "+t.split(", ").pop())};
var TI={ring:"Measure finger circumference at the end of the day when fingers are largest. Ask the store about resizing.",bangle:"Bangle size is the inner diameter in inches: 2.2 small, 2.4 medium, 2.6 large, 2.8 extra large. Measure across your closed knuckles.",chain:"Length guide: 16 in sits at the collarbone, 18 in is standard for women, 20 to 24 in suits men.",necklace:"Sits on the chest; pairs well with matching earrings.",earrings:"Check the fastening type with the store before ordering if you have sensitive ears.",anklet:"Usually worn as a pair; measure ankle circumference and add about 1 cm for comfort.",pendant:"Sold without a chain unless stated; pair with any chain from our collection.",set:"A complete matching set; the weight shown is the total."};
var SI={Temple:"Inspired by South Indian temple art with deity, lotus and peacock motifs. A classic for weddings and festivals.",Antique:"A matte, aged finish with an heirloom feel that hides daily wear well.",Kundan:"A rich, stone-studded look made for brides and grand functions.",Modern:"Clean geometry that suits contemporary outfits.",Minimal:"Light and understated, easy to wear every day.",Bridal:"A heavy statement design for weddings and engagements.",Traditional:"Time-honoured patterns that carry across generations.",Casual:"Lightweight and comfortable for everyday use."};
var KI={24:"99.9% pure gold. Very soft, best for coins and gifting rather than daily wear.",22:"91.6% gold. The traditional standard for jewellery, balancing purity and strength.",20:"83.3% gold. Stronger, suits intricate and stone-set designs.",18:"75% gold. Most durable, ideal for daily wear and modern designs."};
function detail(id,zs){var p=pOf(id),gv=p.g*(p.k?gr(p.k):0),sv=p.s*CFG.silver,mk=gv*CFG.makingGold+sv*CFG.makingSilver,sub=gv+sv+mk,gs=sub*CFG.gst;
 var kinfo=(p.k?KI[p.k]:"")+(p.k&&p.s?" ":"")+(p.s?"Silver part is 92.5% sterling silver.":"");
 var rows=(p.g?'<div class="bd"><span>Gold '+p.g+' g @ '+inr(gr(p.k))+'</span><b>'+inr(gv)+'</b></div>':"")+(p.s?'<div class="bd"><span>Silver '+p.s+' g @ '+inr(CFG.silver)+'</span><b>'+inr(sv)+'</b></div>':"")+'<div class="bd"><span>Making charges</span><b>'+inr(mk)+'</b></div><div class="bd"><span>GST ('+CFG.gst*100+'%)</span><b>'+inr(gs)+'</b></div><div class="bd"><span><b>Estimated total</b></span><b>'+inr(price(p))+'</b></div>';
 $("pc").innerHTML='<div class="pi '+cls(p)+'" style="height:170px">'+art(p)+''+im(p,"m")+'<span class="k">'+mtl(p)+'</span></div><div style="padding:18px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:start"><h2 style="margin:0;font-size:24px">'+p.n+'</h2><button class="ic" id="pmx" aria-label="Close">&times;</button></div>'
 +'<p style="margin:8px 0">'+p.t.map(function(t){return'<span class="chip">'+t+'</span>'}).join("")+'<span class="chip">'+p.d+' style</span><span class="chip">'+p.y+'</span></p>'
 +'<p class="mut" style="font-size:14px">'+SI[p.d]+' '+TI[p.y]+'</p><p class="mut" style="font-size:14px"><b>Purity:</b> '+kinfo+' Hallmark details are available in store.</p>'
 +'<div class="bd"><span>Total weight</span><b>'+p.w+' g</b></div>'+rows
 +'<div style="margin:14px 0"><label for="pz">Size</label><select id="pz">'+p.z.map(function(z){return'<option>'+z+'</option>'}).join("")+'</select></div>'
 +'<p style="display:flex;gap:10px;flex-wrap:wrap;margin:0"><button class="btn gb" id="pa">Add to bag</button><button class="btn o" id="pq">Ask AI about this</button><button class="btn o" id="p3">View in 3D</button>'+(p.im?'<a class="btn o" target="_blank" rel="noopener" href="'+CFG.imgBase+'l/'+p.im+'">Full resolution</a>':"")+'</p><p class="mut" style="font-size:11px">Estimate at the live store rate. The final bill uses the rate at the time you place the order.</p></div>';
 if(zs)$("pz").value=zs;$("pm").className="open";
 $("pmx").onclick=function(){$("pm").className=""};$("pa").onclick=function(){add(p.id,$("pz").value);$("pm").className=""};$("pq").onclick=function(){$("pm").className="";chat(true);send("Tell me about "+p.n+" and who it suits")};$("p3").onclick=function(){view3d(p)}}
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
function orn(){$("orn").innerHTML="";OL.forEach(function(o){var b=document.createElement("button");b.className=F.ty===o[0]?"on":"";b.innerHTML='<svg viewBox="0 0 100 100">'+SH[o[0]]+'</svg>'+o[1]+'<br><small>'+P.filter(function(p){return p.y===o[0]}).length+' designs</small>';b.onclick=function(){F.ty=F.ty===o[0]?"":o[0];sync();grid()};$("orn").appendChild(b)})}
$("cf").onsubmit=function(e){e.preventDefault();wa("Hello AANU Jewellers,\n*CUSTOM ORDER (Customize Mawa)*\nName: "+$("cn").value+"\nMetal: "+$("cm").value+"\nFor: "+$("cg").value+"\nDetails: "+$("cd").value+"\n\nPlease share a quotation at today's rate.");toast("Opening WhatsApp...");this.reset()};

/* ===== AI assistant: local RAG + agent tools + optional Groq ===== */
var KB=[
["Store","AANU Jewellers is at Kantayapalem Road, Thorrur, Warangal, Telangana 506163. Phone and WhatsApp +91 63005 56301. We sell hallmarked gold, sterling silver and custom jewellery."],
["Pricing","Price = metal weight x today's rate + making charges + 3% GST. Gold making is "+(CFG.makingGold*100)+"% and silver making is "+(CFG.makingSilver*100)+"% on this site. Prices are estimates; the store confirms the final bill."],
["Rate lock","Your order is billed at the store rate at the exact time you tap Confirm on WhatsApp; that time and the rates are written into the order message (an order at 1:22 PM uses the 1:22 PM rate). If rates fall before delivery the store refunds the difference as per its price-protection policy; ask the store for written terms. If rates rise you pay the locked price."],
["Karats","24K is purest gold (about 99.9%) and soft, good for coins and gifting. 22K (91.6%) is the standard for traditional jewellery. 20K and 18K have more alloy so they are harder and cheaper per gram, good for daily wear and stone-set pieces."],
["Silver","Silver pieces are 92.5 sterling silver. Combination pieces mix gold and silver and are priced separately for each metal weight."],
["Hallmark","Gold is sold as hallmarked. Ask the store for hallmark details on any piece."],
["Custom orders","Use Customize Mawa to describe your design, metal and weight. It opens WhatsApp and our craftsmen send a quotation at the day's rate. Send reference photos in the chat."],
["Occasions","Marriage: haram, bridal sets, mangalsutra, bangles pairs, groom's chain. Festivals: kasu haram, jhumkas, 24K coins, silver pooja set. Events: rings, fusion necklace, couple rings. Daily wear: light studs, chains, pendants. Kids: bangles, studs, anklets, ceremony sets."],
["Ordering","Add items to the bag and tap Confirm on WhatsApp. No online payment is taken on this site. Visit the showroom to see pieces and confirm sizes."],
["Care","Store gold and silver separately in soft pouches, avoid perfume and chemicals, and wipe silver with a soft cloth. Visit us for cleaning and polishing."]];
P.forEach(function(p){KB.push([p.n,p.n+": "+p.d+" style, "+mtl(p)+", "+p.w+" g, "+p.y+", for "+p.t.join(", ")+", sizes "+p.z.join(", ")+". Estimated price "+inr(price(p))+"."])});
var STOP="the a an is are of to for and or in on at my me you your what how do does can i it with about please tell".split(" ");
function words(t){return(t.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(function(w){return STOP.indexOf(w)<0&&w.length>1})}
function retrieve(q,n){var qs=words(q),N=KB.length,df={},hit=function(x,w){return x===w||(w.length>3&&x.indexOf(w)===0)};qs.forEach(function(w){df[w]=0});
 KB.forEach(function(d){if(!d[2])d[2]=words(d[0]+" "+d[1]);qs.forEach(function(w){if(d[2].some(function(x){return hit(x,w)}))df[w]++})});
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
function say(t,act){var d=document.createElement("div");d.className="m "+(act==="u"?"u":"b");d.textContent=t;$("cl").appendChild(d);$("cl").scrollTop=1e9;return d}
function agent(q){
 var s=q.toLowerCase(),f=parse(q),m,keys=Object.keys(f);
 if(m=s.match(/(\d{2}(?:\.\d)?)\s*mm/)){var mm=+m[1];if(mm>=40&&mm<=75)return{t:"Tool ring_size: circumference "+mm+" mm is about US ring size "+(Math.round((6+(mm-51.8)/2.55)*2)/2)+". Please confirm with our store sizer before ordering.",tool:1}}
 if(/gold rate|silver rate|today.?s rate|rate today|\brates?\b/.test(s)&&!keys.length&&!/lock/.test(s))return{t:"Tool get_rates (updated "+CFG.rateDate+"): 24K "+inr(gr(24))+"/g, 22K "+inr(CFG.gold22)+"/g, 20K "+inr(gr(20))+"/g, 18K "+inr(gr(18))+"/g, silver "+inr(CFG.silver)+"/g.",tool:1};
 if(keys.length&&(f.tag||f.ty||f.metal||f.kt||f.maxw||f.maxp)&&/show|find|suggest|need|want|looking|have|any|under|below|for|gold|silver|ring|chain|bangle|necklace|earring|anklet|pendant/.test(s)){
  F={tag:f.tag||"all",metal:f.metal||"",kt:f.kt||"",wt:"",sz:"",pr:"",ty:f.ty||"",so:"",maxw:f.maxw||0,maxp:f.maxp||0};sync();grid();
  var a=list().slice(0,3);
  return{t:"Tool filter_products applied "+JSON.stringify(f)+". "+(a.length?"Top matches: "+a.map(function(p){return p.n+" ("+mtl(p)+", "+p.w+" g, "+inr(price(p))+")"}).join("; ")+". I have filtered the collection for you.":"No piece matches that. Try a wider weight or budget, or use Customize Mawa."),tool:1,scroll:1}}
 if(/order|buy|book|human|talk|call|whatsapp|contact/.test(s))return{t:"You can reach the store on +91 63005 56301. Tap below to open WhatsApp.",wa:1};
 var r=retrieve(q,3);return{t:r.length?r.map(function(d){return d[1]}).join("\n\n"):"I could not find that in our store information. Please ask on WhatsApp +91 63005 56301.",ctx:r}}
var H=[],TL=[{type:"function",function:{name:"filter_products",description:"Filter the shop and list matching pieces",parameters:{type:"object",properties:{tag:{type:"string",enum:["kids","ladies","men","family","marriage","festival","events","daily"]},type:{type:"string",enum:["ring","bangle","chain","necklace","earrings","anklet","pendant","set"]},metal:{type:"string",enum:["gold","silver","combo"]},karat:{type:"number",enum:[18,20,22,24]},style:{type:"string",enum:STY},max_weight_g:{type:"number"},max_price_inr:{type:"number"}}}}},{type:"function",function:{name:"get_rates",description:"Current gold and silver rates per gram",parameters:{type:"object",properties:{}}}},{type:"function",function:{name:"ring_size",description:"Approx US ring size from finger circumference in mm",parameters:{type:"object",properties:{mm:{type:"number"}},required:["mm"]}}}];
var SC=0;
function runTool(n,a){
 if(n==="get_rates")return"24K "+inr(gr(24))+"/g, 22K "+inr(CFG.gold22)+"/g, 20K "+inr(gr(20))+"/g, 18K "+inr(gr(18))+"/g, silver "+inr(CFG.silver)+"/g, as of "+CFG.rateDate;
 if(n==="ring_size")return"About US size "+(Math.round((6+(a.mm-51.8)/2.55)*2)/2)+" (confirm in store)";
 if(n==="filter_products"){F={tag:a.tag||"all",metal:a.metal||"",kt:a.karat?String(a.karat):"",wt:"",sz:"",pr:"",ty:a.type||"",st:a.style||"",so:"",maxw:a.max_weight_g||0,maxp:a.max_price_inr||0};sync();grid();SC=1;var r=list();return r.length+" matches. "+r.slice(0,5).map(function(p){return p.n+" ("+mtl(p)+", "+p.w+" g, "+inr(price(p))+")"}).join("; ")}
 return"unknown tool"}
async function groq(q){var k=ls("g","aanu_gk");if(!k)return null;try{
 var docs=retrieve(q,4).map(function(d){return d[1]}).join("\n");
 var ms=[{role:"system",content:"You are the AI assistant of AANU Jewellers, Thorrur, Warangal. Use tools to filter the shop, fetch rates or compute ring size. Answer from tools and this context only; be brief and friendly, in the user's language style (English or Telugu-English). Never invent prices or policies; if unsure, suggest WhatsApp +91 63005 56301. Orders are billed at the rate at the exact time the customer taps Confirm on WhatsApp.\nContext:\n"+docs}].concat(H.slice(-6),[{role:"user",content:q}]);
 for(var i=0;i<3;i++){var r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+k},body:JSON.stringify({model:CFG.groqModel,temperature:.3,max_tokens:400,messages:ms,tools:TL,tool_choice:"auto"})});var j=await r.json();var m=j.choices[0].message;
  if(m.tool_calls&&m.tool_calls.length){ms.push(m);m.tool_calls.forEach(function(c){var a={};try{a=JSON.parse(c.function.arguments||"{}")}catch(e){}ms.push({role:"tool",tool_call_id:c.id,content:runTool(c.function.name,a)})});continue}
  return m.content}return null}catch(e){return null}}
async function send(q){
 q=q.trim();if(!q)return;say(q,"u");var th=say("...");SC=0;var out=await groq(q),a=null;
 if(out){H.push({role:"user",content:q},{role:"assistant",content:out})}else{a=agent(q);out=a.t;if(a.scroll)SC=1}
 th.textContent=out;
 if(a&&a.wa){var b=document.createElement("button");b.className="btn gb";b.textContent="Open WhatsApp";b.onclick=function(){wa("Hello AANU Jewellers, I have a question.")};$("cl").appendChild(b)}
 if(SC)$("collections").scrollIntoView();$("cl").scrollTop=1e9}
function chat(open){$("cp").className=open?"open":"";if(open&&!$("cl").children.length){say("Namaste! I am the AANU assistant. Ask me about rates, karats, occasions, or say things like \"22K gold chain for men under 20 grams\" and I will filter the collection.");}}
$("botBtn").onclick=function(){chat(!$("cp").className)};$("askBtn").onclick=function(){chat(true)};$("cx").onclick=function(){chat(false)};
$("kb").onclick=function(){var e=$("ck");e.style.display=e.style.display==="block"?"none":"block"};
$("gk").value=ls("g","aanu_gk")||"";$("gk").onchange=function(){ls("s","aanu_gk",this.value.trim());toast(this.value?"Groq key saved in this browser":"Groq key removed")};
$("cf2").onsubmit=function(e){e.preventDefault();var v=$("cq").value;$("cq").value="";send(v)};
["22K gold chain for men under 20 grams","Bridal sets for marriage","Silver anklets for kids","What is the gold rate?"].forEach(function(t){var b=document.createElement("button");b.textContent=t;b.onclick=function(){send(t)};$("cc").appendChild(b)});

function showRates(){
 var d=CFG.gold22-BASE.g,ds=CFG.silver-BASE.s;
 function ar(x){x=Math.round(x);return x>0?' <i class="up">\u25B2 '+x+'</i>':x<0?' <i class="dn">\u25BC '+Math.abs(x)+'</i>':""}
 var h=[24,22,20,18].map(function(k){return'<span><b>'+k+'K Gold</b> '+inr(gr(k))+'/g'+ar(d*k/22)+'</span>'}).join("")+'<span><b>Silver</b> '+inr(CFG.silver)+'/g'+ar(ds)+'</span><span>Store rates as of '+CFG.rateDate+' (changes vs your last visit)</span>';
 $("tk").innerHTML='<div class="tki">'+h+h+'</div>';
 [["g24",gr(24)],["g22",CFG.gold22],["g20",gr(20)],["g18",gr(18)],["sv",CFG.silver]].forEach(function(x){$(x[0]).textContent=inr(x[1])});$("rd").textContent=CFG.rateDate;
 ls("s","aanu_pv",JSON.stringify({g:CFG.gold22,s:CFG.silver}))}
function loadRates(){try{fetch("rates.json",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j||!j.gold22)return;var ch=+j.gold22!==CFG.gold22||+j.silver!==CFG.silver||(j.updated&&j.updated!==CFG.rateDate);CFG.gold22=+j.gold22;CFG.silver=+j.silver||CFG.silver;if(j.updated)CFG.rateDate=j.updated;if(ch){showRates();grid();if($("dr").className)draw()}}).catch(function(){})}catch(e){}}
showRates();loadRates();setInterval(loadRates,60000);
$("wab").href="https://wa.me/"+CFG.phone+"?text="+encodeURIComponent("Hello AANU Jewellers, I would like to enquire about your jewellery.");
try{var v=JSON.parse(ls("g","aanu_cart3")||"[]");if(Array.isArray(v))cart=v.filter(function(x){return pOf(x.id)&&x.q>0})}catch(e){}
filters();tabs();orn();grid();badge();
}
fetch("data/products.json").then(function(r){return r.ok?r.json():null}).then(function(j){if(j&&j.length)D=j}).catch(function(){}).then(main);
(function(){function rt(v){return v==="s"?CFG.silver:Math.round(CFG.gold22*v/22)}
function f(n){return"\u20B9 "+Math.round(n).toLocaleString("en-IN")}
function go(){var v=document.getElementById("qm").value,g=+document.getElementById("qg").value,o=document.getElementById("qo");if(!g||g<=0){o.textContent="Enter the weight in grams.";return}
var r=rt(v),b=g*r,mk=b*(v==="s"?CFG.makingSilver:CFG.makingGold),gs=(b+mk)*CFG.gst;
o.innerHTML="Metal value "+f(b)+" ("+g+" g @ "+f(r)+"/g)<br>Making "+f(mk)+"<br>GST "+f(gs)+"<br><b>Estimated total "+f(b+mk+gs)+"</b>"}
document.getElementById("qb").onclick=go;document.getElementById("qg").oninput=go})();
if("serviceWorker" in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register("sw.js").catch(function(){});
