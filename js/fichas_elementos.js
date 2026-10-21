(function () {
  "use strict";

  const tabla = document.querySelector("#periodica");
  if (!tabla) return;

  const datos = window.DATOS_ELEMENTOS_QUIMINTERACTIVA || {};
  const ejemplos = window.EJEMPLOS_ELEMENTOS_QUIMINTERACTIVA || {};

  const escapar = (valor) =>
    String(valor ?? "No disponible")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const familias = {
    1: "Metales alcalinos",
    2: "Metales alcalinotérreos",
    17: "Halógenos",
    18: "Gases nobles"
  };

  const noMetales = new Set([
    "H", "C", "N", "O", "P", "S", "Se"
  ]);

  const metaloides = new Set([
    "B", "Si", "Ge", "As", "Sb", "Te"
  ]);

  const nombresFamilia = (e) => {
    if (e.simbolo === "H") return "No metal";
    if (e.bloque === "f") {
      return e.periodo === 6
        ? "Lantánidos"
        : "Actínidos";
    }
    if (e.grupo === 1 || e.grupo === 2) {
      return familias[e.grupo];
    }
    if (e.grupo === 17 || e.grupo === 18) {
      return familias[e.grupo];
    }
    if (metaloides.has(e.simbolo)) return "Metaloide";
    if (noMetales.has(e.simbolo)) return "No metal";
    if (e.bloque === "d") return "Metal de transición";
    return "Elemento del bloque " + (e.bloque || "?");
  };

  let ventana = document.querySelector("#ficha-elemento-modal");

  if (!ventana) {
    ventana = document.createElement("dialog");
    ventana.id = "ficha-elemento-modal";
    ventana.className = "ficha-modal";

    ventana.innerHTML = `
      <div class="ficha-modal-contenido">
        <button
          type="button"
          class="ficha-cerrar"
          aria-label="Cerrar ficha"
        >×</button>
        <div id="ficha-modal-datos"></div>
      </div>
    `;

    document.body.appendChild(ventana);
  }

  const contenido = ventana.querySelector("#ficha-modal-datos");
  const cerrar = ventana.querySelector(".ficha-cerrar");

  cerrar.addEventListener("click", () => ventana.close());

  ventana.addEventListener("click", (evento) => {
    if (evento.target === ventana) ventana.close();
  });

  function propiedad(etiqueta, valor) {
    return `
      <div>
        <span>${escapar(etiqueta)}</span>
        <strong>${escapar(valor ?? "No disponible")}</strong>
      </div>
    `;
  }

  function tablaNomenclatura(lista) {
    if (!lista.length) {
      return `
        <p class="muted">
          Todavía no hay ejemplos de nomenclatura
          incorporados para este elemento.
        </p>
      `;
    }

    return `
      <div class="ficha-tabla-scroll">
        <table class="ficha-tabla-nombres">
          <thead>
            <tr>
              <th>Fórmula</th>
              <th>Stock</th>
              <th>Tradicional</th>
              <th>Sistemática</th>
            </tr>
          </thead>
          <tbody>
            ${lista.map((item) => `
              <tr>
                <td><strong>${escapar(item[0])}</strong></td>
                <td>${escapar(item[1] ?? "—")}</td>
                <td>${escapar(item[2] ?? "—")}</td>
                <td>${escapar(item[3] ?? "—")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  let preguntas = [];
  let preguntaActual = 0;
  let aciertos = 0;

  function mezclar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  function prepararPreguntas(simbolo) {
    const lista = ejemplos[simbolo] || [];
    const banco = [];

    for (const compuesto of lista) {
      for (let tipo = 1; tipo <= 3; tipo++) {
        if (!compuesto[tipo]) continue;

        const opciones = lista
          .filter((otro) =>
            otro !== compuesto && otro[tipo]
          )
          .map((otro) => otro[tipo]);

        const alternativas = mezclar([
          compuesto[tipo],
          ...mezclar([...new Set(opciones)]).slice(0, 3)
        ]);

        if (alternativas.length < 2) continue;

        banco.push({
          formula: compuesto[0],
          tipo: ["", "Stock", "Tradicional", "Sistemática"][tipo],
          correcta: compuesto[tipo],
          opciones: alternativas
        });
      }
    }

    return mezclar(banco).slice(0, 8);
  }

  function mostrarPregunta() {
    const zona = contenido.querySelector("#ficha-practica");

    if (preguntaActual >= preguntas.length) {
      zona.innerHTML = `
        <h3>Resultado de la práctica</h3>
        <p>
          Obtuviste <strong>${aciertos}</strong>
          de <strong>${preguntas.length}</strong>
          respuestas correctas.
        </p>
        <button type="button" id="ficha-reiniciar">
          Practicar nuevamente
        </button>
      `;

      zona.querySelector("#ficha-reiniciar")
        .addEventListener("click", () => {
          const simbolo = zona.dataset.simbolo;
          iniciarPractica(simbolo);
        });

      return;
    }

    const pregunta = preguntas[preguntaActual];

    zona.innerHTML = `
      <h3>Práctica de nomenclatura</h3>
      <p>
        Pregunta ${preguntaActual + 1}
        de ${preguntas.length}
      </p>
      <p>
        ¿Cuál es el nombre en nomenclatura
        <strong>${escapar(pregunta.tipo)}</strong>
        de <strong>${escapar(pregunta.formula)}</strong>?
      </p>
      <div class="ficha-opciones">
        ${pregunta.opciones.map((opcion, indice) => `
          <button
            type="button"
            class="ficha-opcion"
            data-indice="${indice}"
          >${escapar(opcion)}</button>
        `).join("")}
      </div>
      <div id="ficha-retroalimentacion"
           aria-live="polite"></div>
    `;

    zona.querySelectorAll(".ficha-opcion")
      .forEach((boton) => {
        boton.addEventListener("click", () => {
          const indice = Number(boton.dataset.indice);
          const respuesta = pregunta.opciones[indice];
          const correcta = respuesta === pregunta.correcta;

          if (correcta) aciertos++;

          zona.querySelectorAll(".ficha-opcion")
            .forEach((b) => b.disabled = true);

          zona.querySelector("#ficha-retroalimentacion")
            .innerHTML = `
              <p>
                ${correcta
                  ? "✓ Respuesta correcta"
                  : "✗ Respuesta incorrecta"}
              </p>
              <p>
                Respuesta:
                <strong>${escapar(pregunta.correcta)}</strong>
              </p>
              <button type="button" id="ficha-siguiente">
                ${preguntaActual + 1 === preguntas.length
                  ? "Ver resultado"
                  : "Siguiente pregunta"}
              </button>
            `;

          zona.querySelector("#ficha-siguiente")
            .addEventListener("click", () => {
              preguntaActual++;
              mostrarPregunta();
            });
        });
      });
  }

  function iniciarPractica(simbolo) {
    preguntas = prepararPreguntas(simbolo);
    preguntaActual = 0;
    aciertos = 0;

    const zona = contenido.querySelector("#ficha-practica");
    zona.dataset.simbolo = simbolo;

    if (!preguntas.length) {
      zona.innerHTML = `
        <p>
          Todavía no hay suficientes ejemplos diferentes
          para generar esta práctica.
        </p>
      `;
      return;
    }

    mostrarPregunta();
  }

  function abrirFicha(simbolo) {
    const e = datos[simbolo];
    if (!e) return;

    const lista = ejemplos[simbolo] || [];

    contenido.innerHTML = `
      <div class="ficha-encabezado">
        <div class="ficha-simbolo">
          ${escapar(e.simbolo)}
        </div>
        <div>
          <h2>${escapar(e.nombre)}</h2>
          <p>Número atómico ${escapar(e.numero)}</p>
          <p>${escapar(nombresFamilia(e))}</p>
        </div>
      </div>

      <h3>Propiedades del elemento</h3>

      <div class="ficha-propiedades">
        ${propiedad("Número atómico", e.numero)}
        ${propiedad("Símbolo", e.simbolo)}
        ${propiedad("Masa de referencia (u)", e.masa)}
        ${propiedad("Tipo de masa", e.masaTipo)}
        ${propiedad("Grupo", e.grupo)}
        ${propiedad("Período", e.periodo)}
        ${propiedad("Bloque", e.bloque)}
        ${propiedad("Familia", nombresFamilia(e))}
        ${propiedad("Configuración electrónica", e.config)}
        ${propiedad("Estados de oxidación", e.oxid)}
        ${propiedad("Estado físico a 25 °C", e.estado)}
      </div>

      <h3>Nomenclatura comparada</h3>
      ${tablaNomenclatura(lista)}

      <div class="ficha-practica-contenedor">
        <h3>Actividades interactivas</h3>
        <button type="button" id="ficha-iniciar">
          Practicar nomenclatura
        </button>
        <div id="ficha-practica"></div>
      </div>
    `;

    contenido.querySelector("#ficha-iniciar")
      .addEventListener("click", () => iniciarPractica(simbolo));

    if (!ventana.open) ventana.showModal();
  }

  tabla.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".element");
    if (!boton || !tabla.contains(boton)) return;

    const simbolo = boton.querySelector("strong")?.textContent?.trim();

    if (simbolo) abrirFicha(simbolo);
  });

  console.log(
    "Quiminteractiva: fichas ampliadas de elementos activadas."
  );
})();
