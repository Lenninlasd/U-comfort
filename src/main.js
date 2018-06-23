import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import rootReducer from './reducers/root.js';
import initState from './model.js';
import App from './components/App.js';

const store = createStore(rootReducer, {
    vidrios: initState.elementos.vidrios,
    paredes: initState.elementos.paredes,
    techo:   initState.elementos.techo,
    puertas: initState.elementos.puerta,
    piso:    initState.elementos.piso,
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
