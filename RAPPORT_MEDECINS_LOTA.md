# LOT A — PERSISTANCE DES CHIRURGIENS DYNAMIQUES · RAPPORT

**Recette LOT A : 34/34. Total des suites disponibles : 89/89, zéro échec.** Fichiers modifiés : `index.html` + `Code.gs` (**un mot ajouté**).

---

## Code.gs — la modification exacte (cumul pour la fonctionnalité : 2 lignes)

```js
var DATA_TYPES = ["patients","rdvs","finances","taches","hopitaux","medecins"];
```
Le mot `"medecins"` ajouté à la liste des types autorisés (L98). Avec la ligne de colonnes du LOT 1, le serveur **sert désormais réellement** la collection : GET renvoie les données, POST écrit dans Sheets (et crée la feuille au premier ajout). Rien d'autre n'a été touché (vérifié).

## Tes règles obligatoires — implémentées et testées une à une

| Règle | Implémentation | Test |
|---|---|---|
| `null`/erreur réseau : ne jamais écraser | `api.get` renvoie `null` en erreur → ignoré partout (loadAll + composant) | 7 |
| **Tableau vide : ne jamais remplacer une liste non vide** | garde `(serveur.length>0 \|\| local.length===0)` dans loadAll ET dans le composant — **le scénario exact de ton bug est rejoué en test et ne peut plus se produire** | **6**, 8, 9 |
| Échec POST : jamais affiché comme réussi | `api.post` est en `no-cors` (réponse illisible) → j'ai ajouté une **confirmation par relecture** : après chaque écriture, un GET vérifie que l'id est présent côté serveur | 10-13, 19 |
| Ajout au state après confirmation, **ou rollback garanti** | mise à jour optimiste (UX) + instantané `prevList` ; si la relecture prouve le rejet (id absent) → **rollback complet du state et du cache** | 11, 18, 20 |
| Message clair | rejet avéré → **« Enregistrement du chirurgien impossible — aucune donnée n'a été perdue. »** (ton libellé exact, 4 langues). Hors ligne (relecture impossible) → message distinct « conservé localement, sera confirmé à la prochaine synchronisation » — jamais un faux « réussi » | 12-13, 21, 23-24 |
| `medecins` dans `loadAll` | chargé au démarrage avec les autres données métier, même garde anti-vide, comptabilisé dans le bandeau d'erreur partielle | 14-16 |

La **désactivation** (`toggleActif`) a la même protection : si la relecture montre que le serveur n'a pas pris le changement, rollback + message (test 22).

## Pourquoi la « confirmation par relecture »

Ton architecture d'écriture (`api.post`) est en mode `no-cors` — contrainte Apps Script : **la réponse du POST est illisible par construction**. Plutôt que de refactorer la couche réseau (interdit, et risqué), la relecture GET après écriture fournit une **preuve réelle** côté serveur en réutilisant les briques existantes. C'est le correctif minimal qui satisfait « confirmation serveur ou rollback garanti ».

## Périmètre vérifié

Patients/RDV/Tâches dans `loadAll` : inchangés (test 25). Correctif rdvId, sync RDV→tâches, Finances, fusion LOT 1 : intacts (26-29). Selects RDV : toujours intacts — **LOT B et LOT 2 à venir** (30). App rendue dans les 4 langues.

## Test terrain (avant validation du LOT A)

1. **Déployer `Code.gs`** (indispensable — c'est lui qui débloque tout) **puis `index.html`**. ⚠️ Redéploiement Apps Script : Déployer → Gérer les déploiements → modifier → Nouvelle version.
2. Recréer ton chirurgien de test → vérifier dans Google Sheets que la feuille `medecins` **existe et contient la ligne**.
3. Recharger complètement la page (et depuis un autre appareil) → **le chirurgien doit être là**.
4. Test du message : coupe le réseau, crée un chirurgien → message « vérification impossible » (pas de faux succès) ; rétablis le réseau, synchronise.
5. Vérifier qu'Agenda, RDV, Finances, Bloc et filtres fonctionnent comme avant.

**LOT B (réattribution du chirurgien dans la fiche patient) : uniquement après ta validation terrain du LOT A**, comme convenu — sa recette et son rapport seront séparés.
