
DEMANDE : 

Tu es un expert en reporting de projet IT, UX/UI et visualisation de données.

Je souhaite que tu génères un fichier HTML autonome (HTML + CSS + JavaScript intégré dans un seul fichier) permettant d'obtenir un rapport professionnel de suivi de projet pouvant être exporté directement en PDF.

L'objectif est de produire un document de niveau entreprise, très visuel, moderne et lisible, avec un design similaire aux tableaux de bord utilisés dans les grandes ESN, cabinets de conseil ou équipes de transformation IT.

Le rapport doit être entièrement en français.

====================================================
CONTEXTE DU PROJET
====================================================

Projet principal :

AUTOMATISATION DES OUVERTURES DE DROITS

Ticket principal :

PJTCLOUD-994

Objectif :

Automatiser le processus de gestion des droits utilisateurs à travers ServiceNow, Jenkins et différents systèmes cibles (AWS, Bitbucket, AD et listes de diffusion).

Le processus cible est :

Utilisateur
↓
Formulaire ServiceNow
↓
Validation
↓
Jenkins
↓
Ouverture des droits automatique
↓
Retour de statut vers ServiceNow
↓
Clôture automatique de la demande

====================================================
SOUS-TACHES
====================================================

PJTCLOUD-995
Formulaire SNOW d'ajout de droit

PJTCLOUD-996
Informations à stocker pour la construction des paramètres

PJTCLOUD-997
Création du job Jenkins d'ouverture de droit

PJTCLOUD-998
POC ajout/suppression de droit Bitbucket depuis Jenkins

PJTCLOUD-999
POC ajout/suppression à un groupe AD avec ADManager depuis Jenkins

PJTCLOUD-1000
POC ajout/suppression à une liste de diffusion depuis Jenkins

PJTCLOUD-1001
POC ajout/suppression de droit AWS depuis Jenkins

PJTCLOUD-1002
Repenser la gestion équipe/groupe dans les droits AWS

====================================================
TRAVAUX RÉALISÉS
====================================================

Réunion Jenkins

Date :
26/10/2026

Participants :
- Souhail Elmalih
- Emna Hannachi
- Alexandre Bouet

Sujet :
Suivi de la partie Jenkins et architecture d'automatisation.

Réunion ServiceNow

Date :
27/10/2026

Participants :
- Dany Garnier
- Emna Hannachi

Sujet :
Analyse du formulaire SNOW et intégration avec Jenkins.

Point AD Manager

Date :
26/10/2026

Participant :
- Johan Fontange

Sujet :
Étude de l'accès API AD Manager.

====================================================
AVANCEMENT DE CHAQUE SOUS-TACHE
====================================================

PJTCLOUD-1002
Gestion équipe/groupe AWS

Statut :
En cours d'analyse par Alexandre Bouet

Niveau :
Analyse

Commentaire :

Une révision du périmètre a été identifiée.

Les fonctions suivantes sont retirées :

- création de comptes
- suppression de comptes
- gestion des mots de passe
- génération d'access keys

Le périmètre est désormais centré sur :

- attribution des droits AWS
- retrait des droits AWS
- remontée d'information vers ServiceNow

Aucun blocage identifié.

====================================================

PJTCLOUD-1001
POC AWS

Responsable :
Emna Hannachi

Statut :
En cours

Niveau d'avancement :
Très avancé

Commentaire :

Les principaux mécanismes d'ajout/suppression de droits AWS sont déjà implémentés.

Aucun blocage majeur identifié.

====================================================

PJTCLOUD-1000
POC Liste de diffusion

Responsable :
Souhail Elmalih

Statut :
Planifié

Commentaire :

Le démarrage dépend de la validation :

- POC Bitbucket
- POC AD

Point à clarifier :

Déterminer si les listes de diffusion sont indépendantes ou adossées à des groupes AD.

Si dépendance AD :

Impact potentiel lié aux travaux actuellement en cours sur l'API AD Manager.

====================================================

PJTCLOUD-999
POC AD Manager

Responsable :
Souhail Elmalih

Statut :
Planifié

Condition de démarrage :

Obtention d'un accès API AD Manager.

Point réalisé avec Johan Fontange :

La faisabilité technique semble confirmée.

Cependant une étude complémentaire est nécessaire concernant :

- exposition API
- authentification
- délégation des droits
- sécurité des accès

Aucun accès n'est encore disponible.

