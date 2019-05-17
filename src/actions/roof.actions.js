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
