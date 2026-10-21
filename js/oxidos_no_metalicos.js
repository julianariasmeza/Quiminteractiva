// QUIMINTERACTIVA
// Óxidos no metálicos: colección inicial validada.
// Los nombres tradicionales se incluyen solo cuando corresponde.

const OXIDOS_NO_METALICOS = {
  CO:    ["carbono", 1, 1, "monóxido de carbono", null],
  CO2:   ["carbono", 1, 2, "dióxido de carbono", "anhídrido carbónico"],
  SO2:   ["azufre", 1, 2, "dióxido de azufre", "anhídrido sulfuroso"],
  SO3:   ["azufre", 1, 3, "trióxido de azufre", "anhídrido sulfúrico"],
  NO:    ["nitrógeno", 1, 1, "monóxido de nitrógeno", "óxido nítrico"],
  NO2:   ["nitrógeno", 1, 2, "dióxido de nitrógeno", null],
  N2O:   ["nitrógeno", 2, 1, "monóxido de dinitrógeno", "óxido nitroso"],
  N2O3:  ["nitrógeno", 2, 3, "trióxido de dinitrógeno", "anhídrido nitroso"],
  N2O5:  ["nitrógeno", 2, 5, "pentóxido de dinitrógeno", "anhídrido nítrico"],
  P2O3:  ["fósforo", 2, 3, "trióxido de difósforo", "anhídrido fosforoso"],
  P2O5:  ["fósforo", 2, 5, "pentóxido de difósforo", "anhídrido fosfórico"],
  Cl2O:  ["cloro", 2, 1, "monóxido de dicloro", "anhídrido hipocloroso"],
  Cl2O3: ["cloro", 2, 3, "trióxido de dicloro", "anhídrido cloroso"],
  Cl2O5: ["cloro", 2, 5, "pentóxido de dicloro", "anhídrido clórico"],
  Cl2O7: ["cloro", 2, 7, "heptóxido de dicloro", "anhídrido perclórico"]
};

function analizarOxidoNoMetalico(formula) {
  const limpia = formula.trim()
    .replace(/\s+/g, "")
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g,
      c => "₀₁₂₃₄₅₆₇₈₉".indexOf(c));

  const datos = OXIDOS_NO_METALICOS[limpia];

  if (!datos) return null;

  const [nombre, cantidad, oxigenos, sistematica, tradicional] = datos;

  const oxidacion = 2 * oxigenos / cantidad;

  const romanos = {
    1:"I", 2:"II", 3:"III", 4:"IV",
    5:"V", 6:"VI", 7:"VII"
  };

  const stock = `Óxido de ${nombre}(${romanos[oxidacion]})`;

  const pasos =
    `El oxígeno tiene número de oxidación −2. ` +
    `Por neutralidad: ${cantidad}x + ${oxigenos}(−2) = 0. ` +
    `Despejando: x = (2 × ${oxigenos}) / ${cantidad} = +${oxidacion}.`;

  return {
    formula: limpia,
    stock,
    sistematica,
    tradicional: tradicional || "Sin nombre tradicional registrado",
    tipo: "Óxido no metálico",
    oxidacion,
    pasos
  };
}

window.analizarOxidoNoMetalico = analizarOxidoNoMetalico;
