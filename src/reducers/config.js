export const appConfig = (appConfig = {}, action) => {
  switch (action.type) {
    case 'SHOW_WINDOWS_PROPS':
      return Object.assign({}, appConfig, {
        showWindowsProps: action.view
      })
    case 'HIDE_WINDOWS_PROPS':
      return Object.assign({}, appConfig, {
        showWindowsProps: false
      })
    default:
      return appConfig
  }
}
