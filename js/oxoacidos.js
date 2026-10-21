// QUIMINTERACTIVA - Motor de oxoácidos
(function () {
  "use strict";

  const datos = [
    ["HClO", "ácido hipocloroso", "Cl"],
    ["HClO2", "ácido cloroso", "Cl"],
    ["HClO3", "ácido clórico", "Cl"],
    ["HClO4", "ácido perclórico", "Cl"],
    ["HBrO", "ácido hipobromoso", "Br"],
    ["HBrO2", "ácido bromoso", "Br"],
    ["HBrO3", "ácido brómico", "Br"],
    ["HBrO4", "ácido perbrómico", "Br"],
    ["HIO", "ácido hipoyodoso", "I"],
    ["HIO2", "ácido yodoso", "I"],
    ["HIO3", "ácido yódico", "I"],
    ["HIO4", "ácido peryódico", "I"],
    ["HNO2", "ácido nitroso", "N"],
    ["HNO3", "ácido nítrico", "N"],
    ["H2SO3", "ácido sulfuroso", "S"],
    ["H2SO4", "ácido sulfúrico", "S"],
    ["H3PO3", "ácido fosforoso", "P"],
    ["H3PO4", "ácido fosfórico", "P"],
    ["H2CO3", "ácido carbónico", "C"],
    ["H3BO3", "ácido bórico", "B"],
    ["H2CrO4", "ácido crómico", "Cr"],
    ["H2Cr2O7", "ácido dicrómico", "Cr"],
    ["HMnO4", "ácido permangánico", "Mn"],
    ["H2MnO4", "ácido mangánico", "Mn"]
  ];

  function normalizarNombre(valor) {
    return String(valor || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizarFormula(valor) {
    const subindices = "₀₁₂₃₄₅₆₇₈₉";
    return String(valor || "")
      .replace(/[₀-₉]/g, c => subindices.indexOf(c))
      .replace(/\s+/g, "");
  }

  function analizar(formula, nombre, central) {
    const h = Number(formula.match(/^H(\d*)/)[1] || 1);
    const oxigenos = Number(formula.match(/O(\d*)$/)[1] || 1);
    const parteCentral = formula.slice(
      formula.match(/^H\d*/)[0].length,
      formula.match(/O\d*$/).index
    );
    const cantidadCentral = Number(
      parteCentral.replace(central, "") || 1
    );
    const oxidacion = (2 * oxigenos - h) / cantidadCentral;

    return {
      formula,
      stock: nombre,
      tradicional: nombre,
      tipo: "Oxoácido",
      oxidacion,
      pasos:
        `H = +1; O = -2. ` +
        `Neutralidad: ${h}(+1) + ` +
        `${cantidadCentral}(x) + ${oxigenos}(-2) = 0. ` +
        `Por tanto, x = +${oxidacion}.`
    };
  }

  const registros = datos.map(
    ([formula, nombre, central]) =>
      analizar(formula, nombre, central)
  );

  window.analizarOxoacido = function (entrada) {
    const formula = normalizarFormula(entrada);
    return registros.find(x => x.formula === formula) || null;
  };

  window.formularOxoacido = function (entrada) {
    const nombre = normalizarNombre(entrada);
    return registros.find(
      x => normalizarNombre(x.tradicional) === nombre
    ) || null;
  };

  window.OXOACIDOS_QUIMINTERACTIVA = registros;
})();
