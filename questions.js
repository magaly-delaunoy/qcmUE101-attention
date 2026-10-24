/*
  Banque de questions – UE PY00101T, chapitre 3 « L'attention »
  Formes d'attention, modèle de Van Zomeren et Brouwer (intensité, sélectivité, SAS),
  filtres de Broadbent, Treisman, Deutsch et Deutsch, charge perceptive de Lavie,
  ressources de Kahneman, réservoirs multiples et SEEV de Wickens.

  Deux types de questions :
  • QCM : { q, options: [4 réponses], e }  → la BONNE réponse est TOUJOURS la première de la liste
    "options" (le jeu mélange l'ordre à l'affichage).
  • VRAI/FAUX : { type: "vf", vrai: true ou false, q: "affirmation", e }
  "e" = explication affichée après la réponse.
  Astuce : garde des réponses de longueur comparable pour que la bonne ne se repère pas.
*/
const QUESTIONS = [
  // ───────── QCM ─────────
  {
    q: "Quelle forme d'attention consiste à traiter une cible en ignorant les distracteurs ?",
    options: ["L'attention sélective", "L'attention divisée", "L'attention soutenue", "L'alerte phasique"],
    e: "Focaliser ses ressources sur un stimulus cible tout en inhibant les distracteurs non pertinents."
  },
  {
    q: "Quelle forme d'attention correspond au partage des ressources entre plusieurs tâches ?",
    options: ["L'attention divisée", "L'attention sélective", "L'attention soutenue", "L'alerte tonique"],
    e: "Partager ses ressources entre plusieurs stimuli ou tâches en parallèle."
  },
  {
    q: "Que désigne l'attention soutenue ?",
    options: ["Les fluctuations d'efficacité au fil du temps", "Le partage de ressources entre deux sources", "Le filtrage d'une cible parmi des distracteurs", "La réaction à un stimulus soudain"],
    e: "Aussi appelée vigilance : dimension tonique de l'intensité."
  },
  {
    q: "Comment est guidée l'orientation exogène de l'attention ?",
    options: ["Par un stimulus externe", "Par les buts de l'individu", "Par la volonté du sujet", "Par les attentes internes"],
    e: "Exogène = automatique, déclenchée de l'extérieur. Endogène = volontaire, guidée par les buts."
  },
  {
    q: "Comment est guidée l'orientation endogène de l'attention ?",
    options: ["Par la volonté et les buts", "Par un stimulus soudain", "De façon automatique", "Par la saillance du stimulus"],
    e: "L'orientation endogène est volontaire."
  },
  {
    q: "Quel type d'indice est une flèche centrale orientée vers la cible à venir ?",
    options: ["Un indice endogène", "Un indice exogène", "Un indice tonique", "Un indice phasique"],
    e: "La flèche centrale demande un traitement volontaire du sens de la flèche."
  },
  {
    q: "Quel type d'indice est l'apparition soudaine d'un stimulus à l'emplacement de la cible ?",
    options: ["Un indice exogène", "Un indice endogène", "Un indice soutenu", "Un indice divisé"],
    e: "Indice exogène : il capte l'attention de façon automatique."
  },
  {
    q: "Quelles dimensions structurent le modèle de Van Zomeren et Brouwer (1994) ?",
    options: ["Intensité et sélectivité", "Précocité et tardivité", "Alerte et fatigue", "Charge et ressources"],
    e: "Deux dimensions complémentaires, sous le contrôle du SAS."
  },
  {
    q: "Quelle est la fonction du SAS dans ce modèle ?",
    options: ["Coordonner les fonctions de l'attention", "Filtrer passivement les fréquences sonores", "Maintenir en continu le niveau d'éveil", "Stocker les distracteurs dans un registre"],
    e: "Instance stratégique de coordination et de régulation, qui apporte de la flexibilité à l'organisme."
  },
  {
    q: "Quand le SAS est-il surtout sollicité ?",
    options: ["Quand la tâche est nouvelle", "Quand la tâche est automatique", "Quand la tâche est routinière", "Quand la tâche est très courte"],
    e: "Tâches nouvelles ou décisions imposant des stratégies d'adaptation."
  },
  {
    q: "À quoi renvoie la dimension « intensité » ?",
    options: ["À l'alerte phasique et tonique", "À la sélection et au partage", "Au filtre précoce et tardif", "Aux réservoirs multiples"],
    e: "Intensité = dimensions phasique et tonique de la vigilance."
  },
  {
    q: "À quoi renvoie la dimension « sélectivité » ?",
    options: ["À la sélection et au partage", "À l'alerte phasique et tonique", "À la vigilance prolongée", "Au niveau d'éveil circadien"],
    e: "Sélectivité = attention sélective + attention divisée."
  },
  {
    q: "Qu'est-ce que l'alerte phasique ?",
    options: ["Un changement soudain et bref d'éveil", "Une variation lente du niveau d'éveil", "Une orientation volontaire du regard", "Un partage de ressources entre tâches"],
    e: "Modification soudaine et transitoire du niveau d'éveil, en réponse à une alerte endogène ou exogène."
  },
  {
    q: "À quoi correspond la dimension tonique (vigilance) ?",
    options: ["À des variations lentes du niveau d'éveil", "À une modification soudaine du niveau d'éveil", "À une sélection rapide de la cible", "À un traitement parallèle de deux tâches"],
    e: "Aussi appelée attention soutenue."
  },
  {
    q: "Sur quelle durée peuvent s'étendre les variations toniques de l'éveil ?",
    options: ["De quelques minutes au rythme circadien", "De quelques millisecondes à une seconde", "De quelques secondes à une minute", "D'une journée à une semaine"],
    e: "Variations plus lentes du niveau d'éveil."
  },
  {
    q: "Quel test, développé par Mackworth, a servi à étudier la vigilance ?",
    options: ["Le test de l'horloge", "Le test de Stroop", "Le test du Wisconsin", "Le test des cloches"],
    e: "Il a permis de mettre à jour l'effet des variables internes et externes sur la vigilance."
  },
  {
    q: "Que doit faire le participant au test de l'horloge ?",
    options: ["Réagir au saut de deux graduations", "Réagir à chaque saut de l'aiguille", "Compter les sauts d'une graduation", "Réagir quand l'aiguille s'arrête"],
    e: "Appuyer quand l'aiguille saute de deux graduations par seconde plutôt qu'une seule."
  },
  {
    q: "Combien de temps peut durer le test de l'horloge ?",
    options: ["Jusqu'à 2 heures", "Jusqu'à 10 minutes", "Jusqu'à 30 minutes", "Jusqu'à 24 heures"],
    e: "Une période pouvant aller jusqu'à 2 heures."
  },
  {
    q: "Pourquoi la dimension de sélectivité est-elle essentielle ?",
    options: ["Le système a une capacité limitée", "Le système a une capacité illimitée", "Le système traite tout en parallèle", "Le système est entièrement automatique"],
    e: "Le système de traitement de l'information étant à capacité limitée, il faut sélectionner et partager."
  },
  {
    q: "Quel modèle est jugé encore le plus adapté à l'ergonomie cognitive d'après le cours ?",
    options: ["Van Zomeren et Brouwer (1994)", "Broadbent et Treisman (1958-1964)", "Kahneman et Wickens (1973-1984)", "Lavie et Deutsch (1995 et 1963)"],
    e: "Il articule vigilance et attention autour de l'intensité et de la sélectivité."
  },
  {
    q: "Quelle image illustre le modèle de Broadbent (1958) ?",
    options: ["Un entonnoir et son goulot", "Un unique réservoir de ressources", "Un filtre qui atténue le signal", "Un ensemble de réservoirs séparés"],
    e: "Analogie de l'entonnoir et du goulot d'étranglement attentionnel."
  },
  {
    q: "Sur quoi le filtre de Broadbent sélectionne-t-il l'information ?",
    options: ["Ses caractéristiques physiques", "Sa signification sémantique", "Son importance pour le sujet", "Sa nouveauté dans la scène"],
    e: "Uniquement sur des indices physiques (genre de la voix, localisation)."
  },
  {
    q: "Quel protocole sert à démontrer le filtrage précoce ?",
    options: ["L'écoute dichotique", "La double tâche", "Le test de l'horloge", "La tâche de Stroop"],
    e: "Écoute dichotique : un message différent dans chaque oreille."
  },
  {
    q: "Dans l'écoute dichotique, que reçoit le participant ?",
    options: ["Un message distinct par oreille", "Le même message dans chaque oreille", "Un message unique, dans une oreille", "Deux messages identiques en décalé"],
    e: "Deux messages différents diffusés simultanément."
  },
  {
    q: "Que fait le participant dans la technique de l'ombrage (shadowing) ?",
    options: ["Répète à voix haute le message attendu", "Écrit le message de l'oreille ignorée", "Compte les mots du message ignoré", "Appuie quand il entend son prénom"],
    e: "Il répète à voix haute le message de l'oreille à suivre."
  },
  {
    q: "Quel résultat Broadbent observe-t-il en écoute dichotique ?",
    options: ["Restitution exacte de l'oreille attentive", "Restitution exacte des deux oreilles", "Compréhension du sens du message ignoré", "Oubli total des deux messages"],
    e: "L'oreille inattentive est ignorée : filtre précoce physique."
  },
  {
    q: "Que devient l'information non sélectionnée dans le modèle de Broadbent ?",
    options: ["Elle s'efface dans le registre sensoriel", "Elle est traitée jusqu'à sa signification", "Elle est atténuée mais reste traitée", "Elle est stockée durablement en mémoire"],
    e: "Oubli passif dans les registres sensoriels."
  },
  {
    q: "Quel qualificatif décrit le filtre de Broadbent ?",
    options: ["Rigide et précoce", "Souple et précoce", "Rigide et tardif", "Souple et tardif"],
    e: "Filtre sélectif rigide, précoce (caractéristiques physiques)."
  },
  {
    q: "Comment Treisman (1964) modifie-t-elle le modèle de Broadbent ?",
    options: ["Le message ignoré est atténué, pas éliminé", "Le message ignoré est éliminé à l'entrée", "Le filtre agit après l'analyse du sens", "Le filtre dépend de la charge de la tâche"],
    e: "Filtre atténuateur : sélection précoce à intermédiaire."
  },
  {
    q: "Que montre l'effet « cocktail party » ?",
    options: ["Son prénom passe dans le canal ignoré", "Le canal ignoré est totalement bloqué", "Seules les voix graves sont traitées", "L'attention divisée devient impossible"],
    e: "Le prénom est traité dans le canal ignoré : le filtre strict ne tient pas."
  },
  {
    q: "Pourquoi l'effet cocktail party met-il en difficulté le filtre strict ?",
    options: ["Le canal ignoré est tout de même traité", "Le canal attendu n'est pas du tout traité", "Le filtre agit uniquement en mémoire de travail", "Le bruit améliore toujours l'attention"],
    e: "Un contenu du canal ignoré est tout de même traité."
  },
  {
    q: "Dans le tableau de synthèse, quelle sélection est attribuée à Treisman ?",
    options: ["Précoce à intermédiaire", "Tardive", "Précoce stricte", "Flexible selon la charge"],
    e: "Filtre atténuateur / shadowing : atténuation."
  },
  {
    q: "Où se situe la sélection chez Deutsch et Deutsch (1963) ?",
    options: ["Après l'analyse sémantique", "Sur les seuls indices physiques", "À l'entrée du registre sensoriel", "Avant tout traitement perceptif"],
    e: "Filtre tardif : après l'analyse sémantique."
  },
  {
    q: "Que traite-t-on d'après le modèle de sélection tardive ?",
    options: ["Tous les messages, jusqu'au sens", "Seulement le message de l'oreille attendue", "Seulement les indices physiques du message", "Uniquement le prénom du participant"],
    e: "Tous les messages, attendus et ignorés, sont traités jusqu'à la signification."
  },
  {
    q: "À quel moment le filtre intervient-il dans le modèle tardif ?",
    options: ["Au moment de la réponse", "À l'entrée du système sensoriel", "Avant l'analyse physique", "Au cours du codage phonétique"],
    e: "Au moment de la réponse ou de la sélection pour la mémorisation."
  },
  {
    q: "Pourquoi le modèle tardif est-il jugé coûteux ?",
    options: ["Tout le sens est traité, même ignoré", "Le filtre est trop rigide pour s'adapter", "Le message ignoré est bloqué puis rejoué", "Il suppose un réservoir unique de ressources"],
    e: "Traiter tout le sens est très coûteux en ressources."
  },
  {
    q: "Que montre l'expérience de Lackner et Garrett (1972) ?",
    options: ["Le message ignoré oriente la compréhension", "Le message ignoré est totalement bloqué à l'entrée", "Le message ignoré n'est jamais traité jusqu'au sens", "Le message attendu est oublié plus vite"],
    e: "Il y a une influence sémantique du canal ignoré."
  },
  {
    q: "Dans cette expérience, qu'oriente le message ignoré ?",
    options: ["La phrase ambiguë du canal attendu", "Un mot isolé pris dans le canal attendu", "Le prénom du participant lui-même", "Le timbre de la voix qui parle"],
    e: "Le biais sémantique du canal ignoré oriente la compréhension de l'amphibologie dans le canal attentif."
  },
  {
    q: "Quelle conclusion tire-t-on de la confrontation Broadbent / Lackner et Garrett ?",
    options: ["Le canal ignoré est traité à notre insu", "Le filtre précoce est strict et suffisant", "Le canal ignoré est bloqué dès l'entrée", "L'attention est un réservoir unique fixe"],
    e: "Traitement sémantique non conscient du canal ignoré : filtrage strictement précoce invalidé."
  },
  {
    q: "Quelle est la tâche du paradigme de Lavie (1995) ?",
    options: ["Détecter un X ou un N parmi des lettres", "Répéter un message présenté en dichotique", "Surveiller une horloge pendant deux heures", "Compter les passes entre deux équipes"],
    e: "Détection d'une cible (X ou N) parmi un cercle de lettres, avec un distracteur périphérique."
  },
  {
    q: "Que manipule Lavie dans son paradigme ?",
    options: ["La charge perceptive de la tâche", "La durée de la tâche", "Le volume sonore du message", "Le nombre d'oreilles stimulées"],
    e: "Charge faible (lettres homogènes) vs élevée (lettres complexes)."
  },
  {
    q: "Que désigne le distracteur dans la tâche de Lavie ?",
    options: ["Un stimulus périphérique à ignorer", "La cible à détecter dans le cercle", "Une lettre du cercle de lettres central", "Une consigne verbale donnée avant l'essai"],
    e: "Un stimulus périphérique, compatible ou incompatible avec la cible."
  },
  {
    q: "Quelle condition utilise des lettres homogènes ?",
    options: ["La charge faible", "La charge élevée", "Aucune des deux", "Les deux"],
    e: "Faible : lettres homogènes. Élevée : lettres complexes."
  },
  {
    q: "Que devient le distracteur en charge faible ?",
    options: ["Il est traité avec les ressources restantes", "Il est bloqué dès l'entrée du système visuel", "Il disparaît de la perception consciente", "Il améliore toujours la détection de cible"],
    e: "Les ressources résiduelles « débordent » ; un distracteur incompatible ralentit la réponse."
  },
  {
    q: "Que devient le distracteur en charge élevée ?",
    options: ["Il est ignoré faute de ressources", "Il est traité en priorité absolue", "Il est traité jusqu'à sa signification", "Il est détecté plus rapidement que la cible"],
    e: "La tâche consomme 100 % des ressources."
  },
  {
    q: "Quand un distracteur incompatible ralentit-il le plus le temps de réaction ?",
    options: ["En charge faible", "En charge élevée", "En charge très élevée", "En l'absence de cible"],
    e: "Seulement quand il reste des ressources pour le traiter."
  },
  {
    q: "Quand la sélection est-elle précoce selon Lavie ?",
    options: ["En charge perceptive élevée", "En charge perceptive faible", "Quand le distracteur est incompatible", "Quand la cible est absente"],
    e: "Charge élevée : sélection précoce."
  },
  {
    q: "Quand la sélection est-elle tardive selon Lavie ?",
    options: ["En charge perceptive faible", "En charge perceptive élevée", "Quand la tâche est très difficile", "Quand les ressources sont épuisées"],
    e: "Charge faible : sélection tardive."
  },
  {
    q: "Que détermine le niveau de charge perceptive de la tâche principale ?",
    options: ["Le moment d'action du filtre", "L'oreille qui reçoit le message", "Le nombre de cibles rappelées", "La durée de la vigilance"],
    e: "Le filtre est flexible : il dépend de la charge."
  },
  {
    q: "Comment Kahneman (1973) conçoit-il l'attention ?",
    options: ["Un réservoir unique de ressources limité", "Des réservoirs multiples par modalité", "Un filtre rigide précoce", "Un filtre tardif sémantique"],
    e: "Réservoir unique à capacité limitée ; répartition de l'effort mental."
  },
  {
    q: "De quoi dépend l'allocation des ressources chez Kahneman ?",
    options: ["Dispositions durables et intentions du moment", "Saillance et effort de déplacement du regard", "Rythme circadien et niveau de fatigue", "Caractéristiques physiques et sémantiques"],
    e: "Dispositions automatiques durables et intentions momentanées."
  },
  {
    q: "Quel protocole permet d'évaluer la variation de l'effort mental ?",
    options: ["La double tâche", "L'écoute dichotique", "Le test de l'horloge", "La courbe ROC"],
    e: "Le protocole de double tâche."
  },
  {
    q: "Que se passe-t-il pour les tâches automatiques selon Kahneman ?",
    options: ["Elles s'exécutent en parallèle", "Elles imposent un traitement sériel", "Elles épuisent le réservoir", "Elles exigent le SAS"],
    e: "Elles ne sont pas coûteuses et s'exécutent en parallèle."
  },
  {
    q: "Qu'est-ce que l'attention répartit chez Kahneman ?",
    options: ["L'effort mental", "La saillance", "Le niveau d'éveil circadien", "La charge perceptive"],
    e: "Répartition de l'effort mental."
  },
  {
    q: "Que propose Wickens (1984) ?",
    options: ["Des réservoirs par étapes et modalités", "Un unique réservoir à capacité limitée", "Un filtre atténuateur du signal ignoré", "Un filtre qui agit à la réponse"],
    e: "Réservoirs de ressources séparés selon les étapes de traitement et les modalités."
  },
  {
    q: "Selon Wickens, que se passe-t-il entre deux tâches de modalités différentes ?",
    options: ["Moins d'interférence, jamais nulle", "Aucune interférence, quelle que soit la tâche", "Autant d'interférence qu'avec une même modalité", "Un blocage mutuel et complet des deux tâches"],
    e: "Des travaux ont montré une interférence résiduelle."
  },
  {
    q: "Que signifie l'acronyme SEEV ?",
    options: ["Saillance, Effort, Expectancy, Valeur", "Sélection, Effort, Éveil, Vigilance", "Saillance, Éveil, Expectancy, Vitesse", "Stimulus, Effort, Expectation, Valeur"],
    e: "S = Saillance, E = Effort, E = Expectancy (attente), V = Valeur."
  },
  {
    q: "Quels facteurs SEEV sont ascendants (bottom-up) ?",
    options: ["Saillance et Effort", "Expectancy et Valeur", "Saillance et Valeur", "Effort et Expectancy"],
    e: "Ascendants : propriétés physiques attractives et coût de déplacement du regard."
  },
  {
    q: "Quels facteurs SEEV sont descendants (top-down) ?",
    options: ["Expectancy et Valeur", "Saillance et Effort", "Saillance et Expectancy", "Effort et Valeur"],
    e: "Descendants : probabilité perçue de l'événement et importance pour la tâche."
  },
  {
    q: "Que désigne la saillance dans SEEV ?",
    options: ["Les propriétés physiques attractives", "Le coût de déplacement du regard", "La probabilité perçue d'un événement", "L'importance pour la tâche"],
    e: "Facteur ascendant."
  },
  {
    q: "Que désigne l'effort dans SEEV ?",
    options: ["Le coût de déplacement du regard", "Les propriétés physiques attractives", "La probabilité perçue d'un événement", "L'importance pour la tâche"],
    e: "Facteur ascendant."
  },
  {
    q: "Que désigne l'expectancy dans SEEV ?",
    options: ["La probabilité perçue de l'événement", "L'importance pour la tâche", "Le coût d'un déplacement du regard", "L'attrait physique d'un stimulus"],
    e: "Facteur descendant."
  },
  {
    q: "Que désigne la valeur dans SEEV ?",
    options: ["L'importance pour la tâche", "La probabilité perçue de l'événement", "Le coût de déplacement du regard", "Les propriétés physiques attractives"],
    e: "Facteur descendant."
  },
  {
    q: "Que cherche à prédire le modèle SEEV ?",
    options: ["Le balayage visuel", "La vigilance prolongée", "L'écoute dichotique", "La charge perceptive"],
    e: "Il explique ce qui oriente le regard (ergonomie)."
  },
  {
    q: "En quelle année Broadbent propose-t-il son filtre ?",
    options: ["1958", "1964", "1963", "1973"],
    e: "Broadbent : 1958. Treisman : 1964. Deutsch et Deutsch : 1963."
  },
  {
    q: "Qui propose le filtre atténuateur en 1964 ?",
    options: ["Treisman", "Broadbent", "Kahneman", "Wickens"],
    e: "Treisman (1964)."
  },
  {
    q: "Qui propose le filtre tardif en 1963 ?",
    options: ["Deutsch et Deutsch", "Treisman et Cherry", "Broadbent et Cherry", "Kahneman et Wickens"],
    e: "Deutsch et Deutsch (1963)."
  },
  {
    q: "En quelle année Kahneman publie-t-il son modèle de ressources ?",
    options: ["1973", "1995", "1984", "1994"],
    e: "Kahneman : 1973. Wickens : 1984. Lavie : 1995. Van Zomeren et Brouwer : 1994."
  },
  {
    q: "En quelle année Lavie propose-t-elle la charge perceptive ?",
    options: ["1995", "1994", "2001", "1984"],
    e: "Lavie : 1995. SEEV : 2001."
  },
  {
    q: "En quelle année Wickens et ses collègues proposent-ils SEEV ?",
    options: ["2001", "1984", "1995", "1973"],
    e: "SEEV : 2001. Les réservoirs multiples : 1984."
  },
  {
    q: "Quel auteur décrit le modèle du réservoir unique ?",
    options: ["Kahneman", "Wickens", "Lavie", "Treisman"],
    e: "Réservoir unique : Kahneman. Réservoirs multiples : Wickens."
  },
  {
    q: "Lequel de ces modèles est un modèle de sélection tardive ?",
    options: ["Celui de Deutsch et Deutsch", "Celui de Broadbent (1958)", "Celui de Treisman (1964)", "Celui de Kahneman (1973)"],
    e: "Deutsch et Deutsch : tardif (après analyse sémantique)."
  },

  // ───────── Vrai / Faux ─────────
  {
    type: "vf",
    vrai: true,
    q: "L'attention soutenue désigne les fluctuations d'efficacité attentionnelle dans le temps.",
    e: "Elle correspond à la vigilance (dimension tonique)."
  },
  {
    type: "vf",
    vrai: false,
    q: "L'attention sélective consiste à traiter consciemment deux tâches complexes en même temps.",
    e: "C'est la définition de l'attention divisée."
  },
  {
    type: "vf",
    vrai: false,
    q: "L'orientation exogène de l'attention est guidée par la volonté et les buts de l'individu.",
    e: "Exogène : automatique, externe. C'est l'orientation endogène qui est volontaire."
  },
  {
    type: "vf",
    vrai: true,
    q: "L'attention divisée correspond au partage des ressources entre plusieurs sources d'information.",
    e: "Elle permet de traiter plusieurs tâches en parallèle."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le modèle de Broadbent repose sur l'analogie de l'entonnoir et du goulot d'étranglement.",
    e: "Filtre sélectif rigide, précoce."
  },
  {
    type: "vf",
    vrai: true,
    q: "Broadbent s'appuie sur l'écoute dichotique pour démontrer le filtrage précoce des informations.",
    e: "Un message différent dans chaque oreille."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le filtre de Broadbent sélectionne l'information sur la base d'une analyse sémantique approfondie.",
    e: "Il ne sélectionne que sur des indices physiques (genre de la voix, localisation)."
  },
  {
    type: "vf",
    vrai: true,
    q: "Chez Broadbent, les informations non sélectionnées s'oublient passivement dans les registres sensoriels.",
    e: "Elles ne sont pas traitées plus loin."
  },
  {
    type: "vf",
    vrai: false,
    q: "Chez Treisman, le canal inattentif est totalement bloqué à l'entrée du système.",
    e: "Il est seulement atténué."
  },
  {
    type: "vf",
    vrai: true,
    q: "Chez Treisman, l'attention n'élimine pas le message ignoré : elle l'atténue.",
    e: "Filtre atténuateur (1964)."
  },
  {
    type: "vf",
    vrai: false,
    q: "L'effet cocktail party confirme le filtre strict de Broadbent en prouvant l'absence de traitement du prénom.",
    e: "Il montre au contraire que le prénom est traité dans le canal ignoré."
  },
  {
    type: "vf",
    vrai: true,
    q: "Chez Deutsch et Deutsch, tous les messages sont traités jusqu'à leur signification.",
    e: "La sélection a lieu tardivement."
  },
  {
    type: "vf",
    vrai: false,
    q: "L'expérience de Lackner et Garrett (1972) montre que le message ignoré n'influence jamais la compréhension du message attendu.",
    e: "Elle montre une influence sémantique du canal ignoré."
  },
  {
    type: "vf",
    vrai: true,
    q: "Dans le modèle tardif, le filtre intervient au moment de la réponse ou de la mémorisation.",
    e: "Après l'analyse sémantique."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le modèle du filtre tardif est très économique en ressources attentionnelles.",
    e: "Traiter tout le sens est très coûteux."
  },
  {
    type: "vf",
    vrai: false,
    q: "En charge perceptive élevée, la sélection attentionnelle est tardive.",
    e: "En charge élevée, la sélection est précoce."
  },
  {
    type: "vf",
    vrai: true,
    q: "En charge faible, les ressources en surplus « débordent » et traitent les distracteurs.",
    e: "Charge faible : sélection tardive."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le niveau de charge perceptive de la tâche principale détermine le moment d'action du filtre.",
    e: "Lavie (1995) : filtre flexible."
  },
  {
    type: "vf",
    vrai: false,
    q: "Un distracteur incompatible ralentit davantage le temps de réaction quand la charge est très élevée.",
    e: "C'est en charge faible, quand des ressources restent disponibles."
  },
  {
    type: "vf",
    vrai: true,
    q: "Kahneman conçoit l'attention comme un réservoir unique de ressources à capacité limitée.",
    e: "Il parle de répartition de l'effort mental."
  },
  {
    type: "vf",
    vrai: false,
    q: "Pour Kahneman, les tâches automatiques imposent un traitement sériel strict.",
    e: "Elles ne sont pas coûteuses et s'exécutent en parallèle."
  },
  {
    type: "vf",
    vrai: true,
    q: "Chez Kahneman, l'allocation des ressources dépend de dispositions durables et d'intentions.",
    e: "Dispositions automatiques et intentions."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le protocole de double tâche permet d'évaluer la variation de l'effort mental.",
    e: "Il est associé au modèle de Kahneman."
  },
  {
    type: "vf",
    vrai: false,
    q: "Selon le modèle de 1984, deux tâches sans modalité commune ne créent jamais la moindre interférence.",
    e: "Des travaux ultérieurs ont montré une interférence résiduelle."
  },
  {
    type: "vf",
    vrai: true,
    q: "Wickens (1984) propose des réservoirs de ressources séparés par étapes et par modalités.",
    e: "Modèle à réservoirs multiples."
  },
  {
    type: "vf",
    vrai: true,
    q: "Dans SEEV, la Saillance et l'Effort sont des facteurs ascendants (exogènes).",
    e: "Propriétés attractives et coût de déplacement du regard."
  },
  {
    type: "vf",
    vrai: true,
    q: "Dans SEEV, l'Expectancy et la Valeur relèvent de caractéristiques internes du sujet (top-down).",
    e: "Probabilité perçue et importance pour la tâche."
  },
  {
    type: "vf",
    vrai: true,
    q: "L'intensité (alerte et vigilance) est une dimension du modèle de Van Zomeren et Brouwer.",
    e: "L'autre dimension est la sélectivité."
  },
  {
    type: "vf",
    vrai: true,
    q: "La sélectivité (attention sélective et divisée) est une dimension du modèle de Van Zomeren et Brouwer.",
    e: "Sélection et partage."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le SAS est responsable du filtrage périphérique passif des fréquences sonores.",
    e: "C'est l'instance stratégique de coordination (contrôle exécutif)."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le modèle de Van Zomeren et Brouwer articule niveau d'activation et répartition des ressources.",
    e: "Intensité et sélectivité, sous le contrôle du SAS."
  },
  {
    type: "vf",
    vrai: true,
    q: "Dans l'écoute dichotique, deux messages différents sont diffusés, un dans chaque oreille.",
    e: "Protocole utilisé par Broadbent."
  },
  {
    type: "vf",
    vrai: true,
    q: "Broadbent observe une restitution exacte du message de l'oreille attentive.",
    e: "D'où un filtre précoce physique."
  },
  {
    type: "vf",
    vrai: false,
    q: "Chez Lackner et Garrett, le canal ignoré n'a aucun effet sur la compréhension du canal attentif.",
    e: "Le biais sémantique du canal ignoré oriente la compréhension d'une phrase ambiguë."
  },
  {
    type: "vf",
    vrai: true,
    q: "Broadbent et Lackner-Garrett révèlent un traitement sémantique non conscient du canal ignoré.",
    e: "Le filtrage strictement précoce est invalidé."
  },
  {
    type: "vf",
    vrai: true,
    q: "Chez Lavie, il faut détecter une cible (X ou N) parmi des lettres, avec un distracteur périphérique.",
    e: "Charge faible : lettres homogènes. Charge élevée : lettres complexes."
  },
  {
    type: "vf",
    vrai: false,
    q: "Dans la tâche de Lavie, le participant mémorise une liste de mots pendant une écoute dichotique.",
    e: "Il détecte une cible X ou N parmi des lettres."
  },
  {
    type: "vf",
    vrai: false,
    q: "Chez Lavie, en charge élevée, les ressources résiduelles traitent le distracteur.",
    e: "En charge élevée, la tâche consomme 100 % des ressources : le distracteur est ignoré."
  },
  {
    type: "vf",
    vrai: true,
    q: "Selon Lavie, le filtre est précoce si la charge est élevée et tardif si elle est faible.",
    e: "Cela réconcilie sélection précoce et tardive."
  },
  {
    type: "vf",
    vrai: false,
    q: "Selon Lavie, le filtre est précoce si la charge est faible et tardif si elle est élevée.",
    e: "C'est l'inverse : précoce en charge élevée, tardif en charge faible."
  },
  {
    type: "vf",
    vrai: true,
    q: "Dans SEEV, les deux E désignent l'Effort et l'Expectancy ; le V désigne la Valeur.",
    e: "S = Saillance."
  },
  {
    type: "vf",
    vrai: false,
    q: "Dans SEEV, l'Effort désigne l'importance de l'information pour la tâche.",
    e: "C'est la Valeur. L'Effort est le coût de déplacement du regard."
  },
  {
    type: "vf",
    vrai: true,
    q: "L'alerte phasique est une modification soudaine et transitoire du niveau d'éveil.",
    e: "La vigilance est la dimension tonique."
  },
  {
    type: "vf",
    vrai: false,
    q: "La vigilance correspond à des variations très rapides du niveau d'éveil, de l'ordre de la milliseconde.",
    e: "Ce sont des variations lentes : de quelques minutes au rythme circadien."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le test de l'horloge de Mackworth permet d'étudier la vigilance.",
    e: "Il peut durer jusqu'à 2 heures."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le SAS est l'instance stratégique de coordination des fonctions de l'attention.",
    e: "Il apporte de la flexibilité à l'organisme."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le SAS est surtout sollicité quand la tâche est routinière et très bien apprise.",
    e: "Il intervient pour les tâches nouvelles ou les décisions imposant des stratégies."
  },
  {
    type: "vf",
    vrai: true,
    q: "Une flèche centrale orientée vers la cible à venir constitue un indice endogène.",
    e: "L'apparition soudaine d'un stimulus à l'emplacement de la cible : indice exogène."
  },
  {
    type: "vf",
    vrai: false,
    q: "L'apparition soudaine d'un stimulus à l'emplacement de la cible est un indice endogène.",
    e: "C'est un indice exogène."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le filtre de Broadbent sélectionne sur des indices physiques (genre de la voix, localisation).",
    e: "Treisman et Deutsch et Deutsch introduisent la sémantique."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le modèle de Treisman (1964) est un modèle de sélection tardive stricte.",
    e: "Précoce à intermédiaire (atténuation)."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le modèle de Deutsch et Deutsch propose une sélection sur les seules caractéristiques physiques.",
    e: "Il propose une sélection tardive, après l'analyse sémantique."
  },
  {
    type: "vf",
    vrai: true,
    q: "Le système étant à capacité limitée, la sélectivité est essentielle à l'adaptation.",
    e: "Sélection et partage."
  },
  {
    type: "vf",
    vrai: false,
    q: "Dans l'écoute dichotique, le même message est diffusé simultanément dans les deux oreilles.",
    e: "Deux messages différents sont diffusés, un dans chaque oreille."
  },
  {
    type: "vf",
    vrai: false,
    q: "Broadbent (1958) propose un modèle de sélection tardive de l'information sensorielle.",
    e: "Son filtre est rigide et précoce."
  },
  {
    type: "vf",
    vrai: false,
    q: "Kahneman propose plusieurs réservoirs de ressources indépendants selon les modalités.",
    e: "C'est Wickens (1984). Kahneman : réservoir unique."
  },
  {
    type: "vf",
    vrai: false,
    q: "Wickens (1984) conçoit l'attention comme un réservoir unique de ressources.",
    e: "Il propose des réservoirs séparés par étapes et modalités."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le test de l'horloge de Mackworth dure en général quelques secondes seulement par essai.",
    e: "Il peut durer jusqu'à 2 heures."
  },
  {
    type: "vf",
    vrai: false,
    q: "Selon Lavie, la sélection est toujours précoce, quelle que soit la charge de la tâche.",
    e: "Elle dépend de la charge : précoce si élevée, tardive si faible."
  },
  {
    type: "vf",
    vrai: false,
    q: "Dans SEEV, la saillance dépend des attentes du sujet (facteur top-down).",
    e: "Saillance et Effort sont des facteurs ascendants (bottom-up)."
  },
  {
    type: "vf",
    vrai: false,
    q: "Dans SEEV, l'Expectancy et la Valeur sont des facteurs ascendants (bottom-up) du balayage visuel.",
    e: "Ce sont des facteurs descendants (top-down)."
  },
  {
    type: "vf",
    vrai: false,
    q: "Le modèle de Van Zomeren et Brouwer comporte trois dimensions : intensité, sélectivité et filtrage.",
    e: "Il comporte deux dimensions, intensité et sélectivité, sous le contrôle du SAS."
  },
  {
    type: "vf",
    vrai: false,
    q: "L'alerte phasique correspond à des variations lentes de l'éveil, jusqu'au rythme circadien.",
    e: "Ce sont les variations toniques (vigilance). La phasique est soudaine et transitoire."
  },
  {
    type: "vf",
    vrai: false,
    q: "Deutsch et Deutsch situent la sélection avant l'analyse sémantique du message.",
    e: "Ils la situent après l'analyse sémantique : sélection tardive."
  }
];
