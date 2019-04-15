import tablePsat from '../json/Psat_tabla_A4E_simp.js';

export const setPeopleHeat = (numberOfPeople, correcion, heatPeopleTable, aplicacion) => {
  const heat = heatPeopleTable.find(x => x['ACTIVIDAD'] === aplicacion);
  const FCE = 1;

  return {
    sensible: heat.CALOR_SENSIBLE * numberOfPeople * FCE * correcion,
    latente: heat.CALOR_LATENTE * numberOfPeople
  };
};

export const setCalorVentilacion = (numberOfPeople, Δtemp, ΔHumedad, cfmMinimo) => {
  const CFMventilacion = cfmMinimo * numberOfPeople;

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
  walls = [{}],
  roof = {},
  door = [{}],
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

  const windowHeat = getCalorSensibleArray(windows);
  const wallHeat = getCalorSensibleArray(walls);
  const roofHeat = getCalorSensible(roof);
  const doorHeat = getCalorSensibleArray(door);
  const windowsRadiationHeat = getCalorSensibleWindow(windows);

  return windowHeat + wallHeat + roofHeat + doorHeat + windowsRadiationHeat;
};

export const getCalor_sensible = (windows, walls, perimetro) => {
  let windowHeatTransfer = 0;
  let wallHeatTransfer = 0;
  let window_area = 0;
  let wallArea = 0;

  if (windows.length) {
    windowHeatTransfer = windows[0].coeficiente_transferencia_calor;
    window_area = windows.reduce((a, b) => ({ areaNeta: a.areaNeta + b.areaNeta })).areaNeta;
  }
  if (walls.length) {
    wallHeatTransfer = walls[0].coeficiente_transferencia_calor;
    wallArea = walls.reduce((a, b) => ({ areaNeta: a.areaNeta + b.areaNeta })).areaNeta;
  }

  const K_ = (windowHeatTransfer * window_area + wallHeatTransfer * wallArea) / perimetro;
  return 1 - 0.02 * K_;
};

const getPresionSat = tempBulbSecRecinto => {
  const tablePsatN = tablePsat.reduce((acc, el) => {
    acc[el.T_F] = Number(el.Psat_psi);
    return acc;
  }, {});

  if (tempBulbSecRecinto % 5 === 0) {
    return tablePsatN[tempBulbSecRecinto];
  }

  const tempLimiteInferior = tempBulbSecRecinto - (tempBulbSecRecinto % 5);
  const tempLimiteSuperior = tempBulbSecRecinto + 5 - (tempBulbSecRecinto % 5);
  const presInferior = tablePsatN[tempLimiteInferior];
  const presSuperior = tablePsatN[tempLimiteSuperior];
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
