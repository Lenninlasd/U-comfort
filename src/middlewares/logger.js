/*eslint no-console: ["error", { allow: ["group", "log", "info", groupEnd, groupCollapsed] }] */
export const logger = store => next => action => {
  console.groupCollapsed(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};
