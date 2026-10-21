# Réponse 2 — Description Jira complète pour le cadrage et le pilotage

> **Utilisation recommandée :** version détaillée pour un ticket Jira de reprise de sujet, avec contexte, enjeux, périmètre, risques, dépendances, gouvernance et actions de démarrage.

## 1. Intitulé proposé
**Déployer le bastion d’administration Apache Guacamole et sécuriser les chemins d’accès aux infrastructures**

## 2. Contexte
Le mode de fonctionnement actuel permet aux administrateurs de se connecter aux infrastructures via VPN, puis d’accéder aux serveurs par des connexions directes ou des rebonds intermédiaires. Ces pratiques rendent plus difficile la centralisation des accès, la reconstitution des sessions et l’analyse des opérations réalisées.

Un POC basé sur Apache Guacamole a déjà été instancié et configuré. En revanche, il n’a pas encore été utilisé de façon suffisamment représentative par les administrateurs pour confirmer que les usages attendus sont couverts et que la solution est adaptée aux contraintes opérationnelles.

Le sujet a été identifié comme critique, car le bastion doit contribuer à sécuriser l’administration des infrastructures et constitue un prérequis pour l’accès au nouveau socle. Une échéance cible située en janvier a été évoquée lors de l’échange ; sa date exacte et l’année correspondante doivent être confirmées.

## 3. Objectif
Valider le POC Guacamole sur des cas d’usage réels, préparer les environnements cibles de préproduction et de production, puis organiser le déploiement d’un accès d’administration centralisé, contrôlé et traçable.

## 4. But / résultat attendu
Disposer d’un dispositif opérationnel par lequel les administrateurs passent pour accéder aux ressources couvertes, avec :
- une authentification et des autorisations définies ;
- une traçabilité permettant d’identifier l’administrateur, la cible et l’horaire de connexion ;
- la possibilité de consulter les traces ou enregistrements de session selon les capacités retenues et les règles internes ;
- des chemins d’accès alternatifs maîtrisés afin que le bastion ne puisse pas être contourné par des connexions directes ou des rebonds latéraux ;
- une documentation suffisante pour exploiter, maintenir et faire évoluer le dispositif.

## 5. Situation actuelle — point de départ
### Éléments connus
- Le POC Guacamole est instancié.
- Le socle du POC est configuré.
- Le POC n’a pas encore fait l’objet d’une utilisation quotidienne représentative par un groupe d’administrateurs.
- Une phase pilote avec 2 à 3 administrateurs a été proposée pour vérifier que la solution couvre les cas d’usage et ne perturbe pas excessivement les opérations courantes.
- La construction des environnements de préproduction et de production peut être préparée en parallèle du pilote, sous réserve des prérequis et arbitrages techniques.
- Le sujet de sécurisation des chemins d’accès doit progresser en parallèle de la mise en place du bastion.
- L’échéance cible de janvier a été mentionnée, mais le rétroplanning détaillé reste à établir.

### Points non confirmés à date
- Résultats de tests formels et validation finale du POC.
- Liste complète des cas d’usage à couvrir.
- Architecture cible détaillée et prérequis de production.
- Exigences exactes relatives aux journaux, aux enregistrements, à leur conservation et à leur consultation.
- Liste exhaustive des chemins d’accès alternatifs à fermer ou à contrôler.
- Dates, responsables nominatifs, critères de mise en production et modalités de transfert au Run.

## 6. Périmètre du sujet
### Chantier A — Validation du POC Guacamole
- Confirmer les cas d’usage d’administration à tester.
- Sélectionner 2 à 3 administrateurs pilotes.
- Observer les usages réels : connexion, accès aux ressources, déroulement des opérations et contraintes d’exploitation.
- Vérifier la traçabilité disponible et la capacité à consulter les sessions, selon les fonctionnalités et la configuration retenues.
- Collecter les retours, qualifier les écarts et décider des ajustements nécessaires.
- Formaliser la décision de validation, de poursuite ou de correction du POC.

### Chantier B — Préparation des environnements
- Confirmer l’architecture et les prérequis des environnements de préproduction et de production.
- Identifier les ressources, accès, certificats, flux, comptes de service et configurations nécessaires.
- Préparer la préproduction pour tester les évolutions et les changements de version.
- Préparer la production comme environnement cible d’utilisation générale.
- Définir les contrôles de validation avant passage en production.
- Planifier le transfert vers le Run et les modalités de support.

