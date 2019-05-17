/*
 * CardForm action types
 */

export const CALC_GROSS_WALL_AREA = 'CALC_GROSS_WALL_AREA';
export const SET_COOLING_LOAD = 'SET_COOLING_LOAD';

export const calcGrossWallArea = () => ({ type: CALC_GROSS_WALL_AREA });
export const setcoolingLoad = () => ({ type: SET_COOLING_LOAD });

export const submitForm = () => dispatch => {
  dispatch(calcGrossWallArea());
  dispatch(setcoolingLoad());
};
