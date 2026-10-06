// Service worker: met toute l'app en cache pour qu'elle marche hors ligne à la salle.
// Change VERSION à chaque déploiement pour forcer la mise à jour du cache.
const VERSION = "salle-v3";
const CORE = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/apple-touch-icon.png",
 "icons/icon.svg",
 "img/backext-0.jpg",
 "img/backext-1.jpg",
 "img/cablerow-0.jpg",
 "img/cablerow-1.jpg",
 "img/calf-0.jpg",
 "img/calf-1.jpg",
 "img/calfpress-0.jpg",
 "img/calfpress-1.jpg",
 "img/chestpress-0.jpg",
 "img/chestpress-1.jpg",
 "img/crunch-0.jpg",
 "img/crunch-1.jpg",
 "img/fly-0.jpg",
 "img/fly-1.jpg",
 "img/hack-0.jpg",
 "img/hack-1.jpg",
 "img/hipthrust-0.jpg",
 "img/hipthrust-1.jpg",
 "img/incline-0.jpg",
 "img/incline-1.jpg",
 "img/inclinecurl-0.jpg",
 "img/inclinecurl-1.jpg",
 "img/latraise-0.jpg",
 "img/latraise-1.jpg",
 "img/legcurl-0.jpg",
 "img/legcurl-1.jpg",
 "img/legext-0.jpg",
 "img/legext-1.jpg",
 "img/legpress-0.jpg",
 "img/legpress-1.jpg",
 "img/legraise-0.jpg",
 "img/legraise-1.jpg",
 "img/ohtri-0.jpg",
 "img/ohtri-1.jpg",
 "img/onearm-0.jpg",
 "img/onearm-1.jpg",
 "img/preacher-0.jpg",
 "img/preacher-1.jpg",
 "img/pulldown-0.jpg",
 "img/pulldown-1.jpg",
 "img/pushdown-0.jpg",
 "img/pushdown-1.jpg",
 "img/rdl-0.jpg",
 "img/rdl-1.jpg",
 "img/reardelt-0.jpg",
 "img/reardelt-1.jpg",
 "img/row-0.jpg",
 "img/row-1.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Cache d'abord, puis réseau en arrière-plan pour rafraîchir (polices Google comprises).
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const ok = url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!ok) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const hit = await cache.match(req, { ignoreSearch: url.origin === location.origin });
      const net = fetch(req).then((res) => { if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
