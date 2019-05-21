/*
 * Windows action types
 */

export const SET_CLTD_WINDOW = 'SET_CLTD_WINDOW';
export const SET_CLTD_CORRECTION_WINDOW = 'SET_CLTD_CORRECTION_WINDOW';
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
export const setCLTDCorrectionWindow = () => ({ type: SET_CLTD_CORRECTION_WINDOW });
export const setSHGFWindow = () => ({ type: SET_SHGF_LAT_40_WINDOW });
export const setUWindow = () => ({ type: SET_U_WINDOW });
export const setCLFWindow = () => ({ type: SET_CLF_WINDOW });
export const setSCWindow = () => ({ type: SET_SC_WINDOW });
export const calcAreaWindowAll = () => ({ type: CALC_AREA_WINDOW_ALL });
export const calcAreaWindow = id => ({ type: CALC_AREA_WINDOW, id });
export const removeWindow = key => ({ type: REMOVE_WINDOW, key });
export const addWindow = data => ({ type: ADD_WINDOW, data });
export const setUndoWindows = () => ({ type: SET_UNDO_WINDOWS });
