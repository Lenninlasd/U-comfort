import TABLE_WINDOW from '../../json/CLTD_vidrio';
import ROOF_TABLE from '../../json/CLTD_techo';
import TABLE_SHGF from '../../json/SHGF_lat_40';
import TABLE_U_WINDOW from '../../json/U_vidrios';
import TABLE_CLF from '../../json/CLF_6_8_min';
import TABLE_SC from '../../json/SC_tabla_6_7';
import WALL_TABLE from '../../json/CLTD_pared';
import TABLE_LM from '../../json/LM_6_4';
import TABLE_U_ROOF_WALL_PARTITION from '../../json/U_techos_paredes_particiones';
import { getcoolingLoad } from '../formulas/coolingLoad.js';

import {
  CALC_AREA_FLOOR,
  SET_U_FLOOR,
  SET_FLOOR_CLTD_CORRECTION,
  CALC_AREA_ROOF,
  SET_NUMBER_OF_LIGHTS,
  SET_ROOM_ACTIVITY,
  SET_ROOM_TYPE,
  SET_EQUITMENT_WATTS_PER_SQUARED_FOOT,
  CALC_GROSS_WALL_AREA,
  SET_COOLING_LOAD,
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
  SET_CLTD_CORRECTION_WALL,
  SET_U_WALL,
  SET_CLTD_WINDOW,
  SET_CLTD_CORRECTION_WINDOW,
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
  CALC_AREA_DOOR_ALL,
  CLEAR_HISTORY,
  SET_WALL_HISTORY,
  SET_WINDOWS_HISTORY,
  SET_DOORS_HISTORY
} from '../actions';

const sqrFEET = 3.28084 * 3.28084;

const setLM = (month, lat) => TABLE_LM.find(x => Number(x.LATITUD) === lat && x.MES === month);

const setLMwalls = (wallsState, dataLM) => {
  return wallsState.map(wall =>
    Object.assign({}, wall, {
      correcion_latitud_mes_LM: Number(dataLM[wall.orientacion])
    })
  );
};

