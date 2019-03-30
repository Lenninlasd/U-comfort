import TABLA_WINDOW from '../../json/CLTD_vidrio';
import TABLA_TECHO from '../../json/CLTD_techo';
import TABLA_SHGF from '../../json/SHGF_lat_40';
import TABLA_U_WINDOW from '../../json/U_vidrios';
import TABLA_CLF from '../../json/CLF_6_8_min';
import TABLA_SC from '../../json/SC_tabla_6_7';
import TABLA_PARED from '../../json/CLTD_pared';
import TABLA_LM from '../../json/LM_6_4';
import TABLA_U_TECHO_PARED_PARTICION from '../../json/U_techos_paredes_particiones';
import { getCargaEnfriamiento } from '../cargaEnfriamiento.js';

import {
  CALC_AREA_FLOOR,
  SET_U_FLOOR,
  SET_FLOOR_CLTD_CORRECTION,
  CALC_AREA_ROOF,
  SET_NUMBER_OF_LIGHTS,
  SET_ROOM_ACTIVITY,
  SET_ROOM_TYPE,
  CALC_GROSS_WALL_AREA,
  SET_CARGA_ENFRIAMIENTO,
  SET_U_1_DOOR,
  UPDATE_PROP_DOOR,
  CALC_AREA_DOOR,
  REMOVE_DOOR,
  ADD_DOOR,
  SET_UNDO_DOORS,
  SET_EXTERIOR_CONDITIONS,
  SET_U_1_ROOF,
  SET_COLOR_K_ROOF,
  SET_CLTD_ROOF,
  SET_CLTD_ROOF_CORRECTION,
  SET_LM_ROOF,
  SET_U_ROOF,
  SET_U_1_WALL,
  SET_COLOR_K_WALL,
  SET_UNDO_WALL,
  SET_CLTD_WALL,
  SET_LM_WALL,
  SET_CLTD_CORRECCION_WALL,
  SET_U_WALL,
  SET_CLTD_WINDOW,
  SET_CLTD_CORRECCION_WINDOW,
  SET_SHGF_LAT_40_WINDOW,
  SET_U_WINDOW,
  SET_CLF_WINDOW,
  SET_SC_WINDOW,
  CALC_AREA_WINDOW_ALL,
  CALC_AREA_WINDOW,
  UPDATE_PROP_WINDOW,
  REMOVE_WINDOW,
  ADD_WINDOW,
  SET_UNDO_WINDOWS,
  SET_U_DOOR,
  CALC_AREA_DOOR_ALL
} from '../actions';

const sqrFEET = 3.28084 * 3.28084;

const setLM = (mes = 'JUL', lat = 40) =>
  TABLA_LM.find(x => Number(x.LATITUD) === lat && x.MES === mes);

const setLMparedes = (paredesState, dataLM) => {
  return paredesState.map(pared =>
    Object.assign({}, pared, {
      correcion_latitud_mes_LM: Number(dataLM[pared.orientacion])
    })
  );
};

const setLMtecho = (techoState, dataLM) => {
  return Object.assign({}, techoState, {
    correcion_latitud_mes_LM: Number(dataLM['HORA'])
  });
};

const calcAreaAll = state =>
  state.map(el =>
    Object.assign({}, el, {
      areaNeta: el.width * el.height * sqrFEET
    })
  );

const getDataTemperature = ({ exterior, recinto }) => ({
  tempExterior: exterior.bulbo_seco,
  tempInterior: recinto.bulbo_seco,
  rango_diario: exterior.rango_diario,
  Δtemp: exterior.bulbo_seco - recinto.bulbo_seco
});

const setCLDT_vidrios = glassState => {
  const peakHour = '17';
  const CLDT_tabla = Number(TABLA_WINDOW[0][peakHour]);
  return glassState.map(glass =>
    Object.assign({}, glass, {
      CLDT_tabla
    })
  );
};

const setCLDT_correccion = (state, action) => {
  const DeltaTempDiseno = 85 - 78;

  const CLDT_Obj = el => {
    const LM = el.correcion_latitud_mes_LM;
    const K = el.correcion_color_K;
    const CLDT_temp =
      LM !== undefined && K !== undefined ? (el.CLDT_tabla + LM) * K : el.CLDT_tabla;

    return Object.assign({}, el, {
      CLDT_correccion:
        CLDT_temp +
        DeltaTempDiseno +
        action.tempExterior -
        0.5 * action.rango_diario -
        action.tempInterior
    });
  };
  return Array.isArray(state) ? state.map(CLDT_Obj) : CLDT_Obj(state);
};

