Répond à cette demande sous forme d'un commit d'un nouveau readme reponse bien structuré et si il existe deja dans le repertoire main merci de rajouter la réponse à la fin du fichier
et précise bien son point de départ 
la réponse doit etre claire et proffessionelle et adapté à un environement d'entreprise professionel.


DEMANDE : 
je suis chef de projet et je vais bientot reprendre un sujet et je vien d'effectuer aussi un point avec l'architecte technique 
maintenant je viens de creer un ticket jira afin de préparer la reprise de cxe sujet et la mise en place de cette solution 


voici les detailles concernant le sujet : 

Les administrateurs accèdent actuellement aux serveurs et aux infrastructures en utilisant leurs connexions VPN et en réalisant des rebonds directs vers les ressources à administrer. Ce fonctionnement ne permet pas de centraliser suffisamment les accès ni de disposer d’une traçabilité complète et facilement exploitable des opérations réalisées.

La mise en place du Bastion Guacamole répond donc à un besoin de renforcement de la sécurité et de maîtrise des accès administrateurs. Le bastion constituera un point de passage centralisé entre les administrateurs et les serveurs, avec une authentification sécurisée.


et voici quelques detaille d'aprés la transcription de notre discussion : 

cette solution  ça va permettre de voir toutes les actions d'administration qui s'est connecté, et cetera. C'est le principe d'invention sur un bastion
 ça va permettre de voir toutes les actions d'administration qui s'est connecté, et cetera. C'est le principe d'invention sur un bastion
par exemple  Mahdi si toi tu te connectes sur cette machine là bah globalement il y aura marqué que tu t'es connecté à 10h32 et puis on aura un petit bouton avec marqué bah voilà Regardez la session de Mahdi.
Donc on pourra, on pourra voir que t'as fait tu t'es connecté en route sur le serveur, que t'as t'as supprimé des fichiers de logs et cetera, donc ça on pourra le voir.
Et donc c'est le but de ce bastion. Ce qu'il faut savoir, c'est important pour vous de le savoir. Et c'est pour ça que Cyril active ce sujet-là et qu'il va falloir le traiter assez rapidement. 
On a une ambition d'avoir du génial 1.5 côté neurones.
Une instance spécifique dédiée à certains clients. On va dire ça dans les petits papiers c'est donc du coup pour se faire certifier  il faut un bastion absolument pour rebondir sur les infras.
Donc c'est très critique comme sujet.
et donc du coup ça, on a dit qu'il fallait que ça atterrisse au mois de janvier.
Donc c'est pour ça que Cyril démarre le sujet, qu'il faut mettre un chef de projet sur le sujet, c'est que là il va falloir faire un rétroplanning sur cette partie pour savoir quand est-ce qu'on comment on fait pour arriver au mois de janvier.

Parce que c'est un socle d'infra donc qui est dissocié de ce nouveau socle, mais qui va être impératif pour se connecter à ce nouveau socle.



Et le POC est validé ou pas encore, il reste encore la finalisation ?

réponse : 
Eh Ben en fait pour le POC les machines sont instanciées, le socle est configuré mais par contre personne ne  l'a vraiment utilisé. Donc c'est pour ça que comme Ali c'est pareil, il est alternant.

Bah en fait il est parti à l'école une fois qu'il avait monté cette plateforme. Bah on a attendu la semaine prochaine comme il revient pour voir avec Cyril quelles sont les prochaines étapes.


Et du coup les prochaines étapes c'est bah je mets la plateforme même si c'est du Poc, je prends 2 ou 3 admins et je leur dis maintenant vous avez pas d'autre choix que de passer par là et vous Regardez si au quotidien ça vous perturbe pas trop pour faire votre boulot. (pour la finalisation du POC)

Ok et dans le prochain objectif tâche Julien, pourquoi tu parlais de Johan ? Il y a quoi ? Comme pour par la suite que j'avais prévu de toute façon faire dans l'immédiat.

Alors en fait, et là c'est un petit peu plus casse-pied, c'est que cette machine-là.

Elle va devenir hypercritique.

Donc cette machine là comme elle aura accès à tous les autres serveurs derrière. Tu sais actuellement les admins, ils peuvent se connecter à toutes les machines en SSH tu vois, ils peuvent se connecter à ces serveurs là directement en SSH et by passer cette infrastructure.

