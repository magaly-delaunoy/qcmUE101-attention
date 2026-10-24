/* ===================== RÉGLAGES (modifiables) ===================== */
const NB_QUESTIONS = 20;      // nombre de questions par partie
const POINTS_BONNE = 1;       // points pour une bonne réponse
const POINTS_MAUVAISE = -0.5; // points pour une mauvaise réponse

// Médailles : débloquées quand le score atteint le seuil
const MEDAILLES = [
  { seuil: 5,  icone: "🥉", nom: "Bronze",  msg: "Premier palier franchi, tu es sur la bonne voie !" },
  { seuil: 10, icone: "🥈", nom: "Argent",  msg: "Excellent ! Tes connaissances s'installent solidement." },
  { seuil: 15, icone: "🥇", nom: "Or",      msg: "Magnifique ! Tu maîtrises très bien ce cours." },
  { seuil: 18, icone: "💎", nom: "Diamant", msg: "Incroyable ! Un niveau d'expert en psychopathologie !" }
];

// Phrases de renforcement positif
const BONNES = [
  "Bravo, c'est exactement ça ! 🎉",
  "Excellent travail ! 🌟",
  "Oui ! Tu as bien retenu ton cours 👏",
  "Parfait, continue comme ça ! 💪",
  "Superbe réponse ! ✨",
  "Tu es en pleine forme ! 🚀",
  "Impressionnant, quelle mémoire ! 🧠",
  "Yes ! Ton travail porte ses fruits 🌱"
];
const MAUVAISES = [
  "Pas grave, c'est en se trompant qu'on retient le mieux 💜",
  "Presque ! Chaque erreur te rapproche de la réussite 🌈",
  "Aucun souci, regarde l'explication et tu ne l'oublieras plus 📚",
  "Courage, tu es en train d'apprendre ! 💪",
  "Ce n'est pas la bonne, mais tu progresses à chaque question 🌱",
  "On ne lâche rien, la prochaine sera pour toi ! ⭐"
];
const SERIES = {
  3: "🔥 3 bonnes réponses d'affilée, tu es lancée !",
  5: "🔥🔥 5 d'affilée ! Rien ne t'arrête !",
  8: "🏆 8 d'affilée ! Série légendaire !"
};
const MSG_FIN = [
  { min: 18, txt: "Score exceptionnel ! Tu es prête pour l'examen. 🎓" },
  { min: 15, txt: "Très belle performance, tu maîtrises ton cours ! 🌟" },
  { min: 10, txt: "Du très bon travail, encore un petit effort pour les médailles supérieures ! 💪" },
  { min: 5,  txt: "Bon début ! Relis les explications et retente ta chance. 🌱" },
  { min: -Infinity, txt: "Chaque partie t'aide à progresser : relis tes erreurs ci-dessous et rejoue, tu vas y arriver ! 💜" }
];

/* ===================== OUTILS ===================== */
const $ = (id) => document.getElementById(id);
const alea = (arr) => arr[Math.floor(Math.random() * arr.length)];
const melanger = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ","));
const montrer = (id) => {
  ["screen-start", "screen-game", "screen-end"].forEach((s) => $(s).classList.toggle("hidden", s !== id));
};

/* ===================== QUESTIONS DÉJÀ VUES ===================== */
// Les questions déjà posées sont mémorisées (même après fermeture de la page)
// et ne reviennent qu'une fois toute la banque parcourue.
const CLE_STOCKAGE = "qcm-psycho-attention-questions-vues";

function lireVues() {
  try {
    const brut = JSON.parse(localStorage.getItem(CLE_STOCKAGE) || "[]");
    return new Set(brut.filter((t) => QUESTIONS.some((q) => q.q === t)));
  } catch (e) {
    return new Set(); // stockage indisponible : on garde juste la mémoire de la session
  }
}
function ecrireVues() {
  try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify([...vues])); } catch (e) { /* ignoré */ }
}
let vues = lireVues();

function majInfoVues() {
  document.querySelectorAll(".seen-box").forEach((box) => {
    box.innerHTML = "";
    const txt = document.createElement("span");
    txt.textContent = `📚 Questions déjà découvertes : ${vues.size} / ${QUESTIONS.length}`;
    box.appendChild(txt);
    if (vues.size > 0) {
      const b = document.createElement("button");
      b.className = "link-btn";
      b.textContent = "Tout réinitialiser";
      b.addEventListener("click", () => {
        vues = new Set();
        ecrireVues();
        majInfoVues();
      });
      box.appendChild(b);
    }
  });
}

