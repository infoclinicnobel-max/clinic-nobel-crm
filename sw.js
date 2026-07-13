// Service Worker Clinic Nobel — v3 (récupération automatique des anciennes versions)
// 1. NETWORK-FIRST (no-store) pour l'application : la version fraîche est toujours
//    tentée en premier ; le cache ne sert QUE hors ligne.
// 2. STALE-WHILE-REVALIDATE pour les images : servies immédiatement du cache,
//    revalidées en arrière-plan.
// 3. À l'activation : purge des anciens caches, prise de contrôle immédiate
//    (skipWaiting + clients.claim), puis RECHARGEMENT UNIQUE de chaque page
//    contrôlée (client.navigate). C'est ce qui débloque les téléphones restés
//    sur une ancienne version, sans aucune action de l'utilisateur.
//    Aucune boucle possible : "activate" ne s'exécute qu'UNE fois par version
//    du SW, et ne se redéclenche qu'au prochain déploiement d'un sw.js différent.
const CACHE = "clinic-nobel-v3";
const FILES = ["./index.html"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES))
      .catch(() => {})               // hors ligne à l'install : on activera quand même
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    // 1) Purge de tous les anciens caches versionnés.
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    // 2) Prise de contrôle immédiate des pages ouvertes.
    await self.clients.claim();
    // 3) Rechargement UNIQUE et sûr des pages contrôlées : les clients qui
    //    affichaient une ancienne version rechargent et reçoivent la nouvelle
    //    (network-first). Un client déjà à jour recharge une fois, sans boucle,
    //    car cette étape ne rejoue qu'à la PROCHAINE version du SW.
    try {
      const clis = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      await Promise.all(clis.map(c => { try { return c.navigate(c.url); } catch (_) { return null; } }));
    } catch (_) {}
  })());
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const isApp = e.request.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname === "/";
  if (isApp) {
    // Réseau d'abord, en contournant tout cache HTTP intermédiaire (no-store).
    // Le cache applicatif ne sert QUE hors ligne.
    e.respondWith(
      fetch(new Request(e.request, { cache: "no-store" }))
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(()=>{}); return r; })
        .catch(() => caches.match("./index.html"))
    );
  } else if (url.pathname.match(/\.(jpg|jpeg|png|webp|svg|ico)$/)) {
    // Statiques : stale-while-revalidate — cache immédiat, revalidation en fond.
    e.respondWith(
      caches.match(e.request).then(cached => {
        const refresh = fetch(e.request)
          .then(n => { const copy = n.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{}); return n; })
          .catch(() => null);
        return cached || refresh.then(n => n || Response.error());
      })
    );
  }
  // Tout le reste (Apps Script, CDN…) : réseau direct, jamais intercepté.
});
