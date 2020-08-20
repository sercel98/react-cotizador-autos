export function obtenerDireferenciaAnios(anio) {
  return new Date().getFullYear() - anio;
}

export function calcularIncrementoMarca(marca) {
  let porcentajeIncremento;

  if (marca === "europeo") {
    porcentajeIncremento = 1.3;
  } else if (marca === "asiatico") {
    porcentajeIncremento = 1.05;
  } else {
    porcentajeIncremento = 1.15;
  }
  return porcentajeIncremento;
}

export function calcularIncrementoPlan(plan) {
  if (plan === "basico") {
    return 1.2;
  } else {
    return 1.5;
  }
}

export function primerMayuscula(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
