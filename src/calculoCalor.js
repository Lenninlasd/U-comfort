import tablaPsat from '../json/Psat_tabla_A4E_simp.js';

export const setCalorPersonas = (n_personas, correcion, tablaCalorPersonas, aplicacion) => {
  const heat = tablaCalorPersonas.find(x => x['ACTIVIDAD'] === aplicacion);
  const FCE = 1;

  return {
    sensible: heat.CALOR_SENSIBLE * n_personas * FCE * correcion,
    latente: heat.CALOR_LATENTE * n_personas
  };
};

export const setCalorVentilacion = (n_personas, Δtemp, ΔHumedad, cfmMinimo) => {
  const CFMventilacion = cfmMinimo * n_personas;

  return {
    sensible: 1.1 * CFMventilacion * Δtemp,
    latente: 0.68 * CFMventilacion * ΔHumedad,
    CFMventilacion
  };
};

export const getCFMCalorNetoSensible = totalSensible => {
  const ΔtempAireSuministro = 20;
  return totalSensible / (ΔtempAireSuministro * 1.1);
};

export const calculoTotalSensible = (
  windows = [{}],
  paredes = [{}],
  techo = {},
  puerta = [{}],
  factorCorrecion
) => {
  const getCalorSensibleWindow = element => {
    if (!element.length) return 0;

    return element
      .map(i => i.SHGF * i.areaNeta * i.SC * i.CLF * factorCorrecion)
      .reduce((acc, actual) => acc + actual);
  };

  const getCalorSensibleArray = element => {
    if (!element.length) return 0;

    return element.map(i => getCalorSensible(i)).reduce((anterior, actual) => anterior + actual);
  };

  const getCalorSensible = obj =>
    obj.coeficiente_transferencia_calor * obj.areaNeta * factorCorrecion * obj.CLTD_Correction;

  const calorWindow = getCalorSensibleArray(windows);
  const calorPared = getCalorSensibleArray(paredes);
  const calorTecho = getCalorSensible(techo);
  const calorPuerta = getCalorSensibleArray(puerta);
  const calorRadiacionWindow = getCalorSensibleWindow(windows);

  return calorWindow + calorPared + calorTecho + calorPuerta + calorRadiacionWindow;
};

export const getCalor_sensible = (windows, paredes, perimetro) => {
  let windowHeatTransfer = 0;
  let transferencia_calor_pared = 0;
  let window_area = 0;
  let area_pared = 0;

  if (windows.length) {
    windowHeatTransfer = windows[0].coeficiente_transferencia_calor;
    window_area = windows.reduce((a, b) => ({ areaNeta: a.areaNeta + b.areaNeta })).areaNeta;
  }
  if (paredes.length) {
    transferencia_calor_pared = paredes[0].coeficiente_transferencia_calor;
    area_pared = paredes.reduce((a, b) => ({ areaNeta: a.areaNeta + b.areaNeta })).areaNeta;
  }

  const K_ =
    (windowHeatTransfer * window_area + transferencia_calor_pared * area_pared) / perimetro;
  return 1 - 0.02 * K_;
};

const getPresionSat = tempBulbSecRecinto => {
  const tablaPsatN = tablaPsat.reduce((acc, el) => {
    acc[el.T_F] = Number(el.Psat_psi);
    return acc;
  }, {});

  if (tempBulbSecRecinto % 5 === 0) {
    return tablaPsatN[tempBulbSecRecinto];
  }

  const tempLimiteInferior = tempBulbSecRecinto - (tempBulbSecRecinto % 5);
  const tempLimiteSuperior = tempBulbSecRecinto + 5 - (tempBulbSecRecinto % 5);
  const presInferior = tablaPsatN[tempLimiteInferior];
  const presSuperior = tablaPsatN[tempLimiteSuperior];
  const tempRatio = (tempBulbSecRecinto - tempLimiteInferior) / 5;

  return tempRatio * (presSuperior - presInferior) + presInferior;
};

export const calcularHumedadEntradaSerp = ({ recinto, exterior }, tempEntradaSerp) => {
  const presionSatBulboSecoInterior = getPresionSat(recinto.bulbo_seco);
  const humedadRelativa = recinto.humedad_relativa / 100;
  const presionParcial = humedadRelativa * presionSatBulboSecoInterior;
  const presionAtmosferica = 14.696;

  const humedadAbsInterior =
    (7000 * 0.622 * presionParcial) / (presionAtmosferica - presionParcial);

  return (
    humedadAbsInterior +
    ((tempEntradaSerp - recinto.bulbo_seco) * (exterior.humedad_especifica - humedadAbsInterior)) /
      (exterior.bulbo_seco - recinto.bulbo_seco)
  );
};
