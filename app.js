
const cats=[
["❤️","Besoins du quotidien",[["🚽","Toilettes","aller aux toilettes"],["🍽️","Manger","manger"],["🥤","Boire","boire"],["🛏️","Dormir","dormir"],["🚿","Se laver","me laver"],["🪥","Brosser les dents","me brosser les dents"],["👕","S’habiller","m'habiller"],["🧼","Laver les mains","me laver les mains"],["🤝","Aide","de l'aide"],["🎧","Calme","du calme"],["🤕","J’ai mal","j'ai mal"],["🥶","J’ai froid","j'ai froid"],["🥵","J’ai chaud","j'ai chaud"]]],
["🙂","Émotions",[["😊","Content","je suis content"],["😢","Triste","je suis triste"],["😡","En colère","je suis en colère"],["😨","Peur","j'ai peur"],["😴","Fatigué","je suis fatigué"],["😌","Calme","je suis calme"]]],
["👨‍👩‍👧","Personnes",[["👩","Maman","maman"],["👨","Papa","papa"],["👧","Sœur","ma sœur"],["👦","Frère","mon frère"],["🧑‍🏫","Enseignant","mon enseignant"],["🧑‍⚕️","Soignant","le soignant"]]],
["🧩","Activités",[["🧩","Jouer","jouer"],["🎨","Dessiner","dessiner"],["📚","Lire","lire"],["🎵","Musique","écouter de la musique"],["🚲","Vélo","faire du vélo"],["📺","Télé","regarder la télé"]]],
["🏠","Lieux",[["🏠","Maison","à la maison"],["🏫","École","à l'école"],["🛝","Parc","au parc"],["🏥","Médecin","chez le médecin"],["🛒","Magasin","au magasin"]]],
["🍎","Nourriture / boissons",[["💧","Eau","de l'eau"],["🥛","Lait","du lait"],["🍎","Pomme","une pomme"],["🍌","Banane","une banane"],["🍞","Pain","du pain"],["🍝","Pâtes","des pâtes"],["🍪","Biscuit","un biscuit"]]],
["❓","Questions",[["❓","Quoi ?","quoi"],["📍","Où ?","où"],["👤","Qui ?","qui"],["⏰","Quand ?","quand"],["💭","Pourquoi ?","pourquoi"]]]
];
const starters=[["👤","Je","je"],["👉","Je veux","je veux"],["🚫","Je ne veux pas","je ne veux pas"],["🙏","J’ai besoin de","j'ai besoin de"],["➕","Encore","encore"],["🛑","C’est fini","c'est fini"]];
let current=0,phrase=[];
const $=id=>document.getElementById(id);
function nav(el){el.innerHTML="";cats.forEach((c,i)=>{let b=document.createElement("button");b.className="cat"+(i===current?" active":"");b.textContent=c[0]+" "+c[1];b.onclick=()=>{current=i;$("search").value="";render();$("drawer").classList.remove("open")};el.appendChild(b)})}
function add(x){phrase.push({icon:x[0],label:x[1],speech:x[2]});renderPhrase()}
function renderPhrase(){let e=$("sentence");e.innerHTML="";if(!phrase.length){e.innerHTML='<span class="hint">Choisis des pictogrammes pour construire ta phrase</span>';return}phrase.forEach((x,i)=>{let b=document.createElement("button");b.className="token";b.innerHTML=`<span class=i>${x.icon}</span><b>${x.label}</b>`;b.onclick=()=>{phrase.splice(i,1);renderPhrase()};e.appendChild(b)});e.scrollLeft=e.scrollWidth}
function grid(){let q=$("search").value.toLowerCase(),e=$("grid");e.innerHTML="";cats[current][2].filter(x=>x[1].toLowerCase().includes(q)).forEach(x=>{let b=document.createElement("button");b.className="pic";b.innerHTML=`<span class=i>${x[0]}</span><b>${x[1]}</b>`;b.onclick=()=>add(x);e.appendChild(b)})}
function speak(){let t=phrase.map(x=>x.speech).join(" ").trim();if(!t)return;if(!("speechSynthesis"in window))return alert("Synthèse vocale indisponible.");speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="fr-FR";u.rate=.88;let v=speechSynthesis.getVoices().find(v=>v.lang?.toLowerCase().startsWith("fr"));if(v)u.voice=v;speechSynthesis.speak(u)}
function render(){nav($("nav"));nav($("nav2"));$("title").textContent=cats[current][1];grid();renderPhrase()}
starters.forEach(x=>{let b=document.createElement("button");b.className="start";b.textContent=x[0]+" "+x[1];b.onclick=()=>add(x);$("starters").appendChild(b)});
$("search").oninput=grid;$("speak").onclick=$("speak2").onclick=speak;$("clear").onclick=$("clear2").onclick=()=>{phrase=[];renderPhrase()};$("undo").onclick=()=>{phrase.pop();renderPhrase()};$("cats").onclick=()=>$("drawer").classList.add("open");$("close").onclick=()=>$("drawer").classList.remove("open");
render();
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
