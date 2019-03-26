/*
 * Room action types
 */

export const SET_DEPTH = 'SET_DEPTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_WIDTH = 'SET_WIDTH';

export const CALC_AREA_PISO = 'CALC_AREA_PISO';
export const CALC_AREA_TECHO = 'CALC_AREA_TECHO';
export const SET_NUMBER_OF_PEOPLE = 'SET_NUMBER_OF_PEOPLE';
export const SET_NUMBER_OF_LIGHTS = 'SET_NUMBER_OF_LIGHTS';
export const SET_ACTIVIDAD_RECINTO = 'SET_ACTIVIDAD_RECINTO';
export const SET_TIPO_RECINTO = 'SET_TIPO_RECINTO';

/* Room actions creators */

export const setDepth = value => ({ type: SET_DEPTH, value });

export const setHeight = value => ({ type: SET_HEIGHT, value });

export const setWidth = value => ({ type: SET_WIDTH, value });

export const calcAreaPiso = () => ({ type: CALC_AREA_PISO });

export const calcAreaTecho = () => ({ type: CALC_AREA_TECHO });

export const setNumberOfPeople = value => ({
  type: SET_NUMBER_OF_PEOPLE,
  value
});

export const setNumberOfLights = value => ({
  type: SET_NUMBER_OF_LIGHTS,
  value
});

export const setActividadRecinto = value => ({
  type: SET_ACTIVIDAD_RECINTO,
  value
});

export const setTipoRecinto = value => ({
  type: SET_TIPO_RECINTO,
  value
});

/*
 * CardForm action types
 */

export const CALC_AREA_NETA_PARED = 'CALC_AREA_NETA_PARED';
export const SET_CARGA_ENFRIAMIENTO = 'SET_CARGA_ENFRIAMIENTO';

export const calcAreaNetPared = () => ({ type: CALC_AREA_NETA_PARED });
export const setCargaEnfriamiento = () => ({ type: SET_CARGA_ENFRIAMIENTO });

/*
 * Doors  action types
 */

export const SET_U_1_DOOR = 'SET_U_1_DOOR';
export const UPDATE_PROP_DOOR = 'UPDATE_PROP_DOOR';
export const CALC_AREA_DOOR = 'CALC_AREA_DOOR';
export const REMOVE_DOOR = 'REMOVE_DOOR';
export const ADD_DOOR = 'ADD_DOOR';
export const HIDE_WINDOWS_PROPS = 'HIDE_WINDOWS_PROPS';
export const SET_UNDO_DOORS = 'SET_UNDO_DOORS';

export const setUoneDoor = data => ({
  type: 'SET_U_1_PUERTA',
  data
});

export const updatePropDoor = data => ({
  type: 'UPDATE_PROP_DOOR',
  data
});

export const calcAreaDoor = id => ({
  type: CALC_AREA_DOOR,
  id
});
