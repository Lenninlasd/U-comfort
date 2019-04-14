import { HIDE_ELEMENTS_VIEW, SHOW_ELEMENTS_VIEW } from '../actions';

export const appConfig = (appConfig = {}, action) => {
  switch (action.type) {
    case SHOW_ELEMENTS_VIEW:
      return Object.assign({}, appConfig, {
        windowsView: setElementView(action.elementType)
      });
    case HIDE_ELEMENTS_VIEW:
      return Object.assign({}, appConfig, {
        windowsView: null
      });
    default:
      return appConfig;
  }
};

const setElementView = elementType => {
  switch (elementType) {
    case 'walls':
      return 'wallsView';
    case 'doors':
      return 'doorView';
    default:
      return 'glassView';
  }
};