### Chantier C — Sécurisation des accès et prévention du contournement
- Cartographier les accès d’administration directs existants, notamment SSH.
- Identifier les systèmes intermédiaires pouvant permettre un rebond, notamment VTOM et Cyberwatch, ainsi que les autres chemins pertinents à confirmer avec les équipes.
- Analyser les flux et les relations de confiance qui pourraient permettre de contourner le bastion.
- Définir avec les responsables sécurité, réseau et infrastructure les règles d’accès cible.
- Vérifier que les restrictions envisagées ne cassent pas les usages légitimes, notamment les besoins techniques des outils d’exploitation et de gestion des vulnérabilités.
- Tester les règles retenues et documenter les exceptions approuvées.

**Principe de cohérence :** déployer un bastion sans maîtriser les autres chemins de rebond laisserait subsister des possibilités de contournement et réduirait fortement l’efficacité du dispositif. Les travaux de déploiement et de sécurisation doivent donc être planifiés en parallèle, avec une coordination explicite entre les équipes.

## 7. Hors périmètre / limites à confirmer
Les éléments suivants ne doivent pas être considérés comme inclus avant arbitrage :
- remplacement d’outils d’administration ou de supervision existants ;
- refonte globale de tous les accès du SI au-delà des chemins liés au périmètre du bastion ;
- choix d’une autre solution que Guacamole ;
- modification de tous les flux réseau sans analyse d’impact ;
- généralisation à des populations ou infrastructures non encore identifiées.

Toute extension de périmètre doit être évaluée selon son impact sur le risque, la charge, les dépendances et l’échéance.

## 8. Risques et mesures de maîtrise proposées
| Risque | Impact possible | Mesure de maîtrise proposée |
|---|---|---|
| Le bastion peut être contourné par SSH direct ou rebond intermédiaire | La centralisation et la traçabilité deviennent incomplètes | Cartographier les chemins, définir les règles cibles, tester les restrictions et formaliser les exceptions |
| Le POC ne couvre pas certains usages | Retard, adaptations ou remise en question du choix | Tester les cas d’usage prioritaires avec les administrateurs et consigner les écarts |
| L’expérience utilisateur est trop contraignante | Contournements informels ou faible adoption | Pilote limité, retours utilisateurs et ajustements avant généralisation |
| Préproduction/production ne sont pas prêtes à temps | Risque sur l’échéance cible | Lancer le cadrage des environnements en parallèle du pilote |
| Dépendances entre plusieurs équipes | Attente de décisions ou de règles de flux | Nommer un responsable par chantier et suivre les décisions dans Jira |
| Restriction d’accès incompatible avec un outil opérationnel | Interruption ou dégradation d’un usage légitime | Analyser les besoins de VTOM, Cyberwatch et des autres outils avant application des règles |
| Exigences de traçabilité insuffisamment définies | Traces inutilisables ou non conformes aux attentes | Confirmer les besoins de journalisation, de consultation, d’accès et de conservation |
| Échéance de janvier insuffisamment cadrée | Prévision peu fiable et arbitrages tardifs | Confirmer la date, établir les jalons et suivre les écarts régulièrement |
| Documentation et transfert au Run tardifs | Difficultés de support après mise en service | Intégrer la documentation et le transfert dans les critères d’acceptation |

## 9. Dépendances et contributeurs à mobiliser
- **Architecte technique :** architecture cible, cas d’usage, critères de validation et décisions techniques.
- **Référent du sujet / Cyril :** confirmation des prochaines étapes, arbitrages et coordination avec les contributeurs.
- **Contributeur ayant configuré le POC :** partage de l’existant, des configurations et des limites connues.
- **Administrateurs pilotes :** tests pratiques et retours sur les usages.
- **Équipes réseau / infrastructure / sécurité :** règles de flux, accès SSH, segmentation et prévention des rebonds.
- **Équipes responsables de VTOM, Cyberwatch et autres systèmes intermédiaires :** identification des usages légitimes et des chemins de rebond.
- **Équipe Run / exploitation :** exigences de supervision, support, procédures et transfert.
- **Responsable de capacité ou manager :** arbitrage de disponibilité si les équipes sont sollicitées par plusieurs projets.

