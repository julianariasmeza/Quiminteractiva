'use strict';
const compuestos=[
{f:'FeCl3',stock:'Cloruro de hierro(III)',sist:'Tricloruro de hierro',trad:'Cloruro férrico',tipo:'Sal binaria',pasos:'El Cl presenta −1. Tres cloros suman −3; por neutralidad, Fe presenta +3.'},
{f:'FeCl2',stock:'Cloruro de hierro(II)',sist:'Dicloruro de hierro',trad:'Cloruro ferroso',tipo:'Sal binaria',pasos:'Dos cloros con −1 suman −2; el hierro presenta +2.'},
{f:'Fe2O3',stock:'Óxido de hierro(III)',sist:'Trióxido de dihierro',trad:'Óxido férrico',tipo:'Óxido metálico',pasos:'Tres oxígenos con −2 suman −6. Dos hierros suman +6; cada Fe presenta +3.'},
{f:'FeO',stock:'Óxido de hierro(II)',sist:'Monóxido de hierro',trad:'Óxido ferroso',tipo:'Óxido metálico',pasos:'El oxígeno presenta −2; el hierro debe presentar +2.'},
{f:'Cu2O',stock:'Óxido de cobre(I)',sist:'Monóxido de dicobre',trad:'Óxido cuproso',tipo:'Óxido metálico',pasos:'El oxígeno presenta −2; los dos cobres aportan +2, así que cada Cu presenta +1.'},
{f:'CuO',stock:'Óxido de cobre(II)',sist:'Monóxido de cobre',trad:'Óxido cúprico',tipo:'Óxido metálico',pasos:'El oxígeno presenta −2 y el cobre +2.'},
{f:'Ca(OH)2',stock:'Hidróxido de calcio',sist:'Dihidróxido de calcio',trad:'Hidróxido cálcico',tipo:'Hidróxido',pasos:'Cada grupo OH tiene carga −1. Dos grupos OH compensan Ca²⁺.'},
{f:'NaOH',stock:'Hidróxido de sodio',sist:'Monohidróxido de sodio',trad:'Hidróxido sódico',tipo:'Hidróxido',pasos:'El ion Na⁺ se combina con un ion OH⁻.'},
{f:'NaCl',stock:'Cloruro de sodio',sist:'Monocloruro de sodio',trad:'Cloruro sódico',tipo:'Sal binaria',pasos:'Na presenta +1 y Cl −1; la proporción es 1:1.'},
{f:'MgH2',stock:'Hidruro de magnesio',sist:'Dihidruro de magnesio',trad:'Hidruro magnésico',tipo:'Hidruro metálico',pasos:'En este hidruro, H presenta −1; dos hidrógenos compensan Mg²⁺.'},
{f:'CO2',stock:'Óxido de carbono(IV)',sist:'Dióxido de carbono',trad:'Anhídrido carbónico',tipo:'Óxido no metálico',pasos:'Dos oxígenos con −2 suman −4; el carbono presenta +4.'},
{f:'SO3',stock:'Óxido de azufre(VI)',sist:'Trióxido de azufre',trad:'Anhídrido sulfúrico',tipo:'Óxido no metálico',pasos:'Tres oxígenos con −2 suman −6; el azufre presenta +6.'},
{f:'HCl',stock:'Cloruro de hidrógeno',sist:'Monocloruro de hidrógeno',trad:'Ácido clorhídrico (en disolución acuosa)',tipo:'Haluro de hidrógeno / hidrácido acuoso',pasos:'H presenta +1 y Cl −1. Se denomina ácido clorhídrico cuando está disuelto en agua.'},
{f:'H2SO4',stock:'Ácido sulfúrico',sist:'Tetraoxosulfato(VI) de dihidrógeno',trad:'Ácido sulfúrico',tipo:'Oxoácido',pasos:'2(+1) + S + 4(−2) = 0; el azufre presenta +6.'},
{f:'HNO3',stock:'Ácido nítrico',sist:'Trioxonitrato(V) de hidrógeno',trad:'Ácido nítrico',tipo:'Oxoácido',pasos:'(+1) + N + 3(−2) = 0; el nitrógeno presenta +5.'},
{f:'CaCO3',stock:'Carbonato de calcio',sist:'Trioxocarbonato(IV) de calcio',trad:'Carbonato cálcico',tipo:'Oxisal',pasos:'El ion carbonato CO₃²⁻ se combina con Ca²⁺.'}
];
const normF=s=>s.replace(/\s+/g,'').replace(/[₀₁₂₃₄₅₆₇₈₉]/g,c=>'₀₁₂₃₄₅₆₇₈₉'.indexOf(c)).toLowerCase();
const normN=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').replace(/\s*\(\s*/g,'(').replace(/\s*\)\s*/g,')').trim();
const html=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sub=s=>html(s).replace(/([0-9]+)/g,'<sub>$1</sub>');
function buscarFormula(){let entrada=document.querySelector('#formula').value;let especial=window.analizarOxisalNeutra?.(entrada) || window.analizarHidroxido?.(entrada) || window.analizarHidruroMetalico?.(entrada) || window.analizarHidruroNoMetalico?.(entrada) || window.analizarSalBasica?.(entrada) || window.analizarHidracido?.(entrada) || window.analizarOxoacido?.(entrada) || window.analizarOxidoEspecial?.(entrada) || window.analizarOxidoMetalico?.(entrada) || window.analizarOxidoNoMetalico?.(entrada) || window.analizarOxidoMetalicoAmpliado?.(entrada) || window.reconocerCompuestoIonico?.(entrada) || window.analizarFormulaTradicional?.(entrada) || window.analizarEstequiometrica?.(entrada);let c=especial?{f:especial.tipo==='Hidrácido'?especial.formula+'(ac)':especial.formula,stock:especial.stock,sist:especial.sistematica || 'No incorporada para este compuesto',trad:especial.tradicional || especial.stock,tipo:especial.tipo,pasos:especial.pasos}:compuestos.find(x=>normF(x.f)===normF(entrada));if(!c){let r=window.analizarOxidoEspecial?.(entrada) || window.analizarOxidoMetalico?.(entrada) || window.analizarOxidoNoMetalico?.(entrada);if(r)c={f:r.formula,stock:r.stock,sist:r.sistematica,trad:r.tradicional,tipo:r.tipo,pasos:r.pasos};}const tradicionalAdicional=window.analizarFormulaTradicional?.(entrada);if(c&&tradicionalAdicional){c.trad=tradicionalAdicional.tradicional;}document.querySelector('#resultado').innerHTML=c?`<div class="result"><div class="formula">${sub(c.f)}</div><b>Stock / nombre habitual:</b> ${html(c.stock)}<br><b>Sistemática:</b> ${html(c.sist)}<br><b>Tradicional:</b> ${html(c.trad)}<br><b>Familia:</b> ${html(c.tipo)}<hr><b>Procedimiento:</b> ${html(c.pasos)}</div>`:'<div class="result error">No se encontró esta fórmula en la colección inicial. Revisá su escritura; ampliaremos la base de compuestos.</div>'}

