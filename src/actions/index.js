export * from './room.actions.js';
export * from './cardForm.actions.js';
export * from './door.actions.js';
export * from './windows.actions.js';
export * from './walls.actions.js';
export * from './roof.actions.js';

export const SHOW_ELEMENTS_VIEW = 'SHOW_ELEMENTS_VIEW';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';
export const SET_WALL_HISTORY = 'SET_WALL_HISTORY';
export const SET_WINDOWS_HISTORY = 'SET_WINDOWS_HISTORY';
export const SET_DOORS_HISTORY = 'SET_DOORS_HISTORY';

export const showElementView = elementType => ({
  type: SHOW_ELEMENTS_VIEW,
  elementType
});

export const setElementHistory = elementType => {
  switch (elementType) {
    case 'walls':
      return {
        type: SET_WALL_HISTORY
      };
    case 'doors':
      return {
        type: SET_DOORS_HISTORY
      };
    default:
      return {
        type: SET_WINDOWS_HISTORY
      };
  }
};

export const clearHistory = () => ({ type: CLEAR_HISTORY });

export const showElementProperties = elementType => dispatch => {
  dispatch(showElementView(elementType));
  dispatch(setElementHistory(elementType));
};

/*
 * Exterior conditions  action types
 */

export const SET_EXTERIOR_CONDITIONS = 'SET_EXTERIOR_CONDITIONS';

export const setExteriorConditions = exterior => ({
  type: SET_EXTERIOR_CONDITIONS,
  exterior
});
