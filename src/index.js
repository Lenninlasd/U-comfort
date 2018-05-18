import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo';

import { data } from "./data";
import getCargaEnfriamiento from './cargaEnfriamiento.js';

const cargaEnfriamiento = getCargaEnfriamiento(data);

ReactDOM.render(
    <div>
        <h1> Carga de enfriamiento (tons):</h1>
        <h2>{cargaEnfriamiento}</h2>
        <TodoApp />
    </div>,
    document.getElementById('root')
);
