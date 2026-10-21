// QUIMINTERACTIVA - Sales básicas
(function () {
  "use strict";

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
        "₀₁₂₃₄₅₆₇₈₉".indexOf(c))
      .replace(/\s+/g, "");
  }

  const romanos = {
    1: "I", 2: "II", 3: "III",
    4: "IV", 5: "V"
  };

  function nombreMetal(cation, base) {
    const estados = base.cationes.filter(
      x => x.formula === cation.formula
    );

    const cargas = new Set(estados.map(x => x.carga));

    return cargas.size > 1
      ? `${cation.nombre}(${romanos[cation.carga]})`
      : cation.nombre;
  }

  function construirRegistros() {
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base) return [];

    const registros = [];

    const aniones = base.anionesSimples.filter(
      x =>
        x.carga === -1 &&
        ["F", "Cl", "Br", "I"].includes(x.formula)
    );

    for (const cation of base.cationes) {
      if (cation.carga < 2) continue;

      // Primera etapa: una unidad OH y una unidad
      // de anión monovalente, con catión de carga +2.
      if (cation.carga !== 2) continue;

      for (const anion of aniones) {
        const formula =
          cation.formula +
          "(OH)" +
          anion.formula;

        const stock =
          `hidroxi${anion.nombre} de ` +
          nombreMetal(cation, base);

        registros.push({
          formula,
          stock,
          tradicional: stock,
          sistematica: "No incorporada en este módulo",
          tipo: "Sal básica",
          pasos:
            `Catión: ${cation.formula} (+2). ` +
            `Ion hidróxido: OH (-1). ` +
            `Anión: ${anion.formula} (-1). ` +
            `Balance: (+2) + (-1) + (-1) = 0. ` +
            `Se combina una unidad de cada ion.`
        });
      }
    }

    return registros;
  }

  const registros = construirRegistros();

  window.analizarSalBasica = function (entrada) {
    const formula = normalizarFormula(entrada);

    return registros.find(
      x => x.formula === formula
    ) || null;
  };

  window.formularSalBasica = function (entrada) {
    const nombre = normalizarNombre(entrada);

    return registros.find(
      x => normalizarNombre(x.stock) === nombre
    ) || null;
  };

  window.SALES_BASICAS_QUIMINTERACTIVA = registros;
})();
