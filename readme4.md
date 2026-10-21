# Bastion Guacamole — éléments pour compléter le ticket Jira

> **Règle de rédaction :** ce document reprend uniquement les informations présentes dans la demande et la transcription fournies. Les éléments qui ne sont pas établis sont signalés comme **à confirmer** ; ils ne sont pas présentés comme des décisions acquises.

## 1. Contexte

Les administrateurs accèdent actuellement aux serveurs et aux infrastructures en utilisant une connexion VPN, puis en réalisant des rebonds directs vers les ressources à administrer.

Le sujet du bastion Guacamole est déjà engagé. Les machines du POC ont été instanciées et le socle a été configuré, mais la solution n’a pas encore été réellement utilisée par des administrateurs dans leurs activités quotidiennes.

Le sujet est considéré comme critique, car un bastion est présenté comme nécessaire pour accéder au nouveau socle d’infrastructure prévu. La transcription mentionne une échéance au mois de janvier, sans préciser l’année.

## 2. Objectif

Mettre en place le bastion Guacamole et vérifier, au moyen d’une utilisation pilote, que la solution répond aux cas d’usage d’administration prévus.

## 3. But

Centraliser le passage des administrateurs vers les serveurs, renforcer la maîtrise des accès et permettre de retrouver la trace des sessions et des actions d’administration réalisées.

La mise en place du bastion doit être accompagnée d’une réflexion sur les autres chemins d’accès, afin que les administrateurs ne puissent pas contourner le bastion par des connexions directes ou des rebonds intermédiaires.

## 4. Situation actuelle et point de départ

- Les administrateurs utilisent actuellement le VPN puis des connexions ou rebonds directs vers les ressources.
- Les machines du POC Guacamole sont instanciées.
- Le socle du POC est configuré.
- Le POC n’a pas encore été éprouvé en conditions réelles d’utilisation quotidienne par des administrateurs.
- Une première version du DAS du POC existe ; elle est décrite dans la transcription comme perfectible et présentant l’existant.
- Les accès SSH directs et les possibilités de rebond via des machines intermédiaires sont identifiés comme des sujets à traiter.
- La transcription cite notamment VTOM et Cyberwatch comme exemples de machines ou d’outils par lesquels un rebond latéral pourrait permettre de contourner le bastion.

## 5. Périmètre de travail évoqué

### Chantier A — Finalisation du POC Guacamole

L’étape évoquée consiste à faire utiliser la plateforme à **2 ou 3 administrateurs** dans leurs activités quotidiennes, afin de vérifier que son utilisation ne perturbe pas leur travail et que les cas d’usage prévus sont couverts.

La transcription indique qu’un point doit avoir lieu le mardi suivant la discussion pour examiner les prochaines étapes avec les personnes concernées. La date exacte de ce point n’est pas fournie.

### Chantier B — Préparation des environnements

La transcription évoque la construction de deux environnements en parallèle du pilote :

- **Préproduction :** environnement destiné notamment à tester les montées de versions.
- **Production :** environnement destiné à être utilisé par l’ensemble des utilisateurs.

La transcription indique qu’il n’est pas prévu d’avoir d’autres environnements que la préproduction et la production, en plus du POC déjà évoqué.

### Chantier C — Sécurisation des accès et prévention du contournement

Il est nécessaire d’examiner les chemins d’accès qui permettraient de contourner le bastion, notamment :
- les connexions SSH directes vers les serveurs ;
- les rebonds latéraux depuis VTOM ;
- les rebonds possibles depuis des machines telles que Cyberwatch, qui dispose actuellement d’accès SSH aux machines selon la transcription ;
- plus généralement, les autres chemins d’accès intermédiaires identifiés pendant l’étude.

La transcription précise que le chantier de mise en place du bastion et celui de sécurisation des accès doivent avancer **en parallèle**. Les deux sont nécessaires pour obtenir un dispositif cohérent.

> Les actions techniques exactes, les règles de flux à modifier et les équipes responsables ne sont pas détaillées dans les éléments fournis : elles restent à préciser avec les équipes concernées.

## 6. Risques identifiés dans les éléments fournis

| Risque | Élément à l’origine du risque |
|---|---|
| Le POC ne couvre pas tous les cas d’usage attendus | La solution n’a pas encore été utilisée au quotidien par des administrateurs ; le pilote doit vérifier les cas d’usage prévus. |
| Le bastion peut être contourné | Des connexions SSH directes et des rebonds intermédiaires sont actuellement possibles ou évoqués. |
| La sécurisation reste incomplète si les deux chantiers ne sont pas menés ensemble | La transcription indique que la mise en place du bastion et la sécurisation des chemins d’accès doivent avancer en parallèle. |
| L’échéance de janvier pourrait ne pas être tenue | Une échéance en janvier est mentionnée et le sujet est qualifié de critique ; l’année et le planning détaillé ne sont pas précisés dans la transcription. |
| La documentation technique doit être complétée | Le DAS du POC est décrit comme une première version perfectible. |

