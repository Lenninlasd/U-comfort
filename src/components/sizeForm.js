import React from 'react';
import tablaCalorPersonas from '../../json/calor_personas_6_11';

const apliacionesTipicas = [... new Set(
    tablaCalorPersonas.map(element => element.APLICACIONES_TIPICAS)
)].map( (item, i) => (
    <option key={i} value={item}>{item}</option>
));

export const SizeDataForm = props => (
    <form>
        <div className='form-row form-group'>
            <div className='col-md-4 col-sm-12'>
                <small><strong>LARGO:</strong></small>
                <input
                    id='depth'
                    className='form-control'
                    type='number' value={props.depth}
                    placeholder='LARGO'
                    onChange={props.onSizeChange} />
            </div>
            <div className='col-md-4 col-sm-12'>
                <small><strong>ANCHO:</strong></small>
                <input
                    id='width'
                    className='form-control'
                    type='number' value={props.width}
                    placeholder='ANCHO'
                    onChange={props.onSizeChange} />
            </div>
            <div className='col-md-4 col-sm-12'>
                <small><strong>ALTO:</strong></small>
                <input
                    id='height'
                    className='form-control'
                    type='number'
                    value={props.height}
                    placeholder='ALTO'
                    onChange={props.onSizeChange} />
            </div>
            <div className='col-md-12 col-sm-12'>
                <small><strong>No. DE PERSONAS:</strong></small>
                <input
                    id='numberOfPeople'
                    className='form-control'
                    type='number' value={props.numberOfPeople}
                    placeholder='No. DE PERSONAS'
                    onChange={props.onEnclosureChange} />
            </div>
            <div className='col-md-12 col-sm-12'>
                <small><strong>No. DE LUCES:</strong></small>
                <input
                    id='numberOfLights'
                    className='form-control'
                    type='number' value={props.numberOfLights}
                    placeholder='No. DE LUCES'
                    onChange={props.onEnclosureChange} />
            </div>
            <div className='col-md-12 col-sm-12'>
                <small><strong>ACTIVIDAD DEL RECINTO</strong></small>
                <select id='tipoRecinto'
                    className='form-control'
                    onChange={props.onEnclosureChange}
                    value={props.actividadRecinto} >
                    <option hidden >ACTIVIDAD DEL RECINTO</option>
                    {apliacionesTipicas}
                </select>
            </div>
        </div>
    </form>
);