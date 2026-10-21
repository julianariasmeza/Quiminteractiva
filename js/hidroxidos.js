// QUIMINTERACTIVA - Nomenclatura de hidróxidos
(function () {
  "use strict";

  const romanos = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V"
  };

  const prefijos = {
    1: "mono", 2: "di", 3: "tri",
    4: "tetra", 5: "penta"
  };

  const tradicionales = {
    Li: {1: "lítico"},
    Na: {1: "sódico"},
    K: {1: "potásico"},
    Mg: {2: "magnésico"},
    Ca: {2: "cálcico"},
    Sr: {2: "estróncico"},
    Ba: {2: "bárico"},
    Al: {3: "alumínico"},
    Zn: {2: "zíncico"},
    Fe: {2: "ferroso", 3: "férrico"},
    Cu: {1: "cuproso", 2: "cúprico"},
    Co: {2: "cobaltoso", 3: "cobáltico"},
    Ni: {2: "niqueloso", 3: "niquélico"},
    Cr: {2: "cromoso", 3: "crómico"},
    Mn: {2: "manganoso", 3: "mangánico"},
    Sn: {2: "estañoso", 4: "estánnico"},
    Pb: {2: "plumboso", 4: "plúmbico"},
    Au: {1: "auroso", 3: "áurico"},
    Pt: {2: "platinoso", 4: "platínico"}
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

  function construir() {
    const base = window.IONES_QUIMINTERACTIVA;

    if (!base) return [];

    const registros = [];

    for (const metal of base.cationes) {
      if (["H", "NH4"].includes(metal.formula)) {
        continue;
      }

      const carga = metal.carga;

      if (!Number.isInteger(carga) ||
          carga < 1 || carga > 5) {
        continue;
      }

      const estados = new Set(
        base.cationes
          .filter(x => x.formula === metal.formula)
          .map(x => x.carga)
      );

      const formula =
        metal.formula +
        (carga === 1 ? "OH" : `(OH)${carga}`);

      const nombreMetal =
        estados.size > 1
          ? `${metal.nombre}(${romanos[carga]})`
          : metal.nombre;

      const stock = `hidróxido de ${nombreMetal}`;

      const sistematica =
        `${prefijos[carga]}hidróxido de ${metal.nombre}`;

      const adjetivo =
        tradicionales[metal.formula]?.[carga];

      const tradicional = adjetivo
        ? `hidróxido ${adjetivo}`
        : null;

      const pasos =
        `Catión: ${metal.formula} (+${carga}). ` +
        `Anión hidróxido: OH (-1). ` +
        `Se requieren ${carga} grupo(s) OH ` +
        `para neutralizar la carga positiva. ` +
        `Comprobación: (+${carga}) + ` +
        `${carga}(-1) = 0.`;

      registros.push({
        formula,
        stock,
        sistematica,
        tradicional,
        tipo: "Hidróxido",
        pasos
      });
    }

    return registros;
  }

  const registros = construir();

  window.analizarHidroxido = function (entrada) {
    const formula = normalizarFormula(entrada);

    return registros.find(
      x => x.formula === formula
    ) || null;
  };

  window.formularHidroxido = function (entrada) {
    const nombre = normalizarNombre(entrada);

    return registros.find(
      x =>
        normalizarNombre(x.stock) === nombre ||
        normalizarNombre(x.sistematica) === nombre ||
        (x.tradicional &&
         normalizarNombre(x.tradicional) === nombre)
    ) || null;
  };

  window.HIDROXIDOS_QUIMINTERACTIVA = registros;
})();
