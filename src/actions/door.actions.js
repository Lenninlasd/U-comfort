/*
 * Doors  action types
 */

export const SET_U_1_DOOR = 'SET_U_1_DOOR';
export const UPDATE_PROP_DOOR = 'UPDATE_PROP_DOOR';
export const CALC_AREA_DOOR = 'CALC_AREA_DOOR';
export const REMOVE_DOOR = 'REMOVE_DOOR';
export const ADD_DOOR = 'ADD_DOOR';
export const HIDE_ELEMENTS_VIEW = 'HIDE_ELEMENTS_VIEW';
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

export const hideElementsView = () => ({ type: HIDE_ELEMENTS_VIEW });
export const setUndoDoors = () => ({ type: SET_UNDO_DOORS });
export const calcAreaDoorAll = () => ({ type: CALC_AREA_DOOR_ALL });