const setSHGF_lat_40 = glassState => {
  // Fix impure TABLA_SHGF
  const dataSHGF = TABLA_SHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

  return glassState.map(vidrio => {
    let dir = vidrio.orientacion;
    dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
    return Object.assign({}, vidrio, {
      SHGF: Number(dataSHGF[dir])
    });
  });
};

const setUvidrio = (glassState, glassDescription = 'vidrio sencillo') => {
  // Fix impure TABLA_U_WINDOW
  const Uv_sencillo = TABLA_U_WINDOW.find(x => x.descripcion === glassDescription);

  return glassState.map(vidrio =>
    Object.assign({}, vidrio, {
      coeficiente_transferencia_calor: Number(Uv_sencillo.U_exterior)
    })
  );
};

const setExteriorConditions = (state, exterior) =>
  Object.assign({}, state, {
    id: Number(exterior.id),
    ciudad: exterior.ciudad,
    latitud: Number(exterior.latitud),
    bulbo_seco: Number(exterior.bulbo_seco),
    bulbo_humedo: Number(exterior.bulbo_humedo),
    humedad_especifica: Number(exterior.humedad_especifica),
    mes_carga_de_enfriamiento: exterior.mes_carga_de_enfriamiento,
    rango_diario: Number(exterior.rango_diario)
  });

const setCLTD_pared = paredesState => {
  // el grupo es dado en la seleccion de los datos
  const dataPared = TABLA_PARED.filter(x => x.grupo === 'd').map(x => ({
    orientacion: x.orientacion,
    CLTD: Number(x[17])
  }));

  return paredesState.map(pared => {
    const CLTD = dataPared.find(x => x.orientacion === pared.orientacion).CLTD;
    return Object.assign({}, pared, {
      CLDT_tabla: CLTD
    });
  });
};

const setCLTD_techo = techoState => {
  const data_techo = TABLA_TECHO.find(
    x => x.tipo_de_techo === 'sin cielo raso suspendido' && x.numero_techo === '3'
  );

  return Object.assign({}, techoState, {
    CLDT_tabla: Number(data_techo['17'])
  });
};

const setU = (elState, type = 'TECHO', material = 'CUBIERTA_DE_EJEMPLO') => {
  const Utechos = TABLA_U_TECHO_PARED_PARTICION.find(
    x => x.tipo === type && x.material === material
  );

  const setUobj = el =>
    Object.assign({}, el, {
      coeficiente_transferencia_calor: Number(Utechos.U)
    });

  return Array.isArray(elState) ? elState.map(setUobj) : setUobj(elState);
};

// TODO: refactor
const setU_One = (paredesState, data) => {
  const paredTabla = TABLA_U_TECHO_PARED_PARTICION.find(
    element => element.material === data.material
  );

  return paredesState.map((pared, i) => {
    if (i === data.id) {
      return Object.assign({}, pared, {
        material: paredTabla.material,
        coeficiente_transferencia_calor: Number(paredTabla.U),
        tipo: paredTabla.tipo,
        CLDT_tabla: Number(paredTabla.CLTD) || pared.CLDT_tabla
      });
    }
    return pared;
  });
};

const setCLF = (glassState, glassCapacity = 'M') => {
  const CLF_ = TABLA_CLF.filter(x => x.CAPACIDAD === glassCapacity);

  return glassState.map(vidrio => {
    const value = CLF_.find(x => x.ORIENTACION === vidrio.orientacion);
    return Object.assign({}, vidrio, {
      CLF: Number(value['17'])
    });
  });
};

const setSC = (glassState, glassDescription = 'vidrio sencillo') => {
  const dataSc = TABLA_SC.filter(x => x.vidrio === glassDescription);

  return glassState.map(vidrio => {
    const dataScFiltered = dataSc.find(
      x =>
        x.tipo_de_vidrio === vidrio.tipo_de_vidrio && x.espesor_nominal === vidrio.espesor_nominal
    );
    return Object.assign({}, vidrio, {
      SC: Number(dataScFiltered.sin_sombreado_interior)
    });
  });
};

const updatePropGlass = (glassState, data) =>
  glassState.map((glass, key) => {
    if (key === data.id) return Object.assign({}, glass, data);
    return glass;
  });

const updateAreaGlass = (glassState, id) =>
  glassState.map((glass, key) => {
    if (key === id) {
      return Object.assign({}, glass, {
        areaNeta: glass.width * glass.height * sqrFEET
      });
    }
    return glass;
  });