const setLMroof = (roofState, dataLM) => {
  return Object.assign({}, roofState, {
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

const setCLTD_windows = windowsState => {
  const peakHour = '17';
  const CLTD_tabla = Number(TABLE_WINDOW[0][peakHour]);
  return windowsState.map(windows =>
    Object.assign({}, windows, {
      CLTD_tabla
    })
  );
};

const setCLTD_Correction = (state, dataTemp) => {
  const DeltaTempDiseno = 78 - 85;
  const CLTD_Obj = el => {
    const LM = el.correcion_latitud_mes_LM;
    const K = el.correcion_color_K;
    const CLTD_temp =
      LM !== undefined && K !== undefined ? (el.CLTD_tabla + LM) * K : el.CLTD_tabla;

    if (el.tipo && el.tipo.includes('PARTICION')) {
      return {
        ...el,
        CLTD_Correction: dataTemp.tempExterior - dataTemp.tempInterior - 5
      };
    }

    return {
      ...el,
      CLTD_Correction:
        CLTD_temp +
        DeltaTempDiseno +
        dataTemp.tempExterior -
        dataTemp.tempInterior -
        0.5 * dataTemp.rango_diario
    };
  };
  return Array.isArray(state) ? state.map(CLTD_Obj) : CLTD_Obj(state);
};

const setSHGF_lat_40 = (windowsState, exterior) => {
  const dataSHGF = TABLE_SHGF.find(
    x => x.MES === exterior.mes_carga_de_enfriamiento && Number(x.LATITUD) === exterior.latitud
  );

  return windowsState.map(window => {
    let dir = window.orientacion;
    dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
    return Object.assign({}, window, {
      SHGF: Number(dataSHGF[dir])
    });
  });
};

const setUwindow = (windowsState, windowsDescription = 'vidrio sencillo') => {
  const Uv_sencillo = TABLE_U_WINDOW.find(x => x.descripcion === windowsDescription);

  return windowsState.map(window =>
    Object.assign({}, window, {
      coeficiente_transferencia_calor: Number(Uv_sencillo.U_exterior)
    })
  );
};

const setExteriorConditions = (state, exterior) =>
  Object.assign({}, state, {
    id: Number(exterior.id),
    city: exterior.city,
    latitud: Number(exterior.latitud),
    bulbo_seco: Number(exterior.bulbo_seco),
    bulbo_humedo: Number(exterior.bulbo_humedo),
    humedad_especifica: Number(exterior.humedad_especifica),
    mes_carga_de_enfriamiento: exterior.mes_carga_de_enfriamiento,
    rango_diario: Number(exterior.rango_diario)
  });

const setCLTDWall = wallsState => {
  // el grupo es dado en la seleccion de los datos
  const dataWall = WALL_TABLE.filter(x => x.grupo === 'd').map(x => ({
    orientacion: x.orientacion,
    CLTD: Number(x[17])
  }));

  return wallsState.map(wall => {
    const CLTD = dataWall.find(x => x.orientacion === wall.orientacion).CLTD;
    return Object.assign({}, wall, {
      CLTD_tabla: CLTD
    });
  });
};

const setCLTDRoof = roofState => {
  const data_roof = ROOF_TABLE.find(
    x => x.tipo_de_techo === 'con cielo raso suspendido' && x.numero_techo === '3'
  );

  return Object.assign({}, roofState, {
    CLTD_tabla: Number(data_roof['17'])
  });
};

const setU = (elState, type = 'TECHO', material = 'CUBIERTA_DE_EJEMPLO') => {
  const Uroofs = TABLE_U_ROOF_WALL_PARTITION.find(x => x.tipo === type && x.material === material);

  const setUobj = el =>
    Object.assign({}, el, {
      coeficiente_transferencia_calor: Number(Uroofs.U)
    });

  return Array.isArray(elState) ? elState.map(setUobj) : setUobj(elState);
};

// TODO: refactor
const setU_One = (wallsState, data) => {
  const wallTable = TABLE_U_ROOF_WALL_PARTITION.find(element => element.material === data.material);

  return wallsState.map((wall, i) => {
    if (i === data.id) {
      return Object.assign({}, wall, {
        material: wallTable.material,
        coeficiente_transferencia_calor: Number(wallTable.U),
        tipo: wallTable.tipo,
        CLTD_tabla: Number(wallTable.CLTD) || wall.CLTD_tabla
      });
    }
    return wall;
  });
};

const setCLF = (windowsState, windowsCapacity = 'M') => {
  const CLF_ = TABLE_CLF.filter(x => x.CAPACIDAD === windowsCapacity);

  return windowsState.map(window => {
    const value = CLF_.find(x => x.ORIENTACION === window.orientacion);
    return Object.assign({}, window, {
      CLF: Number(value['17'])
    });
  });
};

const setSC = (windowsState, windowsDescription = 'vidrio sencillo') => {
  const dataSc = TABLE_SC.filter(x => x.vidrio === windowsDescription);

  return windowsState.map(window => {
    const dataScFiltered = dataSc.find(
      x =>
        x.tipo_de_vidrio === window.tipo_de_vidrio && x.espesor_nominal === window.espesor_nominal
    );
    return Object.assign({}, window, {
      SC: Number(dataScFiltered.sin_sombreado_interior)
    });
  });
};

const updatePropGlass = (windowsState, data) =>
  windowsState.map((windows, key) => {
    if (key === data.id) return Object.assign({}, windows, data);
    return windows;
  });

const updateAreaGlass = (windowsState, id) =>
  windowsState.map((windows, key) => {
    if (key === id) {
      return Object.assign({}, windows, {
        areaNeta: windows.width * windows.height * sqrFEET
      });
    }
    return windows;
  });

const addNewGlass = (windowsState, data, dataTemperature, exterior) => {
  let newGlass = setCLTD_windows([data]);
  newGlass = setCLTD_Correction(newGlass, dataTemperature);
  newGlass = setSHGF_lat_40(newGlass, exterior);
  newGlass = setUwindow(newGlass);
  newGlass = setCLF(newGlass);
  newGlass = setSC(newGlass);
  newGlass = calcAreaAll(newGlass);
  return [...windowsState, ...newGlass];
};

const addNewDoor = (doorsState, door) => {
  /** TODO: REMOVE HARDCODE **/
  door.CLTD_tabla = 27; // ºF Aun no se tiene esa tabla
  door.CLTD_Correction = 22; // ºF
  /** **/

  const newDoor = setU_One([door], { id: 0, material: door.material });
  return [...doorsState, ...calcAreaAll(newDoor)];
};

const calcWallNetArea = (wallsState, windowsState, doors, depth, height, width) => {
  const windowsHash = {};
  const doorsHash = {};

  // Reduce refactor
  for (const windows of windowsState) {
    windowsHash[windows.orientacion] = (windowsHash[windows.orientacion] || 0) + windows.areaNeta;
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

  return wallsState.map(wall => {
    const gross = areaBruta[wall.orientacion];
    const windowsArea = windowsHash[wall.orientacion] || 0;
    const doorArea = doorsHash[wall.orientacion] || 0;
    const areaNeta = gross - windowsArea - doorArea;

    return Object.assign({}, wall, {
      areaNeta: areaNeta > 0 ? areaNeta : 0
    });
  });
};

const setColorK = (wallsState, data) =>
  wallsState.map((wall, i) => {
    if (i === data.id) {
      return Object.assign({}, wall, {
        correcion_color_K: Number(data.k)
      });
    } else {
      return wall;
    }
  });

export const windows = (windowsState = [], action, state) => {
  const dataTemperature = getDataTemperature(state);

  switch (action.type) {
    case SET_CLTD_WINDOW:
      return setCLTD_windows(windowsState);
    case SET_CLTD_CORRECTION_WINDOW:
      return setCLTD_Correction(windowsState, dataTemperature);
    case SET_SHGF_LAT_40_WINDOW:
      return setSHGF_lat_40(windowsState, state.exterior);
    case SET_U_WINDOW:
      return setUwindow(windowsState, action.windowsDescription);
    case SET_CLF_WINDOW:
      return setCLF(windowsState, action.windowsCapacity);
    case SET_SC_WINDOW:
      return setSC(windowsState, action.windowsDescription);
    case CALC_AREA_WINDOW_ALL:
      return calcAreaAll(windowsState);
    case CALC_AREA_WINDOW:
      return updateAreaGlass(windowsState, action.id);
    case UPDATE_PROP_WINDOW:
      return updatePropGlass(windowsState, action.data);
    case REMOVE_WINDOW:
      return [...windowsState.slice(0, action.key), ...windowsState.slice(action.key + 1)];
    case ADD_WINDOW:
      return addNewGlass(windowsState, action.data, dataTemperature, state.exterior);
    case SET_UNDO_WINDOWS:
      return state.past;
    default:
      return windowsState;
  }
};

export const walls = (wallsState = [], action, state) => {
  switch (action.type) {
    case SET_CLTD_WALL:
      return setCLTDWall(wallsState);
    case SET_LM_WALL: {
      const { mes_carga_de_enfriamiento, latitud } = state.exterior;
      return setLMwalls(wallsState, setLM(mes_carga_de_enfriamiento, latitud));
    }
    case SET_CLTD_CORRECTION_WALL: {
      const dataTemperature = getDataTemperature(state);
      return setCLTD_Correction(wallsState, dataTemperature);
    }
    case SET_U_WALL:
      return setU(wallsState, action.element, action.material);
    case CALC_GROSS_WALL_AREA: {
      const { depth, height, width, windows, doors } = state;
      return calcWallNetArea(wallsState, windows, doors, depth, height, width);
    }
    case SET_U_1_WALL:
      return setU_One(wallsState, action.data);
    case SET_COLOR_K_WALL:
      return setColorK(wallsState, action.data);
    case SET_UNDO_WALL:
      return state.past;
    default:
      return wallsState;
  }
};

export const roof = (roofState = {}, action, state) => {
  switch (action.type) {
    case SET_CLTD_ROOF:
      return setCLTDRoof(roofState);
    case SET_CLTD_ROOF_CORRECTION: {
      /*eslint no-console: ["error", { allow: ["error"] }] */
      if (!roofState.correcion_latitud_mes_LM) {
        console.error(
          `For CLTD_Correction in roof,
                correcion_latitud_mes_LM is needed`,
          roofState
        );
      }
      const dataTemperature = getDataTemperature(state);
      return setCLTD_Correction(roofState, dataTemperature);
    }
    case SET_LM_ROOF: {
      const { mes_carga_de_enfriamiento, latitud } = state.exterior;
      return setLMroof(roofState, setLM(mes_carga_de_enfriamiento, latitud));
    }
    case SET_U_ROOF:
      return setU(roofState, action.element, action.material);
    case SET_U_1_ROOF: {
      const dataTemperature = getDataTemperature(state);
      return setCLTD_Correction(
        setU_One([roofState], { material: action.material, id: 0 })[0],
        dataTemperature
      );
    }
    case SET_COLOR_K_ROOF:
      return setColorK([roofState], { k: action.k, id: 0 })[0];
    case CALC_AREA_ROOF:
      return Object.assign({}, roofState, {
        areaNeta: state.width * state.depth * sqrFEET
      });
    default:
      return roofState;
  }
};

export const doors = (doorsState = [], action, state) => {
  switch (action.type) {
    case SET_U_1_DOOR:
      return setU_One(doorsState, action.data);
    case SET_U_DOOR:
      return setU(doorsState, action.element, action.material);
    case UPDATE_PROP_DOOR:
      return updatePropGlass(doorsState, action.data);
    case CALC_AREA_DOOR_ALL:
      return calcAreaAll(doorsState);
    case CALC_AREA_DOOR:
      return updateAreaGlass(doorsState, action.id);
    case REMOVE_DOOR:
      return [...doorsState.slice(0, action.key), ...doorsState.slice(action.key + 1)];
    case ADD_DOOR:
      return addNewDoor(doorsState, action.data);
    case SET_UNDO_DOORS:
      return state.past;
    default:
      return doorsState;
  }
};

export const floor = (floorState = {}, action, state) => {
  switch (action.type) {
    case SET_U_FLOOR:
      return setU(floorState, action.element, action.material);
    case SET_FLOOR_CLTD_CORRECTION: {
      const Δtemp = state.exterior.bulbo_seco - state.recinto.bulbo_seco;
      return Object.assign({}, floorState, {
        CLTD_Correction: Δtemp
      });
    }
    case CALC_AREA_FLOOR:
      return Object.assign({}, floorState, {
        areaNeta: state.width * state.depth * sqrFEET
      });
    default:
      return floorState;
  }
};

export const results = (resultsState = {}, action, state) => {
  switch (action.type) {
    case SET_COOLING_LOAD:
      return Object.assign({}, resultsState, getcoolingLoad(state));
    default:
      return resultsState;
  }
};

export const lights = (lightsState = {}, action) => {
  switch (action.type) {
    case SET_NUMBER_OF_LIGHTS:
      return Object.assign({}, lightsState, {
        numberOfLights: action.value
      });
    default:
      return lightsState;
  }
};

export const exterior = (exteriorState = {}, action) => {
  switch (action.type) {
    case SET_EXTERIOR_CONDITIONS: {
      const exteriorConditions = setExteriorConditions(exteriorState, action.exterior);
      return exteriorConditions;
    }
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
    case SET_EQUITMENT_WATTS_PER_SQUARED_FOOT:
      return { ...recintoState, equitmentWattsPerSquaredFoot: action.value };
    default:
      return recintoState;
  }
};

export const cargaPico = (cargaPicoState = {}) => cargaPicoState;

export const past = (past = null, action, state) => {
  switch (action.type) {
    case SET_WALL_HISTORY:
      return state.walls;
    case SET_WINDOWS_HISTORY:
      return state.windows;
    case SET_DOORS_HISTORY:
      return state.doors;
    case CLEAR_HISTORY:
      return null;
    default:
      return past;
  }
};
