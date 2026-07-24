# LOT 1 — AJOUT D'UN CHIRURGIEN · RAPPORT

**Recette LOT 1 : 34/34. Smoke de non-régression : 21/21.** Fichiers modifiés : `index.html` + **`Code.gs` (exactement 1 ligne)**.

---

## ⚠️ Incident d'environnement à te signaler (transparence due)

Mon environnement de travail a été **réinitialisé en cours de développement** : les 51 suites de tests historiques (~1720 assertions), stockées en zone temporaire, **ont été perdues**. Mes fichiers de travail (`index.html`, `Code.gs`) ont survécu et sont intègres.

Conséquence sur ce rapport : je ne peux pas exécuter la batterie historique complète. À la place, j'ai vérifié :
1. **La recette LOT 1 complète** (34 assertions, dont rendus réels du composant) ;
2. **Un smoke structurel de non-régression** (21 assertions) confirmant que TOUS les correctifs livrés récemment sont intacts dans le fichier : BUG A, reste net, ventilation des modes, date d'intervention + motif, SW/controllerchange/sas localStorage/boutons de secours, bulles glassmorphism, splash logo, correctif rdvId, synchronisation RDV→tâches ;
3. **Le rendu complet de l'App dans les 4 langues** (aucune erreur).

Les suites détaillées seront **reconstituées progressivement** à chaque prochain chantier (chaque bug/fonctionnalité récrée sa suite). Si tu préfères que je reconstruise d'abord un socle de tests avant tout nouveau développement, dis-le — c'est une option légitime.

---

## La ligne exacte ajoutée dans Code.gs (seule modification serveur)

```js
medecins: ["id","prenom","nom","nomAffiche","photo","spec","sousSpecs","hopital","hopitauxSecondaires","tel","email","whatsapp","adresse","bio","diplomes","langues","experience","color","icon","actif","procedures","creePar","cree","historique"],
```
Insérée après la ligne `hopitaux` dans la config `SHEETS`. La feuille se crée automatiquement au premier accès ; les routes génériques add/update la servent sans autre changement. **Rien d'autre n'a été touché dans Code.gs** (vérifié : 1 seule occurrence, SHEET_ID intact).

## Ce qui est en place (rubrique Médecins)

- **Bouton « ➕ Ajouter un chirurgien »** — visible **Admin/PDG uniquement** (`isFullRole`) ; la coordinatrice voit tout mais sans bouton (testé par rendu réel des deux rôles).
- **Formulaire complet** : Prénom*, Nom*, Photo (URL), Spécialité, Sous-spécialités, Hôpital principal, Hôpitaux secondaires, Téléphone, E-mail, WhatsApp, Adresse, Biographie, Diplômes, Langues, Années d'expérience, Couleur, Icône, Actif/Inactif — et tes **10 interventions en cases à cocher** + champ « Autres interventions » libre.
- **`nomAffiche`** généré automatiquement (« Dr Prénom Nom »).
- **Fusion** : les 5 fiches historiques restent en dur (non éditables, badge et boutons de gestion absents chez elles), les dynamiques s'ajoutent dans la même liste et le même écran de détail (avec leurs champs riches : bio, langues, WhatsApp…).

## Tes règles supplémentaires — implémentées et testées

| Règle | Implémentation | Test |
|---|---|---|
| `nomAffiche` unique | comparaison **normalisée** (casse, accents, espaces) contre la liste fusionnée | 4-7 |
| Doublon exact **ou quasi identique** bloqué | « dr  anvar  ahmedov » et « Dr Elif Ozturk » détectés comme doublons | 5 |
| Renommage verrouillé si utilisé | vérifie RDV (`medecin`), patients (`medecin`), finances (notes chirurgien) → prénom/nom **désactivés** + blocage au save + message | 8-10 |
| Désactivation ≠ suppression | toggle avec **confirmation**, historique en **append** (jamais écrasé), **aucun** `delete` sur medecins dans tout le code | 11-13 |
| Inactif visible dans l'existant | badge « Inactif » en liste et détail, fiche conservée. (Exclusion des **sélecteurs** : LOT 2, non touchés ici) | 14 |
| Aucun médecin existant ne disparaît | les 5 fiches en dur intactes mot pour mot | 15 |
| Aucun calcul Finances modifié | vérifié (BUG A, reste net, ventilation intacts) | smoke |

## Périmètre vérifié

Les 2 selects RDV et `MEDECINS_LIST` sont **volontairement intacts** (LOT 2). Hopitaux intact. i18n : 30 clés × 4 langues.

## Test terrain (avant validation du LOT 1)

1. Déployer **`index.html` ET `Code.gs`** (le Code.gs est nécessaire cette fois — 1 ligne).
2. Rubrique Médecins (compte admin) : bouton ➕ visible → créer un chirurgien de test complet.
3. Vérifier : il apparaît dans la liste avec les 5 autres ; sa fiche détail montre tous les champs ; la feuille `medecins` s'est créée dans ton Google Sheets.
4. Tenter un doublon (« dr anvar ahmedov ») → refus.
5. Le désactiver → badge Inactif, fiche toujours là, historique conservé.
6. Compte coordinatrice : tout visible, aucun bouton.
7. Vérifier qu'un RDV, les Finances et l'Agenda fonctionnent comme avant (rien ne doit avoir bougé).

**LOT 2 (sélecteurs RDV, filtres, Agenda/Bloc op./Stats, dédoublonnage des listes) : uniquement après ta validation du LOT 1 en réel.**
