
DEMANDE : 

donne moi dans un readme ce que je doit faire en tanque chef de projet d'une façon professionelle et me proposé egalement un commentaire a mettre dans le ticket jira et d'eventuelle action que je peut faire aussi. 

voici le sujet que je pilote actuellement 
j'ai déjà créé un ticket jira et j'ai mis cette description aprés le premier point réalisé : 


[Bastion Guacamole] Préparation Suivi global pour mise en place


Description

Contexte
Les administrateurs accèdent actuellement aux serveurs et aux différentes infrastructures au moyen de leurs connexions VPN, puis réalisent des connexions ou des rebonds directs vers les ressources à administrer, notamment en SSH.

Ce fonctionnement ne permet pas de centraliser suffisamment les accès administrateurs ni de disposer d’une traçabilité complète, homogène et facilement exploitable des opérations réalisées. Il existe également plusieurs possibilités de rebond latéral depuis certains outils ou serveurs techniques disposant eux-mêmes d’un accès aux infrastructures.

Un POC du bastion basé sur Apache Guacamole a été instancié et configuré. À ce stade, la plateforme n’a toutefois pas encore été suffisamment utilisée par les administrateurs pour confirmer son adéquation aux usages quotidiens. Le sujet est considéré comme critique, notamment parce que le bastion doit constituer un prérequis d’accès à un nouveau socle d’infrastructure.

Objectif
Finaliser et valider opérationnellement le POC, piloter la mise en place du Bastion Guacamole avec la création des environnements de PPD et PROD , tout en coordonnant les actions nécessaires pour sécuriser le parcours des accès d’administration et empêcher le contournement du bastion.

But
Centraliser les connexions d’administration à travers un bastion sécurisé et rendre les accès directs ou les rebonds alternatifs non autorisés incompatibles avec le dispositif cible. La mise en place du Bastion Guacamole va également contribuer à répondre aux exigences de certification associées à GenIA-L 1.5

Situation actuelle
Le POC du Bastion Guacamole est actuellement installé et configuré, les machines ont été instanciées et le socle technique est opérationnel. Toutefois, la plateforme n’a pas encore été utilisée de manière suffisamment représentative par les administrateurs. Une phase pilote avec plusieurs administrateurs reste donc à organiser afin de finaliser et de valider le POC avant le passage aux environnements de préproduction et de production.

Une première version du DAS est également disponible : 
BASTIONXXX - Technical architecture
 






Objectif du ticket

Ce ticket a pour objectif de préparer et de suivre la reprise du projet Bastion Guacamole, en centralisant l’état actuel du sujet, les travaux à réaliser, les éléments restant à identifier et les décisions nécessaires à la poursuite du projet.


et voici le commentaire que j'ai ajouté : 


Vu lors du point [Bastion Guacamole] échange/reprise du sujet par Mahdi  du 20 oct. 2026 avec @Julien GANNIER  et @Ioannis ANAGNOSTOPOULOS  :

La mise en place cible est attendue pour janvier 2027, ce qui nécessite d’établir un rétroplanning et de faire avancer en parallèle les volets mise en place et sécurisation.

stratégie de mise en place et les prochaines étapes sont 
à clarifier
 lors du prochain point du 27 nov. 2026 


Les informations et les éléments disponibles à ce stade sur le sujet sont détaillés dans la description de ce ticket.




Ensuite je vien de réalisé un nouveau point :  [Bastion] Next Steps - Pilote et stratégie autour des comptes.

et voici la discussion : 

Julien GANNIER
0 minutes 3 secondes0:03
Julien GANNIER 0 minutes 3 secondes
Je sais pas ferry, si t'es au courant que le bastion ça va être quelque chose qui va qui va être hyper important pour nous parce que tu sais j'ai 1.5 là qu'on est en train de bloquer en mode souverain.
Julien GANNIER 0 minutes 19 secondes
Et avec les clients, on a globalement des obligations de passer par un bastion.
Julien GANNIER 0 minutes 27 secondes
Donc le bastion va devenir un truc obligatoire à partir du mois de janvier, au moins pour le périmètre cube.
Julien GANNIER 0 minutes 34 secondes
Donc je sais pas si Cyril t'en a parlé, mais.

