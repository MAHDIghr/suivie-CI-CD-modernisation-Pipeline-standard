# Bastion Guacamole — Analyse du point « Next Steps » et plan d'action du chef de projet

> **Source :** `DEMANDE.md` — description et commentaire du ticket Jira « [Bastion Guacamole] Préparation Suivi global pour mise en place », point du 20 oct. 2026, et transcription du point « [Bastion] Next Steps - Pilote et stratégie autour des comptes ».
> **Statut :** synthèse de travail. Rien de ce qui est listé ci-dessous ne vaut décision tant que cela n'a pas été confirmé par écrit (Jira ou compte rendu).
> **Légende :** **[CP]** = action qui relève directement du chef de projet · **À identifier** = responsable non défini · **À confirmer** = échéance ou information non validée.

## 0. L'essentiel

- **Échéance :** mise en place cible attendue en janvier 2027, soit environ 9 à 13 semaines à compter du 28 oct. 2026 selon la date exacte (non précisée). Aucun rétroplanning n'existe à ce stade et, d'après le ticket, les environnements PPD et PROD restent à créer.
- **Décisions :** aucune décision d'architecture, de périmètre, de planning ou de gouvernance n'a été actée dans les éléments fournis. Seules deux orientations de cadrage du POC ont été exprimées (§1.1).
- **Limite de l'analyse :** la transcription ne couvre que le début (≈ 1 min) et la fin (≈ 50 à 53 min) d'un échange d'environ 53 min. La partie centrale, dont le pilote et la stratégie de comptes qui donnent son titre à la réunion, n'est pas disponible : rien n'est déduit à son sujet.
- **Échéance immédiate :** vous avez confirmé envoyer l'invitation à un point de suivi proposé vendredi à 16 h.
- **Trois verrous à lever :** (1) essais journaux / mots de passe / enregistrements S3, (2) circuit de validation (R&D, ARB 0, DAT), (3) périmètre cible et cas AWS / Teleport.

---

## 1. Analyse du point

### 1.1 Décisions prises

| Réf. | Décision / orientation de cadrage | Exprimée par | Statut |
|---|---|---|---|
| D1 | Pour le POC, ne pas vérifier ni organiser l'envoi des journaux vers un système tiers : ils restent sur le système de fichiers, ce qui garantit qu'ils sont récupérables. | Julien Gannier | Aucune objection relevée ; à confirmer par écrit |
| D2 | Pour les journaux, le critère prioritaire est de ne pas enregistrer les mots de passe ; à défaut, pouvoir les supprimer avant tout envoi. | Julien Gannier | Critère exprimé sans objection ; moyen technique à définir |

Les rôles décisionnels n'étant pas explicités, D1 et D2 sont à faire confirmer par Julien Gannier dans le ticket avant d'être présentées comme des décisions validées.

### 1.2 Informations de cadrage annoncées (à formaliser)

- **Caractère obligatoire du bastion :** annoncé à partir de janvier, au moins pour le périmètre « cube ». Source formelle, périmètre exact et date d'application à confirmer. Un lien avec le « nouveau socle d'infrastructure » évoqué dans le ticket est possible, mais non établi.
- **Contexte d'exigences :** obligations contractuelles de passer par un bastion avec les clients et certification GenIA-L 1.5 (formulation partiellement inintelligible dans la transcription).
- **AWS :** les ressources concernées sont décrites comme étant dans un compte R&D, avec des licences Teleport et un bastion Teleport en place « pour l'instant ». La cible n'est pas arbitrée.
- **Gouvernance :** le sujet doit au minimum être présenté à la R&D (« RD » dans la transcription, à confirmer). L'ARB indique ensuite si les gates 1 ou 2 sont requises pour un projet d'infrastructure ; l'ARB 0 est à passer rapidement.
- **Retour d'expérience cité :** la PKI, présentée il y a deux semaines, n'a pas rencontré d'obstacle. Julien Gannier anticipe un déroulement aussi rapide pour le bastion (le terme transcrit « probation » est probablement une erreur, à confirmer). C'est une appréciation, pas un engagement.

### 1.3 Actions confirmées

| Action | Responsable | Échéance | Remarque |
|---|---|---|---|
| **[CP]** Envoyer l'invitation du point de suivi aux participants | Mahdi (vous) | Créneau proposé : vendredi 16 h (probablement le 30/10/2026) ; date et disponibilités à confirmer | Confirmé oralement en séance |
| Approfondir les essais sur les journaux et les enregistrements, puis faire un retour sur les points abordés | Aly Darwish | À confirmer | Destinataire du retour à confirmer ; **[CP]** demander à être en copie |
| Organiser un point sur le test de dépôt des enregistrements sur S3 | Julien Gannier et Aly Darwish | « Dans le courant de la semaine » ; date à confirmer | Organisateur à identifier |

