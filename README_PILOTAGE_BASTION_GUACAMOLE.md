# Bastion Guacamole — Guide de pilotage projet

> **Objet :** transformer les échanges du point « [Bastion] Next Steps - Pilote et stratégie autour des comptes » en actions de pilotage concrètes, sans présenter les hypothèses comme des décisions validées.  
> **Échéance cible évoquée :** janvier 2027.  
> **Statut de ce document :** synthèse de travail à confirmer avec les contributeurs du projet.

## 1. Synthèse pour le chef de projet

Le POC Apache Guacamole est installé et configuré, mais il reste à démontrer qu’il répond aux usages réels des administrateurs et à cadrer les conditions de son déploiement. Le bastion est présenté comme un prérequis important pour le périmètre « cube » à partir de janvier 2027, notamment dans le contexte GenIA-L 1.5 et des exigences clients évoquées en réunion.

Le pilotage doit maintenant articuler quatre volets :

1. **Valider le POC par des essais représentatifs**, notamment sur les comptes, les connexions, les enregistrements et les journaux.
2. **Définir le périmètre cible et la stratégie de comptes**, en clarifiant les populations, les ressources et les éventuelles différences de traitement entre environnements.
3. **Cadrer la sécurité et l’exploitation**, en particulier la protection des mots de passe dans les logs, la conservation des enregistrements et leur éventuel dépôt sur S3.
4. **Obtenir les validations d’architecture et de gouvernance nécessaires**, puis construire un rétroplanning vers la cible de janvier 2027.

L’objectif du chef de projet est de rendre visibles les décisions attendues, les dépendances, les responsables et les dates, puis d’obtenir des arbitrages explicites lorsque les échanges ne suffisent pas à conclure.

## 2. Éléments à distinguer

### Décisions ou orientations explicitement exprimées

- La cible de mise en place évoquée précédemment est **janvier 2027** ; elle reste à convertir en jalons détaillés et à confirmer avec les parties prenantes.
- Le bastion est annoncé comme devant devenir obligatoire à partir de janvier, **au minimum pour le périmètre « cube »**, selon les échanges.
- Le POC doit faire l’objet d’essais complémentaires avant de conclure sur les modalités de généralisation.
- Pour le POC, les journaux peuvent rester stockés sur le système de fichiers local afin de vérifier qu’ils sont récupérables ; leur transmission à un système central n’est pas à lancer sans cadrage complémentaire.
- Les enregistrements doivent faire l’objet d’un test de dépôt sur S3, à organiser avec les personnes concernées.
- La priorité de sécurité évoquée pour les logs est de vérifier que les mots de passe ne sont pas enregistrés. Si nécessaire, une méthode de suppression ou de masquage avant transmission doit être étudiée.
- Un nouveau point de suivi doit être organisé ; Julien a demandé à Mahdi d’envoyer l’invitation. Le créneau « vendredi 16 h » a été évoqué, mais la date et la disponibilité de chacun sont **à confirmer**.

### Actions confirmées ou explicitement demandées

| Action | Responsable indiqué dans les échanges | Échéance |
|---|---|---|
| Approfondir les essais sur les journaux et faire un retour sur les points abordés | Aly Darwish | À confirmer |
| Organiser un point de suivi avec les participants concernés | Mahdi | Créneau évoqué : vendredi à 16 h ; date à confirmer |
| Organiser un échange dédié entre Julien et Aly sur le dépôt des enregistrements sur S3 | Julien Gannier et Aly Darwish | Dans le courant de la semaine évoquée ; date à confirmer |
| Présenter le sujet à la RD au minimum, puis clarifier le circuit de validation | Porteur à identifier avec Julien / gouvernance concernée | À planifier rapidement |
| Préparer les prochaines étapes et les éléments de type DAT évoqués en réunion | Contributeurs et pilote à confirmer | À confirmer |

**Attention :** la transcription ne permet pas d’attribuer avec certitude toutes les actions techniques ni de confirmer la signification exacte de « DAT », « RD », « ARB 0 » ou des gates mentionnées. Ces termes doivent être confirmés avec les participants et adaptés à la gouvernance réellement applicable.

## 3. Plan d’action du chef de projet

### Priorité 1 — Dans l’immédiat : organiser le suivi

- [ ] Envoyer l’invitation au prochain point de suivi ; confirmer la date, l’heure, les participants et l’objectif de la réunion.
- [ ] Diffuser un ordre du jour court : état du POC, stratégie des comptes, essais de logs/enregistrements, gouvernance d’architecture, décisions et échéances.
- [ ] Demander à chaque contributeur de préparer un état factuel : réalisé, en cours, blocage, décision attendue et prochaine étape.
- [ ] Mettre à jour le ticket Jira avec la synthèse, les actions confirmées et les points à arbitrer.
- [ ] Créer des sous-tâches Jira uniquement si cela facilite réellement le suivi ; ne pas créer de découpage technique sans accord des responsables.

