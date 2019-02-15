import React from 'react';
import { connect } from 'react-redux';
import BackButton from './backButton.js';
import PropTypes from 'prop-types';

const formPropTypes = {
    type:           PropTypes.string.isRequired,
    tag:            PropTypes.number.isRequired,
    handleChange:   PropTypes.func.isRequired,
    value:          PropTypes.number.isRequired,
    title:          PropTypes.string.isRequired
};

const InputDoorProps = props => (
    <input id={`door-${props.type}-${props.tag}`} data-group={props.tag}
        data-type={props.type} className='form-control' type="number"
        value={props.value} placeholder={props.title} onChange={props.handleChange}
        min='0' required/>
);
InputDoorProps.propTypes = { ...formPropTypes };

const SelectDoorProps = props => (
    <select id={`door-${props.type}-${props.tag}`} data-group={props.tag}
        data-type={props.type} className='form-control' onChange={props.handleChange}
        value={props.value} required>
        <option hidden value=''>{props.title}</option>
        {props.optionList}
    </select>
);
SelectDoorProps.propTypes = {
    ...formPropTypes,
    value: PropTypes.string.isRequired,
    optionList: PropTypes.array.isRequired
};

const GenerateDoors = ({ puerta={}, keyForm='', removeItem, handleChange }) => {
    const deleteItem = typeof removeItem === 'function' ?
        <div className="remove-item"
            onClick={() => removeItem(keyForm)}> &times;
        </div> : null;

    return (
        <div className='form-group list-of-elements'>
            { deleteItem }
            <div className='form-row'>
                <div className='col'>
                    <small><strong>ALTO:</strong></small>
                    <InputDoorProps tag={keyForm} value={puerta.height} type='height' title='height' handleChange={handleChange}/>
                </div>
                <div className='col'>
                    <small><strong>ANCHO:</strong></small>
                    <InputDoorProps tag={keyForm} value={puerta.width} type='width' title='width' handleChange={handleChange}/>
                </div>
                <div className='col'>
                    <small><strong>ORIENTACIÓN:</strong></small>
                    <SelectDoorProps tag={keyForm} value={puerta.orientacion} type='orientacion'
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
    );
};
GenerateDoors.propTypes = {
    puerta: PropTypes.shape({
        height:     PropTypes.number.isRequired,
        width:      PropTypes.number.isRequired,
        orientacion:PropTypes.string.isRequired
    }).isRequired,
    keyForm:        PropTypes.number.isRequired,
    removeItem:     PropTypes.func,
    handleChange:   PropTypes.func.isRequired
};

class NewDoorForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = { width: 0, height: 0, orientacion: '' };
        this.state = this.defaultState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const el = event.target;
        const type = el.dataset.type;
        const value = type === 'orientacion' ? el.value : Number(el.value );
        this.setState({[type]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submit(this.state);
        this.setState(this.defaultState);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="new-form-bg">
                <GenerateDoors  puerta={this.state} keyForm={100} handleChange={this.handleChange}/>
                <div className="add-window-button">
                    <button type="submit" className="btn btn-outline-primary">Agregar puerta</button>
                </div>
            </form>
        );
    }
}
NewDoorForm.propTypes = {
    submit: PropTypes.func.isRequired
};

const Doors = ({
    puertas,
    handleChange,
    handleBackButton,
    removeItem,
    handleAddButton
}) => {

    const inputList = puertas.map( (puerta, key) => (
        <GenerateDoors puerta={puerta} keyForm={key} key={key}
            removeItem={removeItem} handleChange={handleChange} />
    ));

    return (
        <div>
            <div>
                <BackButton onClick={handleBackButton}/>
            </div>
            <small><strong>PROPIEDADES DE LAS PUERTAS:</strong></small>
            { inputList }
            <NewDoorForm submit={handleAddButton}/>
        </div>
    );
};
Doors.propTypes = {
    puertas: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBackButton: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    handleAddButton: PropTypes.func.isRequired
};

const getDispatchData = (event, dispatch) => {
    const el = event.target;
    const value = el.type === 'number' ? Number(el.value) : el.value;
    const id = Number(el.dataset.group);
    const type = el.dataset.type;

    dispatch({
        type: 'UPDATE_PROP_PUERTA',
        data: { id, [type]: value }
    });

    dispatch({
        type: 'CALC_AREA_PUERTA',
        id
    });
    dispatch({type: 'CALC_AREA_NETA_PARED'});
};

const mapStateToProps = state => ({
    puertas: state.puertas
});

const mapDispatchToProps = dispatch => ({
    handleChange: event => getDispatchData(event, dispatch),
    handleBackButton: () => dispatch({
        type: 'HIDE_WINDOWS_PROPS'
    }),
    removeItem: key => {
        dispatch({
            type: 'REMOVE_DOOR',
            key
        });
        dispatch({type: 'CALC_AREA_NETA_PARED'});
    },
    handleAddButton: data => {
        dispatch({
            type: 'ADD_PUERTA',
            data
        });
        dispatch({type: 'CALC_AREA_NETA_PARED'});
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Doors);
