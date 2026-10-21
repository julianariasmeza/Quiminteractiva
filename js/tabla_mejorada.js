(function () {
  "use strict";

  const tabla = document.querySelector("#periodica");
  const info = document.querySelector("#elemento-info");

  if (!tabla || !info) return;

  const elementos = [...tabla.querySelectorAll(".element")];

  if (elementos.length !== 118) {
    console.warn(
      "Tabla mejorada: se esperaban 118 elementos.",
      elementos.length
    );
    return;
  }

  const alcalinos = new Set(["Li","Na","K","Rb","Cs","Fr"]);
  const alcalinoterreos = new Set(["Be","Mg","Ca","Sr","Ba","Ra"]);
  const halogenos = new Set(["F","Cl","Br","I","At","Ts"]);
  const nobles = new Set(["He","Ne","Ar","Kr","Xe","Rn","Og"]);
  const metaloides = new Set(["B","Si","Ge","As","Sb","Te"]);
  const noMetales = new Set(["H","C","N","O","P","S","Se"]);
  const lantanidos = new Set([
    "La","Ce","Pr","Nd","Pm","Sm","Eu",
    "Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu"
  ]);
  const actinidos = new Set([
    "Ac","Th","Pa","U","Np","Pu","Am",
    "Cm","Bk","Cf","Es","Fm","Md","No","Lr"
  ]);
  const postransicion = new Set([
    "Al","Ga","In","Sn","Tl","Pb","Bi",
    "Po","Nh","Fl","Mc","Lv"
  ]);

  const familias = [
    ["alcalino", "Metales alcalinos"],
    ["alcalinoterreo", "Alcalinotérreos"],
    ["transicion", "Metales de transición"],
    ["postransicion", "Otros metales"],
    ["metaloide", "Metaloides"],
    ["nometal", "No metales"],
    ["halogeno", "Halógenos"],
    ["noble", "Gases nobles"],
    ["lantanido", "Lantánidos"],
    ["actinido", "Actínidos"]
  ];

  function familia(simbolo, numero) {
    if (alcalinos.has(simbolo)) return "alcalino";
    if (alcalinoterreos.has(simbolo)) return "alcalinoterreo";
    if (halogenos.has(simbolo)) return "halogeno";
    if (nobles.has(simbolo)) return "noble";
    if (metaloides.has(simbolo)) return "metaloide";
    if (noMetales.has(simbolo)) return "nometal";
    if (lantanidos.has(simbolo)) return "lantanido";
    if (actinidos.has(simbolo)) return "actinido";
    if (postransicion.has(simbolo)) return "postransicion";
    return "transicion";
  }

  function periodo(numero) {
    if (numero <= 2) return 1;
    if (numero <= 10) return 2;
    if (numero <= 18) return 3;
    if (numero <= 36) return 4;
    if (numero <= 54) return 5;
    if (numero <= 86) return 6;
    return 7;
  }

  function grupo(simbolo, boton) {
    if (lantanidos.has(simbolo) || actinidos.has(simbolo)) {
      return "Serie del bloque f";
    }

    return boton.style.gridColumn || "No disponible";
  }

  function limpiar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  const controles = document.createElement("div");
  controles.className = "tabla-controles";

  controles.innerHTML = `
    <label for="buscar-elemento">
      Buscar elemento
    </label>
    <input
      id="buscar-elemento"
      type="search"
      placeholder="Ej. hierro, Fe o 26"
      autocomplete="off"
    >
    <div class="tabla-leyenda"></div>
  `;

  tabla.parentNode.insertBefore(controles, tabla);

  const leyenda = controles.querySelector(".tabla-leyenda");

  familias.forEach(([clase, nombre]) => {
    const item = document.createElement("span");
    item.className = "leyenda-item";
    item.innerHTML =
      `<i class="muestra ${clase}"></i>${nombre}`;
    leyenda.appendChild(item);
  });

  const datos = elementos.map(boton => {
    const numero = Number(
      boton.querySelector("small")?.textContent
    );

    const simbolo =
      boton.querySelector("strong")?.textContent?.trim();

    const nombre =
      boton.querySelectorAll("small")[1]?.textContent?.trim();

    const clase = familia(simbolo, numero);

    boton.classList.remove("metal", "nonmetal", "noble");
    boton.classList.add(clase);

    const abrirOriginal = boton.onclick;

    boton.onclick = () => {
      abrirOriginal?.();

      const anterior = info.innerHTML;

      const nombreFamilia =
        familias.find(x => x[0] === clase)?.[1] ||
        "No clasificado";

      const estados =
        anterior.match(/Estados de oxidación comunes:[\s\S]*/)?.[0] ||
        "Estados de oxidación: consultar fuentes especializadas.";

      info.innerHTML = `
        <div class="ficha-elemento">
          <div class="ficha-simbolo">${simbolo}</div>
          <div>
            <h3>${nombre}</h3>
            <p><b>Número atómico:</b> ${numero}</p>
            <p><b>Período:</b> ${periodo(numero)}</p>
            <p><b>Grupo:</b> ${grupo(simbolo, boton)}</p>
            <p><b>Familia:</b> ${nombreFamilia}</p>
            <p>${estados}</p>
          </div>
        </div>
      `;
    };

    return { numero, simbolo, nombre, boton };
  });

  const buscador = document.querySelector("#buscar-elemento");

  buscador.addEventListener("input", () => {
    const consulta = limpiar(buscador.value);

    datos.forEach(item => {
      const coincide =
        !consulta ||
        limpiar(item.nombre).includes(consulta) ||
        limpiar(item.simbolo) === consulta ||
        String(item.numero) === consulta;

      item.boton.classList.toggle(
        "elemento-atenuado",
        !coincide
      );
    });
  });

  console.log("Tabla periódica mejorada: 118 elementos.");
})();
