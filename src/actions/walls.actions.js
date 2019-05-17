/*
 * Walls action types
 */

export const SET_U_1_WALL = 'SET_U_1_WALL';
export const SET_COLOR_K_WALL = 'SET_COLOR_K_WALL';
export const SET_UNDO_WALL = 'SET_UNDO_WALL';
export const SET_CLTD_WALL = 'SET_CLTD_WALL';
export const SET_LM_WALL = 'SET_LM_WALL';
export const SET_CLTD_CORRECTION_WALL = 'SET_CLTD_CORRECTION_WALL';
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
export const setWallCLTDCorretion = () => ({ type: SET_CLTD_CORRECTION_WALL });
export const setUWall = (element, material) => ({
  type: SET_U_WALL,
  element,
  material
});
