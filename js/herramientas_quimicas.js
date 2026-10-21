(() => {
  "use strict";

  const elementos = window.DATOS_ELEMENTOS_QUIMINTERACTIVA || {};

  const iones = [
    ["Na", "Sodio", 1, false],
    ["K", "Potasio", 1, false],
    ["Ca", "Calcio", 2, false],
    ["Mg", "Magnesio", 2, false],
    ["Al", "Aluminio", 3, false],
    ["Fe", "Hierro(II)", 2, false],
    ["Fe", "Hierro(III)", 3, false],
    ["Cu", "Cobre(I)", 1, false],
    ["Cu", "Cobre(II)", 2, false],
    ["NH4", "Amonio", 1, true]
  ];

  const aniones = [
    ["Cl", "Cloruro", -1, false],
    ["Br", "Bromuro", -1, false],
    ["O", "Óxido", -2, false],
    ["S", "Sulfuro", -2, false],
    ["OH", "Hidróxido", -1, true],
    ["NO3", "Nitrato", -1, true],
    ["SO4", "Sulfato", -2, true],
    ["CO3", "Carbonato", -2, true],
    ["PO4", "Fosfato", -3, true]
  ];

  const mcd = (a, b) => b ? mcd(b, a % b) : a;

  function formato(formula) {
    return formula.replace(/(\d+)/g, "<sub>$1</sub>");
  }

  function opciones(lista) {
    return lista.map((ion, i) =>
      `<option value="${i}">${ion[1]}</option>`
    ).join("");
  }

  function formulaIon(ion, cantidad) {
    if (cantidad === 1) return ion[0];
    return (ion[3] ? `(${ion[0]})` : ion[0]) + cantidad;
  }

  function formular(cat, an) {
    const positivo = cat[2];
    const negativo = Math.abs(an[2]);
    const divisor = mcd(positivo, negativo);
    const nc = negativo / divisor;
    const na = positivo / divisor;

    return {
      formula: formulaIon(cat, nc) + formulaIon(an, na),
      nc, na, positivo, negativo
    };
  }

  function masaElemento(simbolo) {
    const registro = elementos[simbolo];
    if (!registro) throw Error("Elemento desconocido: " + simbolo);

    const masa = Number(
      String(registro.masa).replace(",", ".")
    );

    if (!Number.isFinite(masa) || masa <= 0) {
      throw Error("Masa no disponible para " + simbolo);
    }

    return masa;
  }

  function analizarFormula(texto) {
    const formula = texto.replace(/\s/g, "");
    if (!formula || formula.length > 120) {
      throw Error("Ingresá una fórmula válida.");
    }

    const tokens = formula.match(
      /[A-Z][a-z]?|\d+|[()]|./g
    ) || [];

    let posicion = 0;

    function grupo(interior = false) {
      const cuenta = {};

      while (posicion < tokens.length) {
        const token = tokens[posicion++];

        if (token === ")") {
          if (!interior) throw Error("Paréntesis inesperado.");
          return cuenta;
        }

        if (token === "(") {
          const subgrupo = grupo(true);
          const numero = leerNumero();

          for (const [s, n] of Object.entries(subgrupo)) {
            cuenta[s] = (cuenta[s] || 0) + n * numero;
          }
          continue;
        }

        if (!/^[A-Z][a-z]?$/.test(token)) {
          throw Error("Símbolo o carácter no válido: " + token);
        }

        if (!elementos[token]) {
          throw Error("Elemento desconocido: " + token);
        }

        const numero = leerNumero();
        cuenta[token] = (cuenta[token] || 0) + numero;
      }

      if (interior) throw Error("Falta cerrar un paréntesis.");
      return cuenta;
    }

    function leerNumero() {
      if (!/^\d+$/.test(tokens[posicion] || "")) return 1;

      const n = Number(tokens[posicion++]);

      if (!Number.isSafeInteger(n) || n < 1 || n > 100000) {
        throw Error("Subíndice fuera del rango permitido.");
      }
      return n;
    }

    const composicion = grupo();

    if (!Object.keys(composicion).length) {
      throw Error("La fórmula está vacía.");
    }

    return composicion;
  }

  function calcularMasa(formula) {
    const composicion = analizarFormula(formula);
    const pasos = Object.entries(composicion).map(([s, n]) => {
      const masa = masaElemento(s);
      return { simbolo: s, cantidad: n, masa, subtotal: n * masa };
    });

    const total = pasos.reduce((s, p) => s + p.subtotal, 0);
    return { pasos, total };
  }

  function numero(n) {
    return n.toLocaleString("es-CR", {
      maximumFractionDigits: 4
    });
  }

  function iniciar() {
    const navegacion = document.querySelector(".tabs");
    const principal = document.querySelector("main");

    if (!navegacion || !principal) return;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.tab = "herramientas";
    boton.textContent = "Herramientas químicas";
    navegacion.appendChild(boton);

    const seccion = document.createElement("section");
    seccion.id = "herramientas";
    seccion.className = "panel";

    seccion.innerHTML = `
      <div class="card herramientas">
        <h2>Formulación química paso a paso</h2>
        <p class="muted">
          Seleccioná el catión y el anión para formar
          un compuesto eléctricamente neutro.
        </p>
        <div class="herramientas-grid">
          <div>
            <label for="hq-cation">Catión</label>
            <select id="hq-cation">${opciones(iones)}</select>
          </div>
          <div>
            <label for="hq-anion">Anión</label>
            <select id="hq-anion">${opciones(aniones)}</select>
          </div>
        </div>
        <p><button class="btn primary" id="hq-formular">
          Formular compuesto
        </button></p>
        <div id="hq-formula-resultado" class="result"></div>
      </div>

      <div class="card herramientas">
        <h2>Calculadora de masa molar</h2>
        <p class="muted">
          Admite símbolos químicos, subíndices y paréntesis.
          Ejemplos: H2O, Fe2O3, Ca(OH)2.
        </p>
        <label for="hq-masa-formula">Fórmula química</label>
        <input id="hq-masa-formula"
          placeholder="Ej. Ca(OH)2">
        <p><button class="btn primary" id="hq-calcular">
          Calcular masa molar
        </button></p>
        <div id="hq-masa-resultado" class="result"></div>
      </div>

      <div class="card herramientas">
        <h2>Práctica automática de formulación</h2>
        <p class="muted">
          Generá un ejercicio y comprobá tu respuesta.
        </p>
        <div id="hq-ejercicio"></div>
        <label for="hq-respuesta">Tu fórmula</label>
        <input id="hq-respuesta" placeholder="Ej. Fe2O3">
        <p>
          <button class="btn primary" id="hq-verificar">
            Verificar
          </button>
          <button class="btn" id="hq-nuevo">
            Nuevo ejercicio
          </button>
        </p>
        <div id="hq-feedback" aria-live="polite"></div>
        <p id="hq-puntaje" class="muted"></p>
      </div>
    `;

    principal.appendChild(seccion);

    boton.addEventListener("click", () => {
      document.querySelectorAll("[data-tab]").forEach(b =>
        b.classList.toggle("active", b === boton)
      );
      document.querySelectorAll(".panel").forEach(p =>
        p.classList.toggle("active", p === seccion)
      );
    });

    document.querySelector("#hq-formular").onclick = () => {
      const cat = iones[Number(
        document.querySelector("#hq-cation").value
      )];
      const an = aniones[Number(
        document.querySelector("#hq-anion").value
      )];

      const r = formular(cat, an);
      document.querySelector("#hq-formula-resultado").innerHTML = `
        <h3>${formato(r.formula)}</h3>
        <p>Catión: ${cat[1]}, carga +${r.positivo}</p>
        <p>Anión: ${an[1]}, carga −${r.negativo}</p>
        <p>Proporción: ${r.nc} catión(es)
           por ${r.na} anión(es).</p>
        <p>Comprobación:
          ${r.nc}(+${r.positivo}) +
          ${r.na}(−${r.negativo}) = 0
        </p>
        <strong>Fórmula: ${formato(r.formula)}</strong>
      `;
    };

    document.querySelector("#hq-calcular").onclick = () => {
      const formula = document.querySelector(
        "#hq-masa-formula"
      ).value;

      const salida = document.querySelector("#hq-masa-resultado");

      try {
        const r = calcularMasa(formula);

        salida.innerHTML = `
          <h3>${formato(formula)}</h3>
          ${r.pasos.map(p => `
            <p>
              ${p.simbolo}:
              ${p.cantidad} × ${numero(p.masa)}
              = ${numero(p.subtotal)} g/mol
            </p>
          `).join("")}
          <strong>
            Masa molar aproximada:
            ${numero(r.total)} g/mol
          </strong>
        `;
      } catch (error) {
        salida.textContent = error.message;
      }
    };

    let actual = null;
    let correctas = 0;
    let intentos = 0;
    let respondida = false;

    function nuevoEjercicio() {
      const cat = iones[Math.floor(Math.random() * iones.length)];
      const an = aniones[Math.floor(Math.random() * aniones.length)];

      actual = formular(cat, an);
      respondida = false;

      document.querySelector("#hq-ejercicio").textContent =
        `Formulá: ${an[1].toLowerCase()} de ${cat[1].toLowerCase()}.`;

      document.querySelector("#hq-respuesta").value = "";
      document.querySelector("#hq-feedback").textContent = "";
    }

    document.querySelector("#hq-verificar").onclick = () => {
      if (respondida) return;

      const respuesta = document.querySelector("#hq-respuesta")
        .value.replace(/\s/g, "");

      if (!respuesta) return;

      respondida = true;
      intentos++;

      const correcta = respuesta === actual.formula;
      if (correcta) correctas++;

      document.querySelector("#hq-feedback").innerHTML = `
        <p>${correcta ? "✓ Correcto" : "✗ Incorrecto"}</p>
        <p>Fórmula esperada:
          <strong>${formato(actual.formula)}</strong>
        </p>
        <p>Se necesitan ${actual.nc} catión(es)
          y ${actual.na} anión(es) para neutralizar
          las cargas.</p>
      `;

      document.querySelector("#hq-puntaje").textContent =
        `Aciertos: ${correctas} de ${intentos}`;
    };

    document.querySelector("#hq-nuevo").onclick = nuevoEjercicio;

    nuevoEjercicio();
    document.querySelector("#hq-formular").click();

    console.log("Herramientas químicas incorporadas.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
