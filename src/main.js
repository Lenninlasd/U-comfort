import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root.js';
import initState from './initialState';
import { App } from './components/App';
import enrichData from './formulas/enrichData.js';

const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)));

enrichData(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
