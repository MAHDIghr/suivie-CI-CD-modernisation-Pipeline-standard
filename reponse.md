# Guide de pilotage — Chantier de standardisation des pipelines CI/CD

## 1. Point de départ

Ce guide part de la situation suivante, telle qu'elle est décrite dans `DEMANDE.md` :

- Vous êtes chef de projet en alternance dans l'équipe Cloud et vous pilotez le chantier **Standardisation des pipelines** du projet de modernisation CI/CD.
- Le chantier comporte quatre sous-tâches Jira : **Python**, **IaC**, **Node/NPM** et **Lambda**.
- Trois sous-tâches sont déjà affectées à des DevOps ; la sous-tâche Lambda reste à affecter.
- Toutes les sous-tâches sont encore en **Backlog** et les travaux n'ont pas commencé.
- Les DevOps interviennent aussi sur d'autres projets, parfois plus prioritaires. Votre rôle est donc de rendre le travail visible, de clarifier les besoins et de faciliter l'avancement, sans exiger une disponibilité qu'ils n'ont pas.

Le guide ne suppose pas que vous êtes responsable technique des choix d'implémentation ni que les DevOps travaillent à temps plein sur ce chantier. Il propose un pilotage léger, adapté à un environnement professionnel.

## 2. Votre rôle de chef de projet

Vous êtes responsable de la **coordination et de la visibilité** du chantier, pas de faire le travail technique à la place des DevOps.

Concrètement, vous devez :
- comprendre le résultat attendu et le périmètre du chantier ;
- vérifier que chaque sous-tâche est compréhensible et réalisable ;
- identifier un responsable, les dépendances, les priorités et les points de blocage ;
- convenir avec les responsables d'un prochain jalon réaliste ;
- suivre les faits et mettre Jira à jour ;
- faire arbitrer les conflits de priorité par le responsable compétent ;
- alerter tôt en cas de risque sur la date ou le périmètre.

**Principe important :** ne demandez pas simplement « Où en es-tu ? ». Cherchez plutôt à savoir **ce qui a avancé, ce qui manque, ce qui bloque et quelle est la prochaine étape réaliste**.

## 3. Structurer le ticket parent et les quatre sous-tâches

### 3.1 Le ticket parent du chantier

Le ticket parent doit présenter le résultat global, les limites du périmètre et les critères permettant de considérer le chantier comme terminé. Il ne doit pas répéter tout le détail technique des quatre sous-tâches.

Exemple de titre :

> Standardiser les pipelines CI/CD — Python, IaC, Node/NPM et Lambda

Exemple de description à adapter avec le référent technique :

> **Contexte**  
> Dans le cadre de la modernisation CI/CD, le chantier vise à harmoniser les pratiques et les mécanismes de pipeline pour les familles de projets Python, IaC, Node/NPM et Lambda.
>
> **Objectif**  
> Mettre à disposition des modèles de pipelines documentés, réutilisables et validés par les parties prenantes techniques, selon les standards retenus par l'équipe.
>
> **Périmètre**  
> - Pipelines pour les applications Python  
> - Pipelines pour l'IaC  
> - Pipelines pour Node/NPM  
> - Pipelines pour Lambda
>
> **Hors périmètre / éléments à confirmer**  
> Préciser avec le référent technique les migrations d'applications existantes, les outils concernés, les environnements cibles et les éventuelles exclusions. Ne pas inventer ces décisions.
>
> **Critères de fin du chantier**  
> - Les quatre sous-tâches ont un résultat attendu et des critères d'acceptation définis.  
> - Les modèles ou changements convenus sont implémentés et validés par les responsables techniques.  
> - La documentation et les modalités de réutilisation sont disponibles si elles font partie du périmètre retenu.  
> - Les éventuelles réserves, dépendances ou tâches restantes sont explicites et acceptées.