## 7. Dépendances et points d’attention

- **Pilote du POC :** disponibilité de 2 ou 3 administrateurs pour tester Guacamole dans leur usage quotidien.
- **Suite du POC :** point annoncé avec les personnes concernées pour définir les prochaines étapes.
- **Environnements :** préparation de la préproduction et de la production, évoquée comme pouvant commencer en parallèle du pilote.
- **Sécurisation :** identification et traitement des possibilités de contournement, notamment via SSH, VTOM et Cyberwatch.
- **Documentation :** amélioration du DAS du POC et prise de connaissance de la documentation existante.
- **Coordination :** les deux chantiers — mise en place du bastion et sécurisation des accès — doivent progresser en parallèle.
- **Échéance :** préciser la date cible exacte associée au mois de janvier mentionné pendant la discussion.

Les responsables, dates de réalisation et dépendances techniques détaillées ne sont pas indiqués dans la demande et restent à confirmer.

## 8. Réflexions issues de la discussion

- Le choix évoqué à ce stade est Guacamole, présenté comme une solution open source à évaluer plutôt qu’une solution propriétaire dont le devis était de plusieurs centaines de milliers d’euros.
- Le pilote doit permettre de vérifier que Guacamole répond aux cas d’usage définis au départ.
- Le bastion ne suffit pas à lui seul si d’autres chemins permettent de rejoindre les serveurs sans passer par lui.
- La mise en place du bastion et la sécurisation des accès doivent donc être pilotées en parallèle.
- La préproduction et la production peuvent être préparées en parallèle du pilote, selon les échanges retranscrits.
- La transcription évoque ensuite le passage du Build au Run (« build to run »), sans en préciser les modalités.

## 9. Prochaines actions à organiser

Les actions ci-dessous sont une mise en forme des étapes évoquées dans la transcription, et non une confirmation qu’elles sont déjà planifiées ou attribuées.

1. Organiser le point annoncé avec les personnes concernées pour préciser les prochaines étapes.
2. Sélectionner 2 ou 3 administrateurs pour le pilote et organiser leur utilisation quotidienne de Guacamole.
3. Recueillir les retours du pilote et vérifier la couverture des cas d’usage prévus.
4. Examiner en parallèle la préparation des environnements de préproduction et de production.
5. Identifier les accès SSH directs et les chemins de rebond pouvant contourner le bastion, notamment via VTOM et Cyberwatch.
6. Déterminer avec les équipes concernées les actions de sécurisation nécessaires.
7. Préciser le planning pour viser l’échéance de janvier mentionnée dans la discussion.
8. Prendre connaissance du DAS existant et identifier les éléments à compléter.

## 10. Commentaire initial possible dans Jira

Le POC Guacamole est instancié et configuré, mais reste à valider en conditions d’utilisation réelles par des administrateurs. La prochaine étape évoquée est un pilote avec 2 à 3 administrateurs afin de vérifier la couverture des cas d’usage et l’adéquation de la solution au quotidien.

En parallèle, deux sujets sont à faire avancer : la préparation des environnements de préproduction et de production, et l’étude des accès directs ou rebonds intermédiaires susceptibles de contourner le bastion, notamment via VTOM et Cyberwatch. La transcription mentionne une échéance en janvier, dont l’année et le planning détaillé restent à confirmer.

## 11. Questions à clarifier au prochain point

Les éléments fournis ne permettent pas de répondre aux questions suivantes. Elles sont à confirmer avec les personnes concernées :

- Quelle est la date cible exacte (jour, mois et année) ?
- Quels sont les cas d’usage qui doivent impérativement être validés pendant le pilote ?
- Quels administrateurs participeront au pilote et sur quelle période ?
- Quels sont les critères permettant de considérer le POC comme validé ?
- Quelles équipes prendront en charge la préparation de la préproduction et de la production ?
- Quelles machines, quels flux et quels accès SSH devront être examinés ou modifiés pour empêcher le contournement ?
- Qui est responsable de chaque action sur le bastion et sur la sécurisation des accès ?
- Quels éléments du DAS du POC doivent être complétés, et qui en assurera la mise à jour ?
- Quelles sont les étapes et modalités attendues pour le passage du Build au Run ?

## 12. Éléments à ne pas présenter comme déjà décidés

À partir de la seule demande et de la transcription, il n’est pas possible d’affirmer :
- que le POC a déjà été validé ;
- que les environnements de préproduction et de production sont déjà construits ;
- que toutes les règles de flux ou tous les accès de contournement ont été identifiés et corrigés ;
- que les responsables, charges et dates de réalisation ont été convenus ;
- que l’échéance de janvier correspond à une date ferme et à une année précisée.

Ces points doivent être confirmés avant d’être inscrits comme décisions ou engagements dans Jira.
