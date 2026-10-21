(() => {
  "use strict";

  const banco = window.BANCO_QUIMICA;

  if (!Array.isArray(banco)) return;

  const datos = window.DATOS_ELEMENTOS_QUIMINTERACTIVA || {};

  const cargas = {
    Na: 1, K: 1, Ca: 2, Mg: 2,
    Al: 3, Fe: 3, Cu: 2,
    Cl: -1, O: -2, S: -2,
    OH: -1, NO3: -1, SO4: -2,
    CO3: -2, PO4: -3
  };

  const compuestos = {
    NaCl: ["Na", "Cl", 1, 1],
    CaO: ["Ca", "O", 1, 1],
    Fe2O3: ["Fe", "O", 2, 3],
    Al2O3: ["Al", "O", 2, 3],
    "Ca(OH)2": ["Ca", "OH", 1, 2],
    NaOH: ["Na", "OH", 1, 1],
    KNO3: ["K", "NO3", 1, 1],
    CaCO3: ["Ca", "CO3", 1, 1],
    CuSO4: ["Cu", "SO4", 1, 1],
    "Al2(SO4)3": ["Al", "SO4", 2, 3],
    FeCl3: ["Fe", "Cl", 1, 3],
    "Ca3(PO4)2": ["Ca", "PO4", 3, 2]
  };

  function formulacion(e) {
    const info = compuestos[e.respuesta];

    if (!info) return e.solucion;

    const [cat, an, nc, na] = info;
    const positiva = cargas[cat];
    const negativa = Math.abs(cargas[an]);

    return [
      "DATOS:",
      "Catión: " + cat + ", carga +" + positiva,
      "Anión: " + an + ", carga -" + negativa,
      "",
      "PROCEDIMIENTO:",
      "1. Identificar el catión y el anión.",
      "2. Determinar sus cargas eléctricas.",
      "3. Buscar la proporción mínima que neutraliza las cargas.",
      "4. Utilizar " + nc + " catión(es) y " +
        na + " anión(es).",
      "5. Comprobar:",
      nc + "(+" + positiva + ") + " +
        na + "(-" + negativa + ") = 0",
      "",
      "RESPUESTA:",
      e.respuesta
    ].join("\n");
  }

  function masaMolar(e) {
    const formula = e.pregunta.match(
      /de\s+([A-Za-z0-9()]+)\s+en/
    );

    if (!formula) return e.solucion;

    const texto = formula[1];
    const tokens = texto.match(
      /[A-Z][a-z]?|\d+|[()]|./g
    ) || [];

    let i = 0;

    function leerNumero() {
      if (!/^\d+$/.test(tokens[i] || "")) return 1;
      return Number(tokens[i++]);
    }

    function analizar(interior = false) {
      const conteo = {};

      while (i < tokens.length) {
        const token = tokens[i++];

        if (token === ")") {
          if (!interior) throw Error("Paréntesis inesperado");
          return conteo;
        }

        if (token === "(") {
          const sub = analizar(true);
          const multiplicador = leerNumero();

          for (const [s, n] of Object.entries(sub)) {
            conteo[s] = (conteo[s] || 0) +
              n * multiplicador;
          }
          continue;
        }

        if (!/^[A-Z][a-z]?$/.test(token) || !datos[token]) {
          throw Error("Elemento desconocido");
        }

        conteo[token] = (conteo[token] || 0) +
          leerNumero();
      }

      if (interior) throw Error("Paréntesis sin cerrar");
      return conteo;
    }

    try {
      const conteo = analizar();

      const pasos = Object.entries(conteo).map(([s, n]) => {
        const masa = Number(
          String(datos[s].masa).replace(",", ".")
        );

        if (!Number.isFinite(masa)) {
          throw Error("Masa no disponible");
        }

        return {
          simbolo: s,
          cantidad: n,
          masa,
          subtotal: n * masa
        };
      });

      const total = pasos.reduce(
        (s, p) => s + p.subtotal, 0
      );

      return [
        "DATOS:",
        "Fórmula: " + texto,
        "",
        "FÓRMULA:",
        "M = suma de las masas atómicas.",
        "",
        "SUSTITUCIÓN:",
        ...pasos.map(p =>
          p.simbolo + ": " + p.cantidad +
          " x " + p.masa.toFixed(3) +
          " = " + p.subtotal.toFixed(3)
        ),
        "",
        "PROCEDIMIENTO:",
        "Sumar todos los aportes atómicos.",
        "",
        "RESPUESTA:",
        "M = " + total.toFixed(3) + " g/mol"
      ].join("\n");

    } catch {
      return e.solucion;
    }
  }

  function conversion(e) {
    const coincidencia = e.pregunta.match(
      /en\s+([\d.]+)\s+g\s+de\s+([A-Za-z0-9()]+)/
    );

    if (!coincidencia) return e.solucion;

    const gramos = Number(coincidencia[1]);
    const moles = Number(e.respuesta);
    const masa = gramos / moles;

    return [
      "DATOS:",
      "Masa: " + gramos + " g",
      "Masa molar: " + masa.toFixed(3) + " g/mol",
      "",
      "FÓRMULA:",
      "n = m / M",
      "",
      "SUSTITUCIÓN:",
      "n = " + gramos + " / " + masa.toFixed(3),
      "",
      "PROCEDIMIENTO:",
      "Dividir la masa entre la masa molar.",
      "",
      "RESPUESTA:",
      "n = " + moles + " mol"
    ].join("\n");
  }

  banco.forEach(e => {
    if (e.tema === "formulacion") {
      e.solucion = formulacion(e);
    }

    if (e.tema === "masa_molar") {
      e.solucion = masaMolar(e);
    }

    if (e.tema === "conversiones") {
      e.solucion = conversion(e);
    }
  });

  console.log("Soluciones desarrolladas incorporadas.");
})();