Fehri CHELLY
0 minutes 37 secondes0:37
Fehri CHELLY 0 minutes 37 secondes
Non, on se parle plus avec Cyril.

Julien GANNIER
0 minutes 39 secondes0:39
Julien GANNIER 0 minutes 39 secondes
Ah ouais mais c'est ça aussi vous avez des failles PHP entre vous ?

Fehri CHELLY
0 minutes 43 secondes0:43
Fehri CHELLY 0 minutes 43 secondes
C'est ça, c'est ça ? Non ? Par contre j'ai une petite question. Du coup ce prérequis, il est valable pour la partie souveraine mais pas pour le reste.

Julien GANNIER
0 minutes 52 secondes0:52
Julien GANNIER 0 minutes 52 secondes
Ah si Ben en fait pour le Ben en fait pour la partie AWS tu sais pour l'instant ils sont-ils sont dans un compte R et D et en fait ils ont des licences teleport donc pour l'instant ils ont donc ils ont un bastion qui teleport.

Fehri CHELLY
0 minutes 53 secondes0:53
Fehri CHELLY 0 minutes 53 secondes
Pour la partie, pour la partie WS.
Fehri CHELLY 1 minute 4 secondes
D'accord.

Aly DARWISH
50 minutes 17 secondes50:17
Aly DARWISH 50 minutes 17 secondes
E.

Julien GANNIER
50 minutes 17 secondes50:17
Julien GANNIER 50 minutes 17 secondes
Mais au moins à minima, on est obligé de le présenter à la RD.
KG
Kamel Mahdi GHERBI
50 minutes 21 secondes50:21
Kamel Mahdi GHERBI 50 minutes 21 secondes
Ok.

Julien GANNIER
50 minutes 21 secondes50:21
Julien GANNIER 50 minutes 21 secondes
Et après c'est l'a. RB qui te dit est-ce que tu dois passer la Gate un la Gate 2 pour les projets d'infra quand on arrive à bien les vendre en général on se fait pas embêter typiquement sur la PKI là il y a pas eu de sujet, on l'a présenté il y a 2 semaines, ils nous ont dit Bah PKI de toute façon on a pas le choix on avance.
Julien GANNIER 50 minutes 38 secondes
La probation, il y a de fortes chances que ça avance aussi rapidement, mais faut qu'on faut qu'on passe, faut qu'on passe l'a. RB 0 assez rapidement.
KG
Kamel Mahdi GHERBI
50 minutes 49 secondes50:49
Kamel Mahdi GHERBI 50 minutes 49 secondes
D'accord ?

Aly DARWISH
50 minutes 51 secondes50:51
Aly DARWISH 50 minutes 51 secondes
Et pour les journaux du coup on enfin je peux commencer à traiter sa mise en place pour l'instant ou bien on sait pas encore si on utilise la solution.

Julien GANNIER
50 minutes 59 secondes50:59
Julien GANNIER 50 minutes 59 secondes
Teste le toi les alors pour l'instant on les envoie pas à personne, tu les log sur ton file system mais essaye de.

Aly DARWISH
51 minutes 6 secondes51:06
Aly DARWISH 51 minutes 6 secondes
Bah moi ils sont bien loggés moi c'est juste pour les envoyer. Enfin est-ce que pour l'instant je les laisse sur les enfin sur les machines présentes ou bien est ce qu'on commence déjà à les envoyer quelque part ?

Julien GANNIER
51 minutes 15 secondes51:15
Julien GANNIER 51 minutes 15 secondes
Alors pour l'instant pour moi pour le poc on va pas vérifier ça. Si elles sont posées sur un file system on sait qu'on va pouvoir les récupérer. Donc y a les enregistrements où je pense qu'il faut qu'on teste le dépôt sur 1S 3.
Julien GANNIER 51 minutes 28 secondes
Et ça faut qu'on voit ensemble. Je pense qu'il faut qu'on se refasse un point dans le courant de la semaine tous les 2. Et après pour l'envoi des logs, le plus important c'est surtout que t'arrives à ne pas loguer les mots de passe. Et sinon faut qu'on trouve une astuce pour être à même de les supprimer avant de les envoyer.

