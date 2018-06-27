import React from 'react';

export const SizeDataForm = ({depth, width, height, numberWindows, onSizeChange}) => (
    <form>
        <div className='form-row form-group'>
            <div className="col-md-4 col-sm-12">
                <small><strong>LARGO:</strong></small>
                <input id='depth' className="form-control" type="number" value={depth} placeholder='depth' onChange={onSizeChange} />
            </div>
            <div className="col-md-4 col-sm-12">
                <small><strong>ANCHO:</strong></small>
                <input id='width' className="form-control" type="number" value={width}  placeholder='width'  onChange={onSizeChange} />
            </div>
            <div className="col-md-4 col-sm-12">
                <small><strong>ALTO:</strong></small>
                <input id='height' className="form-control"  type="number" value={height} placeholder='height' onChange={onSizeChange} />
            </div>
            <div className="col-md-12 col-sm-12">
                <small><strong>No. VENTANAS:</strong></small>
                <input id='numberWindows' className="form-control" type="number" value={numberWindows}
                    placeholder='numero de ventanas' min='0' max='20' readOnly/>
            </div>
        </div>
    </form>
);
