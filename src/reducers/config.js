import { HIDE_MAIN_FORM_LAYOUT } from '../actions';

export const appConfig = (appConfig = {}, action) => {
  switch (action.type) {
    case 'SHOW_WINDOWS_PROPS':
      return Object.assign({}, appConfig, {
        windowsView: action.view
      });
    case HIDE_MAIN_FORM_LAYOUT:
      return Object.assign({}, appConfig, {
        windowsView: null
      });
    default:
      return appConfig;
  }
};
