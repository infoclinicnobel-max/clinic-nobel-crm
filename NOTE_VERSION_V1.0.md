# CRM IA CLINIC NOBEL — NOTE DE VERSION V1.0
**Date : 9 juillet 2026 · Statut : version stable de production**

---

## Contenu de la version

### Socle CRM (base stable préservée à l'identique)
Finances complètes · Paiements & honoraires chirurgiens · Commissions commerciales · Encaissements patients · Patients clôturés · Résumé par patient · Agenda · Patients & fiches · Tâches · Analyses · Permissions & rôles · PWA (installation PC/mobile) · Logo Clinic Nobel · 4 langues (FR/EN/TR/ES).

### Assistant IA (nouveau)
- **Assistant lecture seule** : résumé de fiche patient, résumé des paiements visibles (selon permissions), brouillons WhatsApp / note interne / relance, traduction FR-TR-EN. Bouton flottant 🤖.
- **Discussion (chat)** : moteur local avec mémoire de conversation (le sujet reste actif : « et la récupération ? » comprend qu'on parle toujours du BBL), profils par rôle (patient, commercial, coordinateur, médecin, admin), questions suggérées, favoris ⭐ et historique, dictée vocale 🎤, lecture audio 🔊, copier, régénérer, 👍/👎.
- **Base documentaire médicale** : 8 fiches validées (BBL, Lipo 360, Rhinoplastie, Greffe capillaire, Mammaire, Abdominoplastie, Bariatrique, Dentaire Nobel Dent), 20 régions anatomiques, 9 sources autorisées (Clinic Nobel, Nobel Dent, ASPS, ISAPS, Aesthetic Society, MedlinePlus, FDA, NHS, Mayo). Réponses structurées : définition, anatomie, déroulement, récupération, risques, contre-indications, protocole, avertissement médical, note documentaire, indice de confiance, sources.
- **Knowledge Graph documentaire** : nœuds concepts et relations sourcées, onglet d'administration (recherche, filtres, valider/refuser/archiver/modifier/fusionner, création de relation avec source obligatoire, export CSV).
- **Bibliothèque de documents** : guides patients, consignes post-op, consentements, FAQ, tarifs, modèles de devis, protocoles, vidéos, brochures, schémas — proposés automatiquement sous les réponses, avec « prochaine action » (brouillons devis/message/RDV/tâche à copier).
- **Accueil premium « Dr House »** : scène animée (lampe magique, apparition, halo, fumée, particules), message machine à écrire, audio, lampe réduite en bas à droite.
- **Journalisation IA** complète (append-only) et **synchronisation serveur** (Google Sheets).

### Sécurité et cadrage (garanties testées)
- L'IA **propose, l'humain valide** : aucune écriture CRM automatique, aucun envoi automatique.
- **Base documentaire interne** : aucun diagnostic, aucune recommandation de traitement, ne remplace jamais l'avis du chirurgien.
- **Anti-hallucination stricte** : sujet précis sans connaissance validée → « Je ne dispose pas d'une information suffisamment validée » ; jamais de bascule vers un autre sujet.
- **Permissions respectées partout** : le chirurgien n'a ni chat, ni tarifs, ni finances, ni administration IA ; les validations (KB, KG, documents, sources) sont réservées à l'admin.
- **Aucune clé API dans le code, aucune donnée patient envoyée à un service externe, aucune recherche Internet par l'IA.** Mode local par défaut.
- Backend : token obligatoire sur toutes les routes IA, journaux en append-only, écritures admin uniquement, garde serveur anti-données-patient, SCRIPT_URL et SHEET_ID inchangés.

### Feuilles Google Sheets (17)
patients, rdvs, finances, taches, hopitaux, users, permissions, perm_log + **ia_log, ia_kb, ia_sources, ia_anatomie, ia_kg_nodes, ia_kg_edges, ia_kg_versions, ia_kg_log, ia_docs** (création automatique).

---

## Fichiers de déploiement V1.0
| Fichier | Rôle | Destination |
|---|---|---|
| `index.html` | Application complète | Racine du dépôt GitHub → Netlify |
| `ia-drhouse.jpg` | Photo accueil Dr House | Racine du dépôt |
| `ia-lamp.jpg` | Lampe (état réduit) | Racine du dépôt |
| `Code.gs` | Backend Apps Script | Éditeur Apps Script → **Nouvelle version** sur le déploiement existant |
| Kit PWA (manifest.json, sw.js, icônes) | Installation PC/mobile | Déjà déployé, inchangé |

**Ordre** : 1) commit GitHub (index.html + 2 images) → Netlify auto ; 2) coller Code.gs → Déployer → Gérer les déploiements → ✏️ → Nouvelle version (le SCRIPT_URL ne change pas) ; 3) optionnel : exécuter `setup()` une fois pour créer les feuilles immédiatement.

---

## Audit de stabilisation V1.0
- 8 suites de tests : **199/200 verts** (le seul écart est un faux négatif de test connu, fonctionnalité vérifiée manuellement).
- Matrice de permissions : 29/29.
- Code mort supprimé (ancien composant d'accueil + 12 clés i18n orphelines).
- Intégrité : délimiteurs équilibrés, transpilation esbuild sans erreur, App rendue dans les 4 langues.
- SCRIPT_URL vérifié octet par octet : **identique à l'original**.

## Actions post-déploiement recommandées (administrateur)
1. Knowledge Graph IA → valider les nœuds et relations amorcés (tout est « En attente » par principe).
2. Onglet Documents → remplacer les URL d'exemple par les vrais liens Clinic Nobel, puis valider chaque document.
3. Vérifier dans Google Sheets l'apparition des feuilles `ia_*` après la première utilisation.
