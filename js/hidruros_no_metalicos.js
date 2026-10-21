// QUIMINTERACTIVA - Hidruros no metálicos
(function () {
  "use strict";

  const compuestos = [
    {
      formula: "NH3",
      comun: "amoníaco",
      sistematica: "trihidruro de nitrógeno",
      elemento: "N",
      nombreElemento: "nitrógeno",
      cantidad: 3
    },
    {
      formula: "PH3",
      comun: "fosfina",
      sistematica: "trihidruro de fósforo",
      elemento: "P",
      nombreElemento: "fósforo",
      cantidad: 3
    },
    {
      formula: "AsH3",
      comun: "arsina",
      sistematica: "trihidruro de arsénico",
      elemento: "As",
      nombreElemento: "arsénico",
      cantidad: 3
    },
    {
      formula: "CH4",
      comun: "metano",
      sistematica: "tetrahidruro de carbono",
      elemento: "C",
      nombreElemento: "carbono",
      cantidad: 4
    },
    {
      formula: "SiH4",
      comun: "silano",
      sistematica: "tetrahidruro de silicio",
      elemento: "Si",
      nombreElemento: "silicio",
      cantidad: 4
    },
    {
      formula: "BH3",
      comun: "borano",
      sistematica: "trihidruro de boro",
      elemento: "B",
      nombreElemento: "boro",
      cantidad: 3
    }
  ];

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

  function preparar(compuesto) {
    return {
      formula: compuesto.formula,
      stock: compuesto.sistematica,
      sistematica: compuesto.sistematica,
      tradicional: compuesto.comun,
      tipo: "Hidruro no metálico",
      pasos:
        `El compuesto contiene ${compuesto.cantidad} ` +
        `átomos de hidrógeno y un átomo de ` +
        `${compuesto.nombreElemento}. ` +
        `El prefijo de la nomenclatura sistemática ` +
        `indica la cantidad de átomos de hidrógeno. ` +
        `Nombre común: ${compuesto.comun}.`
    };
  }

  window.analizarHidruroNoMetalico = function (entrada) {
    const formula = normalizarFormula(entrada);

    const compuesto = compuestos.find(
      x => x.formula === formula
    );

    return compuesto ? preparar(compuesto) : null;
  };

  window.formularHidruroNoMetalico = function (entrada) {
    const nombre = normalizarNombre(entrada);

    const compuesto = compuestos.find(
      x =>
        normalizarNombre(x.comun) === nombre ||
        normalizarNombre(x.sistematica) === nombre
    );

    return compuesto ? preparar(compuesto) : null;
  };

  window.HIDRUROS_NO_METALICOS_QUIMINTERACTIVA = compuestos;
})();
