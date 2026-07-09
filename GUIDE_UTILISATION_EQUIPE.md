# GUIDE D'UTILISATION — CRM IA CLINIC NOBEL (V1.0)
*Pour l'équipe : Veys (admin), Andréa (commerciale), Ceyda (coordinatrice), chirurgiens partenaires.*

---

## 1. Accès et installation
- **Adresse** : votre lien Netlify habituel, connexion avec vos identifiants.
- **Installer comme application** : PC Chrome → icône « Installer » dans la barre d'adresse. Android → menu ⋮ → « Installer l'application ». L'app s'ouvre alors sans barre de navigateur.
- **Langues** : FR / EN / TR / ES depuis le sélecteur habituel.

## 2. L'accueil « Dr House »
À votre première connexion, une scène d'accueil apparaît : le Dr House sort de la lampe magique et vous présente l'assistant (texte + audio 🔊). Fermez-la avec ✕ — elle ne réapparaîtra plus, mais la **lampe dorée** reste en bas à droite : cliquez dessus pour revoir l'accueil à tout moment. Le bouton **🤖** juste en dessous ouvre l'assistant.

## 3. L'assistant IA — ce qu'il fait
Deux onglets dans le panneau 🤖 :

**Assistant (lecture seule)** — ouvrez d'abord une fiche patient, puis :
- 📋 Résumer la fiche patient · 💳 Résumer les paiements visibles · 📲 Brouillon WhatsApp · 📝 Brouillon note interne · 🔔 Proposer une relance · 🌐 Traduire (FR/TR/EN).
- Le résultat s'affiche avec un bouton **Copier**. Rien n'est envoyé, rien n'est enregistré : **vous** collez le texte où vous voulez, après vérification.

**Discussion (chat)** :
- Posez vos questions librement : « Qu'est-ce qu'un BBL ? », puis « et la récupération ? », « quel prix ? » — l'assistant **garde le sujet en mémoire** (pastille 🧠, cliquez ✕ pour changer de sujet).
- Sous chaque réponse médicale : l'indice de confiance 🟢, les sources, les **documents Clinic Nobel** 📄 (guides, schémas 🖼, tarifs 💶 si vous y avez droit), les **concepts liés** 🔗, et les puces **⚡ Prochaine action** (préparer un devis, un message, un RDV, une tâche → un brouillon à copier, jamais une création automatique).
- Boutons sur chaque réponse : 🔊 lire à voix haute · 📋 copier · 🔄 régénérer · ⭐ mettre en favori · 👍/👎.
- 🎤 **Dictée vocale** : parlez, le texte s'écrit, vous pouvez le corriger avant d'envoyer (fonctionne mieux sur Chrome/Android).

## 4. Ce que l'IA ne fait JAMAIS (à connaître)
- Elle **ne modifie rien** dans le CRM : ni patient, ni paiement, ni devis, ni rendez-vous, ni tâche. Elle prépare des brouillons, **vous validez et saisissez**.
- Elle **n'envoie aucun message** automatiquement.
- Elle **n'invente pas** : si une information n'est pas dans la base validée, elle répond « Je ne dispose pas actuellement d'une information suffisamment validée ».
- Elle **ne pose aucun diagnostic** et ne remplace jamais l'avis du chirurgien — c'est une base documentaire interne.
- Elle **n'envoie aucune donnée patient** à l'extérieur (tout fonctionne en local).

## 5. Selon votre rôle
- **Andréa (commerciale)** : salutations et astuces adaptées à la vente ; l'assistant propose devis/relance/message ; les tarifs apparaissent si vous avez le droit finances. Pas d'accès aux honoraires chirurgiens ni aux marges.
- **Ceyda (coordinatrice)** : réponses orientées organisation/administratif ; mêmes outils de brouillons.
- **Chirurgiens** : accès à l'assistant en lecture et à la documentation médicale ; **pas de chat**, pas de tarifs, pas de coordonnées patients, pas de finances.
- **Veys (admin)** : tout, plus l'administration IA (ci-dessous).

## 6. Administration (Veys uniquement) — menu « 🕸 Knowledge Graph IA »
Trois onglets :
- **Relations** et **Nœuds** : tout est amorcé « En attente ». Validez ✓ ce que vous approuvez (les concepts liés apparaissent alors dans le chat). Refusez ✕, archivez 🗄, modifiez ✏️, fusionnez ⇄ les doublons. **Créer une relation** : la source est obligatoire. Export CSV 📥 disponible.
- **Documents** : remplacez les URL d'exemple par vos vrais liens (Drive, site), puis validez. Un document validé est proposé automatiquement dans le chat pour son sujet, et une relation « documenté par » (ou « illustré par » pour un schéma) est **proposée** dans le graphe — à valider ensuite dans Relations.
- Chaque action est journalisée (feuilles `ia_log`, `ia_kg_log` dans Google Sheets).

## 7. En cas de problème
- **L'IA répond « information non validée »** : normal — le sujet n'a pas de fiche validée. Admin : compléter/valider la base.
- **La dictée ne marche pas** : utilisez Chrome (Safari iOS est limité) ; le champ texte fonctionne toujours.
- **L'audio d'accueil ne se lance pas tout seul** : le navigateur l'a bloqué — cliquez « 🔊 Écouter le message ».
- **Un document ne s'ouvre pas** : vérifier son URL dans l'onglet Documents (admin).
- **Données pas à jour entre appareils** : elles se synchronisent à la connexion ; reconnectez-vous ou utilisez « Synchroniser maintenant ».

## 8. Règle d'or
> **L'IA propose, l'humain valide.** Relisez toujours un brouillon avant envoi, et rappelez-vous : pour toute question médicale d'un patient, la réponse de référence reste celle du chirurgien et de l'équipe médicale.
