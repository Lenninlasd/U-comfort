import { createStore } from 'redux';
import rootReducer from '../reducers/root.js';
import initState from '../model.js';
import enrichData from './enrichData.js';
import { getTempEntradaSerpentin, getcoolingLoad } from './coolingLoad.js';

const store = createStore(rootReducer, {
  vidrios: initState.elementos.vidrios,
  paredes: initState.elementos.paredes,
  techo: initState.elementos.techo,
  puertas: initState.elementos.puertas,
  piso: initState.elementos.piso,
  luces: initState.elementos.luces,
  depth: initState.depth,
  width: initState.width,
  height: initState.height,
  numberOfPeople: initState.numberOfPeople,
  exterior: initState.exterior,
  recinto: initState.recinto,
  cargaPico: initState.cargaPico
});

const posEnrichModel = {
  past: null,
  vidrios: [
    {
      orientacion: 'W',
      sombra: 'no',
      width: 25.298,
      height: 3.048,
      espesor_nominal: '3/16 a 1/4',
      tipo_de_vidrio: 'absorbente de calor',
      CLDT_tabla: 13,
      CLDT_correccion: 7,
      SHGF: 216,
      coeficiente_transferencia_calor: 1.04,
      CLF: 0.56,
      SC: 0.69,
      areaNeta: 829.9869297595808
    },
    {
      orientacion: 'W',
      sombra: 'no',
      width: 2.133,
      height: 1.828,
      espesor_nominal: '3/32 a 1/4',
      tipo_de_vidrio: 'claro',
      CLDT_tabla: 13,
      CLDT_correccion: 7,
      SHGF: 216,
      coeficiente_transferencia_calor: 1.04,
      CLF: 0.56,
      SC: 1,
      areaNeta: 41.9698241257115
    },
    {
      orientacion: 'E',
      sombra: 'no',
      width: 2.133,
      height: 1.828,
      espesor_nominal: '3/32 a 1/4',
      tipo_de_vidrio: 'claro',
      CLDT_tabla: 13,
      CLDT_correccion: 7,
      SHGF: 216,
      coeficiente_transferencia_calor: 1.04,
      CLF: 0.23,
      SC: 1,
      areaNeta: 41.9698241257115
    }
  ],
  paredes: [
    {
      orientacion: 'N',
      color: 'D',
      correcion_color_K: 1,
      type: 'superficie_oscura',
      material: 'MURO_EJEMPLO',
      tipo: 'PAREDES',
      CLDT_tabla: 15,
      correcion_latitud_mes_LM: 0,
      CLDT_correccion: 9,
      coeficiente_transferencia_calor: 0.13,
      areaNeta: 839.960683678741
    },
    {
      orientacion: 'S',
      color: 'D',
      correcion_color_K: 1,
      type: 'superficie_oscura',
      material: 'MURO_EJEMPLO',
      tipo: 'PAREDES',
      CLDT_tabla: 27,
      correcion_latitud_mes_LM: 1,
      CLDT_correccion: 22,
      coeficiente_transferencia_calor: 0.13,
      areaNeta: 839.960683678741
    },
    {
      orientacion: 'E',
      color: 'D',
      correcion_color_K: 1,
      type: 'superficie_oscura',
      material: 'MURO_EJEMPLO',
      tipo: 'PAREDES',
      CLDT_tabla: 32,
      correcion_latitud_mes_LM: 0,
      CLDT_correccion: 26,
      coeficiente_transferencia_calor: 0.13,
      areaNeta: 1176.0013772666887
    },
    {
      orientacion: 'W',
      color: 'D',
      correcion_color_K: 1,
      type: 'superficie_oscura',
      material: 'MURO_EJEMPLO',
      tipo: 'PAREDES',
      CLDT_tabla: 24,
      correcion_latitud_mes_LM: 0,
      CLDT_correccion: 18,
      coeficiente_transferencia_calor: 0.13,
      areaNeta: 387.9842716328194
    }
  ],
  techo: {
    color: 'D',
    correcion_color_K: 1,
    type: 'superficie_oscura',
    material: 'CUBIERTA_DE_EJEMPLO',
    tipo: 'TECHO',
    areaNeta: 5400.000345600005,
    CLDT_tabla: 71,
    correcion_latitud_mes_LM: 1,
    CLDT_correccion: 66,
    coeficiente_transferencia_calor: 0.09
  },
  puertas: [
    {
      width: 1.828,
      height: 2.133,
      orientacion: 'E',
      tipo: 'PUERTA',
      material: 'PUERTA_EJEMPLO',
      CLDT_tabla: 27,
      CLDT_correccion: 22,
      coeficiente_transferencia_calor: 0.18,
      areaNeta: 41.9698241257115
    }
  ],
  piso: { areaNeta: 5400.000345600005, coeficiente_transferencia_calor: 0.35, CLDT_correccion: 12 },
  luces: { numberOfLights: 135, wattsPorLampara: 60, factConv: 3.41 },
  results: {},
  depth: 27.432,
  width: 18.288,
  height: 4.267,
  numberOfPeople: 60,
  exterior: {
    id: 7,
    ciudad: 'Indianapolis',
    latitud: 40,
    bulbo_seco: 90,
    bulbo_humedo: 74,
    humedad_especifica: 101,
    mes_carga_de_enfriamiento: 'JUL',
    rango_diario: 22
  },
  recinto: {
    bulbo_seco: 78,
    humedad_relativa: 50,
    humedad_especifica: 72,
    actividad_recinto: 'PARADO, TRABAJO LIGERO O CAMINA DESPACIO',
    tipo_recinto: 'comercios: pisos de venta (pisos superiores)'
  },
  cargaPico: { fecha: '21-07-xxxx', hora: 17, promedio: 79 },
  appConfig: {}
};

test('It should enrich the initial data model', () => {
  enrichData(store.dispatch);
  expect(posEnrichModel).toMatchObject(store.getState());
});

test('Check getTempEntradaSerpentin', () => {
  const CFMnetoSensible = 10680;
  const CFMventilacion = 420;
  const exterior = { bulbo_seco: 90 };
  const recinto = { bulbo_seco: 78 };

  expect(getTempEntradaSerpentin(CFMnetoSensible, CFMventilacion, exterior, recinto)).toBeCloseTo(
    78.47
  );
});

test('Calculate the final getcoolingLoad', () => {
  const result = getcoolingLoad(store.getState());
  const expectedRasult = {
    cargaEnfriamiento: 300029.86841378885,
    CFMnetoSensible: 10680.836894834243,
    QS_QL: 297936.08514447906
  };
  expect(expectedRasult).toMatchObject(result);
});
