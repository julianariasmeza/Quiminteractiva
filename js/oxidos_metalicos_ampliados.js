// QUIMINTERACTIVA
// Óxidos metálicos ampliados por estados de oxidación.

(function () {
  "use strict";

  const METALES = [
    { simbolo: "Au", nombre: "oro", estados: [1, 3] },
    { simbolo: "Mn", nombre: "manganeso", estados: [2, 3, 4, 6, 7] },
    { simbolo: "Fe", nombre: "hierro", estados: [2, 3] },
    { simbolo: "Cu", nombre: "cobre", estados: [1, 2] },
    { simbolo: "Cr", nombre: "cromo", estados: [2, 3, 6] },
    { simbolo: "Sn", nombre: "estaño", estados: [2, 4] },
    { simbolo: "Pb", nombre: "plomo", estados: [2, 4] },
    { simbolo: "Co", nombre: "cobalto", estados: [2, 3] },
    { simbolo: "Ni", nombre: "níquel", estados: [2, 3] },
    { simbolo: "Pt", nombre: "platino", estados: [2, 4] },
    { simbolo: "Bi", nombre: "bismuto", estados: [3, 5] }
  ];

  const ROMANOS = {
    1: "I", 2: "II", 3: "III", 4: "IV",
    5: "V", 6: "VI", 7: "VII"
  };

  const PREFIJOS = {
    1: "mon", 2: "di", 3: "tri", 4: "tetra",
    5: "penta", 6: "hexa", 7: "hepta"
  };

  function mcd(a, b) {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function formulaOxido(simbolo, estado) {
    const divisor = mcd(estado, 2);
    const cantidadMetal = 2 / divisor;
    const cantidadOxigeno = estado / divisor;

    return simbolo +
      (cantidadMetal === 1 ? "" : cantidadMetal) +
      "O" +
      (cantidadOxigeno === 1 ? "" : cantidadOxigeno);
  }

  function analizarOxidoMetalicoAmpliado(entrada) {
    const formula = String(entrada || "")
      .replace(/\s+/g, "")
      .replace(/[₀-₉]/g, c =>
        "₀₁₂₃₄₅₆₇₈₉".indexOf(c)
      );

    for (const metal of METALES) {
      for (const estado of metal.estados) {
        const calculada = formulaOxido(
          metal.simbolo,
          estado
        );

        if (formula !== calculada) continue;

        const divisor = mcd(estado, 2);
        const cantidadMetal = 2 / divisor;
        const cantidadOxigeno = estado / divisor;

        const prefijoOxigeno =
          PREFIJOS[cantidadOxigeno] || "";

        const prefijoMetal =
          cantidadMetal === 1
            ? ""
            : (PREFIJOS[cantidadMetal] || "");

        const sistematica =
          prefijoOxigeno + "óxido de " +
          prefijoMetal + metal.nombre;

        return {
          formula: calculada,
          stock:
            "óxido de " + metal.nombre +
            "(" + ROMANOS[estado] + ")",
          sistematica,
          tradicional: "Consultar denominación tradicional",
          tipo: "Óxido metálico",
          oxidacion: estado,
          pasos:
            "El oxígeno tiene número de oxidación -2. " +
            "El " + metal.nombre +
            " tiene número de oxidación +" + estado +
            ". Se equilibran las cargas: " +
            cantidadMetal + "(+" + estado + ") + " +
            cantidadOxigeno + "(-2) = 0. " +
            "La fórmula obtenida es " + calculada + "."
        };
      }
    }

    return null;
  }

  window.analizarOxidoMetalicoAmpliado =
    analizarOxidoMetalicoAmpliado;
})();