Le démarrage du POC reste dépendant de la validation de l'équipe AD.

Les premiers échanges indiquent :

- possibilité d'accès d'ici fin d'année
- ou début d'année prochaine

Aucun engagement officiel n'a encore été confirmé.

====================================================

PJTCLOUD-998
POC Bitbucket

Responsable :
Souhail Elmalih

Statut :
En cours

Commentaire :

Le besoin a été compris.

Aucun blocage identifié.

Livraison prévisionnelle :

Semaine du 02/11/2026

====================================================

PJTCLOUD-997
Création Job Jenkins

Responsable :
Cyrille Ticier

Statut :
En attente

Réalisé :

- documentation technico-fonctionnelle
- expression du besoin API AD Manager

En attente :

Retour de Cyrille suite à son retour de congés le 02/11.

====================================================

PJTCLOUD-995
Formulaire SNOW

Statut :
En cours

Avancement :

Le besoin a été revu.

Les dépendances principales ont été identifiées.

Actions en attente :

- identifier le responsable du référentiel des équipes
- recenser les owners
- recenser les membres
- recenser les projets Bitbucket
- recenser les groupes AD
- recenser les groupes AWS

Un pilote métier doit être identifié pour lancer les tests.

Blocages :

Validation manager par mail impossible actuellement sans licence Business Stakeholder.

Estimation de coût en attente.

Autre sujet :

Étude nécessaire pour :

- réception du retour Jenkins
- gestion de clôture automatique
- faisabilité technique ServiceNow

Devis TMA demandé pour :

- appel API Jenkins
- fermeture automatique du RITM
- gestion des SCTASK AWS

====================================================

PJTCLOUD-996
Informations à stocker

Statut :
En cours

Commentaire :

Recherche d'une table compatible ServiceNow.

Besoin exprimé :

Obtenir les données d'une équipe de référence pour réaliser les premiers tests.

====================================================
ANALYSE ATTENDUE
====================================================

Je souhaite que le rapport contienne :

1. Une page de garde professionnelle.

2. Un résumé exécutif.

3. Une vue globale du projet.

4. Une frise chronologique du projet.

5. Un tableau de bord KPI avec :

- nombre total de sous-tâches
- nombre en cours
- nombre planifiées
- nombre bloquées
- taux global d'avancement

6. Des progress bars pour chaque sous-tâche.

7. Un radar chart illustrant :

- maturité technique
- dépendances
- risque
- complexité
- niveau d'avancement

8. Un diagramme de dépendance visuel montrant :

SNOW
↓
Jenkins
↓
Bitbucket

SNOW
↓
Jenkins
↓
AD Manager

SNOW
↓
Jenkins
↓
AWS

SNOW
↓
Jenkins
↓
Listes de diffusion

9. Une matrice des risques.

10. Une matrice Opportunités / Gains.

11. Une analyse détaillée des blocages.

12. Une analyse d'impact.

13. Une analyse des dépendances critiques.

14. Une évaluation réaliste du planning.

15. Une section :

"Ce qui peut avancer immédiatement"

16. Une section :

"Ce qui dépend d'une décision externe"

17. Une section :

"Risques pour le planning"

18. Une section :

"Recommandations"

19. Une section :

"Prochaines étapes"

20. Une conclusion exécutive destinée au management.

====================================================
ANALYSE A FOURNIR PAR CHATGPT
====================================================

L'analyse doit mettre en évidence :

Opportunités :

- Le développement du Job Jenkins peut avancer en parallèle.
- Le POC Bitbucket est quasiment prêt.
- Le POC AWS est très avancé.
- Le travail SNOW peut continuer malgré certains blocages.
- Plusieurs sous-tâches peuvent être menées simultanément.

Risques :

- Dépendance forte à l'accès API AD Manager.
- Risque de décalage du POC AD.
- Impact potentiel sur le POC listes de diffusion.
- Incertitude autour des licences ServiceNow.
- Référentiel des équipes encore non identifié.
- Dépendances organisationnelles.

Le rapport doit comporter :

- graphiques Chart.js
- jauges
- progress bars animées
- indicateurs couleur (vert/orange/rouge)
- cartes KPI
- schémas SVG modernes
- timeline
- responsive design
- mode impression PDF optimisé

Style attendu :

- très professionnel
- moderne
- compatible direction IT
- compatible comité projet
- sans framework externe
- tout dans un fichier HTML autonome

Génère le fichier HTML complet et directement exécutable.
