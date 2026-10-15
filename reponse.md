# Kit de pilotage — Standardisation des pipelines CI/CD pour Lambda

## 1. Point de départ

Le ticket appartient au projet de modernisation de la chaîne CI/CD. Il contient **quatre sous-tâches** et la sous-tâche suivie ici — **standardisation des pipelines pour Lambda** — est déjà créée et assignée à un DevOps.

Le pilotage commence donc à partir du ticket existant : il ne faut ni recréer la tâche ni la décomposer davantage sans besoin réel. Le chef de projet doit rendre l’objectif et le résultat attendus explicites, vérifier les dépendances et faciliter les décisions. Le DevOps reste responsable de la conception et de la réalisation technique.

Le dépôt ne contenait pas de fichier de réponse existant sur la branche `main`. Le présent document est donc créé comme nouveau fichier `reponse.md`.

## 2. Livrables créés

- **`pilotage-sous-tache-ci-cd.html`** : modèle HTML autonome, avec design responsive, champs éditables, description Jira à préparer, journal de suivi, checklist et workflow Kanban modifiable par glisser-déposer. Les cartes peuvent être renommées, décrites, déplacées, ajoutées ou supprimées. L’enregistrement local conserve les données dans le navigateur utilisé ; l’impression permet une sortie PDF.
- **`reponse.md`** : explication du point de départ, conseils de pilotage, structure Jira et bonnes pratiques.

Le workflow visuel du HTML est un support de préparation et de discussion : il ne met pas à jour Jira automatiquement et ne remplace pas le workflow configuré dans l’entreprise.

## 3. Ce qu’il faut définir avant de demander davantage au DevOps

Limiter le cadrage à quelques éléments essentiels :

1. **Objectif** : quel résultat concret signifie que la standardisation Lambda est terminée ?
2. **Périmètre** : quelles fonctions, dépôts, environnements ou cas d’usage sont concernés ? Qu’est-ce qui est explicitement hors périmètre ?
3. **Livrables** : configuration ou pipeline de référence, documentation minimale, résultat de validation.
4. **Critères d’acceptation** : comment l’équipe saura-t-elle que le résultat répond au besoin ?
5. **Dépendances** : accès, sécurité, environnements, décisions ou équipes externes.
6. **Prochaine étape** : action concrète, responsable et date uniquement si nécessaire.

Si une information n’est pas connue, la noter comme **à clarifier** et identifier qui peut la confirmer. Ne pas inventer une date, un environnement ou une exigence technique.

## 4. Description recommandée dans Jira

Garder une structure stable et concise :

- **Contexte / objectif** — pourquoi cette sous-tâche existe et quel résultat est attendu.
- **Périmètre / hors périmètre** — ce qui est inclus et les exclusions utiles.
- **Livrables attendus** — éléments concrets à fournir.
- **Critères d’acceptation** — conditions observables pour considérer le travail terminé.
- **Dépendances / risques / questions ouvertes** — uniquement les éléments qui peuvent influencer l’avancement.

Ne pas imposer dans la description une solution technique qui relève de l’expertise DevOps, sauf si cette décision a déjà été validée. Réutiliser les informations du ticket parent et des autres sous-tâches plutôt que les recopier en détail.

### Exemple de critères d’acceptation

- Le périmètre et les prérequis sont confirmés.
- Le standard convenu est disponible et documenté.
- Une validation sur un cas représentatif est réalisée, avec un résultat traçable.
- Les écarts, risques et actions restantes sont consignés dans Jira.

À ajuster avec l’équipe : ces critères sont une base de discussion, pas une affirmation que toutes les exigences Lambda sont déjà connues.

## 5. États Jira : règles simples

Les noms exacts dépendent du workflow Jira de l’entreprise. Utiliser les états existants plutôt que créer de nouveaux statuts sans nécessité.

| État | Quand l’utiliser |
|---|---|
| **À faire** | La sous-tâche est créée et assignée, mais la réalisation n’a pas commencé. |
| **En cours** | Le cadrage est suffisamment clair et le travail de réalisation est effectivement engagé. |
| **À valider / En revue** | Le livrable est disponible et les critères d’acceptation doivent être vérifiés. Si cet état n’existe pas, utiliser le statut prévu par le workflow. |
| **Bloqué** | Un obstacle réel empêche d’avancer. Si Jira ne propose pas cet état, garder le statut adapté et signaler clairement le blocage dans un commentaire. |
| **Terminé** | Les critères convenus sont satisfaits, le résultat est traçable et les suites éventuelles sont documentées. |