Aly DARWISH
51 minutes 29 secondes51:29
Aly DARWISH 51 minutes 29 secondes
No.
DB
David BAROIN
51 minutes 46 secondes51:46
David BAROIN 51 minutes 46 secondes
Ça j'ai l'impression qu'il les logue pas si on a mis à part le mode le mode et le mode trace il les met pas dans les logs il te dit que y a pas de y a.

Aly DARWISH
51 minutes 47 secondes51:47
Aly DARWISH 51 minutes 47 secondes
Ok.

Julien GANNIER
51 minutes 56 secondes51:56
Julien GANNIER 51 minutes 56 secondes
Ça me surprend aussi, non ? Ça me surprend aussi Aly.
DB
David BAROIN
52 minutes 2 secondes52:02
David BAROIN 52 minutes 2 secondes
Que si il fait une vidéo effectivement que ça paraît là c'est difficile. Et sinon non non, il stocke pas si t'es dans l'homme, si t'es pas en tes bugs.

Julien GANNIER
52 minutes 14 secondes52:14
Julien GANNIER 52 minutes 14 secondes
Marche donc y a un petit peu de poc à faire. Désolé, on a débordé de 2 Min ce que je vous propose à tous. Je pense qu'il faut Aly que tu bosses un peu sur cette partie que Mahdi peut-être qu'il faut qu'on se fasse un petit point.
Julien GANNIER 52 minutes 30 secondes
Dans le cours en fin de semaine pour qu'on voit les prochaines étapes et que voilà que qu'on ait 1DAT et cetera, et qu'on parte assez très rapidement en GTA.

Aly DARWISH
52 minutes 33 secondes52:33
Aly DARWISH 52 minutes 33 secondes
Ouais.
Aly DARWISH 52 minutes 42 secondes
Ça marche, moi je te ferai un retour sur les points qu'on vient d'aborder maintenant.
KG
Kamel Mahdi GHERBI
52 minutes 42 secondes52:42
Kamel Mahdi GHERBI 52 minutes 42 secondes
Ok.

Aly DARWISH
52 minutes 47 secondes52:47
Aly DARWISH 52 minutes 47 secondes
Pas comme ça.

Julien GANNIER
52 minutes 49 secondes52:49
Julien GANNIER 52 minutes 49 secondes
Marche et du coup ferry, dans tous les cas on te le laisse, mais si toi ça te va si t'es en place.
KG
Kamel Mahdi GHERBI
52 minutes 50 secondes52:50
Kamel Mahdi GHERBI 52 minutes 50 secondes
Ok, ça marche.

Julien GANNIER
52 minutes 56 secondes52:56
Julien GANNIER 52 minutes 56 secondes
C'est plutôt une très bonne chose.
Julien GANNIER 52 minutes 59 secondes
Vendredi 16 h. Vous êtes dispo ou pas ? Je sais pas s'il m'a dit Je te laisse envoyer l'invite pour tout le suivi.
KG
Kamel Mahdi GHERBI
53 minutes 4 secondes53:04
Kamel Mahdi GHERBI 53 minutes 4 secondes
Oh.
Kamel Mahdi GHERBI 53 minutes 7 secondes
Ok, ça marche, je vous envoie l'invitation, OK ?

Julien GANNIER
53 minutes 12 secondes53:12
Julien GANNIER 53 minutes 12 secondes
Merci beaucoup en tout cas.

Aly DARWISH
53 minutes 15 secondes53:15
Aly DARWISH 53 minutes 15 secondes
Merci à tous.

Julien GANNIER
53 minutes 16 secondes53:16
Julien GANNIER 53 minutes 16 secondes
Et à bientôt et bon AP, ciao.

Fehri CHELLY
53 minutes 17 secondes53:17
Fehri CHELLY 53 minutes 17 secondes
Merci à Lee, merci à tous, ciao, ciao.
DB
David BAROIN
53 minutes 18 secondes53:18
David BAROIN 53 minutes 18 secondes
Salut.
KG
Kamel Mahdi GHERBI
53 minutes 20 secondes53:20
Kamel Mahdi GHERBI 53 minutes 20 secondes
Ça va du merci.
