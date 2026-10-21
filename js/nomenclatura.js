// QUIMINTERACTIVA
// Motor inicial de nomenclatura de óxidos metálicos

const METALES_OXIDOS = {
  Li: { nombre: "litio", estados: [1] },
  Na: { nombre: "sodio", estados: [1] },
  K:  { nombre: "potasio", estados: [1] },
  Mg: { nombre: "magnesio", estados: [2] },
  Ca: { nombre: "calcio", estados: [2] },
  Ba: { nombre: "bario", estados: [2] },
  Al: { nombre: "aluminio", estados: [3] },
  Zn: { nombre: "zinc", estados: [2] },
  Fe: { nombre: "hierro", estados: [2, 3] },
  Cu: { nombre: "cobre", estados: [1, 2] },
  Ni: { nombre: "níquel", estados: [2, 3] },
  Co: { nombre: "cobalto", estados: [2, 3] },
  Sn: { nombre: "estaño", estados: [2, 4] },
  Pb: { nombre: "plomo", estados: [2, 4] },
  Cr: { nombre: "cromo", estados: [2, 3, 6] }
};

function numeroRomano(numero) {
  const romanos = {
    1: "I", 2: "II", 3: "III",
    4: "IV", 5: "V", 6: "VI"
  };
  return romanos[numero] || String(numero);
}

function prefijoQuimico(numero) {
  const prefijos = {
    1: "mono", 2: "di", 3: "tri",
    4: "tetra", 5: "penta", 6: "hexa",
    7: "hepta", 8: "octa"
  };
  return prefijos[numero] || "";
}

function analizarOxidoMetalico(formula) {
  const limpia = formula.trim().replace(/\s+/g, "");

  const coincidencia =
    limpia.match(/^([A-Z][a-z]?)(\d*)O(\d*)$/);

  if (!coincidencia) return null;

  const simbolo = coincidencia[1];
  const metal = METALES_OXIDOS[simbolo];

  if (!metal) return null;

  const cantidadMetal = Number(coincidencia[2] || 1);
  const cantidadOxigeno = Number(coincidencia[3] || 1);

  if (
    cantidadMetal < 1 || cantidadOxigeno < 1 ||
    cantidadMetal > 8 || cantidadOxigeno > 8
  ) return null;

  const oxidacion = (2 * cantidadOxigeno) / cantidadMetal;

  if (!metal.estados.includes(oxidacion)) return null;

  const stock = metal.estados.length === 1
    ? `Óxido de ${metal.nombre}`
    : `Óxido de ${metal.nombre}(${numeroRomano(oxidacion)})`;

  const prefijoOxigeno = prefijoQuimico(cantidadOxigeno);
  const prefijoMetal = cantidadMetal === 1
    ? ""
    : prefijoQuimico(cantidadMetal);

  const sistematica =
    `${prefijoOxigeno}óxido de ${prefijoMetal}${metal.nombre}`;

  const procedimiento =
    `El oxígeno tiene número de oxidación -2. ` +
    `La neutralidad eléctrica exige: ` +
    `${cantidadMetal}x + ${cantidadOxigeno}(-2) = 0. ` +
    `Despejando: x = (2 × ${cantidadOxigeno}) / ${cantidadMetal} = +${oxidacion}.`;

  return {
    formula: limpia,
    stock,
    sistematica,
    tradicional: "Consultar nomenclatura tradicional",
    tipo: "Óxido metálico",
    oxidacion,
    pasos: procedimiento
  };
}

window.analizarOxidoMetalico = analizarOxidoMetalico;
