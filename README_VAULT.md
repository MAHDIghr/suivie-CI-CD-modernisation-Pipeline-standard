# Dossier de préparation — Mise en place de HashiCorp Vault

> **Objectif de ce document :** vous donner, en tant que chef de projet IT Operations / Build, une compréhension progressive et opérationnelle d'un futur chantier Vault : à quoi sert la solution, comment elle s'intègre à une chaîne CI/CD, quelles décisions doivent être prises, comment organiser le déploiement et comment suivre le travail dans Jira.
>
> **Point de vigilance :** ce document présente une architecture de référence à confirmer. Il ne présume ni que HashiCorp Vault a déjà été choisi, ni de l'hébergeur, du mode de déploiement, de l'édition, des outils CI/CD ou des règles de sécurité de votre organisation. Les choix définitifs relèvent des équipes d'architecture, de sécurité et d'exploitation.

## 1. Résumé exécutif

**HashiCorp Vault** est une solution de gestion centralisée des secrets et de contrôle des accès aux données sensibles. Elle permet notamment de stocker des secrets, de délivrer des identifiants temporaires, de gérer des certificats et de journaliser les accès.

Dans un environnement Cloud / IT Operations, Vault peut éviter que des mots de passe, clés API, jetons ou clés privées soient copiés dans des dépôts Git, des fichiers de configuration, des images de conteneurs ou des variables CI/CD trop largement accessibles.

Le principe recherché est le suivant :

1. Un utilisateur, un pipeline ou une application prouve son identité auprès de Vault.
2. Vault vérifie cette identité et applique les politiques d'accès associées.
3. Vault autorise uniquement les opérations et chemins explicitement permis.
4. Le client récupère le secret nécessaire, ou demande un secret temporaire.
5. Les accès sont audités et les secrets peuvent être renouvelés, révoqués ou remplacés selon leur type.

Vault ne remplace pas l'ensemble de la sécurité d'une chaîne CI/CD : il ne corrige pas à lui seul un pipeline compromis, un runner malveillant, un dépôt trop ouvert ou des permissions excessives. Il réduit notamment l'exposition et améliore le contrôle du cycle de vie des secrets.

## 2. Le problème que Vault cherche à résoudre

### 2.1 Sans gestion centralisée

Une équipe peut retrouver des secrets à plusieurs endroits :
- variables de pipelines configurées dans différents projets ;
- fichiers `.env`, fichiers YAML ou fichiers de configuration ;
- secrets stockés dans les paramètres d'un outil CI/CD ;
- mots de passe communiqués par messagerie ;
- identifiants durables partagés entre plusieurs applications ;
- clés présentes accidentellement dans un commit Git ou dans des logs.

Cela crée plusieurs risques :
- **exposition** : une personne ou un job peut lire un secret qui ne lui est pas destiné ;
- **durée de vie excessive** : un mot de passe reste valide après le départ d'un collaborateur ou la fin d'un projet ;
- **rotation difficile** : un même identifiant est utilisé par de nombreuses applications ;
- **traçabilité insuffisante** : il est difficile de savoir qui a obtenu quel secret et à quel moment ;
- **duplication** : plusieurs copies du même secret doivent être mises à jour ;
- **droits trop larges** : un pipeline possède des accès permanents qui dépassent son besoin réel.

### 2.2 Avec Vault

Vault fournit un point de contrôle commun pour les secrets et leurs règles d'accès. Selon les moteurs et méthodes activés, il peut :
- stocker des secrets statiques avec versions ;
- délivrer des identifiants temporaires pour certaines bases de données ou plateformes ;
- gérer des certificats via une autorité de certification configurée ;
- contrôler les accès à travers des politiques ;
- authentifier les clients à partir d'identités techniques ;
- enregistrer les opérations dans des journaux d'audit ;
- révoquer des accès ou des secrets lorsque le moteur concerné le permet.

**À retenir :** Vault centralise le contrôle, mais les équipes doivent encore concevoir les identités, les politiques, les procédures de rotation, les sauvegardes et le modèle d'exploitation.

## 3. Les notions fondamentales

### 3.1 Secret

Une donnée sensible permettant d'accéder à une ressource ou de prouver une identité : mot de passe, token, clé API, certificat, clé privée ou identifiant de service.

### 3.2 Authentification et autorisation

- **Authentification :** Vault vérifie *qui* appelle le service.
- **Autorisation :** Vault vérifie *ce que cette identité a le droit de faire*.

Un client correctement authentifié ne doit pas automatiquement pouvoir lire tous les secrets.

### 3.3 Auth methods