const addNewGlass = (glassState, data, dataTemperature) => {
  let newGlass = setCLDT_vidrios([data]);
  newGlass = setCLDT_correccion(newGlass, dataTemperature);
  newGlass = setSHGF_lat_40(newGlass);
  newGlass = setUvidrio(newGlass);
  newGlass = setCLF(newGlass);
  newGlass = setSC(newGlass);
  newGlass = calcAreaAll(newGlass);
  return [...glassState, ...newGlass];
};

const addNewDoor = (puertasState, door) => {
  /** TODO: REMOVE HARDCODE **/
  door.CLDT_tabla = 27; // ºF Aun no se tiene esa tabla
  door.CLDT_correccion = 22; // ºF
  /** **/

  const newDoor = setU_One([door], { id: 0, material: door.material });
  return [...puertasState, ...calcAreaAll(newDoor)];
};

const calcAreaNetaPared = (paredesState, glassState, doors, depth, height, width) => {
  const glassHash = {};
  const doorsHash = {};

  // Reduce refactor
  for (const glass of glassState) {
    glassHash[glass.orientacion] = (glassHash[glass.orientacion] || 0) + glass.areaNeta;
  }
  for (const door of doors) {
    doorsHash[door.orientacion] = (doorsHash[door.orientacion] || 0) + door.areaNeta;
  }

  const areaBruta = {
    N: width * height * sqrFEET,
    S: width * height * sqrFEET,
    E: depth * height * sqrFEET,
    W: depth * height * sqrFEET
  };

  return paredesState.map(pared => {
    const gross = areaBruta[pared.orientacion];
    const glassArea = glassHash[pared.orientacion] || 0;
    const doorArea = doorsHash[pared.orientacion] || 0;
    const areaNeta = gross - glassArea - doorArea;

    return Object.assign({}, pared, {
      areaNeta: areaNeta > 0 ? areaNeta : 0
    });
  });
};

const setColorK = (paredesState, data) =>
  paredesState.map((pared, i) => {
    if (i === data.id) {
      return Object.assign({}, pared, {
        correcion_color_K: Number(data.k)
      });
    } else {
      return pared;
    }
  });

export const vidrios = (glassState = [], action, state) => {
  const dataTemperature = getDataTemperature(state);

  switch (action.type) {
    case SET_CLTD_WINDOW:
      return setCLDT_vidrios(glassState);
    case SET_CLTD_CORRECCION_WINDOW:
      return setCLDT_correccion(glassState, dataTemperature);
    case SET_SHGF_LAT_40_WINDOW:
      return setSHGF_lat_40(glassState);
    case SET_U_WINDOW:
      return setUvidrio(glassState, action.glassDescription);
    case SET_CLF_WINDOW:
      return setCLF(glassState, action.glassCapacity);
    case SET_SC_WINDOW:
      return setSC(glassState, action.glassDescription);
    case CALC_AREA_WINDOW_ALL:
      return calcAreaAll(glassState);
    case CALC_AREA_WINDOW:
      return updateAreaGlass(glassState, action.id);
    case UPDATE_PROP_WINDOW:
      return updatePropGlass(glassState, action.data);
    case REMOVE_WINDOW:
      return [...glassState.slice(0, action.key), ...glassState.slice(action.key + 1)];
    case ADD_WINDOW:
      return addNewGlass(glassState, action.data, dataTemperature);
    case SET_UNDO_WINDOWS:
      return state.past;
    default:
      return glassState;
  }
};

export const paredes = (paredesState = [], action, state) => {
  switch (action.type) {
    case SET_CLTD_WALL:
      return setCLTD_pared(paredesState);
    case SET_LM_WALL: {
      const { mes_carga_de_enfriamiento, latitud } = state.exterior;
      return setLMparedes(paredesState, setLM(mes_carga_de_enfriamiento, latitud));
    }
    case SET_CLTD_CORRECCION_WALL: {
      const dataTemperature = getDataTemperature(state);
      return setCLDT_correccion(paredesState, dataTemperature);
    }
    case SET_U_WALL:
      return setU(paredesState, action.element, action.material);
    case CALC_GROSS_WALL_AREA: {
      const { depth, height, width, vidrios, puertas } = state;
      return calcAreaNetaPared(paredesState, vidrios, puertas, depth, height, width);
    }
    case SET_U_1_WALL:
      return setU_One(paredesState, action.data);
    case SET_COLOR_K_WALL:
      return setColorK(paredesState, action.data);
    case SET_UNDO_WALL:
      return state.past;
    default:
      return paredesState;
  }
};

