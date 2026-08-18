
const categories = [
  {
    id: "needs", icon: "❤️", name: "Besoins du quotidien",
    items: [
      ["🚽","Toilettes","toilettes"],
      ["🍝","Manger","manger"],
      ["🥤","Boire","boire"],
      ["🛏️","Dormir","dormir"],
      ["🚿","Se laver","se laver"],
      ["🪥","Se brosser les dents","se brosser les dents"],
      ["👕","S’habiller","s'habiller"],
      ["🧼","Se laver les mains","se laver les mains"],
      ["🤝","Besoin d’aide","j'ai besoin d'aide"],
      ["🎧","Besoin de calme","j'ai besoin de calme"],
      ["🤧","Se moucher","se moucher"],
      ["🤗","Besoin de réconfort","j'ai besoin de réconfort"],
      ["🥵","J’ai chaud","j'ai chaud"],
      ["🥶","J’ai froid","j'ai froid"],
      ["🤕","J’ai mal","j'ai mal"]
    ]
  },
  {
    id: "emotions", icon: "🙂", name: "Émotions",
    items: [
      ["😊","Je suis content(e)","je suis content"],
      ["😢","Je suis triste","je suis triste"],
      ["😡","Je suis en colère","je suis en colère"],
      ["😨","J’ai peur","j'ai peur"],
      ["😴","Je suis fatigué(e)","je suis fatigué"],
      ["😌","Je suis calme","je suis calme"]
    ]
  },
  {
    id: "people", icon: "👨‍👩‍👧", name: "Personnes",
    items: [
      ["👩","Maman","maman"], ["👨","Papa","papa"], ["👧","Sœur","ma sœur"],
      ["👦","Frère","mon frère"], ["🧑‍🏫","Maître / Maîtresse","mon enseignant"],
      ["🧑‍⚕️","Soignant","le soignant"]
    ]
  },
  {
    id: "activities", icon: "🧩", name: "Activités",
    items: [
      ["🧩","Jouer","jouer"], ["📺","Regarder la télé","regarder la télé"],
      ["🎨","Dessiner","dessiner"], ["📚","Lire","lire"], ["🚲","Faire du vélo","faire du vélo"],
      ["🎵","Écouter de la musique","écouter de la musique"]
    ]
  },
  {
    id: "places", icon: "🏠", name: "Lieux",
    items: [
      ["🏠","Maison","à la maison"], ["🏫","École","à l'école"], ["🛝","Parc","au parc"],
      ["🏥","Médecin","chez le médecin"], ["🛒","Magasin","au magasin"]
    ]
  },
  {
    id: "food", icon: "🍎", name: "Nourriture et boissons",
    items: [
      ["💧","Eau","de l'eau"], ["🥛","Lait","du lait"], ["🍎","Pomme","une pomme"],
      ["🍌","Banane","une banane"], ["🍞","Pain","du pain"], ["🍝","Pâtes","des pâtes"],
      ["🍪","Biscuit","un biscuit"]
    ]
  },
  {
    id: "questions", icon: "❓", name: "Questions",
    items: [
      ["❓","Quoi ?","quoi"], ["📍","Où ?","où"], ["👤","Qui ?","qui"],
      ["⏰","Quand ?","quand"], ["💭","Pourquoi ?","pourquoi"]
    ]
  }
];

const quickPhrases = [
  ["🙏","J’ai besoin d’aide","J'ai besoin d'aide"],
  ["🙅","Je ne veux pas","Je ne veux pas"],
  ["➕","Encore","Encore"],
  ["✅","C’est fini","C'est fini"],
  ["🤕","J’ai mal","J'ai mal"],
  ["🚽","Je veux aller aux toilettes","Je veux aller aux toilettes"]
];

let currentCategory = categories[0];
let sentence = [];

