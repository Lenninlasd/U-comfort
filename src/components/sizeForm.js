import React from 'react';

export const SizeDataForm = props => (
    <form>
        <div className='form-row form-group'>
            <div className="col-md-4 col-sm-12">
                <small><strong>LARGO:</strong></small>
                <input id='depth' className="form-control" type="number" value={props.depth} placeholder='LARGO' onChange={props.onSizeChange} />
            </div>
            <div className="col-md-4 col-sm-12">
                <small><strong>ANCHO:</strong></small>
                <input id='width' className="form-control" type="number" value={props.width}  placeholder='ANCHO'  onChange={props.onSizeChange} />
            </div>
            <div className="col-md-4 col-sm-12">
                <small><strong>ALTO:</strong></small>
                <input id='height' className="form-control"  type="number" value={props.height} placeholder='ALTO' onChange={props.onSizeChange} />
            </div>
            <div className="col-md-12 col-sm-12">
                <small><strong>No. DE PERSONAS:</strong></small>
                <input id='numberOfPeople' className="form-control"  type="number" value={props.numberOfPeople}
                       placeholder='No. DE PERSONAS' onChange={props.onSizeChange} />
            </div>
            <div className="col-md-12 col-sm-12">
                <small><strong>No. DE LUCES:</strong></small>
                <input id='numberOfLights' className="form-control"  type="number" value={props.numberOfLights}
                       placeholder='No. DE LUCES' onChange={props.onSizeChange} />
            </div>
        </div>
    </form>
);
