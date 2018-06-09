import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/todo';

import { data } from "./data";
import getCargaEnfriamiento from './cargaEnfriamiento.js';

const cargaEnfriamiento = getCargaEnfriamiento(data);

console.log('cargaEnfriamiento', cargaEnfriamiento);

ReactDOM.render(
    <div className='container-fluid'>
        <h1> Carga de enfriamiento (tons):</h1>
        <h3>{cargaEnfriamiento}</h3>
        <TodoApp />
    </div>,
    document.getElementById('root')
);