function buscarNombre(){
  const entrada=document.querySelector('#nombre').value;
  const n=normN(entrada);

  const generado=window.formularOxisalNeutra?.(entrada) || window.formularHidroxido?.(entrada) || window.formularHidruroMetalico?.(entrada) || window.formularHidruroNoMetalico?.(entrada) || window.formularSalBasica?.(entrada) || window.formularHidracido?.(entrada) || window.formularOxoacido?.(entrada) || window.formularNombreTradicional?.(entrada) || window.formularEstequiometrica?.(entrada) || window.convertirNombreAFormula?.(entrada);

  const original=compuestos.find(
    x=>[x.stock,x.sist,x.trad].some(
      y=>normN(y)===n
    )
  );

  const c=generado
    ? {
        f:generado.tipo==='Hidrácido'?generado.formula+'(ac)':generado.formula,
        stock:generado.stock,
        tipo:generado.tipo,
        pasos:generado.pasos
      }
    : original;

  document.querySelector('#resultado-formula').innerHTML=c
    ? `<div class="result">
         <div class="formula">${sub(c.f)}</div>
         <b>Compuesto:</b> ${html(c.stock)}
         <br><b>Familia:</b> ${html(c.tipo||'No especificada')}
         <hr>
         <b>Procedimiento:</b> ${html(c.pasos)}
       </div>`
    : `<div class="result error">
         Nombre no reconocido.
         Revisá la escritura y el número de oxidación.
       </div>`;
}

