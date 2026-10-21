(function () {
  "use strict";

  const elementos = {
    B: "boro", C: "carbono", N: "nitrógeno",
    P: "fósforo", S: "azufre", Si: "silicio",
    Cl: "cloro", Br: "bromo", I: "yodo",
    F: "flúor"
  };

  const terminaciones = {
    O: "óxido", F: "fluoruro",
    Cl: "cloruro", Br: "bromuro",
    I: "yoduro", S: "sulfuro",
    N: "nitruro", P: "fosfuro"
  };

  const prefijos = {
    1: "mono", 2: "di", 3: "tri",
    4: "tetra", 5: "penta", 6: "hexa",
    7: "hepta", 8: "octa",
    9: "nona", 10: "deca"
  };

  const prefijoOxido = {
    1: "monóxido", 2: "dióxido",
    3: "trióxido", 4: "tetraóxido",
    5: "pentóxido", 6: "hexaóxido",
    7: "heptóxido", 8: "octaóxido",
    9: "nonaóxido", 10: "decaóxido"
  };

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function analizar(formula) {
    const limpia = String(formula || "")
      .trim()
      .replace(/\s+/g, "");

    const m = limpia.match(
      /^([A-Z][a-z]?)(\d*)([A-Z][a-z]?)(\d*)$/
    );

    if (!m) return null;

    const a = m[1];
    const na = Number(m[2] || 1);
    const b = m[3];
    const nb = Number(m[4] || 1);

    if (!elementos[a] || !terminaciones[b]) return null;
    if (a === b || na < 1 || nb < 1 ||
        na > 10 || nb > 10) return null;

    const primero = b === "O"
      ? prefijoOxido[nb]
      : (nb === 1 ? "mono" : prefijos[nb]) +
        terminaciones[b];

    const segundo = (na === 1 ? "" : prefijos[na]) +
      elementos[a];

    const nombre = `${primero} de ${segundo}`;

    return {
      formula: limpia,
      stock: nombre,
      sistematica: nombre,
      tradicional: "No determinada",
      tipo: "Compuesto binario entre no metales",
      pasos:
        `La fórmula contiene ${na} átomo(s) de ` +
        `${elementos[a]} y ${nb} átomo(s) del ` +
        `segundo elemento. Se utilizan prefijos ` +
        `estequiométricos para indicar las cantidades.`
    };
  }

  function formular(nombre) {
    const buscado = normalizar(nombre);

    for (const a of Object.keys(elementos)) {
      for (const b of Object.keys(terminaciones)) {
        if (a === b) continue;

        for (let na = 1; na <= 10; na++) {
          for (let nb = 1; nb <= 10; nb++) {
            const formula = a +
              (na === 1 ? "" : na) +
              b +
              (nb === 1 ? "" : nb);

            const resultado = analizar(formula);

            if (resultado &&
                normalizar(resultado.sistematica) === buscado) {
              return resultado;
            }
          }
        }
      }
    }

    return null;
  }

  window.analizarEstequiometrica = analizar;
  window.formularEstequiometrica = formular;
})();
