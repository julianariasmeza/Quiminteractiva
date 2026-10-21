// QUIMINTERACTIVA
// Reconocimiento de compuestos formados por iones registrados.

(function () {
  "use strict";

  function normalizar(formula) {
    return String(formula || "")
      .replace(/\s+/g, "")
      .replace(/[₀-₉]/g, c =>
        "₀₁₂₃₄₅₆₇₈₉".indexOf(c)
      );
  }

  function reconocerCompuestoIonico(entrada) {
    const formula = normalizar(entrada);
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base || !window.nombrarIones) {
      return null;
    }

    const aniones = [
      ...base.anionesSimples,
      ...base.oxoaniones,
      ...base.anionesAcidos
    ];

    const coincidencias = [];

    for (const cation of base.cationes) {
      for (const anion of aniones) {
        const resultado = window.nombrarIones(
          cation.formula,
          cation.carga,
          anion.formula,
          anion.carga
        );

        if (resultado.error) continue;

        if (resultado.formula === formula) {
          coincidencias.push(resultado);
        }
      }
    }

    if (coincidencias.length !== 1) {
      return null;
    }

    const resultado = coincidencias[0];

    return {
      formula: resultado.formula,
      stock: resultado.stock,
      sistematica: "No aplicada en este módulo",
      tradicional: "Consultar denominaciones tradicionales",
      tipo: resultado.tipo,
      pasos: resultado.pasos
    };
  }

  window.reconocerCompuestoIonico = reconocerCompuestoIonico;
})();
