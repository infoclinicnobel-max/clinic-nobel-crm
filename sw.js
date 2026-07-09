// Service Worker Clinic Nobel — v2 (correctif synchronisation/mise à jour)
// Stratégie : NETWORK-FIRST pour l'application (index.html / navigations),
// avec repli sur le cache uniquement HORS LIGNE. Le cache est versionné et
// les anciennes versions sont purgées à l'activation : plus jamais d'ancienne
// version servie après un déploiement Netlify.
const CACHE = "clinic-nobel-v2";
const FILES = ["./index.html"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const isApp = e.request.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname === "/";
  if (isApp) {
    // Réseau d'abord (version fraîche), cache seulement hors ligne.
    e.respondWith(
      fetch(e.request)
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(()=>{}); return r; })
        .catch(() => caches.match("./index.html"))
    );
  } else if (url.pathname.match(/\.(jpg|jpeg|png|webp|svg|ico)$/)) {
    // Images : cache d'abord (elles sont versionnées par leur nom), réseau sinon.
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(n => { const copy=n.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{}); return n; })));
  }
  // Tout le reste (Apps Script, CDN…) : réseau direct, jamais intercepté.
});
