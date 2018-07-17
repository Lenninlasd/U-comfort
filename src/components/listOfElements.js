import React from 'react';
import u from '../reactData';
import { connect } from 'react-redux';

const SelectWinProps = props => (
    <select id={`window-${props.type}-${props.tag}`} data-group={props.tag}
            data-type={props.type} className='form-control form-control-sm' onChange={props.handleChange}
            value={props.value}>
        <option hidden >{props.title}</option>
        {props.optionList}
    </select>
);

const InputWinProps = props => (
    <input id={`window-${props.type}-${props.tag}`} data-group={props.tag}
           data-type={props.type} className='form-control form-control-sm' type="number"
           value={props.value} placeholder={props.title} onChange={props.handleChange}
           min='0'/>
);

const nominalThickness = u.getNominalThickness().map(el =>
    <option key={el} value={el}>{el}</option>
);
const typeofGlass = u.getTypeofGlass().map(el =>
    <option key={el} value={el}>{el}</option>
);

export const ListOfElements = ({vidrios, handleChange, handleBackButton}) => {
    const inputList = vidrios.map( (vidrio, key) => (
        <div key={key.toString()} className='form-group list-of-elements'>
            <div className='form-row'>
                <div className='col'>
                    <small><strong>ALTO:</strong></small>
                    <InputWinProps tag={key} value={vidrio.height} type='height' title='height' handleChange={handleChange}/>
                </div>
                <div className='col'>
                    <small><strong>ANCHO:</strong></small>
                    <InputWinProps tag={key} value={vidrio.width} type='width' title='width' handleChange={handleChange}/>
                </div>
                <div className='col'>
                    <small><strong>ORIENTACIÓN:</strong></small>
                    <SelectWinProps tag={key} value={vidrio.orientacion} type='orientacion' handleChange={handleChange} title='Orientación'
                        optionList={[
                            <option key='N' value='N'>N</option>,
                            <option key='S' value='S'>S</option>,
                            <option key='E' value='E'>E</option>,
                            <option key='W' value='W'>W</option>,
                        ]} />
                </div>
            </div>
            <div className='form-row'>
                <div className='col'>
                    <small><strong>SOMBRA:</strong></small>
                    <SelectWinProps
                        tag={key} value={vidrio.sombra}
                        type='sombra'
                        handleChange={handleChange}
                        title='Sombra'
                        optionList={[
                            <option key='yes' value='yes'>Yes</option>,
                            <option key='no' value='no'>No</option>
                        ]}/>
                </div>
                <div className='col'>
                    <small><strong>ESPESOR NOMINAL:</strong></small>
                    <SelectWinProps
                        tag={key}
                        value={vidrio.espesor_nominal}
                        type='espesor_nominal'
                        handleChange={handleChange}
                        title='Espesor nominal'
                        optionList={nominalThickness}/>
                </div>
                <div className='col'>
                    <small><strong>TIPO DE VIDRIO:</strong></small>
                    <SelectWinProps
                        tag={key}
                        value={vidrio.tipo_de_vidrio}
                        type='tipo_de_vidrio'
                        handleChange={handleChange}
                        title='Tipo de vidrio'
                        optionList={typeofGlass}/>
                </div>
            </div>
        </div>
    ));

    return (
        <div>
            <small><strong>PROPIEDADES DE LAS VENTANAS:</strong></small>
            { inputList }
            <button type="button" 
                    className="btn btn-outline-primary list-back-button"
                    onClick={handleBackButton}>
                    Atrás
            </button>
        </div>
    );
}

const mapStateToProps = state => ({
    vidrios: state.vidrios
});

const mapDispatchToProps = dispatch => ({
    handleChange: event => {
        const el = event.target;
        const id = Number(el.dataset.group);
        const type = el.dataset.type

        dispatch({
            type: 'UPDATE_PROP_VIDRIO',
            data: { id, [type]: el.value }
        });
        dispatch({
            type: 'CALC_AREA_VIDRIO',
            id
        });
    },
    handleBackButton: () => dispatch({
        type: 'HIDE_WINDOWS_PROPS'
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfElements);