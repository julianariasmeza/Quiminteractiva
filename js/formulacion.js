// QUIMINTERACTIVA
// Motor de formulación por equilibrio de cargas.

(function () {
  "use strict";

  function mcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const resto = a % b;
      a = b;
      b = resto;
    }

    return a;
  }

  function subindice(numero) {
    return numero === 1 ? "" : String(numero);
  }

  function esPoliatomico(formula) {
    const simbolos = formula.match(/[A-Z][a-z]?/g) || [];
    return simbolos.length > 1;
  }

  function escribirIon(formula, cantidad) {
    if (cantidad === 1) {
      return formula;
    }

    if (esPoliatomico(formula)) {
      return "(" + formula + ")" + cantidad;
    }

    return formula + cantidad;
  }

  function buscarIon(formula, carga, tipo) {
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base) {
      throw new Error("La base de iones no está cargada.");
    }

    const grupos = tipo === "cation"
      ? [base.cationes]
      : [
          base.anionesSimples,
          base.oxoaniones,
          base.anionesAcidos
        ];

    for (const grupo of grupos) {
      const ion = grupo.find(
        x => x.formula === formula && x.carga === carga
      );

      if (ion) {
        return ion;
      }
    }

    return null;
  }

  function formularIones(formulaCation, cargaCation,
                         formulaAnion, cargaAnion) {

    if (
      !Number.isInteger(cargaCation) ||
      !Number.isInteger(cargaAnion) ||
      cargaCation <= 0 ||
      cargaAnion >= 0
    ) {
      return {
        error: "Las cargas deben ser enteras: catión positivo y anión negativo."
      };
    }

    const cation = buscarIon(
      formulaCation, cargaCation, "cation"
    );

    const anion = buscarIon(
      formulaAnion, cargaAnion, "anion"
    );

    if (!cation || !anion) {
      return {
        error: "Uno de los iones no está registrado con esa carga."
      };
    }

    const divisor = mcd(cargaCation, Math.abs(cargaAnion));

    const cantidadCation = Math.abs(cargaAnion) / divisor;
    const cantidadAnion = cargaCation / divisor;

    const formula =
      escribirIon(formulaCation, cantidadCation) +
      escribirIon(formulaAnion, cantidadAnion);

    const cargaPositiva = cantidadCation * cargaCation;
    const cargaNegativa = cantidadAnion * cargaAnion;

    const procedimiento =
      "Catión: " + formulaCation + " (" +
      cargaCation + "). " +
      "Anión: " + formulaAnion + " (" +
      cargaAnion + "). " +
      "Se necesitan " + cantidadCation +
      " catión(es) y " + cantidadAnion +
      " anión(es). " +
      "Comprobación: " +
      cantidadCation + "(" + cargaCation + ") + " +
      cantidadAnion + "(" + cargaAnion + ") = " +
      (cargaPositiva + cargaNegativa) + ".";

    return {
      formula,
      cation,
      anion,
      cantidadCation,
      cantidadAnion,
      procedimiento
    };
  }

  window.formularIones = formularIones;
})();
