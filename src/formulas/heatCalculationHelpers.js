/* eslint-disable no-console */
import tablePsat from '../../json/Psat_tabla_A4E_simp.js';
import heatPeopleTable from '../../json/calor_personas_6_11';

export const setPeopleHeat = (numberOfPeople, correcion, aplicacion) => {
  const heat = heatPeopleTable.find(x => x['ACTIVIDAD'] === aplicacion);
  const FCE = 1;

  return {
    sensible: heat.CALOR_SENSIBLE * numberOfPeople * FCE * correcion,
    latente: heat.CALOR_LATENTE * numberOfPeople
  };
};

export const setCalorVentilacion = (numberOfPeople, Δtemp, ΔHumedad, cfmMinimo) => {
  const CFMventilacion = cfmMinimo * numberOfPeople;
  const sensible = Number((1.1 * CFMventilacion * Δtemp).toFixed(3));
  return {
    sensible,
    latente: 0.68 * CFMventilacion * ΔHumedad,
    CFMventilacion
  };
};

export const getNetSensibleHeatCFM = totalSensible => {
  const ΔtempAireSuministro = 20;
  return totalSensible / (ΔtempAireSuministro * 1.1);
};

export const totalSensibleCalculation = (
  windows = [],
  walls = [],
  roof = {},
  door = [],
  factorCorrecion = 1
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

  const getCalorSensible = obj => {
    if (Object.keys(obj).length == 0) return 0;
    return (
      obj.coeficiente_transferencia_calor * obj.areaNeta * factorCorrecion * obj.CLTD_Correction
    );
  };

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

export const calcularHumedadEntradaSerp = ({ room, exterior }, tempEntradaSerp) => {
  const presionSatBulboSecoInterior = getPresionSat(room.bulbo_seco);
  const humedadRelativa = room.humedad_relativa / 100;
  const presionParcial = humedadRelativa * presionSatBulboSecoInterior;
  const presionAtmosferica = 14.696;

  const humedadAbsInterior =
    (7000 * 0.622 * presionParcial) / (presionAtmosferica - presionParcial);

  return (
    humedadAbsInterior +
    ((tempEntradaSerp - room.bulbo_seco) * (exterior.humedad_especifica - humedadAbsInterior)) /
      (exterior.bulbo_seco - room.bulbo_seco)
  );
};