const els = {
  categoryNav: document.getElementById("categoryNav"),
  mobileCategoryNav: document.getElementById("mobileCategoryNav"),
  categoryTitle: document.getElementById("categoryTitle"),
  grid: document.getElementById("pictogramGrid"),
  strip: document.getElementById("sentenceStrip"),
  speak: document.getElementById("speakBtn"),
  clear: document.getElementById("clearBtn"),
  mobileSpeak: document.getElementById("mobileSpeakBtn"),
  mobileClear: document.getElementById("mobileClearBtn"),
  search: document.getElementById("searchInput"),
  quick: document.getElementById("quickPhrases"),
  drawer: document.getElementById("mobileDrawer")
};

function renderNav(target) {
  target.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn" + (cat.id === currentCategory.id ? " active" : "");
    btn.innerHTML = `<span>${cat.icon}</span><span>${cat.name}</span>`;
    btn.onclick = () => {
      currentCategory = cat;
      els.search.value = "";
      renderAll();
      closeDrawer();
    };
    target.appendChild(btn);
  });
}

function renderQuickPhrases() {
  els.quick.innerHTML = "";
  quickPhrases.forEach(([icon,label,text]) => {
    const btn = document.createElement("button");
    btn.className = "quick-btn";
    btn.textContent = `${icon} ${label}`;
    btn.onclick = () => speakText(text);
    els.quick.appendChild(btn);
  });
}

function renderGrid() {
  const query = els.search.value.trim().toLowerCase();
  const filtered = currentCategory.items.filter(item => item[1].toLowerCase().includes(query));
  els.grid.innerHTML = "";
  filtered.forEach(([emoji,label,speech]) => {
    const btn = document.createElement("button");
    btn.className = "picto";
    btn.innerHTML = `<span class="emoji">${emoji}</span><span class="label">${label}</span>`;
    btn.onclick = () => addToSentence({emoji,label,speech});
    els.grid.appendChild(btn);
  });
}

function addToSentence(token) {
  sentence.push(token);
  renderSentence();
}

function renderSentence() {
  els.strip.innerHTML = "";
  if (sentence.length === 0) {
    els.strip.innerHTML = `<div class="empty-message">Touchez un pictogramme pour construire une phrase</div>`;
    return;
  }
  sentence.forEach((token, index) => {
    const btn = document.createElement("button");
    btn.className = "sentence-token";
    btn.title = "Touchez pour retirer ce mot";
    btn.innerHTML = `<span class="emoji">${token.emoji}</span><span class="label">${token.label}</span>`;
    btn.onclick = () => {
      sentence.splice(index, 1);
      renderSentence();
    };
    els.strip.appendChild(btn);
  });
  els.strip.scrollLeft = els.strip.scrollWidth;
}

function sentenceText() {
  return sentence.map(x => x.speech).join(" ").replace(/\s+/g," ").trim();
}

function speakText(text) {
  if (!text) return;
  if (!("speechSynthesis" in window)) {
    alert("La synthèse vocale n'est pas disponible sur cet appareil.");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
  utter.rate = 0.9;
  const voices = speechSynthesis.getVoices();
  const frVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("fr"));
  if (frVoice) utter.voice = frVoice;
  window.speechSynthesis.speak(utter);
}

function speakSentence() {
  const text = sentenceText();
  if (!text) return;
  speakText(text);
}

function clearSentence() {
  sentence = [];
  renderSentence();
}

function renderAll() {
  els.categoryTitle.textContent = currentCategory.name;
  renderNav(els.categoryNav);
  renderNav(els.mobileCategoryNav);
  renderGrid();
  renderSentence();
}

function openDrawer() {
  els.drawer.classList.add("open");
  els.drawer.setAttribute("aria-hidden","false");
}
function closeDrawer() {
  els.drawer.classList.remove("open");
  els.drawer.setAttribute("aria-hidden","true");
}

els.speak.onclick = speakSentence;
els.mobileSpeak.onclick = speakSentence;
els.clear.onclick = clearSentence;
els.mobileClear.onclick = clearSentence;
els.search.addEventListener("input", renderGrid);
document.getElementById("mobileCategoriesBtn").onclick = openDrawer;
document.getElementById("closeDrawerBtn").onclick = closeDrawer;
els.drawer.addEventListener("click", e => { if (e.target === els.drawer) closeDrawer(); });

renderQuickPhrases();
renderAll();


if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
