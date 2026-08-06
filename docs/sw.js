// ══ Service Worker Clinic Nobel — v4 : AUTO-RETRAIT (bascule vers Vercel) ══
//
// Remplace le v3 (réseau d'abord + cache hors ligne). Sa seule mission est de
// se supprimer proprement et de faire repasser les postes par la page de
// bascule, qui les envoie vers crm.clinicnobel.com.
//
// Il DOIT être servi à la même URL que le v3
// (https://infoclinicnobel-max.github.io/clinic-nobel-crm/sw.js), sinon le
// navigateur ne le reconnaît pas comme une mise à jour et le v3 reste en place.
// C'est le cas : GitHub Pages sert le dossier choisi comme racine du site,
// donc docs/sw.js est publié à cette même adresse.
//
// Détail qui compte : WindowClient.navigate() n'accepte QUE des URL de même
// origine — impossible d'envoyer directement les clients vers le nouveau
// domaine depuis ici. On les renvoie donc sur "./", qui sert désormais la page
// de bascule, et c'est elle qui franchit la frontière d'origine.

self.addEventListener("install", function(e){
  // Pas de mise en cache : ce worker ne sert plus rien.
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil((async function(){
    // 1) Purge de tous les caches laissés par les versions précédentes.
    try{
      const keys = await caches.keys();
      await Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }catch(_){}

    // 2) Prise de contrôle, pour pouvoir renvoyer les pages ouvertes.
    try{ await self.clients.claim(); }catch(_){}

    // 3) Renvoi des clients vers la page de bascule (même origine, obligatoire).
    try{
      const clis = await self.clients.matchAll({ type:"window", includeUncontrolled:true });
      await Promise.all(clis.map(function(c){
        try{ return c.navigate("./"); }catch(_){ return null; }
      }));
    }catch(_){}

    // 4) Auto-suppression, en dernier : une fois désenregistré, ce worker
    //    n'intercepte plus rien et le poste repart sur le réseau nu.
    try{ await self.registration.unregister(); }catch(_){}
  })());
});

// Aucun gestionnaire "fetch" : tout passe directement au réseau. C'est ce qui
// garantit qu'aucune ancienne version ne peut plus être servie depuis un cache.
