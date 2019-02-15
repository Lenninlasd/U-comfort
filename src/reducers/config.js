export const appConfig = (appConfig = {}, action) => {
  switch (action.type) {
    case 'SHOW_WINDOWS_PROPS':
      return Object.assign({}, appConfig, {
        windowsView: action.view
      });
    case 'HIDE_WINDOWS_PROPS':
      return Object.assign({}, appConfig, {
        windowsView: null
      });
    default:
      return appConfig;
  }
};