/* ===================== ÉTAT ===================== */
let partie = null;

function nouvellePartie() {
  const nb = Math.min(NB_QUESTIONS, QUESTIONS.length);
  let nonVues = QUESTIONS.filter((q) => !vues.has(q.q));
  let choisies;
  if (nonVues.length >= nb) {
    choisies = melanger(nonVues).slice(0, nb);
  } else {
    // Fin du tour : on pose d'abord les dernières inédites, puis un nouveau tour commence
    const restantes = melanger(QUESTIONS.filter((q) => vues.has(q.q)));
    choisies = melanger([...nonVues, ...restantes.slice(0, nb - nonVues.length)]);
    vues = new Set();
    toast("🔄 Tu as fait le tour de toutes les questions ! Un nouveau tour commence.");
  }
  partie = {
    questions: choisies,
    index: 0,
    score: 0,
    serie: 0,
    bonnes: 0,
    ratees: [],
    medailles: new Set(),
    repondu: false
  };
}

/* ===================== MÉDAILLES ===================== */
function dessinerEtagere(conteneur, scoreRef, juste) {
  conteneur.innerHTML = "";
  MEDAILLES.forEach((m) => {
    const actif = partie.medailles.has(m.seuil) || scoreRef >= m.seuil;
    const el = document.createElement("div");
    el.className = "medal" + (actif ? " on" : "") + (juste === m.seuil ? " just" : "");
    el.title = `${m.nom} : ${m.seuil} points`;
    el.innerHTML = `<span class="ico">${m.icone}</span><span>${m.seuil}</span>`;
    conteneur.appendChild(el);
  });
}

function verifierMedailles() {
  let nouvelle = null;
  MEDAILLES.forEach((m) => {
    if (partie.score >= m.seuil && !partie.medailles.has(m.seuil)) {
      partie.medailles.add(m.seuil);
      nouvelle = m;
    }
  });
  dessinerEtagere($("shelf"), 0, nouvelle ? nouvelle.seuil : null);
  if (nouvelle) toast(`${nouvelle.icone} Médaille ${nouvelle.nom} débloquée !<br><small>${nouvelle.msg}</small>`);
}

function toast(html) {
  const t = $("toast");
  t.innerHTML = html;
  t.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.add("hidden"), 3500);
}

/* ===================== AFFICHAGE D'UNE QUESTION ===================== */
function afficherQuestion() {
  const q = partie.questions[partie.index];
  partie.repondu = false;
  vues.add(q.q);
  ecrireVues();

  $("q-num").textContent = partie.index + 1;
  $("q-total").textContent = partie.questions.length;
  $("progress-bar").style.width = `${(partie.index / partie.questions.length) * 100}%`;
  $("question").textContent = q.q;
  $("feedback").classList.add("hidden");
  $("btn-next").classList.add("hidden");

  // QCM : on mélange les réponses en gardant la trace de la bonne (index 0 dans la banque)
  // Vrai/Faux : deux boutons, toujours dans le même ordre
  const estVF = q.type === "vf";
  const choix = estVF
    ? [{ texte: "✅ Vrai", bonne: q.vrai === true }, { texte: "❌ Faux", bonne: q.vrai === false }]
    : melanger(q.options.map((texte, i) => ({ texte, bonne: i === 0 })));
  $("q-type").textContent = estVF ? "🤔 Vrai ou faux ?" : "📝 QCM : une seule bonne réponse";
  const zone = $("options");
  zone.className = "options" + (estVF ? " vf" : "");
  zone.innerHTML = "";
  choix.forEach((c) => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = c.texte;
    b.addEventListener("click", () => repondre(b, c, choix));
    zone.appendChild(b);
  });
}