Les méthodes d'authentification permettent à un utilisateur, un serveur, un workload ou un pipeline de s'identifier. Le choix dépend de la plateforme : par exemple Kubernetes, cloud IAM, JWT/OIDC ou AppRole dans certains scénarios techniques.

La méthode exacte doit être choisie selon le contexte d'exécution et les capacités de la plateforme. Évitez de distribuer un identifiant statique très privilégié à tous les pipelines.

### 3.4 Policies

Les politiques définissent les chemins et les opérations autorisés, par exemple lire un chemin donné sans pouvoir le modifier ni accéder aux autres environnements. Elles doivent suivre le principe du **moindre privilège**.

### 3.5 Secrets engines

Les moteurs de secrets déterminent comment Vault stocke ou génère les secrets. Exemples :
- **KV (Key/Value)** : stocker des valeurs, par exemple des clés API ; KV v2 apporte notamment la gestion de versions ;
- **Database** : générer des identifiants de base de données temporaires lorsque la base et la configuration le permettent ;
- **PKI** : émettre et gérer des certificats selon une autorité de certification configurée ;
- autres moteurs selon les services et besoins de l'organisation.

Un moteur doit être activé et configuré sur un chemin défini. Le nom du chemin n'est pas universel : il doit être documenté dans le design de l'équipe.

### 3.6 Tokens Vault

Après authentification, un client peut recevoir un token Vault limité dans le temps et en permissions. Les TTL, renouvellements, usages et révocations doivent être maîtrisés. Un token Vault est lui-même sensible : il ne doit pas être écrit dans les logs, commité dans Git ou réutilisé sans limite.

### 3.7 Seal / unseal et auto-unseal

Vault protège ses données au repos. Au démarrage, selon la configuration, il peut nécessiter une opération de **unseal** pour devenir opérationnel. Un mécanisme d'**auto-unseal** peut s'appuyer sur un service de gestion de clés pris en charge. Cela doit être conçu avec les équipes sécurité et plateforme, avec une procédure de secours documentée.

Le mécanisme exact, la gestion des clés et les responsabilités de récupération sont des décisions d'architecture importantes : il ne faut pas les improviser pendant la mise en production.

## 4. Architecture logique de référence

Voici les principaux blocs à comprendre. Leur placement réel dépendra de l'architecture cible.

```text
Développeur / Administrateur / Pipeline CI-CD / Application
                         |
                         | HTTPS + identité technique
                         v
                 Endpoint Vault (API)
                         |
              Authentification du client
                         |
                  Policies d'accès
                         |
              +----------+-----------+
              |          |           |
              v          v           v
             KV       Database      PKI
          Secrets      Secrets   Certificats
              |
              v
       Stockage persistant chiffré
              |
       Audit des opérations
              |
       Supervision / alertes
```

### Les composants à identifier dans le projet

- **Serveur Vault** : expose l'API et applique les règles de sécurité.
- **Stockage backend** : conserve l'état persistant de Vault ; le choix dépend du mode d'installation.
- **Méthodes d'authentification** : établissent l'identité des utilisateurs et des workloads.
- **Politiques** : limitent les actions et les chemins accessibles.
- **Moteurs de secrets** : stockent ou génèrent les données demandées.
- **Audit devices** : enregistrent les opérations d'accès pour l'investigation et la conformité. La configuration doit être testée et les journaux protégés.
- **Supervision** : disponibilité, latence, erreurs d'authentification, saturation, expiration des certificats et santé du cluster.
- **Sauvegarde et reprise** : procédures de sauvegarde, restauration et test de reprise adaptés au backend.
- **TLS / certificats** : protègent les échanges entre clients et Vault.

Les journaux d'audit sont particulièrement sensibles : ils doivent être accessibles uniquement aux personnes habilitées et traités selon la politique de rétention de l'organisation.

## 5. Exemple concret : un pipeline CI/CD utilise un secret

Imaginons un pipeline qui doit déployer une application dans un environnement de test. Il a besoin d'un secret pour accéder à une ressource.

### Flux cible

