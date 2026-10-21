// QUIMINTERACTIVA - Hidrácidos
(function () {
  "use strict";

  const registros = [
    ["HCl", "ácido clorhídrico", "cloruro de hidrógeno"],
    ["HBr", "ácido bromhídrico", "bromuro de hidrógeno"],
    ["HI", "ácido yodhídrico", "yoduro de hidrógeno"],
    ["HF", "ácido fluorhídrico", "fluoruro de hidrógeno"],
    ["H2S", "ácido sulfhídrico", "sulfuro de hidrógeno"],
    ["H2Se", "ácido selenhídrico", "seleniuro de hidrógeno"]
  ];

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizarFormula(texto) {
    const sub = "₀₁₂₃₄₅₆₇₈₉";

    return String(texto || "")
      .replace(/[₀-₉]/g, c => sub.indexOf(c))
      .replace(/\s+/g, "");
  }

  const compuestos = registros.map(
    ([formula, acido, binario]) => ({
      formula,
      stock: acido,
      tradicional: acido,
      sistematica: binario,
      tipo: "Hidrácido",
      pasos:
        "En disolución acuosa se utiliza el nombre " +
        "tradicional del ácido. Fuera de disolución " +
        "acuosa se emplea la denominación binaria."
    })
  );

  window.analizarHidracido = function (entrada) {
    const formula = normalizarFormula(entrada);

    // Solo reconocer como ácido cuando se indique
    // explícitamente el medio acuoso.
    const match = formula.match(/^(.+)\((ac|aq)\)$/i);

    if (!match) return null;

    return compuestos.find(
      x => x.formula === match[1]
    ) || null;
  };

  window.formularHidracido = function (entrada) {
    const nombre = normalizar(entrada);

    return compuestos.find(
      x => normalizar(x.tradicional) === nombre
    ) || null;
  };

  window.HIDRACIDOS_QUIMINTERACTIVA = compuestos;
})();