### 1.4 Propositions et besoins exprimés (non validés, non attribués)

| Élément | Origine | Responsable | Statut |
|---|---|---|---|
| Tester le dépôt des enregistrements de session sur S3 | Julien Gannier | À confirmer (Aly Darwish pressenti, non explicite) | Proposition |
| Trouver un moyen de supprimer les mots de passe des journaux avant envoi, si nécessaire | Julien Gannier | À identifier | Proposition conditionnelle |
| Passer l'ARB 0 rapidement | Julien Gannier | À identifier | Besoin exprimé |
| Présenter le sujet à la R&D | Julien Gannier | À identifier | Besoin exprimé |
| Disposer d'un DAT pour avancer très vite vers l'étape suivante (terme transcrit « GTA », à confirmer) | Julien Gannier | À identifier | Besoin exprimé ; à rapprocher du DAS v1 mentionné dans le ticket (même document ? à confirmer) |
| Hypothèse : Guacamole ne conserverait pas les mots de passe dans les journaux hors mode de journalisation détaillé (« trace »), le cas de l'enregistrement vidéo étant plus délicat | David Baroin | — | Impression non vérifiée, propos partiellement inintelligibles ; Julien Gannier se dit surpris et conclut qu'« un peu de POC » reste à faire. À valider par un test documenté |

### 1.5 Points à clarifier

| # | Sujet | Question à trancher | Interlocuteur pressenti |
|---|---|---|---|
| 1 | Périmètre | Le caractère obligatoire à partir de janvier couvre-t-il uniquement le périmètre « cube » ? Quelle date exacte ? Quelle source formelle ? | Julien Gannier |
| 2 | AWS / Teleport | Quelle stratégie cible pour les ressources AWS (compte R&D, Teleport) : maintien, convergence ou intégration à Guacamole ? | Julien Gannier / décideur À identifier |
| 3 | Comptes et pilote | Quels profils de comptes, quels administrateurs pilotes, quels scénarios et critères d'acceptation ? (contenu de la réunion non disponible) | Participants du point ; transcription complète |
| 4 | Terminologie de gouvernance | Que recouvrent exactement R&D (« RD »), ARB 0, gates 1/2, DAT vs DAS et « GTA » dans ce projet ? Qui porte chaque étape ? | Julien Gannier |
| 5 | Journaux | Quels journaux sont produits selon les modes utilisés ? Comment prouver l'absence de mots de passe ? | Aly Darwish, David Baroin |
| 6 | Enregistrements | Le dépôt sur S3 est-il retenu pour la cible ? Quels accès, chiffrement et rétention ? | Julien Gannier, Aly Darwish |
| 7 | Sécurisation | Qui porte le volet empêchant le contournement du bastion, avec quelles mesures et quel calendrier ? (non abordé dans les extraits) | À identifier |
| 8 | PPD / PROD | Quelles équipes, prérequis et délais pour créer les environnements ? (non abordé dans les extraits) | À identifier |
| 9 | Rôles | Rôle de Fehri Chelly dans le projet (l'échange « on te le laisse… si ça te va » n'est pas interprétable) ; participation de Ioannis Anagnostopoulos au prochain point | Julien Gannier |
| 10 | Exploitation | Qui assurera le run, la supervision et la gestion des incidents ? | À identifier |
| 11 | Dates | Date exacte du point de suivi. La date « 27 nov. 2026 » de votre commentaire précédent semble incohérente avec la tenue du point « Next Steps » : à vérifier (27 oct. ?) | Mahdi (vous) |

### 1.6 Risques et dépendances

| # | Risque / dépendance | Impact possible | Action de pilotage | Porteur |
|---|---|---|---|---|
| R1 | Échéance de janvier 2027 sans rétroplanning ; PPD et PROD à créer | Glissement, arbitrages tardifs | Construire un rétroplanning à rebours dès le point de suivi et identifier le chemin critique | **[CP]** |
| R2 | Circuit de validation (R&D, ARB 0, gates, DAT) non cadré ni planifié | Blocage avant la mise en place ; dépendance externe au projet | Faire préciser circuit, livrables et délais | À identifier ; coordination **[CP]** |
| R3 | POC non éprouvé par des administrateurs en usage réel | Inadéquation découverte tardivement | Plan de pilote avec critères d'acceptation | **[CP]** + administrateurs pilotes À identifier |
| R4 | Mots de passe ou secrets possibles dans les journaux ou enregistrements | Exposition d'informations sensibles | Tests documentés par mode ; mécanisme de suppression si nécessaire | Aly Darwish (à confirmer) |
| R5 | Dépôt S3 des enregistrements non testé | Récupération, sécurité et exploitation non démontrées | Test S3 et exigences d'accès, de chiffrement et de rétention | Julien Gannier / Aly Darwish |
| R6 | Stratégie AWS / Teleport non arbitrée | Périmètre ambigu, trajectoires parallèles | Arbitrage formel avant intégration au plan cible | À identifier |
| R7 | Volet anti-contournement absent des échanges disponibles | Bastion contournable : objectif du ticket non atteint | Identifier porteurs et mesures ; suivre en parallèle de la mise en place | À identifier |
| R8 | Rôles et responsabilités non explicités | Actions non suivies | Attribuer un responsable et une échéance à chaque action | **[CP]** |
| R9 | Transcription partielle et automatique, termes ambigus | Mauvaise interprétation | Compte rendu écrit validé par les participants | **[CP]** |

