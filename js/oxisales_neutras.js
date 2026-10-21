// QUIMINTERACTIVA - Oxisales neutras
(function () {
  "use strict";

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

  function mcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function escribirGrupo(formula, cantidad) {
    if (cantidad === 1) return formula;

    const elementos = formula.match(/[A-Z][a-z]?/g) || [];

    return elementos.length > 1
      ? `(${formula})${cantidad}`
      : `${formula}${cantidad}`;
  }

  function construir() {
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base) return [];

    const registros = [];

    // Excluimos hidróxido y acetato.
    // El acetato se tratará por separado como sal orgánica.
    const aniones = base.oxoaniones.filter(
      x => !["OH", "CH3COO"].includes(x.formula)
    );

    for (const metal of base.cationes) {
      if (["H", "NH4"].includes(metal.formula)) {
        continue;
      }

      const estados = new Set(
        base.cationes
          .filter(x => x.formula === metal.formula)
          .map(x => x.carga)
      );

      for (const anion of aniones) {
        const positiva = metal.carga;
        const negativa = Math.abs(anion.carga);

        if (
          !Number.isInteger(positiva) ||
          !Number.isInteger(negativa) ||
          positiva <= 0 ||
          negativa <= 0
        ) {
          continue;
        }

        const divisor = mcd(positiva, negativa);

        const cantidadMetal = negativa / divisor;
        const cantidadAnion = positiva / divisor;

        const formula =
          escribirGrupo(metal.formula, cantidadMetal) +
          escribirGrupo(anion.formula, cantidadAnion);

        const nombreMetal = estados.size > 1
          ? `${metal.nombre}(${romanos[positiva]})`
          : metal.nombre;

        const stock = `${anion.nombre} de ${nombreMetal}`;

        registros.push({
          formula,
          stock,
          sistematica: null,
          tradicional: null,
          tipo: "Oxisal neutra",
          pasos:
            `Catión: ${metal.formula} (+${positiva}). ` +
            `Anión: ${anion.formula} (${anion.carga}). ` +
            `Se necesitan ${cantidadMetal} catión(es) ` +
            `y ${cantidadAnion} anión(es). ` +
            `Comprobación: ${cantidadMetal}(+${positiva}) + ` +
            `${cantidadAnion}(${anion.carga}) = 0.`
        });
      }
    }

    return registros;
  }

  const registros = construir();

  window.analizarOxisalNeutra = function (entrada) {
    const formula = normalizarFormula(entrada);

    const coincidencias = registros.filter(
      x => x.formula === formula
    );

    return coincidencias.length === 1
      ? coincidencias[0]
      : null;
  };

  window.formularOxisalNeutra = function (entrada) {
    const nombre = normalizarNombre(entrada);

    const coincidencias = registros.filter(
      x => normalizarNombre(x.stock) === nombre
    );

    return coincidencias.length === 1
      ? coincidencias[0]
      : null;
  };

  window.OXISALES_NEUTRAS_QUIMINTERACTIVA = registros;
})();
