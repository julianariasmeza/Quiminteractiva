// QUIMINTERACTIVA
// Conversión de nombres Stock a fórmulas iónicas.

(function () {
  "use strict";

  const ROMANOS = {
    I: 1, II: 2, III: 3, IV: 4,
    V: 5, VI: 6, VII: 7, VIII: 8
  };

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function convertirNombreAFormula(entrada) {
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base || !window.nombrarIones) {
      return null;
    }

    const nombre = normalizar(entrada);

    const coincidencia = nombre.match(
      /^(.+?) de (.+?)(?:\s*\(([ivx]+)\))?$/
    );

    if (!coincidencia) {
      return null;
    }

    const nombreAnion = coincidencia[1];
    const nombreMetal = coincidencia[2];
    const romano = coincidencia[3]?.toUpperCase();

    const cargaIndicada = romano
      ? ROMANOS[romano]
      : null;

    if (romano && !cargaIndicada) {
      return null;
    }

    const cationes = base.cationes.filter(
      x => normalizar(x.nombre) === nombreMetal &&
        (cargaIndicada === null ||
         x.carga === cargaIndicada)
    );

    const aniones = [
      ...base.anionesSimples,
      ...base.oxoaniones,
      ...base.anionesAcidos
    ].filter(
      x => normalizar(x.nombre) === nombreAnion
    );

    const resultados = [];

    for (const cation of cationes) {
      for (const anion of aniones) {
        const resultado = window.nombrarIones(
          cation.formula,
          cation.carga,
          anion.formula,
          anion.carga
        );

        if (!resultado.error) {
          resultados.push(resultado);
        }
      }
    }

    // Sin número romano, no se debe adivinar
    // el estado de oxidación de un metal variable.
    if (resultados.length !== 1) {
      return null;
    }

    return resultados[0];
  }

  window.convertirNombreAFormula =
    convertirNombreAFormula;
})();