Eh Ben ça demain faut plus que ça soit possible. Donc il y a plein de trucs sur lesquels il va falloir enlever les mécanismes de se connecter en SSH et un truc qui nous permettrait de se latéraliser c'est typiquement Vtom Vtom. Tout le monde a accès à la console vetum.

Donc demain ?

Si je me connecte à V Tom, et V Tom a accès en SSH à l'autre console.
Bah en fait mon bastion il sert à rien parce que je peux me déplacer à côté de mon bastion, tu vois ce que je veux dire ?
Je peux me connecter à V Tom puis ensuite rebondir depuis V Tom vers un serveur qui a le port 22 ouvert et puis ensuite rebondir de l'autre côté donc tu as moyen de bypasser le bastion en faisant des rebonds latéraux.
Et ça, c'est problématique si on veut être cohérent.

Donc il faut bloquer toutes les autres sources, il faut laisser que le bastion pour accéder au serveur ?

Alors y a exactement ce que tu dis mais y a même plus plus compliqué que ça. Il faut surtout que depuis les VTOM ou depuis les machines type Cyberwatch, Bah ces machines qui étaient critiques pour le SI Ben on ne puisse plus latéraliser typiquement.

Cyberwatch, qui est notre outil de détection de failles de vulnérabilité.

Jusqu'à maintenant, il a accès en SSH à toutes les machines et tous les admins ont accès à cyberwatch.
Donc ça veut dire que tu rebondis sur cyberwatch et après tu rebondis un peu n'importe où.
Donc c'est un peu c'est un peu pénible. Donc il faut sécuriser toute la chaîne si on veut être cohérent parce que sinon ça fait aucun sens de mettre un bastion. Si bah c'est comme mettre une porte coupe-feu chez toi, une porte coupe-feu chez toi. Et puis il y a juste à côté de la porte coupe-feu. Comme elle était pas pratique, elle était lourde, tu remets une porte classique.
Ben voilà donc c'est un peu la même chose. Donc là l'idée c'est d'être cohérent sur toute la chaîne. Sinon c'est un peu alors il y a faut pas qu'on se le cache Il y a un volet un peu marketing parce que côté côté client on a dit qu'on passait par un bastion donc il y a le marketing qui nous imposera d'avoir un bastion.
Il y a aussi le fait qu'on veut être honnête avec nous intellectuellement et on veut avoir un bastion pour protéger les infras donc il faut qu'on soit cohérent sur toute la chaîne sinon ça sert à rien.


OK donc pour dire les choses autrement, ça veut dire que ces chantiers-là ils provoquent un chantier un peu plus global à côté pour sécuriser le reste en fait c'est ça tu voulais dire ?

Voilà !

Ouais, alors peut-être pas global, mais en tout cas certaines réflexions, et c'est exactement ça. Ioannis, tu le vulgarises très bien, c'est que ça déclenche d'autres réflexions qu'on s'était jamais posées jusqu'à maintenant. Mais c'est normal parce que c'était assez perméable et donc du coup, faut qu'on.

OK et à ton avis Julien pour le pour la suite là. Et on pourrait travailler comment ? C'est à dire sur quel sur les 2 aspects en parallèle où on met en priorité je suppose la mise en place du patient parce que c'est quand même une priorité.

Ah non faut avancer sur les 2 sujets en parallèle parce que sinon on n'arrivera pas à respecter les échéances. On peut pas faire ça. Première étape, 2e étape, là faut les 2 chantiers se font en parallèle et dans tous les cas c'est pas très grave parce que dans tous les cas faudra avancer sur le bastion.

Et en fait, c'est pas forcément les mêmes équipes qui s'occupent de la partie flux, tu vois ?

Exactement la sécurisation, le fait de pas pouvoir bypasser le bastion.

, c'est comment vous tu vois les choses en fait que qu'est-ce qu'on pourrait faire de notre côté pour commencer à mettre ça en mode plutôt projet ou on peut planifier une réunion comment tu vois les choses ?

Par rapport à ça pour la suite.

Moi, je pense que le sujet, il était.

Un peu mis de côté jusqu'à jusqu'à mardi prochain en fait. Donc moi je peux inviter Mahdi. Je pense que c'est hyper important que il y ait un il y ait un chef de projet qui reprenne le relais et ça serait dommage je pense d'attendre ton retour. Johannes.

Après normalement pour les 2 parties sécurisation et mise en place, normalement elles sont indépendantes.