Les critères de fin doivent être confirmés avec le responsable technique : ils constituent une proposition de cadrage, pas une décision technique prise à sa place.

### 3.2 Les sous-tâches Jira

Conservez les quatre sous-tâches existantes. **Ne les découpez pas davantage par défaut.** Ajoutez des sous-sous-tâches uniquement si un besoin réel le justifie, par exemple une activité indépendante qui nécessite son propre responsable, son propre suivi ou une validation séparée.

Pour chacune des quatre sous-tâches, vérifiez les champs suivants :

- **Objectif / résultat attendu :** qu'est-ce qui doit être disponible à la fin ?
- **Périmètre :** ce qui est inclus et, si nécessaire, ce qui ne l'est pas.
- **Critères d'acceptation :** comment saura-t-on que le travail est terminé et validé ?
- **Responsable :** qui réalise le travail et qui valide le résultat ?
- **Dépendances / risques :** accès, décision d'architecture, modèle commun, environnement, arbitrage de priorité, etc.
- **Prochaine étape :** action concrète permettant de démarrer ou de débloquer le travail.

Exemple de description courte pour une sous-tâche :

> **Objectif**  
> Définir, implémenter et faire valider le pipeline standard pour [Python / IaC / Node-NPM / Lambda], selon les standards retenus pour le chantier.
>
> **Résultat attendu**  
> Un pipeline réutilisable pour le périmètre convenu, avec les contrôles et la documentation validés par le référent technique.
>
> **Critères d'acceptation**  
> - Le périmètre et les prérequis sont confirmés.  
> - Le pipeline s'exécute avec succès dans le contexte de test convenu.  
> - Les contrôles attendus sont vérifiés.  
> - La documentation ou les consignes de réutilisation sont disponibles si elles sont requises.  
> - Le résultat est revu et accepté par le référent désigné.
>
> **À clarifier avant démarrage**  
> Outils et dépôt concernés, contrôles obligatoires, environnement de test, dépendances et modalités de validation.

Adaptez les critères à chaque technologie et aux standards internes. N'inscrivez pas « tests réussis » ou « documentation livrée » comme exigences si le référent confirme qu'ils ne font pas partie du périmètre.

## 4. Démarrage du chantier : les premières actions

Ne commencez pas par relancer les quatre DevOps pour obtenir une date. Commencez par obtenir une vision fiable et partagée.

### Étape 1 — Vérifier le cadre avec le responsable du chantier

Confirmez :
- l'objectif métier et technique du chantier ;
- la priorité du chantier par rapport aux autres travaux ;
- le jalon ou la date cible, s'il en existe un ;
- le référent technique qui tranche les questions de standard ;
- les critères attendus pour considérer le chantier terminé.

Si la priorité ou la date cible n'est pas claire, notez-la comme **point à arbitrer** plutôt que de supposer une échéance.

### Étape 2 — Faire un cadrage technique court

Organisez un échange ciblé avec le référent technique et, si nécessaire, les DevOps concernés. L'objectif n'est pas de concevoir les pipelines à leur place, mais de confirmer le périmètre, les critères d'acceptation, les dépendances communes et les modalités de validation.

Questions utiles :
1. Quel standard commun doit être respecté par les quatre familles de pipelines ?
2. Existe-t-il déjà un modèle, un dépôt ou un pipeline de référence ?
3. Quelles sont les dépendances entre les quatre sous-tâches ?
4. Quels contrôles sont obligatoires et qui valide le résultat ?
5. Qu'est-ce qui empêche de démarrer aujourd'hui ?
6. Quelle capacité réaliste peut être consacrée au chantier, compte tenu des priorités concurrentes ?

### Étape 3 — Clarifier la sous-tâche Lambda

La sous-tâche Lambda n'étant pas affectée, demandez au responsable technique ou au responsable de capacité qui peut la prendre et à quel moment. Ne l'attribuez pas vous-même sans accord. Si personne n'est disponible, gardez le point visible dans Jira et demandez un arbitrage de priorité ou de capacité.