**Important :** ne pas passer en « Terminé » uniquement parce que le développement est fini. La validation convenue et la documentation minimale doivent également être prises en compte.

## 6. Commentaires : quand et quoi écrire

Les commentaires doivent laisser une trace utile, pas reproduire chaque échange. En publier lorsqu’il y a :
- une progression ou un livrable significatif ;
- une clarification ou une décision ;
- un blocage, son impact et l’aide attendue ;
- un résultat de validation ;
- un changement de priorité ou de prévision.

### Format court recommandé

> **État :** [statut actuel].  
> **Réalisé :** [résultat depuis le dernier point].  
> **Reste à faire :** [prochaine étape concrète].  
> **Blocage / décision attendue :** [élément ou « aucun »].  
> **Prochaine action :** [action et responsable].

Exemple :

> État : cadrage en cours. Réalisé : périmètre initial identifié. Reste à faire : confirmer les environnements et les critères de validation avec le DevOps. Blocage : aucun identifié à ce stade. Prochaine action : valider le périmètre avant l’adaptation du pipeline.

Ne pas écrire « aucun blocage » si le sujet n’a pas été vérifié. Éviter les commentaires trop longs et les relances sans question ou action précise.

## 7. Workflow pratique proposé

1. **Cadrer** — relire le ticket parent et la sous-tâche, confirmer le résultat attendu.
2. **Clarifier les prérequis** — vérifier accès, périmètre, dépendances et questions ouvertes.
3. **Réaliser** — laisser le DevOps choisir et exécuter l’approche technique dans le cadre convenu.
4. **Valider** — vérifier le résultat selon les critères d’acceptation, avec les bons interlocuteurs.
5. **Documenter et clôturer** — rendre le livrable accessible, noter les limites et créer ou référencer les suites nécessaires.

Ces étapes sont un workflow de pilotage, pas une décomposition automatique en nouvelles sous-tâches Jira. Créer une nouvelle tâche uniquement si un livrable distinct, une responsabilité différente ou un suivi séparé le justifie.

## 8. Animation d’un point de suivi léger

Un point de 10 à 15 minutes peut se limiter à quatre questions :

1. Quel résultat concret a été obtenu depuis le dernier point ?
2. Quel est le prochain livrable ou la prochaine étape ?
3. Y a-t-il un blocage, un risque ou une décision à obtenir ?
4. La priorité et la prévision restent-elles réalistes compte tenu des autres projets du DevOps ?

Si aucun arbitrage n’est nécessaire, un commentaire Jira peut suffire. Éviter d’imposer un compte rendu quotidien ou une réunion récurrente si la charge et le risque ne le justifient pas. Regrouper les questions pour limiter les interruptions de l’équipe technique.

## 9. Bonnes pratiques de pilotage

- **Piloter par le résultat**, pas par le détail de chaque commande ou changement technique.
- **Garder Jira comme source de vérité** : statut à jour, prochaine action claire, décisions et blocages traçables.
- **Éviter la sur-décomposition** : conserver cette sous-tâche comme unité de suivi si son périmètre reste cohérent.
- **Rendre les incertitudes visibles** : distinguer clairement confirmé, proposé et à clarifier.
- **Respecter la capacité DevOps** : confirmer la priorité et signaler les dépendances plutôt que supposer une disponibilité immédiate.
- **Ne pas confondre workflow de suivi et workflow Jira** : les changements de statut se font dans Jira selon les règles internes.
- **Clôturer proprement** : livrable repérable, validation documentée et reste à faire explicitement transféré ou référencé.

## 10. Utilisation du modèle HTML pour les prochaines sous-tâches

1. Ouvrir `pilotage-sous-tache-ci-cd.html` dans un navigateur.
2. Modifier les champs de la fiche et adapter les livrables / critères d’acceptation.
3. Renommer, déplacer ou ajouter les cartes du workflow pour refléter les étapes réelles.
4. Utiliser la zone de suivi pour préparer un commentaire Jira court.
5. Enregistrer localement dans le même navigateur ou imprimer en PDF pour conserver une copie.
6. Reporter manuellement les décisions et changements pertinents dans Jira.

Les données locales restent dans le navigateur et ne sont pas envoyées dans Jira. Pour partager le modèle, partager le fichier HTML vierge ; pour partager l’état d’un suivi, enregistrer une copie ou produire un PDF.

---

**Limite à garder en tête :** le document propose une structure générique. Les conventions de statut, les exigences de sécurité, la validation des changements et la définition de « terminé » doivent rester conformes aux règles internes du projet.
