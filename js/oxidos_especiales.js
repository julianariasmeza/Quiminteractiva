// QUIMINTERACTIVA
// Peróxidos, superóxidos y óxidos mixtos.
// Colección inicial de compuestos conocidos.

const OXIDOS_ESPECIALES = {
  Na2O2: {
    stock: "Peróxido de sodio",
    sistematica: "Dióxido de disodio",
    tradicional: "Peróxido sódico",
    tipo: "Peróxido",
    pasos: "El grupo peróxido es O₂²⁻. Cada oxígeno tiene número de oxidación −1. Por tanto: 2(+1) + 2(−1) = 0."
  },
  K2O2: {
    stock: "Peróxido de potasio",
    sistematica: "Dióxido de dipotasio",
    tradicional: "Peróxido potásico",
    tipo: "Peróxido",
    pasos: "El grupo O₂²⁻ tiene carga −2. Los dos átomos de potasio aportan +2. Cada oxígeno tiene número de oxidación −1."
  },
  H2O2: {
    stock: "Peróxido de hidrógeno",
    sistematica: "Dióxido de dihidrógeno",
    tradicional: "Agua oxigenada (nombre habitual de su disolución acuosa)",
    tipo: "Peróxido",
    pasos: "El hidrógeno tiene número de oxidación +1. Entonces: 2(+1) + 2x = 0; x = −1."
  },
  CaO2: {
    stock: "Peróxido de calcio",
    sistematica: "Dióxido de calcio",
    tradicional: "Peróxido cálcico",
    tipo: "Peróxido",
    pasos: "El calcio tiene número de oxidación +2 y el grupo peróxido O₂²⁻ tiene carga −2. Cada oxígeno tiene número de oxidación −1."
  },
  BaO2: {
    stock: "Peróxido de bario",
    sistematica: "Dióxido de bario",
    tradicional: "Peróxido bárico",
    tipo: "Peróxido",
    pasos: "El bario aporta +2 y el grupo peróxido O₂²⁻ aporta −2. Cada oxígeno tiene número de oxidación −1."
  },
  KO2: {
    stock: "Superóxido de potasio",
    sistematica: "Dióxido de potasio",
    tradicional: "Superóxido potásico",
    tipo: "Superóxido",
    pasos: "El potasio tiene número de oxidación +1. El grupo superóxido O₂⁻ tiene carga −1. El número de oxidación promedio del oxígeno es −1/2."
  },
  RbO2: {
    stock: "Superóxido de rubidio",
    sistematica: "Dióxido de rubidio",
    tradicional: "Superóxido de rubidio",
    tipo: "Superóxido",
    pasos: "El rubidio aporta +1 y el grupo superóxido O₂⁻ aporta −1. El número de oxidación promedio del oxígeno es −1/2."
  },
  CsO2: {
    stock: "Superóxido de cesio",
    sistematica: "Dióxido de cesio",
    tradicional: "Superóxido de cesio",
    tipo: "Superóxido",
    pasos: "El cesio aporta +1 y el grupo superóxido O₂⁻ aporta −1. El número de oxidación promedio del oxígeno es −1/2."
  },
  Fe3O4: {
    stock: "Óxido de hierro(II,III)",
    sistematica: "Tetraóxido de trihierro",
    tradicional: "Óxido ferroso-férrico",
    tipo: "Óxido mixto",
    pasos: "Cuatro oxígenos aportan −8. Un hierro(II) y dos hierros(III) aportan +2 + 2(+3) = +8. La suma es cero."
  },
  Pb3O4: {
    stock: "Óxido de plomo(II,IV)",
    sistematica: "Tetraóxido de triplomo",
    tradicional: "Minio",
    tipo: "Óxido mixto",
    pasos: "Cuatro oxígenos aportan −8. Dos plomos(II) y un plomo(IV) aportan 2(+2) + (+4) = +8. La suma es cero."
  }
};

function analizarOxidoEspecial(formula) {
  const limpia = formula.trim()
    .replace(/\s+/g, "")
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g,
      c => "₀₁₂₃₄₅₆₇₈₉".indexOf(c));

  const datos = OXIDOS_ESPECIALES[limpia];

  if (!datos) return null;

  return {
    formula: limpia,
    ...datos
  };
}

window.analizarOxidoEspecial = analizarOxidoEspecial;
