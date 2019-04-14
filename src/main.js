import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/root.js';
import initState from './model.js';
import { App } from './components/App';
import enrichData from './enrichData.js';

const store = createStore(
  rootReducer,
  {
    windows: initState.elementos.windows,
    walls: initState.elementos.walls,
    techo: initState.elementos.techo,
    doors: initState.elementos.doors,
    piso: initState.elementos.piso,
    luces: initState.elementos.luces,
    depth: initState.depth,
    width: initState.width,
    height: initState.height,
    numberOfPeople: initState.numberOfPeople,
    exterior: initState.exterior,
    recinto: initState.recinto,
    cargaPico: initState.cargaPico
  },
  composeWithDevTools()
);

enrichData(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
