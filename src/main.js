import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/root.js';
import initState from './model.js';
import { App } from './components/App';
import enrichData from './enrichData.js';
import { logger } from './middlewares/logger.js';

const store = createStore(
  rootReducer,
  {
    vidrios: initState.elementos.vidrios,
    paredes: initState.elementos.paredes,
    techo: initState.elementos.techo,
    puertas: initState.elementos.puertas,
    piso: initState.elementos.piso,
    luces: initState.elementos.luces,
    depth: initState.depth,
    width: initState.width,
    height: initState.height,
    numberOfPeople: initState.numberOfPeople,
    exterior: initState.exterior,
    recinto: initState.recinto
  },
  applyMiddleware(logger)
);

enrichData(store.dispatch);

store.dispatch({ type: 'SET_CARGA_ENFRIAMIENTO' });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
