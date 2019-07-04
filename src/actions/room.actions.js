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
export const SET_EQUITMENT_WATTS_PER_SQUARED_FOOT = 'SET_EQUITMENT_WATTS_PER_SQUARED_FOOT';

export const SET_U_FLOOR = 'SET_U_FLOOR';
export const SET_FLOOR_CLTD_CORRECTION = 'SET_FLOOR_CLTD_CORRECTION';

/* Room actions creators */

export const setDepth = value => ({ type: SET_DEPTH, value });

export const setHeight = value => ({ type: SET_HEIGHT, value });

export const setWidth = value => ({ type: SET_WIDTH, value });

export const actionSizeForm = ({ value, id }) => {
  value = Number(value);
  switch (id) {
    case 'depth':
      return setDepth(value);
    case 'width':
      return setWidth(value);
    case 'height':
      return setHeight(value);
  }
};

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

export const setEquitmentWattsPerSquaredFoot = value => ({
  type: SET_EQUITMENT_WATTS_PER_SQUARED_FOOT,
  value
});

export const setSizeChange = event => dispatch => {
  dispatch(actionSizeForm(event.target));
  dispatch(calcAreaFloor());
  dispatch(calcAreaRoof());
};

export const setRoomChange = ({ target: { value, id } }) => {
  switch (id) {
    case 'actividadRecinto':
      return setRoomActivity(value);
    case 'numberOfPeople':
      return setNumberOfPeople(Number(value));
    case 'numberOfLights':
      return setNumberOfLights(Number(value));
    case 'typeOfRoom':
      return setRoomType(value);
    case 'amountOfEquipment':
      return setEquitmentWattsPerSquaredFoot(Number(value));
  }
};
