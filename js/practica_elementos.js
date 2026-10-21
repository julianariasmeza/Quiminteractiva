(function () {
  "use strict";

  const datos = window.DATOS_ELEMENTOS_QUIMINTERACTIVA || {};
  const elementos = Object.values(datos);

  const escapar = (valor) =>
    String(valor ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function mezclar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  function generarPreguntas(elemento) {
    const preguntas = [];

    const crear = (enunciado, correcta, alternativas) => {
      const incorrectas = [
        ...new Set(
          alternativas
            .map(String)
            .filter((valor) => valor !== String(correcta))
        )
      ];

      preguntas.push({
        enunciado,
        correcta: String(correcta),
        opciones: mezclar([
          String(correcta),
          ...mezclar(incorrectas).slice(0, 3)
        ])
      });
    };

    crear(
      `¿Cuál es el símbolo químico del ${elemento.nombre}?`,
      elemento.simbolo,
      elementos.map((e) => e.simbolo)
    );

    crear(
      `¿Cuál es el nombre del elemento ${elemento.simbolo}?`,
      elemento.nombre,
      elementos.map((e) => e.nombre)
    );

    crear(
      `¿Cuál es el número atómico del ${elemento.nombre}?`,
      elemento.numero,
      elementos.map((e) => e.numero)
    );

    crear(
      `¿A qué período pertenece el ${elemento.nombre}?`,
      elemento.periodo,
      [1, 2, 3, 4, 5, 6, 7]
    );

    crear(
      `¿A qué bloque pertenece el ${elemento.nombre}?`,
      elemento.bloque,
      ["s", "p", "d", "f"]
    );

    return mezclar(preguntas);
  }

  let preguntas = [];
  let indice = 0;
  let aciertos = 0;
  let elementoActual = null;

  function mostrarPregunta() {
    const zona = document.querySelector("#practica-elemento-zona");
    if (!zona) return;

    if (indice >= preguntas.length) {
      zona.innerHTML = `
        <h3>Resultado final</h3>
        <p>
          Respuestas correctas:
          <strong>${aciertos} de ${preguntas.length}</strong>
        </p>
        <p>
          Calificación:
          <strong>${Math.round(
            100 * aciertos / preguntas.length
          )}%</strong>
        </p>
        <button type="button" id="repetir-practica-elemento">
          Repetir práctica
        </button>
      `;

      zona.querySelector("#repetir-practica-elemento")
        .addEventListener("click", () => iniciar(elementoActual));

      return;
    }

    const pregunta = preguntas[indice];

    zona.innerHTML = `
      <h3>Pregunta ${indice + 1} de ${preguntas.length}</h3>
      <p>${escapar(pregunta.enunciado)}</p>
      <div class="ficha-opciones">
        ${pregunta.opciones.map((opcion, i) => `
          <button
            type="button"
            class="ficha-opcion"
            data-respuesta="${i}"
          >${escapar(opcion)}</button>
        `).join("")}
      </div>
      <div id="practica-elemento-respuesta"
           aria-live="polite"></div>
    `;

    zona.querySelectorAll("[data-respuesta]")
      .forEach((boton) => {
        boton.addEventListener("click", () => {
          const opcion = pregunta.opciones[
            Number(boton.dataset.respuesta)
          ];

          const correcto = opcion === pregunta.correcta;

          if (correcto) aciertos++;

          zona.querySelectorAll("[data-respuesta]")
            .forEach((b) => b.disabled = true);

          zona.querySelector("#practica-elemento-respuesta")
            .innerHTML = `
              <p>
                ${correcto
                  ? "✓ ¡Correcto!"
                  : "✗ Respuesta incorrecta"}
              </p>
              <p>
                Respuesta correcta:
                <strong>${escapar(pregunta.correcta)}</strong>
              </p>
              <button type="button" id="siguiente-elemento">
                ${indice + 1 === preguntas.length
                  ? "Ver calificación"
                  : "Siguiente"}
              </button>
            `;

          zona.querySelector("#siguiente-elemento")
            .addEventListener("click", () => {
              indice++;
              mostrarPregunta();
            });
        });
      });
  }

  function iniciar(simbolo) {
    elementoActual = simbolo;
    const elemento = datos[simbolo];

    if (!elemento) return;

    preguntas = generarPreguntas(elemento);
    indice = 0;
    aciertos = 0;

    mostrarPregunta();
  }

  const observador = new MutationObserver(() => {
    const ficha = document.querySelector("#ficha-modal-datos");
    if (!ficha) return;

    const encabezado = ficha.querySelector(".ficha-encabezado");
    if (!encabezado) return;

    const simbolo = encabezado
      .querySelector(".ficha-simbolo")
      ?.textContent?.trim();

    if (!simbolo || !datos[simbolo]) return;

    if (ficha.querySelector("#iniciar-practica-elemento")) return;

    const contenedor = document.createElement("div");
    contenedor.className = "ficha-practica-contenedor";

    contenedor.innerHTML = `
      <h3>Práctica de tabla periódica</h3>
      <p>
        Cinco preguntas sobre las propiedades
        del elemento seleccionado.
      </p>
      <button type="button" id="iniciar-practica-elemento">
        Iniciar práctica
      </button>
      <div id="practica-elemento-zona"></div>
    `;

    ficha.appendChild(contenedor);

    contenedor.querySelector("#iniciar-practica-elemento")
      .addEventListener("click", () => iniciar(simbolo));
  });

  const ficha = document.querySelector("#ficha-modal-datos");

  if (ficha) {
    observador.observe(ficha, {
      childList: true
    });
  }

  console.log(
    "Prácticas de los 118 elementos activadas."
  );
})();