### Priorité 2 — Formaliser le périmètre et la stratégie d’accès

Faire confirmer et consigner les réponses aux questions suivantes :

- Quels environnements et ressources sont dans le périmètre initial : « cube », autres infrastructures, PPD et PROD ?
- Quels profils d’administrateurs participeront au pilote et qui les désigne ?
- Quels types de comptes sont concernés : comptes nominatifs, comptes techniques, comptes privilégiés ou autres catégories ?
- Quelle stratégie est attendue pour la création, l’usage, la gestion et la révocation des comptes ?
- Quelle est la frontière entre le périmètre Guacamole et les solutions déjà utilisées ?
- Pour AWS, les comptes concernés sont actuellement décrits comme étant dans un compte R&D avec des licences Teleport. Le maintien de Teleport, une éventuelle convergence ou l’intégration au périmètre Guacamole ne sont **pas arbitrés dans les extraits disponibles**.

**Livrable à viser :** une note de périmètre et de stratégie des comptes validée par les parties prenantes, sans préjuger des choix techniques encore ouverts.

### Priorité 3 — Suivre le pilote et les essais techniques

Demander aux contributeurs de documenter les essais et leurs résultats, en particulier :

- [ ] Parcours de connexion représentatifs et ressources accessibles via le bastion.
- [ ] Vérification des droits et des restrictions d’accès.
- [ ] Enregistrements de session : fonctionnement, emplacement de stockage, récupération et accès autorisés.
- [ ] Journaux : contenu effectivement produit, présence éventuelle de secrets et comportement selon les modes de journalisation.
- [ ] Dépôt sur S3 des enregistrements : faisabilité, prérequis, accès, chiffrement, rétention et responsabilités d’exploitation à préciser.
- [ ] Critères d’acceptation du POC et validation explicite par les administrateurs pilotes.

Ne pas conclure que l’absence de mots de passe dans les logs est acquise sur la seule base d’un échange oral : demander un test documenté, notamment pour les modes de journalisation et d’enregistrement réellement utilisés.

### Priorité 4 — Cadrer sécurité, architecture et gouvernance

- [ ] Identifier le processus de validation applicable et les livrables attendus (DAT et autres documents éventuels).
- [ ] Confirmer la signification, le périmètre et les participants requis pour la RD, l’ARB 0 et les éventuelles gates 1/2.
- [ ] Faire préciser les exigences de sécurité : authentification, autorisations, traçabilité, protection des secrets, conservation et suppression des journaux/enregistrements.
- [ ] Identifier les dépendances d’infrastructure et d’exploitation pour les environnements PPD et PROD.
- [ ] Obtenir les validations nécessaires avant de figer la trajectoire de déploiement.

### Priorité 5 — Construire le rétroplanning vers janvier 2027

Construire un planning à rebours après confirmation des jalons et délais de validation. Prévoir au minimum :

1. cadrage du périmètre et des comptes ;
2. fin des essais du POC et validation des critères d’acceptation ;
3. arbitrages de sécurité et de gouvernance d’architecture ;
4. préparation des environnements PPD et PROD ;
5. pilote avec administrateurs et traitement des écarts ;
6. validation de mise en service et communication aux populations concernées.

Les dates intermédiaires, les responsables et les durées sont **à identifier**. Ne pas présenter ces étapes comme un planning validé avant accord des parties prenantes.

## 4. Points restant à clarifier

| Sujet | Question à résoudre | Résultat attendu |
|---|---|---|
| Périmètre | Le caractère obligatoire à partir de janvier concerne-t-il uniquement le périmètre « cube » ou d’autres périmètres également ? | Périmètre et date d’application validés |
| AWS / Teleport | Quelle est la stratégie cible pour les ressources AWS actuellement dans le compte R&D avec Teleport ? | Arbitrage explicite et impacts identifiés |
| Comptes | Quelle stratégie de comptes et quels profils sont retenus pour le pilote puis la cible ? | Règles de gestion des comptes validées |
| Pilote | Quels administrateurs, quelles ressources, quels scénarios et quels critères d’acceptation ? | Plan de test et critères de sortie |
| Logs | Quels logs sont produits selon les modes utilisés et comment prouver l’absence de mots de passe ou secrets ? | Résultats de test documentés et mesures de protection |
| Enregistrements | Le dépôt sur S3 est-il retenu pour la cible ? Quels accès, rétention et protections ? | Décision et exigences d’exploitation |
| Gouvernance | Que recouvrent précisément RD, ARB 0, les gates et le DAT dans ce projet ? | Circuit de validation, livrables et jalons confirmés |
| Planning | Quel est le chemin critique pour tenir janvier 2027 ? | Rétroplanning avec responsables et dates |
| Exploitation | Qui prendra en charge l’exploitation, la supervision, les incidents et le maintien en condition opérationnelle ? | Responsabilités et modalités d’exploitation identifiées |