---

## 2. Ce que vous devez faire en tant que chef de projet

Les échéances ci-dessous sont des propositions à valider ; aucune n'a été fixée en réunion.

### 2.1 Avant le point de suivi (priorité immédiate)

| # | Action **[CP]** | Objectif | Échéance proposée |
|---|---|---|---|
| 1 | Envoyer l'invitation (date, heure, durée, visio) à Julien Gannier, Aly Darwish, David Baroin et Fehri Chelly ; décider avec Julien de l'invitation de Ioannis Anagnostopoulos, avec l'ordre du jour du §3 | Tenir l'engagement pris en séance | Dès que possible |
| 2 | Récupérer la transcription complète ou vos notes sur la partie centrale (pilote, comptes) et compléter cette analyse | Ne rien manquer du pilote et de la stratégie de comptes | Avant publication Jira |
| 3 | Publier le commentaire Jira (§4) et corriger si besoin la date « 27 nov. 2026 » du commentaire précédent | Tracer l'état réel du sujet | Avant le point de suivi |
| 4 | Demander à Aly Darwish un retour écrit : modes de journalisation testés, présence ou absence de mots de passe, prérequis du test S3 | Arriver au point avec des faits | Avant le point de suivi |
| 5 | Demander à Julien Gannier de préciser R&D, ARB 0, gates et DAT/DAS : porteur, livrables, délais | Rendre le circuit de validation planifiable | Avant ou pendant le point |

### 2.2 Pendant le point de suivi

| # | Action **[CP]** | Résultat attendu |
|---|---|---|
| 6 | Faire confirmer ou infirmer D1 et D2 ; attribuer un responsable et une échéance à chaque action ; noter les décisions en séance | Registre d'actions et de décisions à jour |
| 7 | Obtenir les arbitrages ou, à défaut, un décideur et une date pour : périmètre « cube » et date d'application, stratégie AWS / Teleport, porteur de la gouvernance | Points bloquants identifiés et attribués |

### 2.3 Après le point (proposé : sous une semaine)

| # | Action **[CP]** | Livrable |
|---|---|---|
| 8 | Construire le rétroplanning à rebours vers janvier 2027 avec les responsables et les délais de validation | Planning avec chemin critique |
| 9 | Formaliser le plan de pilote : administrateurs, ressources, scénarios, critères d'acceptation et critères de sortie du POC | Plan de pilote validé |
| 10 | Rédiger avec les parties prenantes une note de périmètre et de stratégie de comptes | Note validée |
| 11 | Cadrer le volet sécurisation / anti-contournement avec les équipes concernées, en parallèle de la mise en place | Porteurs, mesures et jalons |
| 12 | Recenser équipes, prérequis et délais pour les environnements PPD et PROD | Besoins d'infrastructure identifiés |
| 13 | Instaurer un rythme de suivi : compte rendu écrit après chaque point, mise à jour Jira, escalade au sponsor (À identifier) si une décision est bloquée | Pilotage récurrent |

**Jalons à intégrer au rétroplanning (proposition non validée) :** cadrage du périmètre et des comptes ; fin des essais du POC et validation des critères d'acceptation ; passage de la gouvernance d'architecture (R&D, ARB 0, DAT) ; sécurisation et anti-contournement ; préparation PPD puis PROD ; pilote administrateurs et traitement des écarts ; validation de mise en service. Dates et responsables : À identifier. Prévoir les périodes de moindre disponibilité de fin d'année.

---

## 3. Ordre du jour proposé pour le point de suivi

Durée : À confirmer.

1. Retour d'Aly Darwish : essais journaux et enregistrements, résultats sur les mots de passe.
2. Test de dépôt S3 : prérequis, responsable, date.
3. Confirmation de D1 et D2.
4. Périmètre « cube », stratégie de comptes et cas AWS / Teleport.
5. Gouvernance : R&D, ARB 0, gates, DAT/DAS ; porteur et délais.
6. Rétroplanning vers janvier 2027 : jalons, dépendances, chemin critique.
7. Revue des actions : responsable, échéance, prochaine mise à jour Jira.

