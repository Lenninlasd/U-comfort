/*
 * Room action types
 */

export const SET_DEPTH = 'SET_DEPTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_WIDTH = 'SET_WIDTH';

export const CALC_AREA_FLOOR = 'CALC_AREA_FLOOR';
export const CALC_AREA_ROOF = 'CALC_AREA_ROOF';
export const SET_NUMBER_OF_PEOPLE = 'SET_NUMBER_OF_PEOPLE';
export const SET_NUMBER_OF_LIGHTS = 'SET_NUMBER_OF_LIGHTS';
export const SET_ROOM_ACTIVITY = 'SET_ROOM_ACTIVITY';
export const SET_ROOM_TYPE = 'SET_ROOM_TYPE';

export const SET_U_FLOOR = 'SET_U_FLOOR';
export const SET_FLOOR_CLTD_CORRECTION = 'SET_FLOOR_CLTD_CORRECTION';

export const SHOW_ELEMENT_VIEW = 'SHOW_ELEMENT_VIEW';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';
export const SET_WALL_HISTORY = 'SET_WALL_HISTORY';
export const SET_WINDOWS_HISTORY = 'SET_WINDOWS_HISTORY';
export const SET_DOORS_HISTORY = 'SET_DOORS_HISTORY';

/* Room actions creators */

export const setDepth = value => ({ type: SET_DEPTH, value });

export const setHeight = value => ({ type: SET_HEIGHT, value });

export const setWidth = value => ({ type: SET_WIDTH, value });

export const calcAreaFloor = () => ({ type: CALC_AREA_FLOOR });

export const calcAreaRoof = () => ({ type: CALC_AREA_ROOF });

export const setNumberOfPeople = value => ({
  type: SET_NUMBER_OF_PEOPLE,
  value
});

export const setNumberOfLights = value => ({
  type: SET_NUMBER_OF_LIGHTS,
  value
});

export const setRoomActivity = value => ({
  type: SET_ROOM_ACTIVITY,
  value
});

export const setRoomType = value => ({
  type: SET_ROOM_TYPE,
  value
});

export const setFloorCLTDCorrection = () => ({ type: SET_FLOOR_CLTD_CORRECTION });
export const setUFloor = (element, material) => ({
  type: SET_U_FLOOR,
  element,
  material
});

export const showElementView = elementType => ({
  type: SHOW_ELEMENT_VIEW,
  elementType
});

export const setElementHistory = elementType => {
  switch (elementType) {
    case 'paredes':
      return {
        type: SET_WALL_HISTORY
      };
    case 'puertas':
      return {
        type: SET_DOORS_HISTORY
      };
    default:
      return {
        type: SET_WINDOWS_HISTORY
      };
  }
};

/*
 * CardForm action types
 */

export const CALC_GROSS_WALL_AREA = 'CALC_GROSS_WALL_AREA';
export const SET_CARGA_ENFRIAMIENTO = 'SET_CARGA_ENFRIAMIENTO';

export const calcGrossWallArea = () => ({ type: CALC_GROSS_WALL_AREA });
export const setCargaEnfriamiento = () => ({ type: SET_CARGA_ENFRIAMIENTO });

/*
 * Doors  action types
 */

export const SET_U_1_DOOR = 'SET_U_1_DOOR';
export const UPDATE_PROP_DOOR = 'UPDATE_PROP_DOOR';
export const CALC_AREA_DOOR = 'CALC_AREA_DOOR';
export const REMOVE_DOOR = 'REMOVE_DOOR';
export const ADD_DOOR = 'ADD_DOOR';
export const HIDE_MAIN_FORM_LAYOUT = 'HIDE_MAIN_FORM_LAYOUT';
export const SET_UNDO_DOORS = 'SET_UNDO_DOORS';
export const SET_U_DOOR = 'SET_U_DOOR';
export const CALC_AREA_DOOR_ALL = 'CALC_AREA_DOOR_ALL';

export const setUoneDoor = data => ({
  type: SET_U_1_DOOR,
  data
});
export const updatePropDoor = data => ({
  type: UPDATE_PROP_DOOR,
  data
});
export const calcAreaDoor = id => ({
  type: CALC_AREA_DOOR,
  id
});
export const removeDoor = key => ({
  type: REMOVE_DOOR,
  key
});
export const addDoor = data => ({
  type: ADD_DOOR,
  data
});
export const setUDoors = (element, material) => ({
  type: SET_U_DOOR,
  element,
  material
});

export const hideMainFormLayout = () => ({ type: HIDE_MAIN_FORM_LAYOUT });
export const setUndoDoors = () => ({ type: SET_UNDO_DOORS });
export const calcAreaDoorAll = () => ({ type: CALC_AREA_DOOR_ALL });