function repondre(bouton, choix, tousLesChoix) {
  if (partie.repondu) return;
  partie.repondu = true;
  const q = partie.questions[partie.index];

  const boutons = [...document.querySelectorAll(".option")];
  boutons.forEach((b) => (b.disabled = true));
  // Montre la bonne réponse
  boutons.forEach((b, i) => { if (tousLesChoix[i].bonne) b.classList.add("correct"); });

  const fb = $("feedback");
  if (choix.bonne) {
    partie.score += POINTS_BONNE;
    partie.bonnes++;
    partie.serie++;
    fb.className = "feedback ok";
    let titre = `${alea(BONNES)} (+${fmt(POINTS_BONNE)})`;
    if (SERIES[partie.serie]) titre += `<br>${SERIES[partie.serie]}`;
    $("feedback-title").innerHTML = titre;
  } else {
    bouton.classList.add("wrong");
    partie.score += POINTS_MAUVAISE;
    partie.serie = 0;
    const bonneTxt = q.type === "vf" ? (q.vrai ? "Vrai" : "Faux") : q.options[0];
    partie.ratees.push({ q: q.q, bonne: bonneTxt, choisie: choix.texte.replace(/^[✅❌]\s*/, ""), e: q.e });
    fb.className = "feedback ko";
    $("feedback-title").textContent = `${alea(MAUVAISES)} (${fmt(POINTS_MAUVAISE)})`;
  }
  $("feedback-explain").textContent = q.e;

  const sc = $("score");
  sc.textContent = fmt(partie.score);
  sc.parentElement.classList.remove("bump");
  void sc.offsetWidth; // relance l'animation
  sc.parentElement.classList.add("bump");

  verifierMedailles();

  const dernier = partie.index === partie.questions.length - 1;
  $("btn-next").textContent = dernier ? "Voir mon résultat 🏁" : "Suivant →";
  $("btn-next").classList.remove("hidden");
  $("btn-next").focus();
}

function suivante() {
  if (partie.index < partie.questions.length - 1) {
    partie.index++;
    afficherQuestion();
  } else {
    finDePartie();
  }
}

/* ===================== FIN DE PARTIE ===================== */
function finDePartie() {
  const total = partie.questions.length;
  const score = partie.score;

  // Médaille finale = plus haut palier atteint par le score final
  const gagnees = MEDAILLES.filter((m) => score >= m.seuil);
  const finale = gagnees[gagnees.length - 1];

  $("end-medal").textContent = finale ? finale.icone : "🎓";
  $("end-title").textContent = finale ? `Médaille ${finale.nom} !` : "Partie terminée";
  $("end-score").textContent = `${fmt(score)} point${Math.abs(score) > 1 ? "s" : ""}`;
  $("end-msg").textContent =
    `${partie.bonnes}/${total} bonnes réponses. ` + MSG_FIN.find((m) => score >= m.min).txt;

  partie.medailles = new Set(gagnees.map((m) => m.seuil));
  dessinerEtagere($("shelf-end"), score, null);

  // Revue des erreurs
  const liste = $("review-list");
  liste.innerHTML = "";
  if (partie.ratees.length === 0) {
    $("review").classList.add("hidden");
  } else {
    $("review").classList.remove("hidden");
    $("review").open = false;
    partie.ratees.forEach((r) => {
      const d = document.createElement("div");
      d.className = "review-item";
      const p1 = document.createElement("p"); p1.innerHTML = "<strong></strong>"; p1.firstChild.textContent = r.q;
      const p2 = document.createElement("p"); p2.textContent = "Ta réponse : " + r.choisie;
      const p3 = document.createElement("p"); p3.className = "good-ans"; p3.textContent = "✔ " + r.bonne;
      const p4 = document.createElement("p"); p4.textContent = r.e;
      d.append(p1, p2, p3, p4);
      liste.appendChild(d);
    });
  }

  $("progress-bar").style.width = "100%";
  majInfoVues();
  montrer("screen-end");
}

/* ===================== DÉMARRAGE ===================== */
function demarrer() {
  nouvellePartie();
  $("score").textContent = "0";
  dessinerEtagere($("shelf"), 0, null);
  montrer("screen-game");
  afficherQuestion();
}

// Accueil : légende des médailles
$("nb-q").textContent = Math.min(NB_QUESTIONS, QUESTIONS.length);
MEDAILLES.forEach((m) => {
  const c = document.createElement("span");
  c.className = "chip";
  c.textContent = `${m.icone} ${m.nom} · ${m.seuil} pts`;
  $("medal-legend").appendChild(c);
});

majInfoVues();

$("btn-start").addEventListener("click", demarrer);
$("btn-restart").addEventListener("click", demarrer);
$("btn-next").addEventListener("click", suivante);