---

## 4. Commentaire Jira proposé

> **Suite au point « [Bastion] Next Steps – Pilote et stratégie autour des comptes » du [date à compléter]**
> Participants : @Julien GANNIER, @Aly DARWISH, @David BAROIN, @Fehri CHELLY, Mahdi.
>
> **1. Cadrage annoncé (à formaliser)**
> - Le bastion est annoncé comme obligatoire à partir de janvier 2027, a minima pour le périmètre « cube ». Périmètre exact et référence formelle de l'exigence : à confirmer.
> - AWS : les ressources concernées sont actuellement dans un compte R&D, avec un bastion Teleport en place à ce stade. La stratégie cible n'est pas arbitrée.
> - Le sujet doit être présenté à la R&D et l'ARB 0 doit être passé rapidement ; le niveau de gate requis sera déterminé par l'ARB. Porteur et dates : À identifier.
>
> **2. Orientations POC (à confirmer par J. Gannier)**
> - Journaux : conservés sur le système de fichiers pour le POC, sans envoi vers un système tiers à ce stade.
> - Priorité sécurité : vérifier que les mots de passe ne sont pas journalisés ; à défaut, étudier un mécanisme de suppression ou de masquage avant toute transmission. Le comportement de Guacamole selon les modes de journalisation reste à valider par des tests documentés.
> - Enregistrements de session : test de dépôt sur S3 à réaliser ; accès, chiffrement et rétention à cadrer.
>
> **3. Actions**
> - Essais sur les journaux et les enregistrements, puis retour sur les points abordés : A. Darwish, échéance à confirmer.
> - Point sur le test de dépôt S3 des enregistrements : J. Gannier / A. Darwish, dans la semaine, date à confirmer.
> - Envoi de l'invitation au point de suivi : Mahdi, créneau proposé vendredi 16 h, à confirmer.
> - Passage de l'ARB 0, présentation R&D, préparation du DAT (DAS) : responsable À identifier, échéance à confirmer.
>
> **4. Points à clarifier / décisions attendues**
> - Périmètre cible et date d'application ; stratégie de gestion des comptes et profils du pilote.
> - Stratégie AWS / Teleport.
> - Résultats documentés des tests sur les journaux ; choix du stockage des enregistrements et exigences associées.
> - Circuit de validation (R&D, ARB 0, gates, DAT/DAS) et rétroplanning vers janvier 2027.
> - Sécurisation du parcours d'accès (prévention du contournement) : porteurs et mesures à identifier.
>
> **5. Risques et dépendances**
> - Échéance de janvier sans rétroplanning validé.
> - Validation d'architecture non planifiée.
> - Présence possible de secrets dans les journaux ou enregistrements.
> - Arbitrage AWS / Teleport en attente.
>
> **Prochain jalon :** point de suivi, vendredi 16 h (date à confirmer).

---

## 5. Actions complémentaires possibles

**Sous-tâches Jira à envisager** (à créer après accord des responsables, rattachées au ticket de suivi global) :

1. `[Bastion] POC – Essais journaux et protection des mots de passe`
2. `[Bastion] POC – Test de dépôt des enregistrements sur S3`
3. `[Bastion] Périmètre et stratégie de comptes – note de cadrage`
4. `[Bastion] Gouvernance – ARB 0, DAT/DAS et présentation R&D`
5. `[Bastion] Rétroplanning vers janvier 2027`
6. `[Bastion] Sécurisation – prévention du contournement du bastion`
7. `[Bastion] Environnements PPD / PROD – prérequis et planning`
8. `[Bastion] Plan de pilote administrateurs`

**Outils de pilotage :**

- Registre unique des décisions, actions et risques (une ligne par élément : responsable, échéance, statut).
- Matrice RACI courte, une fois les rôles clarifiés (notamment pour Fehri Chelly).
- Note d'une page pour Julien Gannier ou le sponsor (À identifier), listant les décisions attendues : porteur de l'ARB 0, périmètre, arbitrage AWS / Teleport.
- Compte rendu écrit envoyé après chaque point pour validation, afin de lever les ambiguïtés d'une transcription automatique.

**Projet de message d'invitation :**

> **Objet :** [Bastion Guacamole] Point de suivi — essais POC, cadrage et gouvernance
>
> Bonjour à tous,
> Suite à notre échange, je vous propose un point de suivi le vendredi [date à confirmer] à 16 h (durée : [à confirmer]).
> Objectifs : faire le point sur les essais du POC (journaux, enregistrements), cadrer la suite (périmètre, comptes, gouvernance d'architecture) et construire le rétroplanning vers la cible de janvier 2027.
> Merci de confirmer votre disponibilité et, si possible, de préparer un état factuel : réalisé / en cours / blocage / décision attendue.
> Cordialement,
> Mahdi