1. Le pipeline démarre sur un runner autorisé.
2. Le runner obtient ou présente une identité technique prise en charge (par exemple une identité cloud, Kubernetes ou JWT/OIDC selon l'outil).
3. Vault valide l'identité et renvoie un token à durée limitée, avec des permissions restreintes.
4. Le job lit uniquement le chemin prévu pour l'application et l'environnement.
5. Le secret est utilisé au moment nécessaire par la commande de déploiement.
6. Le pipeline évite de l'afficher dans les logs, artefacts, sorties de debug ou fichiers persistants.
7. Le token est expiré ou révoqué selon le mécanisme retenu ; les accès restent traçables via l'audit.
8. En cas de compromission, l'équipe applique la procédure de révocation/rotation appropriée.

### Exemple de séparation des environnements

Une application en test ne devrait pas pouvoir lire les secrets de production. Cela peut être organisé avec des chemins et politiques distincts, des identités distinctes et, selon les besoins, des instances ou frontières de sécurité séparées.

Les noms de chemins ci-dessous sont **illustratifs uniquement** :

- `kv/data/apps/demo/test`
- `kv/data/apps/demo/prod`

Les permissions doivent être écrites et testées sur les chemins réellement configurés. Avec KV v2, les chemins API et les chemins d'accès aux données peuvent différer selon l'opération ; le référent doit valider les policies exactes.

### Exemple simplifié de politique HCL

L'extrait ci-dessous est pédagogique. Le chemin et les permissions doivent être adaptés à l'installation, à la version du moteur et aux règles internes.

```hcl
path "kv/data/apps/demo/test" {
  capabilities = ["read"]
}
```

Cette politique illustre une autorisation de lecture sur un chemin précis. Elle ne doit pas être interprétée comme une politique complète de production. Il faut aussi vérifier les chemins de métadonnées, les opérations requises, les capacités d'identité et les éventuels besoins de révocation.

### Les erreurs à éviter dans les pipelines

- placer un token Vault dans le dépôt Git ou dans un fichier versionné ;
- écrire les valeurs secrètes dans les logs, les traces shell ou les messages d'erreur ;
- transmettre un secret dans une ligne de commande visible par d'autres processus lorsque cela peut être évité ;
- conserver un secret dans un artefact de build ou dans un cache ;
- réutiliser le même compte privilégié pour tous les projets et environnements ;
- donner à un pipeline un accès global à tous les chemins ;
- confondre la protection du secret au repos avec la protection du runner qui le manipule.

Vault peut fournir le secret de manière contrôlée, mais le pipeline et le runner doivent également être durcis.

## 6. Choisir une méthode d'authentification pour les workloads

Il n'existe pas une méthode universelle à utiliser partout. La sélection dépend des plateformes, des identités déjà disponibles et du niveau de sécurité attendu.

| Méthode / approche | Cas d'usage courant | Points à vérifier |
|---|---|---|
| Kubernetes auth | Applications exécutées dans un cluster Kubernetes | Identité du service account, configuration de validation, séparation des namespaces et policies |
| Cloud IAM auth | Workloads dans un cloud pris en charge | Rôles IAM, trust, identité de la ressource et permissions minimales |
| JWT / OIDC | Pipelines ou workloads pouvant présenter un jeton signé par un fournisseur de confiance | Émetteur, audience, claims, durée de validité, règles de liaison et protection du fournisseur |
| AppRole | Certains workloads non interactifs lorsque les autres mécanismes ne conviennent pas | Protection du RoleID/SecretID, distribution, durée de vie, usages limités et procédure de rotation |
| Userpass / méthodes utilisateur | Accès humain si la politique de l'organisation le permet | Préférer une intégration d'identité d'entreprise lorsque disponible ; MFA et cycle de vie des comptes |

**Décision à obtenir :** quelle identité fiable chaque pipeline peut-il présenter à Vault sans devoir stocker en permanence un autre secret durable ?

Dans la mesure du possible, privilégiez une identité machine éphémère ou fédérée adaptée à la plateforme. Le choix doit être validé par l'équipe sécurité et le responsable CI/CD.

## 7. KV statique ou secrets dynamiques ?

### Secrets statiques (par exemple KV)

Le secret existe déjà et Vault le stocke de manière centralisée. Il peut être versionné, soumis à des permissions et remplacé selon une procédure.

Exemples : clé API d'un service tiers, configuration sensible d'une application, valeur partagée dont le fournisseur ne permet pas la génération automatique.

**Limite :** Vault ne peut pas rendre automatiquement temporaire un identifiant externe si le système cible ne sait pas le créer, le renouveler ou le révoquer.

### Secrets dynamiques

Vault demande au système cible de générer des identifiants à la demande, souvent avec une durée de vie limitée, lorsque le moteur concerné et l'intégration le permettent.

Exemple : un moteur Database peut générer un utilisateur temporaire avec des permissions prédéfinies, puis révoquer cet accès à l'expiration.

**Bénéfices :** réduire les secrets partagés et permanents, limiter la fenêtre d'exposition et améliorer la révocation.

**Contraintes :** compatibilité du système cible, configuration des comptes de génération, quotas, durée de vie, gestion des connexions longues, comportement en cas d'indisponibilité de Vault et procédures de secours.

Il faut inventorier les secrets et classer chaque besoin : statique, dynamique, certificat, ou autre mécanisme. Ne partez pas du principe que tous les secrets peuvent être rendus dynamiques.

## 8. Déploiement : les grandes options

Le choix doit être aligné sur les standards internes, la capacité d'exploitation, les exigences de disponibilité, la résidence des données, les coûts et l'édition retenue.

### Option A — Service géré

Une offre de Vault géré peut réduire la charge d'exploitation de l'infrastructure Vault elle-même, selon les responsabilités couvertes par le fournisseur.

À vérifier : réseau privé, authentification, disponibilité régionale, sauvegardes, chiffrement, gestion des clés, audit, SLA, coûts, support et réversibilité.

### Option B — Déploiement autogéré sur des machines virtuelles

L'équipe gère les serveurs, le réseau, le stockage, les mises à jour, le durcissement, la haute disponibilité, les sauvegardes et les procédures d'exploitation.

À vérifier : backend de stockage pris en charge, nombre de nœuds, tolérance aux pannes, équilibrage, TLS, gestion des clés, restauration et responsabilités d'astreinte.

### Option C — Déploiement sur Kubernetes

Vault peut être exécuté dans un cluster Kubernetes avec une méthode de déploiement adaptée, souvent via les outils et chart pris en charge par le projet. Kubernetes peut aussi être un consommateur de Vault ; ces deux rôles sont différents.

À vérifier : stockage persistant, anti-affinité, disponibilité du cluster, identité des pods, réseau, politiques de sécurité, mises à jour, sauvegarde, accès opérateur et conséquences d'une panne Kubernetes.

**Important :** ne choisissez pas un mode de déploiement uniquement parce qu'il est familier à l'équipe. Le choix doit prendre en compte le modèle de menace, le niveau de service attendu et la capacité réelle à l'exploiter.

## 9. Haute disponibilité, stockage, chiffrement et reprise

### Haute disponibilité (HA)

Pour un service central de secrets, une panne peut bloquer des pipelines et des applications qui ont besoin d'obtenir ou de renouveler leurs identifiants. Le design doit préciser :
- le nombre et le placement des nœuds ;
- le mécanisme HA et le comportement lors d'une perte de nœud ;
- la dépendance au réseau, au DNS, au load balancer et au stockage ;
- la surveillance du quorum ou de l'état du backend, selon l'architecture ;
- le comportement des clients en cas d'indisponibilité ;
- les objectifs de disponibilité et le plan de maintenance.

Ne déduisez pas la disponibilité réelle du seul nombre de serveurs. Il faut identifier les dépendances communes et tester les scénarios de panne.

### Stockage et sauvegarde

Le stockage persistant et la procédure de sauvegarde dépendent du backend retenu. Documentez :
- ce qui est sauvegardé et à quelle fréquence ;
- où sont conservées les sauvegardes et qui peut y accéder ;
- comment les clés nécessaires à la restauration sont protégées ;
- le RPO (perte de données maximale acceptable) et le RTO (durée maximale de rétablissement) ;
- la procédure de restauration et sa fréquence de test ;
- les responsabilités et preuves de test.

Une sauvegarde non testée ne constitue pas une garantie de reprise.

### Chiffrement et clés

Il faut distinguer le chiffrement des communications (TLS), la protection des données persistées par Vault et les mécanismes de gestion des clés utilisés pour l'initialisation ou l'auto-unseal. Les responsabilités de création, stockage, rotation, accès d'urgence et récupération des clés doivent être explicites.

### Modes dégradés

Questions à traiter avant la production :
- Que se passe-t-il si Vault est indisponible au lancement d'un pipeline ?
- Une application conserve-t-elle un secret en mémoire, et pour combien de temps ?
- Les pipelines échouent-ils de manière sûre plutôt que d'utiliser un secret obsolète non contrôlé ?
- Comment révoquer un accès suspect ?
- Comment éviter que la reprise génère une charge excessive sur Vault ?

Ne créez pas de mécanisme de contournement permanent qui réintroduirait des secrets en dur pour « assurer la continuité ».

## 10. Sécurité et gouvernance

### Contrôles essentiels

- **Moindre privilège :** permissions minimales, par identité et par environnement.
- **Séparation des rôles :** distinguer, autant que nécessaire, administration Vault, gestion des policies, gestion des secrets et consommation par les applications.
- **Accès humain :** identité nominative, MFA si requis, processus d'arrivée/départ et revues périodiques.
- **Accès machine :** identités propres à chaque workload, tokens limités et procédures de révocation.
- **Audit :** activation, centralisation, protection et surveillance des journaux.
- **TLS :** validation des certificats et gestion de leur renouvellement.
- **Rotation :** règles explicites, responsables et tests de non-régression.
- **Cloisonnement :** séparer les environnements et les équipes selon les exigences de risque.
- **Secrets dans les logs :** masquage côté CI/CD et tests démontrant qu'aucune valeur sensible n'est imprimée.
- **Gestion des incidents :** procédure de révocation, rotation, investigation et communication.
- **Mises à jour :** versions supportées, correctifs de sécurité et fenêtre de maintenance.
- **Revue des accès :** vérifier régulièrement que les identités et policies sont encore nécessaires.

### Que faire si un secret est exposé ?

1. Traiter l'incident selon le processus interne et identifier le périmètre de l'exposition.
2. Révoquer ou remplacer le secret auprès du système cible, si possible immédiatement.
3. Révoquer les tokens ou identités concernés et ajuster les policies si nécessaire.
4. Examiner les logs du pipeline, du runner, de Vault et du système cible.
5. Supprimer la valeur des emplacements concernés selon la procédure, sans supposer que l'effacer du dernier commit suffit à l'éliminer de l'historique.
6. Vérifier les artefacts, caches, logs et copies éventuelles.
7. Documenter la cause racine et les actions préventives.

La procédure doit être alignée avec le processus officiel de gestion des incidents de l'entreprise.

## 11. Supervision et exploitation au quotidien

Les indicateurs exacts dépendront de la plateforme et de l'outillage de supervision. Le référent d'exploitation doit définir des seuils, des alertes et des responsables.

À considérer :
- disponibilité de l'API Vault et latence ;
- état du cluster et du stockage ;
- erreurs d'authentification et refus d'autorisation ;
- volume d'accès et erreurs par méthode d'authentification ;
- état et disponibilité des dispositifs d'audit ;
- expiration ou renouvellement des certificats ;
- échecs de rotation ou de génération de secrets dynamiques ;
- saturation des ressources et capacité ;
- âge de la dernière sauvegarde et résultat du dernier test de restauration ;
- versions, correctifs et échéances de maintenance.

Évitez d'alerter sur chaque échec isolé sans contexte. Les alertes doivent identifier une action attendue et avoir un propriétaire.

### Runbooks à prévoir

- démarrage, arrêt et contrôle de santé ;
- procédure d'unseal ou de vérification d'auto-unseal ;
- gestion des tokens et révocation ;
- ajout, modification et retrait d'une policy ;
- rotation d'un secret et test de l'application consommatrice ;
- incident d'authentification ou d'autorisation ;
- perte d'un nœud / indisponibilité du service ;
- sauvegarde et restauration ;
- renouvellement des certificats ;
- mise à jour et retour arrière ;
- perte ou indisponibilité des logs d'audit.

## 12. Proposition de démarche projet

Le plan ci-dessous est un **ordre de travail indicatif**, pas un planning validé. Il doit être ajusté après cadrage, estimation technique et arbitrage de capacité.

### Phase 1 — Cadrage et inventaire

Objectifs :
- confirmer le besoin métier/technique et le problème actuel ;
- identifier les systèmes consommateurs (pipelines, applications, bases, plateformes) ;
- inventorier les types de secrets, propriétaires, environnements et risques ;
- identifier les contraintes réglementaires, réseau, sécurité, disponibilité et exploitation ;
- clarifier les responsabilités et le périmètre initial.

Livrables possibles :
- note de cadrage ;
- inventaire priorisé des cas d'usage ;
- périmètre MVP et exclusions ;
- risques, dépendances et décisions ouvertes.

### Phase 2 — Architecture et choix de conception

Objectifs :
- choisir le mode de déploiement et le backend ;
- choisir les méthodes d'authentification des humains et des workloads ;
- définir le modèle de chemins, policies et séparation des environnements ;
- définir TLS, audit, stockage, sauvegarde, HA et reprise ;
- valider le modèle de support et d'exploitation.

Livrables possibles :
- schéma d'architecture ;
- décisions d'architecture consignées ;
- matrice d'accès ;
- modèle de menace / revue sécurité ;
- exigences non fonctionnelles : disponibilité, RPO/RTO, performance et traçabilité.

### Phase 3 — Construction d'un environnement pilote

Objectifs :
- déployer Vault dans un environnement non productif ;
- configurer le réseau, TLS, stockage et méthode d'authentification ;
- activer un moteur de secrets et les politiques minimales nécessaires ;
- activer et vérifier l'audit ;
- définir les contrôles de santé et la sauvegarde.

Livrables possibles :
- environnement pilote opérationnel ;
- configuration versionnée sans secrets en clair ;
- tests de sécurité et d'accès ;
- runbook initial.

### Phase 4 — Intégration d'un premier pipeline

Objectifs :
- choisir un cas d'usage représentatif et limité ;
- authentifier le pipeline sans déposer un secret permanent dans Git ;
- lire un secret de test avec les permissions minimales ;
- vérifier l'absence de secret dans les logs et artefacts ;
- tester les refus d'accès, l'expiration du token et l'indisponibilité de Vault.

Livrables possibles :
- exemple de pipeline réutilisable ;
- tests automatisés ou preuves de validation ;
- guide d'intégration ;
- décision Go / No-Go pour élargir le périmètre.

### Phase 5 — Industrialisation et migration progressive

Objectifs :
- définir le modèle standard réutilisable ;
- migrer les cas d'usage par lots prioritaires ;
- retirer les anciens secrets après vérification de la migration ;
- tester rotation, révocation, supervision, sauvegarde et reprise ;
- former les équipes utilisatrices et d'exploitation.

Livrables possibles :
- modèles et documentation ;
- plan de migration par application / pipeline ;
- preuves de tests ;
- suivi des secrets retirés et des exceptions restantes.

### Phase 6 — Transfert en Run et amélioration continue

Objectifs :
- transférer la responsabilité opérationnelle ;
- valider les procédures d'incident, de maintenance et de restauration ;
- définir les revues d'accès et le cycle de mise à jour ;
- suivre les exceptions et améliorer le standard.

Livrables possibles :
- dossier d'exploitation validé ;
- RACI ou matrice des responsabilités ;
- procédures d'astreinte et d'escalade ;
- critères d'acceptation et accord de transfert.

## 13. Comment structurer le suivi dans Jira

Commencez par un ticket parent décrivant le résultat attendu, le périmètre et les critères de fin. Les sous-tâches doivent représenter des lots de travail réellement distincts, avec un responsable, un livrable, des dépendances et des critères d'acceptation. Ne créez pas de sous-tâches supplémentaires uniquement pour détailler chaque action quotidienne.

Exemple de découpage possible, à confirmer en atelier :

1. **Cadrage et inventaire des secrets** — cas d'usage, propriétaires, classification et priorisation.
2. **Architecture et validation sécurité** — déploiement, identités, policies, HA, audit, sauvegarde.
3. **Mise en place de l'environnement pilote** — plateforme et configuration initiale.
4. **Intégration CI/CD pilote** — authentification d'un pipeline et récupération contrôlée d'un secret.
5. **Tests de sécurité et de résilience** — permissions, expiration, logs, rotation et panne.
6. **Industrialisation et documentation** — standard réutilisable, migration et transfert en Run.

Selon la taille réelle du chantier, certains lots peuvent être regroupés. À l'inverse, un lot peut être séparé si des équipes, validations ou jalons distincts le justifient.

### Exemple de description du ticket parent

> **Objectif**  
> Mettre en place une gestion centralisée et contrôlée des secrets pour les cas d'usage retenus, avec une intégration progressive aux pipelines CI/CD.
>
> **Périmètre à confirmer**  
> Solution et édition retenues, plateformes cibles, familles de secrets, environnements concernés, pipelines pilotes, exigences de disponibilité et responsabilités d'exploitation.
>
> **Critères de fin proposés**  
> - L'architecture et le modèle de sécurité sont validés par les rôles compétents.
> - Un cas d'usage pilote fonctionne de bout en bout.
> - Les accès sont limités selon le moindre privilège et les journaux d'audit sont vérifiés.
> - Les tests de rotation/révocation, d'échec d'accès et de comportement en cas d'indisponibilité sont concluants.
> - Les procédures d'exploitation, de sauvegarde/reprise et de gestion d'incident sont acceptées.
> - Les écarts et risques résiduels sont documentés et acceptés.

Ces critères sont une base de discussion. Il ne faut pas les déclarer obligatoires avant validation du périmètre.

### Informations minimales par sous-tâche

- objectif et résultat attendu ;
- périmètre inclus / exclu ;
- responsable de réalisation et rôle de validation ;
- dépendances et décisions nécessaires ;
- critères d'acceptation testables ;
- prochaine étape et date convenue ;
- lien vers la documentation technique ou la décision correspondante.

### Commentaires de suivi utiles

**Après un cadrage :**
> Cadrage réalisé le [date] : [décisions confirmées]. Restent à clarifier : [points]. Prochaine étape : [action] — responsable : [rôle/personne].

**En attente d'une décision :**
> En attente de validation concernant [décision]. Impact : [activité ou jalon concerné]. Décision attendue auprès de [rôle] avant [date convenue, si confirmée].

**En cas de blocage :**
> Blocage : [fait observé]. Conséquence : [impact]. Action / arbitrage attendu : [action et propriétaire]. Prochaine revue : [date].

**À la fin du pilote :**
> Pilote exécuté sur [périmètre]. Résultats : [preuves]. Réserves : [éléments]. Validation : [rôle/personne et date], ou validation encore attendue.

## 14. Rôle du chef de projet : questions à poser

Vous n'avez pas besoin de décider vous-même des détails d'architecture. Votre rôle consiste à faire émerger les décisions, identifier qui les prend, suivre les dépendances et rendre les risques visibles.

### Besoin et périmètre
- Quel problème concret cherche-t-on à résoudre avec Vault ?
- Quels secrets sont concernés en priorité, et lesquels sont explicitement hors périmètre ?
- Quel outil ou mécanisme est utilisé aujourd'hui ?
- Quel premier pipeline ou service sera choisi comme pilote ?
- Comment mesurera-t-on le succès du chantier ?

### Architecture et sécurité
- Vault est-il déjà la solution retenue ou est-ce encore une étude ?
- Qui valide l'architecture et la revue de sécurité ?
- Quel mode d'hébergement et quel backend sont envisagés ?
- Comment les pipelines et applications s'authentifieront-ils sans secret permanent ?
- Comment sépare-t-on les accès test, préproduction et production ?
- Qui gère les policies, les clés, les certificats et les exceptions ?
- Quelles sont les exigences de disponibilité, d'audit, de RPO et de RTO ?

### Intégration et dépendances
- Quel outil CI/CD, quels runners et quelles plateformes sont concernés ?
- Les runners peuvent-ils joindre Vault via un réseau approuvé ?
- Quels systèmes cibles doivent être intégrés (API, bases, cloud, Kubernetes, PKI…) ?
- Faut-il modifier des pipelines partagés ou des modèles standard ?
- Quels accès, certificats, règles réseau ou décisions sont prérequis ?

### Exploitation
- Quelle équipe sera propriétaire du service en Run ?
- Qui surveille les alertes et qui intervient en cas d'incident ?
- Comment sont testées les sauvegardes et la restauration ?
- Qui organise les mises à jour, la rotation des secrets et les revues d'accès ?
- Que font les applications si Vault est temporairement indisponible ?

### Planification et gouvernance
- Quel est le niveau de priorité par rapport aux autres chantiers ?
- Quelles équipes doivent contribuer et quelle capacité est réellement disponible ?
- Quelles sont les étapes de validation et les critères de Go/No-Go ?
- Quelles décisions sont bloquantes, qui les porte et pour quelle date ?
- Quel est le périmètre minimum utile pour le premier jalon ?

## 15. Risques à suivre dans le RAID log

| Risque | Conséquence possible | Mesure / action à prévoir |
|---|---|---|
| Méthode d'authentification mal adaptée | Secrets statiques nécessaires pour accéder à Vault | Faire valider l'identité des workloads avant le pilote |
| Policies trop permissives | Accès à des secrets non nécessaires | Revue des policies, tests positifs et négatifs, moindre privilège |
| Vault indisponible | Pipelines ou applications bloqués | Architecture HA adaptée, supervision et scénarios de panne |
| Rotation non maîtrisée | Incident applicatif ou secret encore valide ailleurs | Inventaire des consommateurs, plan de rotation et tests |
| Secret affiché dans les logs | Exposition malgré l'usage de Vault | Tests de logs, masquage et durcissement des scripts |
| Audit incomplet ou indisponible | Investigation et conformité difficiles | Tester l'activation, la centralisation, l'accès et les alertes |
| Absence de propriétaire Run | Incidents non traités ou maintenance oubliée | Nommer l'équipe responsable et formaliser le transfert |
| Périmètre trop large dès le début | Retards et dépendances nombreuses | Définir un pilote limité puis migrer progressivement |
| Capacité DevOps insuffisante | Décalage du jalon | Arbitrage explicite des priorités et prévisions réalistes |
| Restauration non testée | Reprise impossible ou trop lente | Définir RPO/RTO et organiser un exercice de restauration |

## 16. Critères de réussite mesurables

Les indicateurs doivent être choisis avec l'équipe. Exemples possibles :
- nombre de pipelines pilotes intégrés et validés ;
- proportion de cas d'usage migrés par rapport au périmètre convenu ;
- nombre de secrets statiques retirés ou tournés après migration, lorsque cela est mesurable ;
- nombre d'exceptions de sécurité ouvertes et leur ancienneté ;
- taux de réussite des tests d'authentification et d'autorisation ;
- absence de secrets dans les logs et artefacts sur les tests définis ;
- résultat des tests de révocation et de rotation ;
- état des tests de sauvegarde/restauration ;
- existence et validation des runbooks, de la supervision et du transfert en Run.

Un indicateur ne doit pas encourager à migrer vite au détriment de la sécurité. Une migration n'est terminée que lorsque le secret a été retiré de l'ancien emplacement selon une procédure sûre et que les consommateurs ont été vérifiés.

## 17. Glossaire rapide

- **API** : interface par laquelle un client échange avec Vault.
- **Auth method** : mécanisme d'identification d'un client.
- **Backend de stockage** : composant qui conserve l'état persistant de Vault.
- **CI/CD** : intégration continue et livraison/déploiement continus.
- **HCL** : format de configuration couramment utilisé pour les policies Vault.
- **HA** : haute disponibilité.
- **KV** : moteur clé-valeur pour stocker des secrets.
- **Least privilege / moindre privilège** : accorder uniquement les droits nécessaires.
- **MFA** : authentification multifacteur.
- **PKI** : infrastructure à clés publiques utilisée notamment pour les certificats.
- **RPO** : quantité maximale de données que l'organisation accepte de perdre lors d'une reprise.
- **RTO** : durée maximale cible pour rétablir le service.
- **Secret dynamique** : identifiant généré à la demande avec une durée de vie limitée lorsque le système cible le permet.
- **Token Vault** : jeton servant à effectuer des opérations auprès de Vault selon des permissions données.
- **Unseal** : opération permettant à Vault de retrouver l'accès à ses données protégées au démarrage, selon son mode de configuration.
- **Workload** : application, job ou pipeline exécuté par une plateforme.

## 18. Documentation officielle à consulter

La documentation évolue ; utilisez les pages officielles comme référence pour les versions et fonctionnalités effectivement retenues.

- [Documentation HashiCorp Vault](https://developer.hashicorp.com/vault/docs)
- [Introduction à Vault](https://developer.hashicorp.com/vault/docs/what-is-vault)
- [Concepts et architecture](https://developer.hashicorp.com/vault/docs/internals/architecture)
- [Policies](https://developer.hashicorp.com/vault/docs/concepts/policies)
- [Méthodes d'authentification](https://developer.hashicorp.com/vault/docs/auth)
- [Secrets engines](https://developer.hashicorp.com/vault/docs/secrets)
- [KV secrets engine](https://developer.hashicorp.com/vault/docs/secrets/kv)
- [Audit devices](https://developer.hashicorp.com/vault/docs/audit)
- [Haute disponibilité](https://developer.hashicorp.com/vault/docs/concepts/ha)
- [Sauvegarde et restauration avec Raft](https://developer.hashicorp.com/vault/docs/commands/operator/raft)
- [Sécurisation et recommandations](https://developer.hashicorp.com/vault/docs/concepts/security)

Vérifiez que chaque page correspond à la version et à l'édition envisagées. Les capacités et les conditions de licence peuvent varier selon l'offre retenue.

## 19. Les dix choses à retenir avant de suivre le chantier

1. Vault est un service de gestion des secrets et des accès, pas seulement un coffre-fort de mots de passe.
2. La première décision est de comprendre les cas d'usage et le risque actuel, pas de déployer un serveur immédiatement.
3. L'identité du pipeline est aussi importante que le secret qu'il veut récupérer.
4. Authentification et autorisation sont deux contrôles différents.
5. Les policies doivent être limitées par application, usage et environnement.
6. Les secrets dynamiques sont intéressants, mais ne sont pas possibles pour tous les systèmes.
7. La disponibilité, la sauvegarde, l'audit, les clés et les procédures de reprise doivent être prévus dès la conception.
8. Le pipeline peut encore divulguer un secret s'il l'imprime dans les logs ou le conserve dans un artefact.
9. Un pilote limité permet de valider l'architecture avant une migration plus large.
10. En tant que chef de projet, vous devez obtenir des décisions explicites, des responsables, des critères de validation et des prévisions réalistes — sans vous substituer au référent technique.

---

**Statut de ce dossier :** support de préparation initial. Les choix d'architecture, le périmètre, le planning, les responsabilités et les critères de réussite restent à confirmer avec les équipes concernées.
