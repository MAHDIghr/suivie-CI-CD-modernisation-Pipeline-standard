# Suivi projet — Standardisation et modernisation des pipelines CI/CD

> Document de pilotage à destination du chef de projet IT Ops Build.  
> Source technique initiale : `readme.md`. Les statuts, charges, dates et responsables doivent être confirmés avec les équipes ; ils ne sont pas déduits du README.

## 1. Synthèse exécutive

### Objectif
Définir et mettre en œuvre des pipelines CI/CD standardisés, réutilisables et sécurisés pour les applications Node.js déployées sur ECS, les librairies NPM et les fonctions Lambda Node.js du périmètre.

### Périmètre repéré dans le README
- Applications Node.js (dont React / Next.js) déployées sur ECS.
- Librairies NPM partagées.
- Quelques Lambdas Node.js, notamment autour de MyArea, Content Platform et JP.
- Chaîne de build, tests automatisés, contrôles qualité et sécurité.
- Publication des artefacts dans Nexus et/ou AWS ECR.
- Gestion distincte des snapshots et des releases.

### Briques et sujets techniques cités
Jenkins, SonarQube et Quality Gate, Trivy, SBOM, Dependency Track, Nexus, AWS ECR, tests automatisés et mécanisme de déploiement vers DEV.

**Attention :** le README précise que la section historique sur la standardisation des pipelines Lambda n'est plus à jour. Elle doit servir de piste de discussion, pas de spécification validée.

## 2. Ce que le chef de projet doit faire maintenant

### Étape 1 — Cadrer le périmètre
1. Confirmer la liste exhaustive des applications ECS, librairies NPM et Lambdas concernées.
2. Identifier le propriétaire applicatif, le référent technique et l'équipe DevOps de chaque composant.
3. Distinguer ce qui existe déjà, ce qui doit être adapté et ce qui doit être créé.
4. Confirmer les exclusions, les environnements et les livrables attendus.
5. Identifier les standards Java existants pouvant être réutilisés.

**Livrable attendu :** inventaire validé et périmètre approuvé.

### Étape 2 — Établir l'état initial
Pour chaque composant, collecter :
- Pipeline actuel et dépôt concerné.
- Technologies, mode de packaging et destination des artefacts.
- Étapes déjà disponibles : build, tests, couverture, Sonar, scan sécurité, publication et déploiement.
- Écarts par rapport au standard cible.
- Blocages, dépendances, interlocuteurs et priorité métier.

**Livrable attendu :** matrice « existant / cible / écarts / actions ».

### Étape 3 — Faire définir le standard cible
Organiser un atelier avec DevOps, référents applicatifs, sécurité et responsables des outils afin de décider :
- Étapes obligatoires et ordre d'exécution du pipeline.
- Critères de réussite et conditions de blocage.
- Format des rapports de tests et de couverture.
- Politique SonarQube et Quality Gate.
- Contrôles Trivy, SBOM et traitement des vulnérabilités / licences.
- Publication des artefacts et séparation snapshot / release.
- Gestion des secrets, permissions et traçabilité.
- Déploiement en DEV et séparation éventuelle entre build et déploiement.
- Gestion des exceptions et stratégie de migration des pipelines existants.

**Livrable attendu :** schéma cible, décisions consignées et critères d'acceptation validés.

### Étape 4 — Piloter un pilote
Choisir avec les équipes un composant représentatif, mais dont le risque et la complexité restent maîtrisés. Tester le standard, mesurer les écarts, corriger les points bloquants et obtenir une validation technique avant généralisation.

**Livrable attendu :** pilote validé, limites documentées et plan de déploiement par lots.

### Étape 5 — Déployer par vagues
Regrouper les composants par famille et dépendances. Pour chaque vague : confirmer la disponibilité des contributeurs, planifier la réalisation, exécuter les tests, faire valider le résultat, documenter l'exploitation et suivre les réserves.

**Livrable attendu :** composants migrés et acceptés, preuves de validation et suivi des écarts résiduels.

## 3. Mise à jour de Jira : méthode recommandée

Ne modifie pas les tickets uniquement pour leur donner une apparence « prête pour le PI Planning ». Mets à jour chaque ticket à partir d'informations confirmées avec son responsable.

### Pour chaque chantier ou sous-chantier
Vérifier :
- Objectif et résultat attendu.
- Périmètre fonctionnel / technique.
- Liste des sous-tâches nécessaires.
- Dépendances amont et aval.
- Référent responsable et parties prenantes.
- Jalons, critères de validation et risques.
- Vague ou PI cible, si cette organisation est confirmée.

