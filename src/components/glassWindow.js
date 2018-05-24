import React from 'react';
import u from '../reactData';

export default class GlassWindows extends React.Component {
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
        this.props.onWindowsChange({
            id: el.dataset.group,
            [el.dataset.type]: el.value
        });
    }

    render() {
        const windows = this.props.numberWindows >= 0 ? this.props.numberWindows : 0;

        const inputList = [...Array(windows)].map( (_, key) => (
            <div key={key.toString()} className='form-group'>
                <div className='form-row'>
                    <div className='col'>
                        <input id={'window-height-' + key} data-group={'window-' + key}
                               data-type='height' className='form-control' type="number"
                               placeholder='height' onChange={this.handleChange}/>
                    </div>
                    <div className='col'>
                        <input id={'window-width-' + key} data-group={'window-' + key}
                               data-type='width' className="form-control"  type="number"
                               placeholder='width' onChange={this.handleChange} />
                    </div>
                    <div className='col'>
                        <select id={'window-orientation-' + key} data-group={'window-' + key}
                                data-type='orientation' className='form-control' onChange={this.handleChange}>
                            <option hidden >Orientation</option>
                            <option value='N'>N</option>
                            <option value='S'>S</option>
                            <option value='E'>E</option>
                            <option value='W'>W</option>
                        </select>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='col'>
                        <select id={'window-shade-' + key} data-group={'window-' + key}
                                data-type='shade' className='form-control' onChange={this.handleChange}>
                            <option hidden >Shade</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </div>
                    <div className='col'>
                        <select id={'window-nominalthickness-' + key} data-group={'window-' + key}
                                data-type='nominalThickness' className='form-control' onChange={this.handleChange}>
                            <option hidden >Nominal thickness</option>
                            {this.nominalThickness}
                        </select>
                    </div>
                    <div className='col'>
                        <select id={'window-typeofglass-' + key} data-group={'window-' + key}
                                data-type='typeofGlass' className='form-control' onChange={this.handleChange}>
                            <option hidden >Type of glass</option>
                            {this.typeofGlass}
                        </select>
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="glass-windows form-group">
                <small><strong>PROPERTIES:</strong></small>
                { inputList }
            </div>
        )
    }
}