### Étape 4 — Convenez d'une prochaine étape pour chaque sous-tâche

Une prochaine étape doit être petite et concrète, par exemple : « confirmer les contrôles attendus », « identifier le pipeline de référence » ou « préparer une première exécution en environnement de test ». Une date est utile lorsqu'elle a été convenue avec la personne concernée.

## 5. Comprendre et piloter les états Jira

Les noms et transitions disponibles dépendent du workflow configuré dans votre Jira. Utilisez les statuts réellement disponibles dans votre projet ; ne créez pas de nouveaux statuts sans accord de l'administrateur ou du responsable du processus.

Repères généraux :

| État courant | Quand l'utiliser | Ce que vous devez vérifier |
|---|---|---|
| **Backlog** | Le travail n'est pas engagé ou n'est pas encore prêt à être pris en charge. | Le besoin est-il assez clair ? La priorité et la capacité sont-elles connues ? |
| **À faire / Prêt** (si disponible) | Le périmètre est clarifié et la tâche peut être prise en charge lorsque la capacité le permet. | Responsable identifié, prérequis connus, prochaine étape claire. |
| **En cours** | Le travail a réellement commencé. | Une activité concrète est engagée ; un prochain jalon est identifié. |
| **Bloqué** (si disponible) | Un obstacle empêche réellement de poursuivre. | Cause, personne ou décision attendue, impact et prochaine date de revue. Si ce statut n'existe pas, documentez le blocage dans un commentaire ou le champ prévu. |
| **En revue / À valider** (si disponible) | Le résultat est prêt et attend une revue ou une validation. | Qui valide, selon quels critères, et pour quand si un délai a été convenu. |
| **Terminé / Done** | Les critères d'acceptation sont satisfaits et la validation requise a eu lieu. | Résultat, validation et éventuelles réserves documentés. |

### Règles pratiques

- **Backlog ne signifie pas automatiquement en retard.** Une tâche peut attendre volontairement une capacité ou une décision.
- Ne passez pas une tâche en « En cours » uniquement pour donner l'impression que le chantier avance.
- Un statut doit refléter la réalité, pas servir de pression sur le contributeur.
- Le ticket parent peut rester ouvert tant que certaines sous-tâches ou validations ne sont pas terminées. Vérifiez les règles de calcul et de transition de votre Jira.
- Si le travail est interrompu par une priorité supérieure, documentez le fait, l'impact et la prochaine date de revue. Ne laissez pas une tâche « En cours » sans information pendant des semaines.

## 6. Commentaires Jira : courts, factuels et utiles

Les commentaires doivent apporter une information nouvelle. Évitez les messages répétitifs du type « des nouvelles ? » sans contexte.

### Au démarrage

> **Cadrage initial :** objectif et périmètre à confirmer avec le référent technique. Points à clarifier : pipeline de référence, contrôles attendus et environnement de validation. Prochaine étape : confirmer ces éléments avant de convenir du démarrage.

### Après un échange avec un DevOps

> **Point du [date] :** [avancement concret]. Prochaine étape : [action]. Dépendance / blocage : [élément ou « aucun identifié »]. Prochain point de suivi : [date convenue].

### En cas de blocage

> **Blocage identifié le [date] :** [description factuelle]. Décision ou aide attendue : [élément] auprès de [rôle/personne]. Impact estimé : [jalon ou tâche concernée]. Revue prévue : [date].

### Si la capacité est mobilisée ailleurs

> **Capacité / priorité :** la tâche n'a pas avancé cette période en raison de [priorité concurrente confirmée]. La priorité et la prochaine fenêtre de reprise restent à confirmer avec [responsable]. Prochaine revue : [date].

### À la fin

> **Résultat :** [livrable ou changement réalisé]. Validation : [personne/référence et date]. Réserves ou suites éventuelles : [élément ou « aucune »].

