
création des pipeline standard Node/NPM
Liste : 



. Applications Node.js
Il s’agit des applications basées sur Node.js (Next.js / React) et déployées sous ECS.
Quotidienne — CI Legacy
Open — CI Legacy
BND — CI Legacy
JP — CI Legacy
LD-Actu — Nouvelle CI
MyArea — Nouvelle CI
OnePortal-Avocat (Reference)
front
proxy
api
ia
Skillia ?
2. Librairies NPM
design-system
gateway-component
jp-components
bnd-components
oneportal-avocat-component
isomorphic-utils
Il y a aussi quelques lambda en nodejs, sur myarea, content-plateform (pour les images), sur jp (pour l'impression)
 

Objectif : comme pour Java, définir un pipeline standard et une méthode d’installation commune par le tech-office

Il faut rajouter toutes les briques de test, Trivy, Sonar, SBOM, etc

 

 

Note : dans la partie déploiement sur Nexus, faire la différence entre les releases et les snapshot. Aujourd’hui il n’y a pas de distinctions possibles. 
----- standardisation des pipelines Lambda

Informations sur l’historique (toutes les infos ci-dessous ne sont plus à jour et font partie de la demande initiale) : 

Analyser les différentes pipelines créées par les librairies.

 

Indépendamment de la stack technologique, les étapes identifiées pour “builder” un logiciel sont les suivantes :

Checkout du code source sur la branche concernée

Build de l’application (ex. : mvn clean compile pour application Java / Maven)

Contrôles qualité (ex. : linters) & tests automatisés (unitaires & intégration / acceptance en isolation avec dépendances “mockées”)

A discuter de la nécessité d’avoir 2 stages distincts.

A noter que 2 livrables sont attendus au niveau de ce stage :

Le rapport de test pour affichage dans Jenkins (dans l’idéal au format JUnit report)

Le rapport de test coverage qui sera envoyé à SonarQube

Détection des vulnérabilités via Dependency Track

Scan SonarQube

Quality Gate SonarQube

Packaging de l’application (JAR, image Docker, etc.)

Déploiement de(s) package(s) (Nexus / AWS ECR)

Déploiement de l’application sur l’environnement de DEV (stage qui déclenche un job de déploiement séparé)

 

Concernant les tests, les tests d’intégration / End 2 End (E2E) , où l’application est réellement déployée sur un environnement et interagit avec un écosystème, ne doivent pas être joués dans le pipeline de build classique, et ce, pour 2 raisons :

Ils sont instables par nature car ils dépendent de services externes et de jeux de données qui peuvent changer, donc susceptibles de casser le build (le build n’est pas déterministe)

Ils sont en générale assez long à exécuter. L’objectif de la CI est d’avoir une boucle de feedback très rapide (5min max dans l’idéal, 10min max acceptable) pour s’assurer qu'à tout moment, la qualité du code est au rendez-vous. Ceci nous permettra de tendre vers du Déploiement Continue (CD).

En règle générale, il y a un repository dédié pour ce type de tests, l'équipe projet et / ou l'équipe QA pouvant  y contribuer. Les jobs Jenkins associés peuvent être lancés à la demande, ou de manière automatisée mais à des fréquences plus espacées (ex. : 1 fois / jour).

Un point est à organiser avec Ioannis côté ITOPS pour échanger sur le projet Tests Auto et sur la mise en place de ce type de tests et les technologies associées : Bruno pour les tests d’API, Selenium / Cucumber / Cypress pour les tests d’IHM, etc.

 

Concernant la détection des vulnérabilités, on partirait sur un contrôle non-bloquant qui irait alimenter l’outil Dependency Track / Check pour information auprès de personnes habilitées.

A discuter de la nécessité de mettre en place un process pour contrôler les vulnérabilités de sécurité ou les problèmes de licences des librairies tierces avant la MEP (lors du Tech Check ? Pré-requis du Tech Office avant le Gate 2 de l’ARB ?).

 

Paramètres d’entrée
A date, les paramètres d’entrée diffèrent suivant le type de build :

Build classique :

Une case à cocher “CONFIRM” avait été rajoutée car le scanner du Multibranch Pipeline déclenchait les jobs automatiquement en cas d’ajout d’une nouvelle branche pour laquelle il n’y a pas encore de job Jenkins. Si on utilise le webhook depuis Bitbucket, les jobs seront provisionnés automatiquement et nous n’aurons plus ce problème

Une case à cocher “RUN_SONAR_ANALYSIS” pour déclencher les scans & la Quality Gate SonarQube à la demande

Une case à cocher “DEPLOY” pour déployer sur l’environnement de DEV

Deploy :

La version à déployer

L’environnement cible

Release :

Une case à cocher “RELEASE” pour exécuter un build & une release de l’application, uniquement sur les branches nommées “release/XXX”
