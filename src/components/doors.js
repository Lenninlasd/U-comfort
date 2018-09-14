import React from 'react';
import { connect } from 'react-redux';
import BackButton from './backButton.js';

const InputDoorProps = props => (
    <input id={`door-${props.type}-${props.tag}`} data-group={props.tag}
           data-type={props.type} className='form-control' type="number"
           value={props.value} placeholder={props.title} onChange={props.handleChange}
           min='0' required/>
);

const SelectDoorProps = props => (
    <select id={`door-${props.type}-${props.tag}`} data-group={props.tag}
            data-type={props.type} className='form-control' onChange={props.handleChange}
            value={props.value} required>
        <option hidden value=''>{props.title}</option>
        {props.optionList}
    </select>
);


const Doors = ({puertas, handleChange, handleBackButton}) => {

    const inputList = puertas.map( (puerta, key) => (
        <div key={key.toString()} className='form-group'>
            <div className='form-row'>
                <div className='col'>
                    <InputDoorProps tag={key} value={puerta.height} type='height' title='height' handleChange={handleChange}/>
                </div>
                <div className='col'>
                    <InputDoorProps tag={key} value={puerta.width} type='width' title='width' handleChange={handleChange}/>
                </div>
                <div className='col'>
                    <SelectDoorProps tag={key} value={puerta.orientacion} type='orientacion'
                                     handleChange={handleChange} title='Orientación'
                        optionList={[
                            <option key='N' value='N'>N</option>,
                            <option key='S' value='S'>S</option>,
                            <option key='E' value='E'>E</option>,
                            <option key='W' value='W'>W</option>,
                        ]} />
                    </div>
            </div>
        </div>
    ));

    return (
        <div>
            <div>
                <BackButton onClick={handleBackButton}/>
            </div>
            <div className="glass-windows form-group">
                <small><strong>PROPIEDADES DE LAS PUERTAS:</strong></small>
                { inputList }
            </div>
        </div>
    )
}

const getDispatchData = (event, dispatch) => {
    const el = event.target;
    const value = el.type === 'number' ? Number(el.value) : el.value;
    const id = Number(el.dataset.group);
    const type = el.dataset.type

    dispatch({
        type: 'UPDATE_PROP_PUERTA',
        data: { id, [type]: value }
    });

    dispatch({
        type: 'CALC_AREA_PUERTA',
        id
    });
}

const mapStateToProps = state => ({
    puertas: state.puertas
});

const mapDispatchToProps = dispatch => ({
    handleChange: event => getDispatchData(event, dispatch),
    handleBackButton: () => dispatch({
        type: 'HIDE_WINDOWS_PROPS'
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Doors);