Écrivez uniquement ce qui a été confirmé. N'indiquez pas une décision, une date ou une validation comme acquise si elle ne l'est pas.

## 7. Le défi de la disponibilité des DevOps

Votre principal levier n'est pas de multiplier les relances : c'est de rendre visibles la capacité, les arbitrages et les dépendances.

### À faire

- Demandez à chaque responsable une **estimation de la prochaine fenêtre de travail**, pas une promesse de disponibilité permanente.
- Faites confirmer la priorité relative du chantier par le responsable qui peut arbitrer les autres projets.
- Si plusieurs sous-tâches dépendent d'un même standard, traitez cette dépendance tôt avec le référent technique.
- Maintenez une prochaine action claire pour chaque tâche, même si elle attend.
- Quand une date devient irréaliste, mettez à jour la prévision et prévenez les parties prenantes suffisamment tôt.

### À éviter

- Exiger une date sans connaître la charge ou les priorités concurrentes.
- Relancer quotidiennement un DevOps alors qu'aucune nouvelle information n'est disponible.
- Réattribuer une tâche sans concertation.
- considérer toute absence d'avancement comme un manque d'implication.
- masquer un retard ou un blocage pour conserver un tableau « vert ».

### Quand demander un arbitrage ?

Demandez un arbitrage au responsable concerné lorsque :
- le chantier entre en conflit avec un projet plus prioritaire ;
- aucun responsable ne peut prendre Lambda dans un délai compatible avec le jalon ;
- une décision technique commune bloque plusieurs sous-tâches ;
- la date cible ne semble plus tenable ;
- une dépendance externe n'a pas de propriétaire ou de date de résolution.

Présentez toujours le problème avec des options : **impact, choix possibles, décision attendue et date à laquelle elle devient nécessaire**.

## 8. Communication et rythme de suivi

Privilégiez une cadence légère et régulière. La fréquence exacte dépend du rythme du chantier et des règles de l'équipe.

### Au lancement
Un point de cadrage de 30 à 45 minutes peut suffire pour confirmer l'objectif, les critères d'acceptation, les dépendances, les rôles et les prochaines étapes.

### Pendant l'exécution
- **Mise à jour asynchrone dans Jira :** à chaque changement significatif (démarrage, résultat, blocage, décision, changement de prévision).
- **Point de suivi court :** une fois par semaine au démarrage peut être un bon repère si plusieurs sujets avancent en parallèle ; réduisez la fréquence si les échanges asynchrones suffisent.
- **Point technique ciblé :** seulement lorsqu'une décision ou une dépendance nécessite plusieurs personnes.
- **Escalade :** dès qu'un arbitrage est nécessaire, sans attendre le prochain point périodique.

N'organisez pas une réunion uniquement pour lire les tickets. Envoyez l'ordre du jour à l'avance et terminez par les décisions, responsables et prochaines dates.

### Exemple d'ordre du jour — 15 minutes
1. Faits nouveaux depuis le dernier point.
2. Prochaine étape de chaque sous-tâche.
3. Blocages et décisions attendues.
4. Impact éventuel sur les priorités ou le jalon.
5. Actions, responsables et dates convenues.

## 9. Vue de pilotage simple

Tenez une vue synthétique du chantier avec, pour chaque sous-tâche :

| Information | Exemple de contenu |
|---|---|
| Sous-tâche | Python / IaC / Node-NPM / Lambda |
| Responsable | DevOps confirmé ou « à affecter » |
| Statut Jira | Statut réel du workflow |
| Prochaine étape | Action concrète |
| Dépendance / blocage | Décision, accès, standard ou aucun identifié |
| Prévision | Date convenue ou « à confirmer » |
| Dernière mise à jour | Date du dernier fait significatif |

Suivez surtout :
- le nombre de sous-tâches sans responsable ;
- les tâches bloquées et l'ancienneté du blocage ;
- les décisions en attente ;
- les prochaines étapes sans date ou sans propriétaire ;
- les écarts par rapport au jalon convenu.

