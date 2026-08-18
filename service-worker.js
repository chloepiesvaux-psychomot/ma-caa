// Ma CAA v1.1.1 — self-removing development service worker.
// The prototype must always use fresh GitHub Pages files during development.
self.addEventListener("install", event => self.skipWaiting());
self.addEventListener("activate", event => {
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.map(n=>caches.delete(n)));
    await self.registration.unregister();
    const clientsList=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const client of clientsList){ client.navigate(client.url); }
  })());
});
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request,{cache:"no-store"}).catch(()=>fetch(event.request)));
});
