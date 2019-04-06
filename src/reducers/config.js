import { HIDE_MAIN_FORM_LAYOUT, SHOW_ELEMENT_VIEW } from '../actions';

export const appConfig = (appConfig = {}, action) => {
  switch (action.type) {
    case SHOW_ELEMENT_VIEW:
      return Object.assign({}, appConfig, {
        windowsView: setElementView(action.elementType)
      });
    case HIDE_MAIN_FORM_LAYOUT:
      return Object.assign({}, appConfig, {
        windowsView: null
      });
    default:
      return appConfig;
  }
};

const setElementView = elementType => {
  switch (elementType) {
    case 'paredes':
      return 'wallsView';
    case 'puertas':
      return 'doorView';
    default:
      return 'glassView';
  }
};