## 5. Risques et dépendances à suivre

| Risque / dépendance | Impact possible | Action de pilotage |
|---|---|---|
| POC insuffisamment représentatif | La solution pourrait ne pas couvrir les usages réels au moment du déploiement | Organiser un pilote avec scénarios et critères d’acceptation explicites |
| Échéance de janvier 2027 sans rétroplanning validé | Retard ou arbitrages tardifs | Construire un planning à rebours et faire confirmer le chemin critique |
| Gouvernance d’architecture non clarifiée | Retard dans les validations et la mise en place | Identifier les instances, livrables, participants et délais requis |
| Secrets potentiellement présents dans les logs ou enregistrements | Exposition d’informations sensibles | Exécuter des tests documentés et définir une mesure de masquage/suppression si nécessaire |
| Stockage des enregistrements non arbitré | Difficultés de récupération, de sécurité ou d’exploitation | Valider le test S3 et cadrer accès, rétention et protection |
| Stratégie AWS / Teleport non définie | Périmètre cible ambigu et risques de trajectoires parallèles | Obtenir un arbitrage formel avant d’intégrer AWS au plan cible |
| Responsabilités ou échéances manquantes | Actions non suivies ou retardées | Attribuer un responsable et une date à chaque action lors du prochain point |

## 6. Proposition d’organisation du ticket Jira

Conserver le ticket principal comme point de pilotage global et y maintenir :

- **Contexte et objectif** : conserver la description déjà rédigée.
- **Dernière situation connue** : POC installé/configuré ; validation d’usage et stratégie cible à consolider.
- **Décisions confirmées** : uniquement les décisions explicitement validées.
- **Actions en cours** : action, responsable, échéance, statut et lien éventuel vers un livrable.
- **Points à clarifier / arbitrages attendus** : question, décideur attendu et date cible.
- **Risques et dépendances** : impact et mesure de réduction.
- **Prochain jalon** : réunion de suivi et décisions à obtenir.

Après chaque réunion, publier une mise à jour courte dans le ticket et maintenir une liste d’actions unique. Si une action nécessite un suivi autonome, créer une sous-tâche dédiée et la relier au ticket principal.

## 7. Commentaire Jira proposé

Texte prêt à adapter et à publier :

> **Suite au point « [Bastion] Next Steps - Pilote et stratégie autour des comptes » :**
>
> - Le POC Guacamole nécessite des essais complémentaires avant validation, notamment sur les journaux, les enregistrements et les usages administrateurs.
> - Pour le POC, les journaux restent stockés localement à ce stade. Un test de dépôt des enregistrements sur S3 doit être organisé avec les contributeurs concernés.
> - La protection des secrets dans les journaux doit être vérifiée par des tests ; les modalités de transmission et de conservation restent à cadrer.
> - Le périmètre cible, la stratégie de gestion des comptes et l’articulation avec les solutions existantes, notamment Teleport pour AWS, restent à clarifier.
> - La gouvernance de validation (RD / ARB, gates et livrables attendus) doit être confirmée afin de construire un rétroplanning cohérent avec la cible de janvier 2027.
>
> **Prochaines actions :** organiser le prochain point de suivi, consolider les résultats du POC, identifier les décisions attendues et attribuer un responsable ainsi qu’une échéance à chaque action.
>
> Les dates intermédiaires, le périmètre exact et les arbitrages techniques restent à confirmer.

## 8. Ordre du jour conseillé pour le prochain point

1. État des essais du POC et retours des administrateurs.
2. Résultats sur les journaux, les secrets et les enregistrements.
3. Test de dépôt S3 : prérequis, résultat attendu et responsable.
4. Périmètre cible et stratégie des comptes, dont le cas AWS / Teleport.
5. Gouvernance : RD, ARB, gates et DAT — terminologie, livrables et dates.
6. Rétroplanning vers janvier 2027, dépendances et chemin critique.
7. Revue des actions : responsable, échéance, statut et prochaine mise à jour Jira.

## 9. Règle de pilotage

À chaque point, distinguer systématiquement :

- **Décidé** : arbitrage explicitement validé par les personnes habilitées.
- **Confirmé / en cours** : action effectivement engagée ou réalisée.
- **Proposé** : piste à étudier, non validée.
- **À clarifier** : question qui nécessite une réponse ou une décision.
- **Bloqué / dépendant** : action qui ne peut pas avancer sans prérequis.

Ne pas transformer une hypothèse orale en décision. Lorsqu’un responsable, une date ou un décideur n’est pas connu, inscrire **« À identifier »** ou **« À confirmer »** puis organiser sa résolution.