export const techo = (techoState = {}, action, state) => {
  switch (action.type) {
    case SET_CLTD_ROOF:
      return setCLTD_techo(techoState);
    case SET_CLTD_ROOF_CORRECTION: {
      /*eslint no-console: ["error", { allow: ["error"] }] */
      if (!techoState.correcion_latitud_mes_LM) {
        console.error(
          `For CLDT_correccion in techo,
                correcion_latitud_mes_LM is needed`,
          techoState
        );
      }
      const dataTemperature = getDataTemperature(state);
      return setCLDT_correccion(techoState, dataTemperature);
    }
    case SET_LM_ROOF: {
      const { mes_carga_de_enfriamiento, latitud } = state.exterior;
      return setLMtecho(techoState, setLM(mes_carga_de_enfriamiento, latitud));
    }
    case SET_U_ROOF:
      return setU(techoState, action.element, action.material);
    case SET_U_1_ROOF: {
      const dataTemperature = getDataTemperature(state);
      return setCLDT_correccion(
        setU_One([techoState], { material: action.material, id: 0 })[0],
        dataTemperature
      );
    }
    case SET_COLOR_K_ROOF:
      return setColorK([techoState], { k: action.k, id: 0 })[0];
    case CALC_AREA_ROOF:
      return Object.assign({}, techoState, {
        areaNeta: state.width * state.depth * sqrFEET
      });
    default:
      return techoState;
  }
};

export const puertas = (puertasState = [], action, state) => {
  switch (action.type) {
    case SET_U_1_DOOR:
      return setU_One(puertasState, action.data);
    case SET_U_DOOR:
      return setU(puertasState, action.element, action.material);
    case UPDATE_PROP_DOOR:
      return updatePropGlass(puertasState, action.data);
    case CALC_AREA_DOOR_ALL:
      return calcAreaAll(puertasState);
    case CALC_AREA_DOOR:
      return updateAreaGlass(puertasState, action.id);
    case REMOVE_DOOR:
      return [...puertasState.slice(0, action.key), ...puertasState.slice(action.key + 1)];
    case ADD_DOOR:
      return addNewDoor(puertasState, action.data);
    case SET_UNDO_DOORS:
      return state.past;
    default:
      return puertasState;
  }
};

export const piso = (pisoState = {}, action, state) => {
  switch (action.type) {
    case SET_U_FLOOR:
      return setU(pisoState, action.element, action.material);
    case SET_FLOOR_CLTD_CORRECTION: {
      const Δtemp = state.exterior.bulbo_seco - state.recinto.bulbo_seco;
      return Object.assign({}, pisoState, {
        CLDT_correccion: Δtemp
      });
    }
    case CALC_AREA_FLOOR:
      return Object.assign({}, pisoState, {
        areaNeta: state.width * state.depth * sqrFEET
      });
    default:
      return pisoState;
  }
};

export const results = (resultsState = {}, action, state) => {
  switch (action.type) {
    case SET_CARGA_ENFRIAMIENTO:
      return Object.assign({}, resultsState, getCargaEnfriamiento(state));
    default:
      return resultsState;
  }
};

export const luces = (lucesState = {}, action) => {
  switch (action.type) {
    case SET_NUMBER_OF_LIGHTS:
      return Object.assign({}, lucesState, {
        numberOfLights: action.value
      });
    default:
      return lucesState;
  }
};

export const exterior = (exteriorState = {}, action) => {
  switch (action.type) {
    case SET_EXTERIOR_CONDITIONS:
      return setExteriorConditions(exteriorState, action.exterior);
    default:
      return exteriorState;
  }
};

export const recinto = (recintoState = {}, action) => {
  switch (action.type) {
    case SET_ROOM_ACTIVITY:
      return Object.assign({}, recintoState, {
        actividad_recinto: action.value
      });
    case SET_ROOM_TYPE:
      return Object.assign({}, recintoState, {
        tipo_recinto: action.value
      });
    default:
      return recintoState;
  }
};

export const cargaPico = (cargaPicoState = {}) => cargaPicoState;

const CLEAR_HISTORY = 'CLEAR_HISTORY';
const SET_WALL_HISTORY = 'SET_WALL_HISTORY';
const SET_WINDOWS_HISTORY = 'SET_WINDOWS_HISTORY';
const SET_DOORS_HISTORY = 'SET_DOORS_HISTORY';
export const past = (past = null, action, state) => {
  switch (action.type) {
    case SET_WALL_HISTORY:
      return state.paredes;
    case SET_WINDOWS_HISTORY:
      return state.vidrios;
    case SET_DOORS_HISTORY:
      return state.puertas;
    case CLEAR_HISTORY:
      return null;
    default:
      return past;
  }
};