/*
 * Exterior conditions  action types
 */

export const SET_EXTERIOR_CONDITIONS = 'SET_EXTERIOR_CONDITIONS';

export const setExteriorConditions = exterior => ({
  type: SET_EXTERIOR_CONDITIONS,
  exterior
});

/*
 * Roof action types
 */

export const SET_U_1_ROOF = 'SET_U_1_ROOF';
export const SET_COLOR_K_ROOF = 'SET_COLOR_K_ROOF';

export const SET_CLTD_ROOF = 'SET_CLTD_ROOF';
export const SET_CLTD_ROOF_CORRECTION = 'SET_CLTD_ROOF_CORRECTION';
export const SET_LM_ROOF = 'SET_LM_ROOF';
export const SET_U_ROOF = 'SET_U_ROOF';

export const setUoneRoof = material => ({
  type: SET_U_1_ROOF,
  material
});

export const setColorKRoof = k => ({
  type: SET_COLOR_K_ROOF,
  k
});

export const setCLTDRoof = () => ({ type: SET_CLTD_ROOF });
export const setCLTDRoofCorrection = () => ({ type: SET_CLTD_ROOF_CORRECTION });
export const setLMRoof = () => ({ type: SET_LM_ROOF });
export const setURoof = (element, material) => ({
  type: SET_U_ROOF,
  element,
  material
});

/*
 * Walls action types
 */

export const SET_U_1_WALL = 'SET_U_1_WALL';
export const SET_COLOR_K_WALL = 'SET_COLOR_K_WALL';
export const SET_UNDO_WALL = 'SET_UNDO_WALL';
export const SET_CLTD_WALL = 'SET_CLTD_WALL';
export const SET_LM_WALL = 'SET_LM_WALL';
export const SET_CLTD_CORRECCION_WALL = 'SET_CLTD_CORRECCION_WALL';
export const SET_U_WALL = 'SET_U_WALL';

export const setUoneWall = data => ({
  type: SET_U_1_WALL,
  data
});

export const setColorkWall = data => ({
  type: SET_COLOR_K_WALL,
  data
});

export const setUndoWall = () => ({ type: SET_UNDO_WALL });
export const setCLTDWall = () => ({ type: SET_CLTD_WALL });
export const setLMWall = () => ({ type: SET_LM_WALL });
export const setWallCLTDCorretion = () => ({ type: SET_CLTD_CORRECCION_WALL });
export const setUWall = (element, material) => ({
  type: SET_U_WALL,
  element,
  material
});

/*
 * Windows action types
 */

export const SET_CLTD_WINDOW = 'SET_CLTD_WINDOW';
export const SET_CLTD_CORRECCION_WINDOW = 'SET_CLTD_CORRECCION_WINDOW';
export const SET_SHGF_LAT_40_WINDOW = 'SET_SHGF_LAT_40_WINDOW';
export const SET_U_WINDOW = 'SET_U_WINDOW';
export const SET_CLF_WINDOW = 'SET_CLF_WINDOW';
export const SET_SC_WINDOW = 'SET_SC_WINDOW';
export const CALC_AREA_WINDOW_ALL = 'CALC_AREA_WINDOW_ALL';
export const CALC_AREA_WINDOW = 'CALC_AREA_WINDOW';
export const UPDATE_PROP_WINDOW = 'UPDATE_PROP_WINDOW';
export const REMOVE_WINDOW = 'REMOVE_WINDOW';
export const ADD_WINDOW = 'ADD_WINDOW';
export const SET_UNDO_WINDOWS = 'SET_UNDO_WINDOWS';

export const updatePropWindow = data => ({
  type: UPDATE_PROP_WINDOW,
  data
});
export const setCLTDWindow = () => ({ type: SET_CLTD_WINDOW });
export const setCLTDCorreccionWindow = () => ({ type: SET_CLTD_CORRECCION_WINDOW });
export const setSHGFWindow = () => ({ type: SET_SHGF_LAT_40_WINDOW });
export const setUWindow = () => ({ type: SET_U_WINDOW });
export const setCLFWindow = () => ({ type: SET_CLF_WINDOW });
export const setSCWindow = () => ({ type: SET_SC_WINDOW });
export const calcAreaWindowAll = () => ({ type: CALC_AREA_WINDOW_ALL });
export const calcAreaWindow = id => ({ type: CALC_AREA_WINDOW, id });
export const removeWindow = key => ({ type: REMOVE_WINDOW, key });
export const addWindow = data => ({ type: ADD_WINDOW, data });
export const setUndoWindows = () => ({ type: SET_UNDO_WINDOWS });