### Pour chaque sous-tâche
Compléter ou vérifier :
1. **Titre orienté action** : verbe + objet concret.
2. **Description** : contexte, action à réaliser et résultat attendu.
3. **Critères d'acceptation** : preuves observables permettant de clôturer la tâche.
4. **Responsable** : personne qui réalise le travail, après accord de l'équipe.
5. **Statut réel** : ne pas démarrer artificiellement un ticket si le travail n'a pas commencé.
6. **Estimation / charge** : à faire confirmer par le contributeur technique.
7. **Dépendances / blocages** : ticket lié, décision ou accès manquant.
8. **Échéance / PI / sprint** : uniquement si la planification a été validée.
9. **Commentaire de suivi** : date du point, faits constatés, prochaine action et responsable de cette action.

### Statuts : règle de gestion
- **À faire** : travail non commencé.
- **En cours** : travail réellement démarré.
- **Bloqué** : une dépendance empêche de progresser ; documenter le blocage et son propriétaire.
- **En revue / en validation** : réalisation terminée, validation attendue.
- **Terminé** : critères d'acceptation vérifiés et preuve disponible.

Adapte ces libellés au workflow Jira réel. Ne change pas le statut sans vérifier la signification locale.

### Sous-tâches non affectées
Ne choisis pas arbitrairement un nom. Pour chaque tâche non affectée :
1. Vérifier qu'elle est toujours nécessaire.
2. Identifier la compétence et l'équipe requises.
3. Demander au responsable DevOps / technique de désigner un contributeur.
4. Faire confirmer la capacité et la priorité par rapport aux autres projets.
5. Laisser la tâche non affectée et signaler le risque si aucune décision n'a été prise.

### Exemple de sous-tâche bien rédigée
**Titre :** Définir les contrôles sécurité obligatoires du pipeline Node.js

**Description :** Avec DevOps et Sécurité, définir les contrôles à intégrer au pipeline standard, leur ordre, les seuils de blocage et la procédure de traitement des résultats.

**Critères d'acceptation :**
- Contrôles obligatoires et facultatifs documentés.
- Règles bloquantes / non bloquantes validées par les parties prenantes.
- Responsables du traitement des alertes identifiés.
- Décisions consignées dans la documentation du projet.
- Références aux tickets de mise en œuvre ajoutées.

**Dépendances :** disponibilité des référents DevOps et Sécurité ; accès aux configurations et outils existants.

**Estimation / responsable / date :** à confirmer avec l'équipe avant engagement.

## 4. Découpage de travail proposé dans Jira

À adapter aux tickets existants et à la structure Jira de l'organisation. Éviter de créer des doublons si un chantier équivalent existe déjà.

### Chantier A — Cadrage et inventaire
- A1 — Recenser les applications ECS, librairies NPM et Lambdas du périmètre.
- A2 — Identifier propriétaires applicatifs, référents techniques et équipes contributrices.
- A3 — Cartographier les pipelines existants et les destinations des artefacts.
- A4 — Identifier les écarts, risques et dépendances.
- A5 — Faire valider le périmètre et les priorités.

### Chantier B — Définition du standard CI
- B1 — Définir les étapes build, tests et contrôles qualité.
- B2 — Définir les rapports de tests et la remontée de couverture.
- B3 — Définir SonarQube et les règles de Quality Gate.
- B4 — Définir les contrôles de sécurité, Trivy, SBOM et traitement des vulnérabilités.
- B5 — Définir les règles de packaging et de publication Nexus / AWS ECR.
- B6 — Définir la séparation snapshot / release et les règles de version.
- B7 — Faire valider le standard cible par les acteurs concernés.

### Chantier C — Pilote et validation
- C1 — Sélectionner un composant pilote et confirmer sa disponibilité.
- C2 — Implémenter le pipeline standard sur le pilote.
- C3 — Exécuter les tests et vérifier les rapports générés.
- C4 — Vérifier les contrôles qualité, sécurité et publication.
- C5 — Documenter les écarts et faire valider le pilote.

### Chantier D — Industrialisation et migration
- D1 — Prioriser les composants par vagues de migration.
- D2 — Préparer les prérequis et dépendances de chaque vague.
- D3 — Adapter les pipelines existants ou créer les pipelines manquants.
- D4 — Organiser la validation avec les équipes applicatives.
- D5 — Suivre les exceptions et corriger les écarts.
- D6 — Documenter le support et le transfert vers Run.

