(function () {
  "use strict";

  const ejercicios = [];

  function agregar(tema, nivel, pregunta, respuesta, solucion) {
    ejercicios.push({
      tema,
      nivel,
      pregunta,
      respuesta: String(respuesta),
      solucion
    });
  }

  const compuestos = [
    ["NaCl", "Cloruro de sodio", "Na+", "Cl-"],
    ["CaO", "Óxido de calcio", "Ca2+", "O2-"],
    ["Fe2O3", "Óxido de hierro(III)", "Fe3+", "O2-"],
    ["Al2O3", "Óxido de aluminio", "Al3+", "O2-"],
    ["Ca(OH)2", "Hidróxido de calcio", "Ca2+", "OH-"],
    ["NaOH", "Hidróxido de sodio", "Na+", "OH-"],
    ["KNO3", "Nitrato de potasio", "K+", "NO3-"],
    ["CaCO3", "Carbonato de calcio", "Ca2+", "CO3(2-)"],
    ["CuSO4", "Sulfato de cobre(II)", "Cu2+", "SO4(2-)"],
    ["Al2(SO4)3", "Sulfato de aluminio", "Al3+", "SO4(2-)"],
    ["FeCl3", "Cloruro de hierro(III)", "Fe3+", "Cl-"],
    ["Ca3(PO4)2", "Fosfato de calcio", "Ca2+", "PO4(3-)"]
  ];

  compuestos.forEach(([formula, nombre, cation, anion], i) => {
    const nivel = i < 4 ? "basico" :
                  i < 8 ? "intermedio" : "avanzado";

    agregar(
      "formulacion", nivel,
      "Escribí la fórmula de " + nombre,
      formula,
      "Identificar los iones: " + cation + " y " + anion +
      ". Combinar en proporciones que neutralicen las cargas. " +
      "Fórmula final: " + formula
    );

    agregar(
      "nomenclatura", nivel,
      "Nombrá el compuesto " + formula,
      nombre,
      "Identificar los elementos o iones presentes. " +
      "Determinar el estado de oxidación cuando corresponde. " +
      "Nombre Stock: " + nombre
    );
  });

  const masas = [
    ["H2O", 18.015],
    ["CO2", 44.009],
    ["NaCl", 58.44],
    ["CaO", 56.077],
    ["NH3", 17.031],
    ["CH4", 16.043],
    ["CaCO3", 100.086],
    ["H2SO4", 98.072],
    ["Fe2O3", 159.687],
    ["Ca(OH)2", 74.092]
  ];

  masas.forEach(([formula, masa], i) => {
    agregar(
      "masa_molar",
      i < 4 ? "basico" : i < 8 ? "intermedio" : "avanzado",
      "Calculá la masa molar de " + formula + " en g/mol",
      masa.toFixed(3),
      "Sumar las masas atómicas de todos los átomos " +
      "presentes en " + formula +
      ". Resultado aproximado: " + masa.toFixed(3) + " g/mol."
    );
  });

  const conversiones = [
    [18.015, 1, "H2O"],
    [36.030, 2, "H2O"],
    [44.009, 1, "CO2"],
    [88.018, 2, "CO2"],
    [58.440, 1, "NaCl"],
    [116.880, 2, "NaCl"]
  ];

  conversiones.forEach(([gramos, moles, formula], i) => {
    const masa = gramos / moles;

    agregar(
      "conversiones",
      i < 2 ? "basico" : i < 4 ? "intermedio" : "avanzado",
      "¿Cuántos moles hay en " + gramos +
      " g de " + formula + "?",
      moles,
      "Datos: m = " + gramos + " g; M = " +
      masa.toFixed(3) + " g/mol. " +
      "Fórmula: n = m/M. " +
      "Sustitución: n = " + gramos + "/" +
      masa.toFixed(3) + ". " +
      "Respuesta: " + moles + " mol."
    );
  });

  const elementos = [
    ["Hidrógeno", "H", 1],
    ["Carbono", "C", 6],
    ["Oxígeno", "O", 8],
    ["Sodio", "Na", 11],
    ["Magnesio", "Mg", 12],
    ["Aluminio", "Al", 13],
    ["Cloro", "Cl", 17],
    ["Potasio", "K", 19],
    ["Calcio", "Ca", 20],
    ["Hierro", "Fe", 26],
    ["Cobre", "Cu", 29],
    ["Zinc", "Zn", 30]
  ];

  elementos.forEach(([nombre, simbolo, numero], i) => {
    const nivel = i < 4 ? "basico" :
                  i < 8 ? "intermedio" : "avanzado";

    agregar(
      "tabla_periodica", nivel,
      "¿Cuál es el símbolo del " + nombre + "?",
      simbolo,
      "El símbolo químico del " + nombre +
      " es " + simbolo + "."
    );

    agregar(
      "tabla_periodica", nivel,
      "¿Cuál es el número atómico del " + nombre + "?",
      numero,
      "El número atómico Z indica la cantidad de protones. " +
      "Para " + nombre + ", Z = " + numero + "."
    );
  });

  window.BANCO_QUIMICA = ejercicios;

  console.log(
    "Banco de química cargado:",
    ejercicios.length,
    "ejercicios."
  );
})();
