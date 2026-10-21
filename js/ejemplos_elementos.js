// QUIMINTERACTIVA - Ejemplos educativos de nomenclatura
(function () {
  "use strict";

  // Cada registro:
  // [formula, Stock, tradicional, sistematica]
  //
  // null indica que esa denominación no se ha
  // incorporado o validado para el ejemplo.

  const ejemplos = {
    Fe: [
      ["FeO",
       "Óxido de hierro(II)",
       "Óxido ferroso",
       "Monóxido de hierro"],

      ["Fe2O3",
       "Óxido de hierro(III)",
       "Óxido férrico",
       "Trióxido de dihierro"],

      ["FeCl3",
       "Cloruro de hierro(III)",
       "Cloruro férrico",
       "Tricloruro de hierro"],

      ["Fe(OH)3",
       "Hidróxido de hierro(III)",
       "Hidróxido férrico",
       "Trihidróxido de hierro"]
    ],

    Cu: [
      ["Cu2O",
       "Óxido de cobre(I)",
       "Óxido cuproso",
       "Monóxido de dicobre"],

      ["CuO",
       "Óxido de cobre(II)",
       "Óxido cúprico",
       "Monóxido de cobre"],

      ["CuCl2",
       "Cloruro de cobre(II)",
       "Cloruro cúprico",
       "Dicloruro de cobre"],

      ["Cu(OH)2",
       "Hidróxido de cobre(II)",
       "Hidróxido cúprico",
       "Dihidróxido de cobre"]
    ],

    Na: [
      ["Na2O",
       "Óxido de sodio",
       "Óxido sódico",
       "Monóxido de disodio"],

      ["NaOH",
       "Hidróxido de sodio",
       "Hidróxido sódico",
       "Monohidróxido de sodio"],

      ["NaCl",
       "Cloruro de sodio",
       "Cloruro sódico",
       "Monocloruro de sodio"]
    ],

    Ca: [
      ["CaO",
       "Óxido de calcio",
       "Óxido cálcico",
       "Monóxido de calcio"],

      ["Ca(OH)2",
       "Hidróxido de calcio",
       "Hidróxido cálcico",
       "Dihidróxido de calcio"],

      ["CaCO3",
       "Carbonato de calcio",
       "Carbonato cálcico",
       null]
    ],

    Al: [
      ["Al2O3",
       "Óxido de aluminio",
       "Óxido alumínico",
       "Trióxido de dialuminio"],

      ["Al(OH)3",
       "Hidróxido de aluminio",
       "Hidróxido alumínico",
       "Trihidróxido de aluminio"],

      ["AlCl3",
       "Cloruro de aluminio",
       "Cloruro alumínico",
       "Tricloruro de aluminio"]
    ],

    Mg: [
      ["MgO",
       "Óxido de magnesio",
       "Óxido magnésico",
       "Monóxido de magnesio"],

      ["Mg(OH)2",
       "Hidróxido de magnesio",
       "Hidróxido magnésico",
       "Dihidróxido de magnesio"]
    ],

    K: [
      ["K2O",
       "Óxido de potasio",
       "Óxido potásico",
       "Monóxido de dipotasio"],

      ["KOH",
       "Hidróxido de potasio",
       "Hidróxido potásico",
       "Monohidróxido de potasio"]
    ],

    Zn: [
      ["ZnO",
       "Óxido de zinc",
       null,
       "Monóxido de zinc"],

      ["Zn(OH)2",
       "Hidróxido de zinc",
       null,
       "Dihidróxido de zinc"]
    ],

    Ag: [
      ["Ag2O",
       "Óxido de plata(I)",
       null,
       "Monóxido de diplata"],

      ["AgCl",
       "Cloruro de plata",
       null,
       "Monocloruro de plata"]
    ],

    C: [
      ["CO2",
       "Óxido de carbono(IV)",
       "Anhídrido carbónico",
       "Dióxido de carbono"],

      ["CO",
       "Óxido de carbono(II)",
       "Óxido carbonoso",
       "Monóxido de carbono"]
    ],

    S: [
      ["SO2",
       "Óxido de azufre(IV)",
       "Anhídrido sulfuroso",
       "Dióxido de azufre"],

      ["SO3",
       "Óxido de azufre(VI)",
       "Anhídrido sulfúrico",
       "Trióxido de azufre"]
    ],

    N: [
      ["N2O5",
       "Óxido de nitrógeno(V)",
       "Anhídrido nítrico",
       "Pentóxido de dinitrógeno"],

      ["NO2",
       "Óxido de nitrógeno(IV)",
       null,
       "Dióxido de nitrógeno"]
    ],

    Si: [
      ["SiO2",
       "Óxido de silicio(IV)",
       "Anhídrido silícico",
       "Dióxido de silicio"]
    ]
  };

  window.EJEMPLOS_ELEMENTOS_QUIMINTERACTIVA = ejemplos;
})();
