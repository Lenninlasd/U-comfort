import React from 'react';
import { connect } from 'react-redux';

const SizeDataForm = ({depth, width, height, numberWindows, onSizeChange}) => (
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

const actionSizeFrom = target => {
    const value = Number(target.value);
    switch (target.id) {
        case 'depth':
            return { type: 'SET_DEPTH', value: value};
        case 'width':
            return { type: 'SET_WIDTH', value: value };
        case 'height':
            return { type: 'SET_HEIGHT', value: value };
    }
}

const mapStateToProps = state => ({
    width: state.width,
    height: state.height,
    depth: state.depth,
    numberWindows: 3
});

const mapDispatchToProps = dispatch => ({
    onSizeChange: event => dispatch(actionSizeFrom(event.target))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SizeDataForm);
