# Réponse 1 — Description Jira synthétique et structurée

> **Utilisation recommandée :** version directement exploitable dans Jira lorsque le ticket doit rester lisible et facile à maintenir.

## Titre proposé
**Mise en place du bastion d’administration Apache Guacamole et sécurisation des accès aux infrastructures**

## Contexte
Les administrateurs accèdent actuellement aux serveurs et aux infrastructures via VPN, puis réalisent des connexions directes ou des rebonds vers les ressources à administrer. Les accès et les actions effectuées ne sont pas centralisés dans un point de contrôle unique, ce qui complique leur traçabilité et leur revue.

Un Proof of Concept (POC) du bastion Apache Guacamole a été instancié et configuré. À ce stade, la plateforme n’a toutefois pas encore été suffisamment utilisée par les administrateurs pour confirmer son adéquation aux usages quotidiens. Le sujet est considéré comme critique, notamment parce que le bastion doit constituer un prérequis d’accès à un nouveau socle d’infrastructure.

## Objectif
Valider l’adéquation de Guacamole aux cas d’usage d’administration retenus, puis mettre à disposition des environnements de préproduction et de production, avec une traçabilité exploitable des sessions et des actions d’administration.

## But
Centraliser les connexions d’administration à travers un bastion sécurisé et rendre les accès directs ou les rebonds alternatifs non autorisés incompatibles avec le dispositif cible.

## Situation actuelle et point de départ
- Le POC Guacamole est instancié et son socle est configuré.
- La validation opérationnelle du POC reste à réaliser avec un groupe restreint de 2 à 3 administrateurs.
- Les prochaines étapes doivent être confirmées lors du prochain échange avec Cyril et les contributeurs techniques concernés.
- La construction des environnements de préproduction et de production peut être étudiée en parallèle du pilote, sous réserve de confirmer les prérequis et le niveau de maturité du POC.
- L’échéance cible évoquée en réunion est janvier ; l’année, les jalons intermédiaires et la date de mise en service restent à confirmer.

## Périmètre proposé
1. Finaliser le POC et vérifier les principaux cas d’usage des administrateurs.
2. Recueillir les retours des utilisateurs pilotes et traiter les écarts identifiés.
3. Préparer les environnements de préproduction et de production.
4. Définir les modalités d’authentification, d’autorisation, de journalisation et de consultation des sessions.
5. Sécuriser les chemins d’accès alternatifs afin d’éviter le contournement du bastion.
6. Préparer la documentation, l’exploitation et le transfert vers les équipes Run.

## Risques et points de vigilance
- **Contournement du bastion :** des accès SSH directs ou des rebonds via des systèmes intermédiaires pourraient neutraliser son intérêt.
- **Latéralisation :** les accès depuis des composants tels que VTOM ou Cyberwatch doivent être analysés afin d’identifier les chemins de rebond possibles.
- **Adoption utilisateur :** les usages réels des administrateurs peuvent révéler des irritants ou des cas non couverts par Guacamole.
- **Échéance :** la date cible de janvier nécessite un rétroplanning et une validation rapide des dépendances.
- **Disponibilité des contributeurs :** les activités de mise en place du bastion et de sécurisation des flux mobilisent potentiellement des équipes différentes.
- **Traçabilité :** les exigences de conservation, de consultation et d’accès aux enregistrements de session restent à préciser.

## Dépendances
- Disponibilité des administrateurs pilotes et des référents techniques.
- Confirmation des cas d’usage et des critères de validation du POC.
- Décisions d’architecture et de sécurité concernant les flux et les chemins d’accès.
- Coordination avec les équipes en charge des règles réseau, des accès SSH et des systèmes intermédiaires.
- Validation des prérequis de préproduction et de production.
- Clarification des exigences d’exploitation, de journalisation et de conservation des traces.

## Plan d’action initial
1. Organiser un point de reprise avec Cyril, l’architecte technique et les contributeurs concernés.
2. Confirmer le périmètre, les cas d’usage, les critères de réussite du POC et le responsable de chaque chantier.
3. Planifier un pilote avec 2 à 3 administrateurs et formaliser leurs retours.
4. Lancer en parallèle le cadrage de la préproduction/production et l’analyse des possibilités de contournement.
5. Construire un rétroplanning consolidé jusqu’à l’échéance cible.
6. Documenter les décisions, risques, responsables et prochaines étapes dans Jira.

## Critères d’acceptation proposés
- Le pilote est réalisé et ses résultats sont documentés.
- Les cas d’usage retenus sont validés ou les écarts restants sont explicitement arbitrés.
- Les environnements de préproduction et de production sont préparés et validés selon les exigences convenues.
- Les chemins d’accès autorisés et les mesures empêchant le contournement du bastion sont définis, testés et approuvés par les responsables compétents.
- La journalisation et la consultation des sessions répondent aux exigences convenues.
- La documentation d’exploitation et les modalités de transfert au Run sont disponibles.
- Les réserves restantes, leur propriétaire et leur échéance sont consignés.

## Commentaire Jira initial proposé
**Reprise du sujet :** le POC Guacamole est instancié et configuré, mais reste à valider en conditions d’usage avec 2 à 3 administrateurs. En parallèle, il convient de cadrer la construction des environnements de préproduction et de production ainsi que la sécurisation des accès alternatifs (notamment SSH et rebonds possibles via VTOM/Cyberwatch). Prochaine étape : confirmer les critères de réussite, les responsables, les dépendances et le rétroplanning associé à l’échéance cible de janvier.

## Décisions à confirmer
- Année et date exacte de l’échéance cible.
- Cas d’usage et critères de réussite du pilote.
- Périmètre exact des environnements et modalités de mise en production.
- Règles d’accès à appliquer aux connexions SSH et aux systèmes intermédiaires.
- Exigences de journalisation, de conservation et de consultation des sessions.
- Responsable de la validation finale et responsable du transfert au Run.

*Les éléments présentés comme « proposés » ou « à confirmer » ne constituent pas des décisions techniques déjà validées.*
