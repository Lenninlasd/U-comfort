import {
  getCalor_sensible,
  setPeopleHeat,
  setCalorVentilacion,
  totalSensibleCalculation,
  getNetSensibleHeatCFM,
  calcularHumedadEntradaSerp
} from './heatCalculationHelpers.js';

import tablaCFM from '../../json/CFM_6_15';

// CFMventilacion = CFM_tabla * Numero de personas (ver function setCalorVentilacion)
export const getTempEntradaSerpentin = (netSensibleCFM, CFMventilacion, exterior, room) => {
  const aireExterior = CFMventilacion * exterior.bulbo_seco;
  const aireRetorno = room.bulbo_seco * (netSensibleCFM - CFMventilacion);
  return (aireExterior + aireRetorno) / netSensibleCFM;
};

const calorTotal = (tempEntradaSerpentin, netSensibleCFM, room, humedadEntradaSerp) => {
  const tempSalidaSerp = room.bulbo_seco - 20;
  const humedadSalidaSerp = 65;
  const QS = 1.1 * netSensibleCFM * (tempEntradaSerpentin - tempSalidaSerp);
  const QL = 0.68 * netSensibleCFM * (humedadEntradaSerp - humedadSalidaSerp);
  return { QS, QL };
};

export const getcoolingLoad = state => {
  const FEET = 3.28084;

  const Δtemp = state.exterior.bulbo_seco - state.room.bulbo_seco;
  const ΔHumedad = state.exterior.humedad_especifica - state.room.humedad_especifica;
  const perimeter = 2 * FEET * (state.width + state.depth);
  const SensibleHeatCorrectionFactor = getCalor_sensible(state.windows, state.walls, perimeter);

  const lightsHeat =
    state.lights.wattsPorLampara *
    state.lights.numberOfLights *
    state.lights.factConv *
    SensibleHeatCorrectionFactor;

  const heatEquipments =
    state.floor.areaNeta * state.lights.factConv * state.room.equitmentWattsPerSquaredFoot;

  const calorPersonas = setPeopleHeat(
    state.numberOfPeople,
    SensibleHeatCorrectionFactor,
    state.room.roomActivity
  );

  const cfmMinimo = Number(tablaCFM.find(x => x.lugar === state.room.typeOfRoom)['cfm_minimo']);

  const calorVentilacion = setCalorVentilacion(state.numberOfPeople, Δtemp, ΔHumedad, cfmMinimo);

  //Calculo final
  const sensibleEl = totalSensibleCalculation(
    state.windows,
    state.walls,
    state.roof,
    state.doors,
    SensibleHeatCorrectionFactor
  );

  const ganancia_calor_recinto = sensibleEl + lightsHeat + calorPersonas.sensible + heatEquipments;

  const ganancia_ventilador_forzado = ganancia_calor_recinto * 0.025;

  const totalSensible =
    ganancia_calor_recinto + calorVentilacion.sensible + ganancia_ventilador_forzado;

  const netSensibleCFM = getNetSensibleHeatCFM(totalSensible);

  const tempEntradaSerpentin = getTempEntradaSerpentin(
    netSensibleCFM,
    calorVentilacion.CFMventilacion,
    state.exterior,
    state.room
  );

  const humedadEntradaSerp = calcularHumedadEntradaSerp(state, tempEntradaSerpentin);

  const { QS, QL } = calorTotal(
    tempEntradaSerpentin,
    netSensibleCFM,
    state.room,
    humedadEntradaSerp
  );
  const coolingLoad = totalSensible + calorPersonas.latente + calorVentilacion.latente;

  return {
    coolingLoad,
    netSensibleCFM,
    QS_QL: QS + QL
  };
};
