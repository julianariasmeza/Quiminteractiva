// QUIMINTERACTIVA
// Nomenclatura Stock y clasificación de compuestos iónicos.

(function () {
  "use strict";

  const ROMANOS = {
    1: "I", 2: "II", 3: "III", 4: "IV",
    5: "V", 6: "VI", 7: "VII", 8: "VIII"
  };

  function nombreCation(cation) {
    if (cation.formula === "NH4") {
      return "amonio";
    }

    if (cation.formula === "H") {
      return "hidrógeno";
    }

    const base = window.IONES_QUIMINTERACTIVA;

    const estados = [
      ...new Set(
        base.cationes
          .filter(x => x.formula === cation.formula)
          .map(x => x.carga)
      )
    ];

    if (estados.length > 1) {
      return cation.nombre +
        "(" + (ROMANOS[cation.carga] || cation.carga) + ")";
    }

    return cation.nombre;
  }

  function clasificar(cation, anion) {
    const base = window.IONES_QUIMINTERACTIVA;

    if (anion.formula === "OH") {
      return "Hidróxido";
    }

    if (anion.formula === "H") {
      return "Hidruro";
    }

    if (base.anionesAcidos.some(
      x => x.formula === anion.formula &&
           x.carga === anion.carga
    )) {
      return "Sal ácida";
    }

    if (base.anionesSimples.some(
      x => x.formula === anion.formula &&
           x.carga === anion.carga
    )) {
      return "Sal binaria";
    }

    if (base.oxoaniones.some(
      x => x.formula === anion.formula &&
           x.carga === anion.carga
    )) {
      return "Oxisal";
    }

    return "Compuesto iónico";
  }

  function nombrarIones(
    formulaCation,
    cargaCation,
    formulaAnion,
    cargaAnion
  ) {
    const resultado = window.formularIones(
      formulaCation,
      cargaCation,
      formulaAnion,
      cargaAnion
    );

    if (resultado.error) {
      return resultado;
    }

    const { cation, anion } = resultado;

    const stock =
      anion.nombre + " de " + nombreCation(cation);

    return {
      ...resultado,
      stock,
      nombre: stock,
      tipo: clasificar(cation, anion),
      pasos: resultado.procedimiento
    };
  }

  window.nombrarIones = nombrarIones;
})();