Exactement c'est tout à fait. En fait on peut avancer sur les 2 chantiers en parallèle mais c'est faut que les 2 chantiers soient terminés pour que le bastion ait beaucoup de sens. Si on termine juste le chantier bastion, bah c'est l'histoire de la porte coupe-feu et la porte incendie qui sont l'une à côté de l'autre.

C'est exactement ça. Le point, c'est que si on veut avoir un bastion vraiment très utile, faut terminer les 2 chantiers en même temps. Quand on en termine qu'un, on peut se dire qu'il est à peu près utile, mais que les gens, s'ils ont envie de nuire sur le système d'information, ils peuvent le bypasser. Donc ça remet un petit peu en question sa légitimité.

 il y a juste une petite précision pour le poke vu que il reste juste normalement d'après ce que j'ai compris il reste sa validation. Enfin ils vont l'utiliser les vous allez mettre quelques admins qui vont l'utiliser au.

Au quotidien, et c'est comme une phase de test quoi en.

Ouais, c'est une petite phase de une petite phase de poke pour vérifier que parce qu'en fait ce qu'il faut savoir c'est que ce sujet il est dans le pipe depuis un moment et qu'on a fait un devis à en l'occurrence, c'était.

Téléporte.

Donc c'est une solution de bastion propriétaire qui a fait un devis à plusieurs centaines de milliers d'euros et on s'est dit bon en dans un premier temps on va commencer par quelque chose d'open source et on va pas sortir 100000€ pour gérer ça.

Donc pour l'instant on part sur guacamole et là l'idée c'est de vérifier comme c'est une solution on va dire un peu plus low cost. Alors dans les faits c'est un très bon bastion. Mais comme c'est un peu plus low cost, on veut vérifier que tous les cas d'usage qu'on s'était donné au début.

Soit traitable par cette solution. C'est pour ça qu'on fait cette ce petit pop Pilot en fait. Mais alors ta question sous-jacente est très bonne, c'est est ce qu'on peut en parallèle de ça commencer à construire la DEV, la pré prod et la prod ?

Ouais, c'est ça, c'est juste histoire de savoir quand est-ce qu'on va passer aux prochaines étapes.
Bah alors les prochaines étapes pour moi c'est qu'on se fait le point mardi prochain, mais pour les prochaines étapes de construction et d'intégration on peut aller relativement vite parce que bah globalement on pourrait déjà lancer la création.

Faire le poke pilote et en parallèle construire les environnements à côté Faire une pré prod et une prod tu vois faut voir à quel moment on essaie de se dire Bon bah là maintenant on passe en pré prod et en prod.

Et comme ça tu peux, tu peux commencer à prendre connaissance de je sais pas si tu le das et tout ça ou Julien pour nous le partager aussi tu commences à te renseigner sur le


Tu étais, tu étais dessus donc je pense que t'as les infos. Alors c'est une première version de DAS Faudra que je l'améliore là c'est de ma faute, c'est juste qu'il faut du temps pour ça. Mais l'idée c'est un das de poc Il me semble qu'il y a pas si longtemps il y avait pas de das en poc.

J'essaye de mettre ça en place et d'exiger ça auprès de l'équipe. Donc maintenant on a des DAS de POC qui sont pas incroyables mais qui ont le mérite d'exister et qui présentent ce qui est en place. Donc tu peux voilà là tu as le lien.

Alors qui est globalement assez vide mais donc du coup une fois qu'on va avoir le POC il va falloir vite créer. Donc on aura 2 environnements, une pré prod et une prod, la pré prod pour monter les pour tester les montées de versions et la production ça sera l'environnement qui sera vraiment utilisé par tout le monde.

On a pas besoin d'autres environnements et l'idée c'est de monter tout ça rapidement. Et puis après Ioannis, il y aura le build to run, tout ça, tout ça les choses habituelles.


fin de la conversastion. 



pour ma demande je souhaite maintenant completer le ticket jira 


avec le max d'info pratique d'une façon professionelle 

donne moi tout ce que je peux mettre : 
contexte (pas de but et objectif dans le contexte) , objectif, But, situation actuelle, risque , reflexion ...........
commentaires(dépandance, observation ... ....

répond moi dans un fichier reponse1.md  reponse2.md reponse3.md
avec 3 réponse afin que je choisi la meilleur 