document.querySelector('#analizar').onclick=buscarFormula;document.querySelector('#formular').onclick=buscarNombre;document.querySelector('#formula').addEventListener('keydown',e=>{if(e.key==='Enter')buscarFormula()});document.querySelector('#nombre').addEventListener('keydown',e=>{if(e.key==='Enter')buscarNombre()});
document.addEventListener("click", function(e) {
  const b = e.target.closest("[data-tab]");
  if (!b) return;
  const panel = document.getElementById(b.dataset.tab);
  if (!panel) return;
  document.querySelectorAll("[data-tab]").forEach(x =>
    x.classList.toggle("active", x === b));
  document.querySelectorAll(".panel").forEach(x =>
    x.classList.toggle("active", x === panel));
});
const symbols='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const names='Hidrógeno|Helio|Litio|Berilio|Boro|Carbono|Nitrógeno|Oxígeno|Flúor|Neón|Sodio|Magnesio|Aluminio|Silicio|Fósforo|Azufre|Cloro|Argón|Potasio|Calcio|Escandio|Titanio|Vanadio|Cromo|Manganeso|Hierro|Cobalto|Níquel|Cobre|Zinc|Galio|Germanio|Arsénico|Selenio|Bromo|Kriptón|Rubidio|Estroncio|Itrio|Circonio|Niobio|Molibdeno|Tecnecio|Rutenio|Rodio|Paladio|Plata|Cadmio|Indio|Estaño|Antimonio|Telurio|Yodo|Xenón|Cesio|Bario|Lantano|Cerio|Praseodimio|Neodimio|Prometio|Samario|Europio|Gadolinio|Terbio|Disprosio|Holmio|Erbio|Tulio|Iterbio|Lutecio|Hafnio|Tantalio|Wolframio|Renio|Osmio|Iridio|Platino|Oro|Mercurio|Talio|Plomo|Bismuto|Polonio|Astato|Radón|Francio|Radio|Actinio|Torio|Protactinio|Uranio|Neptunio|Plutonio|Americio|Curio|Berkelio|Californio|Einstenio|Fermio|Mendelevio|Nobelio|Lawrencio|Rutherfordio|Dubnio|Seaborgio|Bohrio|Hassio|Meitnerio|Darmstadtio|Roentgenio|Copernicio|Nihonio|Flerovio|Moscovio|Livermorio|Teneso|Oganesón'.split('|');
const periods=[[1,18],[1,2,13,14,15,16,17,18],[1,2,13,14,15,16,17,18],Array.from({length:18},(_,i)=>i+1),Array.from({length:18},(_,i)=>i+1),[1,2,3,...Array.from({length:15},(_,i)=>i+4)],[1,2,3,...Array.from({length:15},(_,i)=>i+4)]];
const ox={H:'+1, −1',Li:'+1',Be:'+2',B:'+3',C:'−4, +2, +4',N:'−3, +3, +5',O:'−2, −1',F:'−1',Na:'+1',Mg:'+2',Al:'+3',Si:'−4, +4',P:'−3, +3, +5',S:'−2, +4, +6',Cl:'−1, +1, +3, +5, +7',K:'+1',Ca:'+2',Fe:'+2, +3',Cu:'+1, +2',Zn:'+2',Ag:'+1',Au:'+1, +3',Br:'−1, +1, +3, +5',I:'−1, +1, +5, +7',Sn:'+2, +4',Pb:'+2, +4',Cr:'+2, +3, +6',Mn:'+2, +4, +7'};
const noble=new Set(['He','Ne','Ar','Kr','Xe','Rn','Og']);const nonmetal=new Set(['H','C','N','O','F','P','S','Cl','Se','Br','I','At','Ts']);
const table=document.querySelector('#periodica');
function tile(n,row,col){let s=symbols[n-1],el=document.createElement('button');el.className='element '+(noble.has(s)?'noble':nonmetal.has(s)?'nonmetal':'metal');el.style.gridRow=row;el.style.gridColumn=col;el.innerHTML=`<small>${n}</small><strong>${s}</strong><small>${names[n-1]}</small>`;el.title=names[n-1];el.onclick=()=>{document.querySelectorAll('.element').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');document.querySelector('#elemento-info').innerHTML=`<b>${html(names[n-1])} (${s})</b><br>Número atómico: ${n}<br>Estados de oxidación comunes: ${ox[s]||'No incorporados todavía en la ficha didáctica.'}`};table.append(el)}
// Explicit long-form grid: rows 1–7, then lanthanoids and actinoids.
const layout = [];

const periodos = [
  [1, 2],
  [3, 10],
  [11, 18],
  [19, 36],
  [37, 54],
  [55, 86],
  [87, 118]
];

for (let r = 1; r <= 7; r++) {
  const [inicio, fin] = periodos[r - 1];

  for (let n = inicio; n <= fin; n++) {
    if ((n >= 57 && n <= 70) ||
        (n >= 89 && n <= 102)) continue;

    let col;

    if (r === 1) {
      col = n === 1 ? 1 : 18;
    } else if (r <= 3) {
      const k = n - inicio;
      col = k < 2 ? k + 1 : k + 11;
    } else if (r <= 5) {
      col = n - inicio + 1;
    } else {
      const k = n - inicio;
      col = k < 2 ? k + 1 : k - 13;
    }

    layout.push({n, r, col});
  }
}
layout.forEach(x=>tile(x.n,x.r,x.col));for(let n=57;n<=70;n++)tile(n,9,n-53);for(let n=89;n<=102;n++)tile(n,10,n-85);

const practicaExtra = [["Li2O", "Óxido de litio", "Dos litios con +1 compensan al oxígeno con -2."], ["Na2O", "Óxido de sodio", "Dos sodios con +1 compensan al oxígeno con -2."], ["K2O", "Óxido de potasio", "Dos potasios con +1 compensan al oxígeno con -2."], ["MgO", "Óxido de magnesio", "El magnesio presenta +2 y el oxígeno -2."], ["CaO", "Óxido de calcio", "El calcio presenta +2 y el oxígeno -2."], ["BaO", "Óxido de bario", "El bario presenta +2 y el oxígeno -2."], ["Al2O3", "Óxido de aluminio", "Dos aluminios con +3 compensan tres oxígenos con -2."], ["ZnO", "Óxido de zinc", "El zinc presenta +2 y el oxígeno -2."], ["SnO", "Óxido de estaño(II)", "El estaño presenta +2 y el oxígeno -2."], ["SnO2", "Óxido de estaño(IV)", "El estaño presenta +4 y dos oxígenos suman -4."], ["CO", "Óxido de carbono(II)", "El carbono presenta +2 y el oxígeno -2."], ["SO2", "Óxido de azufre(IV)", "El azufre presenta +4 y dos oxígenos suman -4."], ["NO", "Óxido de nitrógeno(II)", "El nitrógeno presenta +2 y el oxígeno -2."], ["NO2", "Óxido de nitrógeno(IV)", "El nitrógeno presenta +4 y dos oxígenos suman -4."], ["N2O3", "Óxido de nitrógeno(III)", "Dos nitrógenos suman +6 y tres oxígenos -6."], ["N2O5", "Óxido de nitrógeno(V)", "Dos nitrógenos suman +10 y cinco oxígenos -10."], ["P2O3", "Óxido de fósforo(III)", "Dos fósforos suman +6 y tres oxígenos -6."], ["P2O5", "Óxido de fósforo(V)", "Dos fósforos suman +10 y cinco oxígenos -10."], ["Cl2O", "Óxido de cloro(I)", "Dos cloros suman +2 y un oxígeno presenta -2."], ["Cl2O7", "Óxido de cloro(VII)", "Dos cloros suman +14 y siete oxígenos -14."], ["LiH", "Hidruro de litio", "El litio presenta +1 y el hidrógeno -1."], ["NaH", "Hidruro de sodio", "El sodio presenta +1 y el hidrógeno -1."], ["KH", "Hidruro de potasio", "El potasio presenta +1 y el hidrógeno -1."], ["CaH2", "Hidruro de calcio", "El calcio presenta +2 y dos hidrógenos suman -2."], ["BaH2", "Hidruro de bario", "El bario presenta +2 y dos hidrógenos suman -2."], ["AlH3", "Hidruro de aluminio", "El aluminio presenta +3 y tres hidrógenos suman -3."], ["LiOH", "Hidróxido de litio", "El litio +1 se combina con el ion hidróxido -1."], ["KOH", "Hidróxido de potasio", "El potasio +1 se combina con el ion hidróxido -1."], ["Mg(OH)2", "Hidróxido de magnesio", "El magnesio +2 necesita dos iones hidróxido."], ["Al(OH)3", "Hidróxido de aluminio", "El aluminio +3 necesita tres iones hidróxido."], ["Fe(OH)2", "Hidróxido de hierro(II)", "El hierro +2 se combina con dos iones hidróxido."], ["Fe(OH)3", "Hidróxido de hierro(III)", "El hierro +3 se combina con tres iones hidróxido."], ["CuOH", "Hidróxido de cobre(I)", "El cobre +1 se combina con un ion hidróxido."], ["Cu(OH)2", "Hidróxido de cobre(II)", "El cobre +2 necesita dos iones hidróxido."], ["Ba(OH)2", "Hidróxido de bario", "El bario +2 necesita dos iones hidróxido."], ["HBr", "Bromuro de hidrógeno", "El hidrógeno presenta +1 y el bromo -1."], ["HI", "Yoduro de hidrógeno", "El hidrógeno presenta +1 y el yodo -1."], ["HF", "Fluoruro de hidrógeno", "El hidrógeno presenta +1 y el flúor -1."], ["H2S", "Sulfuro de hidrógeno", "Dos hidrógenos suman +2 y el azufre -2."], ["H2CO3", "Ácido carbónico", "El carbono presenta +4 en este oxoácido."], ["H3PO4", "Ácido fosfórico", "El fósforo presenta +5 en este oxoácido."], ["HNO2", "Ácido nitroso", "El nitrógeno presenta +3 en este oxoácido."], ["H2SO3", "Ácido sulfuroso", "El azufre presenta +4 en este oxoácido."], ["HClO4", "Ácido perclórico", "El cloro presenta +7 en este oxoácido."], ["KCl", "Cloruro de potasio", "El potasio +1 y el cloro -1 forman una sal neutra."], ["CaCl2", "Cloruro de calcio", "El calcio +2 necesita dos cloruros -1."], ["MgCl2", "Cloruro de magnesio", "El magnesio +2 necesita dos cloruros -1."], ["Na2SO4", "Sulfato de sodio", "Dos sodios +1 compensan el ion sulfato -2."], ["KNO3", "Nitrato de potasio", "El potasio +1 compensa el ion nitrato -1."], ["Ca3(PO4)2", "Fosfato de calcio", "Tres calcios +2 compensan dos fosfatos -3."]].map(([f, stock, pasos]) => ({
  f, stock, pasos
}));

const bancoPractica = [...compuestos, ...practicaExtra];

let pendientesPractica = [];

function elegirPreguntaPractica() {
  if (!pendientesPractica.length) {
    pendientesPractica = [...bancoPractica];

    for (let i = pendientesPractica.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pendientesPractica[i], pendientesPractica[j]] =
        [pendientesPractica[j], pendientesPractica[i]];
    }
  }

  return pendientesPractica.pop();
}


let score = 0;
let total = 0;
let active = null;
let answered = false;

const selectorPractica = document.querySelector("#sistema-practica");

const formulasEstequiometricas = [
  "CO", "CO2", "SO2", "SO3", "NO", "NO2",
  "N2O", "N2O3", "N2O5", "P2O3", "P2O5",
  "Cl2O", "Cl2O3", "Cl2O5", "Cl2O7",
  "PCl3", "PCl5", "SF6", "BCl3",
  "CS2", "CCl4", "SiCl4", "SCl2", "NF3",
  "IF5", "IF7", "BrF3", "BrF5", "ClF3",
  "ClF5", "SF4", "PF3", "PF5", "BF3"
];

function obtenerBancoPractica() {
  const sistema = selectorPractica.value;

  if (sistema === "estequiometrica") {
    return formulasEstequiometricas
      .map(f => window.analizarEstequiometrica?.(f))
      .filter(Boolean)
      .map(x => ({
        f: x.formula,
        nombre: x.sistematica,
        pasos: x.pasos
      }));
  }

  if (sistema === "tradicional") {
    return bancoPractica
      .map(x => {
        const resultado = window.analizarFormulaTradicional?.(x.f);
        const nombre = resultado?.tradicional || x.trad;

        return {
          f: x.f,
          nombre,
          pasos: x.pasos
        };
      })
      .filter(x =>
        x.nombre &&
        !/consultar|no incorporad|sin nombre/i.test(x.nombre)
      );
  }

  return bancoPractica.map(x => ({
    f: x.f,
    nombre: x.stock,
    pasos: x.pasos
  })).filter(x => x.nombre);
}

let pendientesSistema = [];

function siguientePractica() {
  const sistema = selectorPractica.value;
  const banco = obtenerBancoPractica();

  if (!banco.length) {
    document.querySelector("#pregunta").textContent =
      "No hay ejercicios disponibles para este sistema.";
    document.querySelector("#opciones").innerHTML = "";
    return;
  }

  if (!pendientesSistema.length) {
    pendientesSistema = [...banco].sort(() => Math.random() - 0.5);
  }

  active = pendientesSistema.pop();
  answered = false;

  const nombres = {
    stock: "Stock",
    tradicional: "tradicional",
    estequiometrica: "estequiométrico"
  };

  document.querySelector("#pregunta").innerHTML =
    `<p>¿Cuál es el nombre ${nombres[sistema]} de ` +
    `<span class="formula">${sub(active.f)}</span>?</p>`;

  document.querySelector("#feedback").innerHTML = "";

  const distractores = banco
    .filter(x => x.nombre !== active.nombre)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const opciones = [active, ...distractores]
    .sort(() => Math.random() - 0.5);

  const contenedor = document.querySelector("#opciones");
  contenedor.innerHTML = "";

  opciones.forEach(opcion => {
    const boton = document.createElement("button");
    boton.className = "choice";
    boton.textContent = opcion.nombre;

    boton.onclick = () => {
      if (answered) return;

      answered = true;
      total++;

      if (opcion === active) score++;

      contenedor.querySelectorAll("button").forEach(b => {
        b.disabled = true;

        if (b.textContent === active.nombre) {
          b.classList.add("correct");
        } else if (b === boton) {
          b.classList.add("incorrect");
        }
      });

      document.querySelector("#feedback").innerHTML =
        `<div class="result">` +
        (opcion === active
          ? "¡Correcto!"
          : "Respuesta correcta: " + html(active.nombre)) +
        `<br>${html(active.pasos || "")}</div>`;

      document.querySelector("#puntaje").textContent =
        `Aciertos: ${score} de ${total}`;
    };

    contenedor.append(boton);
  });
}

selectorPractica.addEventListener("change", () => {
  pendientesSistema = [];
  score = 0;
  total = 0;
  document.querySelector("#puntaje").textContent = "Aciertos: 0 de 0";
  siguientePractica();
});

document.querySelector("#siguiente").onclick = siguientePractica;

siguientePractica();