### Chantier E — Pilotage et gouvernance
- E1 — Mettre à jour les responsabilités, charges et dépendances Jira.
- E2 — Tenir le suivi des risques, décisions et arbitrages.
- E3 — Préparer la capacité et les objectifs du PI / de la période.
- E4 — Produire le reporting d'avancement et le plan d'actions.
- E5 — Formaliser l'acceptation finale et le bilan.

Ce découpage est une proposition initiale, pas la preuve que ces tickets existent ou que leur création a été approuvée.

## 5. Préparation du PI Planning

Avant le PI Planning, chercher à obtenir une vision suffisamment fiable pour que l'équipe puisse s'engager sur un plan réaliste.

### À préparer
- Périmètre priorisé et résultat attendu.
- Tickets découpés à une granularité exploitable.
- Responsables ou équipes pressentis, avec disponibilité confirmée.
- Estimations produites par les contributeurs, pas par le chef de projet seul.
- Dépendances inter-équipes explicites.
- Risques, contraintes techniques et décisions en attente.
- Capacité disponible, autres projets concurrents et absences.
- Critères de réussite et définition de « terminé ».
- Objectifs de PI proposés, à faire valider pendant la planification.

### Pendant la planification
- Présenter les objectifs et les contraintes.
- Faire confirmer les séquences de travail par les équipes.
- Rendre visibles les dépendances et les risques.
- Faire arbitrer les conflits de capacité ou de priorité.
- Consigner les engagements, hypothèses et décisions.
- Ne pas transformer une hypothèse en engagement sans accord des contributeurs.

### Après la planification
- Mettre à jour Jira à partir des décisions réellement prises.
- Vérifier que chaque sous-tâche engagée possède un responsable ou une équipe identifiée.
- Enregistrer les dépendances, jalons et objectifs retenus.
- Communiquer les risques non résolus et les actions d'arbitrage.
- Organiser un suivi régulier des écarts et des changements de priorité.

## 6. Questions prioritaires pour le prochain point de suivi

1. Le périmètre exhaustif ECS / NPM / Lambda est-il validé ?
2. Quel standard Java existant peut servir de référence et quelles différences sont nécessaires pour Node.js ?
3. Qui valide le standard technique et les règles de sécurité ?
4. Quel composant choisit-on comme pilote et pourquoi ?
5. Quelles sont les dépendances bloquantes : accès, outils, décisions ou disponibilité ?
6. Qui peut s'engager sur les sous-tâches et quelle capacité est réellement disponible ?
7. Quelles règles s'appliquent aux snapshots, releases et artefacts ?
8. Quels critères permettent de considérer le pilote puis une migration comme terminés ?
9. Quelles décisions restent à arbitrer, par qui et pour quelle date ?
10. Quels éléments doivent être prêts avant le PI Planning ?

## 7. Reporting de pilotage

Présenter à chaque point :
- Avancement réel par chantier, avec preuves.
- Prochain jalon et livrable attendu.
- Sous-tâches non affectées ou non estimées.
- Blocages, dépendances et décision attendue.
- Charge restante et capacité confirmée.
- Risques et impact sur les objectifs.
- Actions, responsables et dates convenues.

Éviter un pourcentage d'avancement global calculé au ressenti. Privilégier des livrables vérifiables et expliquer les écarts par rapport au plan.

## 8. Registre des décisions et actions

| Date | Sujet / décision ou action | Responsable | Échéance convenue | Statut / preuve |
|---|---|---|---|---|
| À compléter | À compléter après le point de suivi | À confirmer | À confirmer | À compléter |

## 9. Points de vigilance issus du README

- La partie historique « standardisation des pipelines Lambda » est explicitement signalée comme obsolète : faire revalider ces propositions.
- Les tests E2E / d'intégration déployés dans un environnement réel sont présentés comme séparés du build rapide ; confirmer l'architecture de tests actuelle avant de décider.
- Le contrôle de vulnérabilités est décrit historiquement comme non bloquant ; faire confirmer la politique de sécurité actuelle avant de l'inscrire comme règle.
- La distinction snapshot / release est un besoin identifié dans le README ; obtenir une décision précise sur le versionnement et les dépôts cibles.
- Les noms d'applications et de librairies cités doivent être vérifiés avec les propriétaires : la liste du README peut être incomplète ou datée.

## 10. Prochaine action recommandée

Commencer par une revue courte de l'inventaire et des tickets Jira existants avec les trois chefs de projet et le référent DevOps. Ne pas réorganiser massivement Jira avant d'avoir confirmé la structure cible, les règles de workflow et les informations à conserver. Ensuite, mettre à jour les tickets par lots, vérifier les dépendances et faire valider les engagements par les équipes.