Ne cherchez pas à produire de nombreux indicateurs au démarrage. Une vue fiable et à jour vaut mieux qu'un tableau de bord complexe alimenté par des données approximatives.

## 10. Qui fait quoi ?

Les rôles exacts varient selon l'organisation ; confirmez-les au lancement.

- **Chef de projet (vous) :** coordination, suivi, tenue des informations Jira, anticipation des risques et préparation des arbitrages.
- **DevOps responsable d'une sous-tâche :** estimation technique, réalisation, signalement des obstacles, mise à jour de l'avancement et proposition de solutions.
- **Référent technique / lead :** cohérence des standards, décisions techniques et validation du résultat selon l'organisation.
- **Responsable de capacité / manager :** arbitrage des priorités et disponibilité des ressources lorsque plusieurs projets se concurrencent.
- **Sponsor ou responsable du projet :** arbitrage de périmètre ou de jalon si l'impact dépasse le niveau opérationnel.

Une même personne peut tenir plusieurs de ces rôles. L'important est de savoir qui décide de quoi.

## 11. Plan d'action pour votre première semaine

1. **Lire le ticket parent et les quatre sous-tâches** : vérifier titres, descriptions, responsables, statuts, dates, liens et dépendances.
2. **Rencontrer votre responsable ou le référent technique** : confirmer objectif, priorité, jalon et critères de fin.
3. **Compléter les descriptions** avec les informations confirmées, sans inventer les exigences techniques.
4. **Clarifier l'affectation de Lambda** avec la personne qui gère la capacité.
5. **Identifier les dépendances communes** et les décisions nécessaires avant le démarrage.
6. **Convenir d'une prochaine étape réaliste** pour chaque sous-tâche avec les DevOps concernés.
7. **Publier un commentaire de cadrage** sur le ticket parent et, si utile, des commentaires courts sur les sous-tâches.
8. **Fixer un rythme de suivi léger** avec l'équipe et une date de revue des blocages.
9. **Partager une synthèse** : état réel, décisions attendues, risques, prochaine étape et responsable de chaque action.

## 12. Checklist de pilotage

- [ ] L'objectif et le périmètre du ticket parent sont compris.
- [ ] Les quatre sous-tâches ont des critères d'acceptation adaptés.
- [ ] Les trois affectations existantes sont confirmées.
- [ ] Un responsable ou une décision d'affectation est identifié pour Lambda.
- [ ] Les dépendances et questions techniques sont visibles.
- [ ] Chaque sous-tâche possède une prochaine étape concrète.
- [ ] Les statuts Jira reflètent la réalité.
- [ ] Les commentaires consignent les faits, décisions et blocages, sans bruit.
- [ ] La capacité et les conflits de priorité sont traités avec le bon responsable.
- [ ] La validation finale et les critères de clôture sont connus.

## En résumé

Pour piloter ce chantier efficacement, gardez quatre habitudes : **clarifier avant de lancer, convenir d'une prochaine étape réaliste, mettre Jira à jour à partir de faits, et escalader les arbitrages plutôt que de faire pression sur les DevOps**. Votre valeur ajoutée est de faire circuler l'information et de permettre aux bonnes personnes de prendre les bonnes décisions au bon moment.


## Sous-tâche IaC — État actuel et prochaine étape

**État actuel :** la sous-tâche est dans le Backlog et contient une première description du responsable. Le sujet n’a pas encore été discuté collectivement ; le périmètre, le livrable attendu et les critères de validation restent à confirmer.

**Prochaine étape :** organiser un court échange avec le responsable pour clarifier le besoin, identifier le référent DevOps et convenir des prochaines actions. Mettre ensuite à jour Jira avec les éléments confirmés, sans créer de sous-tâches supplémentaires à ce stade.