Les rôles exacts et les personnes responsables de chaque décision doivent être confirmés au lancement.

## 10. Plan d’action initial
1. Organiser une réunion de reprise avec l’architecte technique, Cyril et les contributeurs clés.
2. Faire l’inventaire de l’existant : architecture du POC, documentation disponible, tests réalisés, limites et prérequis.
3. Confirmer la liste des cas d’usage et les critères de réussite du pilote.
4. Identifier les 2 à 3 administrateurs pilotes et convenir d’une période de test.
5. Préparer une grille de retours : cas testé, résultat, difficulté, anomalie, action et responsable.
6. Lancer la préparation de la préproduction et de la production en parallèle, en identifiant les prérequis bloquants.
7. Démarrer la cartographie des chemins d’accès alternatifs et des rebonds possibles, notamment via SSH, VTOM et Cyberwatch.
8. Organiser la coordination entre le chantier Guacamole et le chantier de sécurisation des accès.
9. Établir un rétroplanning avec jalons, responsables, dépendances et marge de validation jusqu’à la date cible confirmée.
10. Préparer les exigences de documentation, d’exploitation et de transfert au Run.

## 11. Livrables attendus proposés
- Synthèse de l’existant et de l’architecture du POC.
- Liste des cas d’usage et résultats du pilote.
- Registre des écarts et décisions de validation du POC.
- Architecture cible et prérequis des environnements de préproduction et de production.
- Cartographie des chemins d’accès et des possibilités de rebond étudiées.
- Règles d’accès cibles et résultats des tests associés.
- Rétroplanning consolidé et liste des dépendances.
- Documentation d’installation, de configuration et d’exploitation selon le périmètre convenu.
- Procédures de support, de gestion des incidents et de mise à jour si elles sont requises.
- Compte rendu de validation et transfert au Run.

Ces livrables sont des propositions de cadrage et doivent être confirmés avec les responsables techniques.

## 12. Critères d’acceptation proposés
Le ticket pourra être considéré comme terminé lorsque :
1. Le pilote a été exécuté sur les cas d’usage convenus et les résultats sont documentés.
2. Les écarts identifiés ont été corrigés ou acceptés explicitement par les responsables.
3. Les environnements requis sont disponibles et validés selon les critères convenus.
4. Les règles d’accès et les chemins autorisés sont documentés.
5. Les possibilités de contournement couvertes par le périmètre ont été testées et les résultats approuvés.
6. Les besoins de journalisation et de consultation des sessions sont validés.
7. La documentation et le transfert au Run sont réalisés selon le périmètre retenu.
8. Les risques résiduels, exceptions et actions restantes sont attribués et acceptés.

## 13. Commentaire Jira de reprise
**Point de reprise du sujet :** le POC Guacamole est instancié et configuré, mais sa validation en conditions d’usage reste à réaliser avec un groupe de 2 à 3 administrateurs. En parallèle, le cadrage des environnements de préproduction et de production doit être engagé, ainsi que l’analyse des accès directs et des rebonds possibles (notamment SSH, VTOM et Cyberwatch). Ces deux chantiers doivent avancer en parallèle afin d’éviter qu’un accès alternatif ne permette de contourner le bastion. Les prochaines étapes sont de confirmer les cas d’usage, les critères d’acceptation, les responsables et le rétroplanning associé à l’échéance cible de janvier.

## 14. Questions à trancher au prochain point
- Quelle est la date exacte et l’année de l’échéance cible de janvier ?
- Quels cas d’usage permettront de déclarer le POC concluant ?
- Qui participe au pilote et qui prononce la validation ?
- Quels sont les prérequis et critères de passage en préproduction puis en production ?
- Quels chemins de rebond et systèmes intermédiaires doivent être couverts par l’analyse ?
- Quelles exceptions sont nécessaires pour les outils d’exploitation et de sécurité ?
- Quelles exigences s’appliquent aux journaux et enregistrements de session ?
- Qui porte chaque chantier, qui arbitre les dépendances et à quelle fréquence le suivi sera-t-il réalisé ?
- Quels sont les critères et le calendrier du transfert au Run ?

*Cette description sépare les faits rapportés, les propositions de pilotage et les décisions restant à confirmer. Elle ne vaut pas validation d’une architecture ou d’une règle de sécurité.*
