// QUIMINTERACTIVA - Hidruros metálicos
(function () {
  "use strict";

  const prefijos = {
    1: "mono",
    2: "di",
    3: "tri",
    4: "tetra",
    5: "penta"
  };

  const romanos = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V"
  };

  function normalizarNombre(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizarFormula(texto) {
    return String(texto || "")
      .replace(/[₀-₉]/g, c =>
        String("₀₁₂₃₄₅₆₇₈₉".indexOf(c)))
      .replace(/\s+/g, "");
  }

  function construirRegistros() {
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base) return [];

    const registros = [];

    for (const metal of base.cationes) {
      // Excluir hidrógeno y amonio.
      if (["H", "NH4"].includes(metal.formula)) {
        continue;
      }

      if (
        !Number.isInteger(metal.carga) ||
        metal.carga < 1 ||
        metal.carga > 5
      ) {
        continue;
      }

      const estados = new Set(
        base.cationes
          .filter(x => x.formula === metal.formula)
          .map(x => x.carga)
      );

      const formula =
        metal.formula +
        (metal.carga === 1 ? "" : "") +
        "H" +
        (metal.carga === 1 ? "" : metal.carga);

      const nombreMetal =
        estados.size > 1
          ? `${metal.nombre}(${romanos[metal.carga]})`
          : metal.nombre;

      const stock = `hidruro de ${nombreMetal}`;

      const sistematica =
        `${prefijos[metal.carga]}hidruro de ${metal.nombre}`;

      const pasos =
        `Metal: ${metal.formula} (+${metal.carga}). ` +
        `Hidrógeno: H (-1). ` +
        `Se necesitan ${metal.carga} ion(es) hidruro ` +
        `para neutralizar la carga del metal. ` +
        `Comprobación: (+${metal.carga}) + ` +
        `${metal.carga}(-1) = 0.`;

      registros.push({
        formula,
        stock,
        sistematica,
        tradicional: "No incorporada en este módulo",
        tipo: "Hidruro metálico",
        pasos
      });
    }

    return registros;
  }

  const registros = construirRegistros();

  window.analizarHidruroMetalico = function (entrada) {
    const formula = normalizarFormula(entrada);

    return registros.find(
      x => x.formula === formula
    ) || null;
  };

  window.formularHidruroMetalico = function (entrada) {
    const nombre = normalizarNombre(entrada);

    return registros.find(
      x =>
        normalizarNombre(x.stock) === nombre ||
        normalizarNombre(x.sistematica) === nombre
    ) || null;
  };

  window.HIDRUROS_METALICOS_QUIMINTERACTIVA = registros;
})();
