import React from 'react';
import u from '../reactData';
import { connect } from 'react-redux';

const SelectWinProps = props => (
    <select id={`window-${props.type}-${props.tag}`} data-group={props.tag}
            data-type={props.type} className='form-control' onChange={props.handleChange}
            value={props.value}>
        <option hidden >{props.title}</option>
        {props.optionList}
    </select>
);

const InputWinProps = props => (
    <input id={`window-${props.type}-${props.tag}`} data-group={props.tag}
           data-type={props.type} className='form-control' type="number"
           value={props.value} placeholder={props.title} onChange={props.handleChange}
           min='0'/>
);

class GlassWindows extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.list = [];
        this.nominalThickness = u.getNominalThickness().map(el =>
            <option key={el} value={el}>{el}</option>
        );
        this.typeofGlass = u.getTypeofGlass().map(el =>
            <option key={el} value={el}>{el}</option>
        );
    }

    handleChange(event){
        const el = event.target;
        const id = Number(el.dataset.group);
        const type = el.dataset.type
        const dataTarget = {
            id,
            [type]: el.value
        }
        this.props.updateGlassProp(dataTarget);

        // if (type === 'height' || type === 'width') {
            this.props.updateAreaGlass(id);
        // }
    }

    render() {
        const windows = this.props.vidrios.length;

        const inputList = this.props.vidrios.map( (vidrio, key) => (
            <div key={key.toString()} className='form-group'>
                <div className='form-row'>
                    <div className='col'>
                        <InputWinProps tag={key} value={vidrio.height} type='height' title='height' handleChange={this.handleChange}/>
                    </div>
                    <div className='col'>
                        <InputWinProps tag={key} value={vidrio.width} type='width' title='width' handleChange={this.handleChange}/>
                    </div>
                    <div className='col'>
                        <SelectWinProps tag={key} value={vidrio.orientacion} type='orientacion' handleChange={this.handleChange} title='Orientación'
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
                        <SelectWinProps
                            tag={key} value={vidrio.sombra}
                            type='sombra'
                            handleChange={this.handleChange}
                            title='Sombra'
                            optionList={[
                                <option key='yes' value='yes'>Yes</option>,
                                <option key='no' value='no'>No</option>
                            ]}/>
                    </div>
                    <div className='col'>
                        <SelectWinProps
                            tag={key}
                            value={vidrio.espesor_nominal}
                            type='espesor_nominal'
                            handleChange={this.handleChange}
                            title='Espesor nominal'
                            optionList={this.nominalThickness}/>
                    </div>
                    <div className='col'>
                        <SelectWinProps
                            tag={key}
                            value={vidrio.tipo_de_vidrio}
                            type='tipo_de_vidrio'
                            handleChange={this.handleChange}
                            title='Tipo de vidrio'
                            optionList={this.typeofGlass}/>
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="glass-windows form-group">
                <small><strong>PROPIEDADES DE LAS VENTANAS:</strong></small>
                { inputList }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    numberWindows: 3,
    vidrios: state.vidrios
});

const mapDispatchToProps = dispatch => ({
    updateGlassProp: data => dispatch({
        type: 'UPDATE_PROP',
        data
    }),
    updateAreaGlass: id => {
        dispatch({
        type: 'CALC_AREA_VIDRIO',
        id})
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GlassWindows);
