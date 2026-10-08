const V="aanu-v1";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
 if(e.request.method!=="GET"||u.origin!==location.origin||u.pathname.endsWith("rates.json")||u.pathname.indexOf("/api/")===0||u.pathname.includes("/img/l/"))return;
 e.respondWith(caches.open(V).then(c=>c.match(e.request).then(h=>{const n=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>h);return h||n})))});
