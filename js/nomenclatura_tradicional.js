// QUIMINTERACTIVA - Nomenclatura tradicional
(function () {
  "use strict";

  // Estados de oxidación y raíces tradicionales.
  const metales = [
    { simbolo: "Fe", nombre: "hierro", raiz: "ferr", estados: [2, 3] },
    { simbolo: "Cu", nombre: "cobre", raiz: "cupr", estados: [1, 2] },
    { simbolo: "Sn", nombre: "estaño", raiz: "estann", estados: [2, 4] },
    { simbolo: "Pb", nombre: "plomo", raiz: "plumb", estados: [2, 4] },
    { simbolo: "Au", nombre: "oro", raiz: "aur", estados: [1, 3] },
    { simbolo: "Hg", nombre: "mercurio", raiz: "mercur", estados: [1, 2] },
    { simbolo: "Co", nombre: "cobalto", raiz: "cobalt", estados: [2, 3] },
    { simbolo: "Ni", nombre: "níquel", raiz: "niquel", estados: [2, 3] },
    { simbolo: "Pt", nombre: "platino", raiz: "platin", estados: [2, 4] }
  ];

  // Aniones simples para sales binarias y óxidos.
  const aniones = [
    { simbolo: "O", nombre: "óxido", carga: 2 },
    { simbolo: "Cl", nombre: "cloruro", carga: 1 },
    { simbolo: "Br", nombre: "bromuro", carga: 1 },
    { simbolo: "I", nombre: "yoduro", carga: 1 },
    { simbolo: "F", nombre: "fluoruro", carga: 1 },
    { simbolo: "S", nombre: "sulfuro", carga: 2 },
    { simbolo: "Se", nombre: "seleniuro", carga: 2 }
  ];

  const romanos = {
    1: "I", 2: "II", 3: "III", 4: "IV"
  };

  function mcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
  }

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

  function formular(metal, cargaMetal, anion) {
    const divisor = mcd(cargaMetal, anion.carga);
    const cantidadMetal = anion.carga / divisor;
    const cantidadAnion = cargaMetal / divisor;

    return metal.simbolo +
      (cantidadMetal === 1 ? "" : cantidadMetal) +
      anion.simbolo +
      (cantidadAnion === 1 ? "" : cantidadAnion);
  }

  const registros = [];

  for (const metal of metales) {
    for (const [indice, estado] of metal.estados.entries()) {
      const terminacion = indice === 0 ? "oso" : "ico";
      const adjetivo = metal.raiz + terminacion;

      for (const anion of aniones) {
        // Hg(I) existe como catión dimérico Hg2²⁺.
        // Su formulación requiere un tratamiento especial.
        if (metal.simbolo === "Hg" && estado === 1) continue;

        const formula = formular(metal, estado, anion);
        const tradicional = `${anion.nombre} ${adjetivo}`;
        const stock = `${anion.nombre} de ${metal.nombre}(${romanos[estado]})`;

        registros.push({
          formula,
          stock,
          tradicional,
          sistematica: "No incorporada en este módulo",
          tipo: anion.simbolo === "O"
            ? "Óxido metálico"
            : "Sal binaria",
          pasos:
            `Metal: ${metal.simbolo}, número de oxidación +${estado}. ` +
            `Anión: ${anion.simbolo}, número de oxidación -${anion.carga}. ` +
            `Se equilibran las cargas y se simplifican los subíndices. ` +
            `La terminación ${terminacion === "oso" ? "-oso" : "-ico"} ` +
            `corresponde al estado ${terminacion === "oso" ? "menor" : "mayor"} ` +
            `de los dos considerados para ${metal.nombre}.`
        });
      }
    }
  }

  window.formularNombreTradicional = function (entrada) {
    const nombre = normalizar(entrada);
    return registros.find(
      r => normalizar(r.tradicional) === nombre
    ) || null;
  };

  window.analizarFormulaTradicional = function (entrada) {
    const formula = normalizarFormula(entrada);
    return registros.find(
      r => r.formula === formula
    ) || null;
  };

  window.TRADICIONAL_QUIMINTERACTIVA = registros;
})();
