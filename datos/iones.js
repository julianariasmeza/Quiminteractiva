// QUIMINTERACTIVA
// Base de iones comunes para secundaria en Costa Rica.
// carga: carga eléctrica del ion.
// Las fórmulas no incluyen el signo de la carga.

const IONES_QUIMINTERACTIVA = {
  cationes: [
    { formula: "H", nombre: "hidrógeno", carga: 1 },
    { formula: "Li", nombre: "litio", carga: 1 },
    { formula: "Na", nombre: "sodio", carga: 1 },
    { formula: "K", nombre: "potasio", carga: 1 },
    { formula: "Rb", nombre: "rubidio", carga: 1 },
    { formula: "Cs", nombre: "cesio", carga: 1 },
    { formula: "Ag", nombre: "plata", carga: 1 },
    { formula: "NH4", nombre: "amonio", carga: 1 },

    { formula: "Mg", nombre: "magnesio", carga: 2 },
    { formula: "Ca", nombre: "calcio", carga: 2 },
    { formula: "Sr", nombre: "estroncio", carga: 2 },
    { formula: "Ba", nombre: "bario", carga: 2 },
    { formula: "Zn", nombre: "zinc", carga: 2 },
    { formula: "Cd", nombre: "cadmio", carga: 2 },

    { formula: "Al", nombre: "aluminio", carga: 3 },

    { formula: "Fe", nombre: "hierro", carga: 2 },
    { formula: "Fe", nombre: "hierro", carga: 3 },
    { formula: "Cu", nombre: "cobre", carga: 1 },
    { formula: "Cu", nombre: "cobre", carga: 2 },
    { formula: "Co", nombre: "cobalto", carga: 2 },
    { formula: "Co", nombre: "cobalto", carga: 3 },
    { formula: "Ni", nombre: "níquel", carga: 2 },
    { formula: "Ni", nombre: "níquel", carga: 3 },
    { formula: "Cr", nombre: "cromo", carga: 2 },
    { formula: "Cr", nombre: "cromo", carga: 3 },
    { formula: "Mn", nombre: "manganeso", carga: 2 },
    { formula: "Mn", nombre: "manganeso", carga: 3 },
    { formula: "Sn", nombre: "estaño", carga: 2 },
    { formula: "Sn", nombre: "estaño", carga: 4 },
    { formula: "Pb", nombre: "plomo", carga: 2 },
    { formula: "Pb", nombre: "plomo", carga: 4 },
    { formula: "Hg", nombre: "mercurio", carga: 2 },
    { formula: "Au", nombre: "oro", carga: 1 },
    { formula: "Au", nombre: "oro", carga: 3 },
    { formula: "Bi", nombre: "bismuto", carga: 3 },
    { formula: "Bi", nombre: "bismuto", carga: 5 },
    { formula: "Pt", nombre: "platino", carga: 2 },
    { formula: "Pt", nombre: "platino", carga: 4 }
  ],

  anionesSimples: [
    { formula: "F", nombre: "fluoruro", carga: -1 },
    { formula: "Cl", nombre: "cloruro", carga: -1 },
    { formula: "Br", nombre: "bromuro", carga: -1 },
    { formula: "I", nombre: "yoduro", carga: -1 },
    { formula: "CN", nombre: "cianuro", carga: -1 },
    { formula: "SCN", nombre: "tiocianato", carga: -1 },
    { formula: "H", nombre: "hidruro", carga: -1 },
    { formula: "S", nombre: "sulfuro", carga: -2 },
    { formula: "Se", nombre: "seleniuro", carga: -2 },
    { formula: "N", nombre: "nitruro", carga: -3 },
    { formula: "P", nombre: "fosfuro", carga: -3 },
    { formula: "C", nombre: "carburo", carga: -4 }
  ],

  oxoaniones: [
    { formula: "OH", nombre: "hidróxido", carga: -1 },
    { formula: "CH3COO", nombre: "acetato", carga: -1 },

    { formula: "ClO", nombre: "hipoclorito", carga: -1 },
    { formula: "ClO2", nombre: "clorito", carga: -1 },
    { formula: "ClO3", nombre: "clorato", carga: -1 },
    { formula: "ClO4", nombre: "perclorato", carga: -1 },

    { formula: "BrO", nombre: "hipobromito", carga: -1 },
    { formula: "BrO2", nombre: "bromito", carga: -1 },
    { formula: "BrO3", nombre: "bromato", carga: -1 },
    { formula: "BrO4", nombre: "perbromato", carga: -1 },

    { formula: "IO", nombre: "hipoyodito", carga: -1 },
    { formula: "IO2", nombre: "yodito", carga: -1 },
    { formula: "IO3", nombre: "yodato", carga: -1 },
    { formula: "IO4", nombre: "peryodato", carga: -1 },

    { formula: "NO2", nombre: "nitrito", carga: -1 },
    { formula: "NO3", nombre: "nitrato", carga: -1 },
    { formula: "MnO4", nombre: "permanganato", carga: -1 },

    { formula: "CO3", nombre: "carbonato", carga: -2 },
    { formula: "SO3", nombre: "sulfito", carga: -2 },
    { formula: "SO4", nombre: "sulfato", carga: -2 },
    { formula: "S2O3", nombre: "tiosulfato", carga: -2 },
    { formula: "CrO4", nombre: "cromato", carga: -2 },
    { formula: "Cr2O7", nombre: "dicromato", carga: -2 },
    { formula: "MnO4", nombre: "manganato", carga: -2 },
    { formula: "SiO3", nombre: "silicato", carga: -2 },

    { formula: "PO3", nombre: "fosfito", carga: -3 },
    { formula: "PO4", nombre: "fosfato", carga: -3 },
    { formula: "AsO3", nombre: "arsenito", carga: -3 },
    { formula: "AsO4", nombre: "arsenato", carga: -3 },
    { formula: "BO3", nombre: "borato", carga: -3 },
    { formula: "AlO3", nombre: "aluminato", carga: -3 },

    { formula: "P2O7", nombre: "difosfato", carga: -4 }
  ],

  anionesAcidos: [
    { formula: "HCO3", nombre: "hidrogenocarbonato", carga: -1 },
    { formula: "HSO3", nombre: "hidrogenosulfito", carga: -1 },
    { formula: "HSO4", nombre: "hidrogenosulfato", carga: -1 },
    { formula: "HS", nombre: "hidrogenosulfuro", carga: -1 },
    { formula: "H2PO4", nombre: "dihidrogenofosfato", carga: -1 },
    { formula: "HPO4", nombre: "hidrogenofosfato", carga: -2 }
  ]
};

window.IONES_QUIMINTERACTIVA = IONES_QUIMINTERACTIVA;
