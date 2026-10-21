(() => {
  "use strict";

  const nombres = {
    formulacion: "Formulación química",
    nomenclatura: "Nomenclatura química",
    masa_molar: "Masa molar",
    conversiones: "Conversiones químicas",
    tabla_periodica: "Tabla periódica"
  };

  let ejercicios = [];

  function mezclar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  function normalizar(valor) {
    return String(valor)
      .trim()
      .replace(/\s+/g, "")
      .replace(/,/g, ".")
      .toLowerCase();
  }

  function comprobar(respuesta, ejercicio) {
    const esperada = ejercicio.respuesta;

    if (
      ejercicio.tema === "masa_molar" ||
      ejercicio.tema === "conversiones"
    ) {
      const valor = Number(
        String(respuesta).trim().replace(",", ".")
      );

      return String(respuesta).trim() !== "" &&
        Number.isFinite(valor) &&
        Math.abs(valor - Number(esperada)) <= 0.05;
    }

    return normalizar(respuesta) === normalizar(esperada);
  }

  function iniciar() {
    const main = document.querySelector("main");
    const tabs = document.querySelector(".tabs");

    if (!main || !tabs) return;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.tab = "generador";
    boton.textContent = "Generador de prácticas";
    tabs.appendChild(boton);

    const seccion = document.createElement("section");
    seccion.id = "generador";
    seccion.className = "panel";

    seccion.innerHTML = `
      <div class="card herramientas">
        <h2>Generador de prácticas de química</h2>

        <label for="gp-tema">Tema</label>
        <select id="gp-tema">
          <option value="mixto">Todos los temas</option>
          <option value="formulacion">Formulación química</option>
          <option value="nomenclatura">Nomenclatura química</option>
          <option value="masa_molar">Masa molar</option>
          <option value="conversiones">Conversiones químicas</option>
          <option value="tabla_periodica">Tabla periódica</option>
        </select>

        <label for="gp-nivel">Dificultad</label>
        <select id="gp-nivel">
          <option value="basico">Básico</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        <label for="gp-cantidad">Cantidad de ejercicios</label>
        <select id="gp-cantidad">
          <option value="5">5 ejercicios</option>
          <option value="10">10 ejercicios</option>
          <option value="15">15 ejercicios</option>
          <option value="20">20 ejercicios</option>
        </select>

        <p>
          <button id="gp-generar" class="btn primary">
            Generar práctica
          </button>
          <button id="gp-imprimir" class="btn">
            Imprimir práctica
          </button>
          <button id="gp-solucionario" class="btn">
            Imprimir solucionario
          </button>
        </p>

        <div id="gp-contenido"></div>
      </div>
    `;

    main.appendChild(seccion);

    boton.onclick = () => {
      document.querySelectorAll("[data-tab]").forEach(b =>
        b.classList.toggle("active", b === boton)
      );

      document.querySelectorAll(".panel").forEach(p =>
        p.classList.toggle("active", p === seccion)
      );
    };

    document.querySelector("#gp-generar").onclick = generar;
    document.querySelector("#gp-imprimir").onclick =
      () => imprimir(false);
    document.querySelector("#gp-solucionario").onclick =
      () => imprimir(true);
  }

  function generar() {
    const tema = document.querySelector("#gp-tema").value;
    const nivel = document.querySelector("#gp-nivel").value;
    const cantidad = Number(
      document.querySelector("#gp-cantidad").value
    );

    const banco = window.BANCO_QUIMICA || [];

    const disponibles = banco.filter(e =>
      (tema === "mixto" || e.tema === tema) &&
      e.nivel === nivel
    );

    ejercicios = mezclar(disponibles).slice(0, cantidad);

    const contenedor = document.querySelector("#gp-contenido");
    contenedor.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = "Práctica generada";
    contenedor.appendChild(titulo);

    if (ejercicios.length < cantidad) {
      const aviso = document.createElement("p");
      aviso.textContent =
        `Hay ${ejercicios.length} ejercicios disponibles para esta selección.`;
      contenedor.appendChild(aviso);
    }

    ejercicios.forEach((e, i) => {
      const bloque = document.createElement("div");
      bloque.className = "gp-ejercicio";

      const pregunta = document.createElement("p");
      pregunta.textContent = `${i + 1}. ${e.pregunta}`;

      const campo = document.createElement("input");
      campo.placeholder = "Escribí tu respuesta";
      campo.dataset.indice = i;

      bloque.append(pregunta, campo);
      contenedor.appendChild(bloque);
    });

    if (!ejercicios.length) return;

    const evaluar = document.createElement("button");
    evaluar.className = "btn primary";
    evaluar.textContent = "Calificar práctica";
    evaluar.onclick = calificar;

    const resultado = document.createElement("div");
    resultado.id = "gp-resultado";

    contenedor.append(evaluar, resultado);
  }

  function calificar() {
    let aciertos = 0;
    const resultado = document.querySelector("#gp-resultado");
    resultado.replaceChildren();

    ejercicios.forEach((e, i) => {
      const campo = document.querySelector(
        `[data-indice="${i}"]`
      );

      const correcta = comprobar(campo.value, e);

      if (correcta) aciertos++;

      const bloque = document.createElement("div");
      bloque.className = "gp-ejercicio";

      const estado = document.createElement("p");
      estado.textContent =
        `${i + 1}. ${correcta ? "✓ Correcto" : "✗ Incorrecto"}`;

      const respuesta = document.createElement("p");
      respuesta.textContent = "Respuesta: " + e.respuesta;

      const solucion = document.createElement("p");
      solucion.textContent = "Procedimiento: " + e.solucion;

      bloque.append(estado, respuesta, solucion);
      resultado.appendChild(bloque);
    });

    const nota = document.createElement("h3");
    const porcentaje = ejercicios.length
      ? (100 * aciertos / ejercicios.length).toFixed(1)
      : "0";

    nota.textContent =
      `Calificación: ${aciertos}/${ejercicios.length} (${porcentaje}%)`;

    resultado.prepend(nota);
  }


  function imprimir(solucionario) {
    if (!ejercicios.length) {
      alert("Primero generá una práctica.");
      return;
    }

    const ventana = window.open("", "_blank");

    if (!ventana) {
      alert("Permití las ventanas emergentes.");
      return;
    }

    function escapar(valor) {
      return String(valor ?? "").replace(
        /[&<>"']/g,
        c => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        })[c]
      );
    }

    function formula(texto) {
      return escapar(texto)
        .replace(/([A-Za-z\)])(\d+)/g, "$1<sub>$2</sub>");
    }

    function procedimiento(texto) {
      return escapar(texto)
        .split("\n")
        .map(linea => linea.trim())
        .map(linea => {
          if (/^(DATOS|FÓRMULA|SUSTITUCIÓN|PROCEDIMIENTO|RESPUESTA):?$/.test(linea)) {
            return `<h4>${linea}</h4>`;
          }

          if (!linea) return '<div class="espacio"></div>';

          return `<p>${formula(linea)}</p>`;
        })
        .join("");
    }

    const filas = ejercicios.map((e, i) => `
      <article class="ejercicio">
        <div class="pregunta">
          <strong>${i + 1}.</strong>
          <span>${formula(e.pregunta)}</span>
          <span class="puntos">1 punto</span>
        </div>

        ${solucionario ? `
          <div class="respuesta">
            <strong>Respuesta correcta:</strong>
            ${formula(e.respuesta)}
          </div>
          <div class="desarrollo">
            ${procedimiento(e.solucion)}
          </div>
        ` : `
          <div class="linea"></div>
          <div class="linea"></div>
        `}
      </article>
    `).join("");

    const titulo = solucionario
      ? "Solucionario de Química"
      : "Práctica de Química";

    const tema = document.querySelector("#gp-tema");
    const nivel = document.querySelector("#gp-nivel");

    const temaTexto = tema.options[tema.selectedIndex].text;
    const nivelTexto = nivel.options[nivel.selectedIndex].text;

    const fecha = new Date().toLocaleDateString("es-CR");

    const html = `
      <!doctype html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>${titulo} - Quiminteractiva</title>

        <style>
          @page {
            size: letter;
            margin: 17mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #172033;
            font-size: 11pt;
            line-height: 1.45;
            margin: 0;
          }

          .encabezado {
            text-align: center;
            border-bottom: 3px solid #174a75;
            padding-bottom: 13px;
            margin-bottom: 18px;
          }

          .marca {
            color: #174a75;
            font-size: 21pt;
            font-weight: 800;
            letter-spacing: .5px;
          }

          h1 {
            font-size: 17pt;
            margin: 7px 0;
          }

          .subtitulo {
            color: #526277;
            font-size: 10pt;
          }

          .datos {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 18px;
          }

          .campo {
            border-bottom: 1px solid #8c99a8;
            padding-bottom: 7px;
            min-height: 26px;
          }

          .informacion {
            background: #eef4fa;
            border-left: 4px solid #174a75;
            padding: 11px 14px;
            margin-bottom: 18px;
            font-size: 10pt;
          }

          .informacion p {
            margin: 3px 0;
          }

          .instrucciones {
            margin-bottom: 20px;
            font-size: 10pt;
          }

          .ejercicio {
            margin-bottom: 23px;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .pregunta {
            display: flex;
            align-items: baseline;
            gap: 8px;
            font-size: 11pt;
          }

          .pregunta span:nth-child(2) {
            flex: 1;
          }

          .puntos {
            font-size: 9pt;
            color: #667085;
            white-space: nowrap;
          }

          .linea {
            border-bottom: 1px solid #b8c1cb;
            height: 26px;
            margin: 8px 0 0 23px;
          }

          .respuesta {
            margin: 10px 0 8px 23px;
            color: #174a75;
            font-weight: 600;
          }

          .desarrollo {
            margin-left: 23px;
            padding: 10px 13px;
            background: #f5f7fa;
            border-left: 2px solid #a6b9ca;
            font-size: 10pt;
            white-space: normal;
          }

          .desarrollo h4 {
            font-size: 10pt;
            color: #174a75;
            margin: 10px 0 4px;
          }

          .desarrollo p {
            margin: 3px 0;
            overflow-wrap: anywhere;
          }

          .espacio {
            height: 5px;
          }

          .pie {
            margin-top: 30px;
            padding-top: 8px;
            border-top: 1px solid #c7d0d9;
            text-align: center;
            color: #687789;
            font-size: 9pt;
          }

          sub {
            font-size: 75%;
          }

          @media print {
            .informacion,
            .desarrollo {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      </head>

      <body>
        <header class="encabezado">
          <div class="marca">QUIMINTERACTIVA</div>
          <h1>${titulo}</h1>
          <div class="subtitulo">
            Material educativo de Química
          </div>
        </header>

        <section class="datos">
          <div class="campo">
            <strong>Institución:</strong> ____________________
          </div>
          <div class="campo">
            <strong>Docente:</strong> ______________________
          </div>
          <div class="campo">
            <strong>Estudiante:</strong> ___________________
          </div>
          <div class="campo">
            <strong>Sección:</strong> ______________________
          </div>
        </section>

        <section class="informacion">
          <p><strong>Tema:</strong> ${escapar(temaTexto)}</p>
          <p><strong>Dificultad:</strong> ${escapar(nivelTexto)}</p>
          <p><strong>Fecha:</strong> ${escapar(fecha)}</p>
          <p><strong>Cantidad:</strong> ${ejercicios.length} ejercicios</p>
          <p><strong>Valor total:</strong> ${ejercicios.length} puntos</p>
        </section>

        <section class="instrucciones">
          <strong>Instrucciones:</strong>
          Resuelva los ejercicios de forma ordenada.
          Escriba las fórmulas químicas correctamente
          y muestre los procedimientos cuando corresponda.
        </section>

        <main>
          ${filas}
        </main>

        <footer class="pie">
          Quiminteractiva · Plataforma educativa de Química
        </footer>
      </body>
      </html>
    `;

    ventana.document.open();
    ventana.document.write(html);
    ventana.document.close();

    ventana.addEventListener("load", () => {
      ventana.focus();
      ventana.print();
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
