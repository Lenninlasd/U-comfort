import React from 'react';
import u from '../reactData';

function SelectWinProps(props) {
    return (
        <select id={`window-${props.type}-${props.tag}`} data-group={`window-${props.tag}`}
                data-type={props.type} className='form-control' onChange={props.handleChange}>
            <option hidden >{props.title}</option>
            {props.optionList}
        </select>
    );
}

function InputWinProps(props) {
    return (
        <input id={`window-${props.type}-${props.tag}`} data-group={`window-${props.tag}`}
               data-type={props.type} className='form-control' type="number"
               placeholder={props.title} onChange={props.handleChange}/>
    );
}

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
                        <InputWinProps tag={key} type='height' title='height' handleChange={this.handleChange}/>
                    </div>
                    <div className='col'>
                        <InputWinProps tag={key} type='width' title='width' handleChange={this.handleChange}/>
                    </div>
                    <div className='col'>
                        <SelectWinProps tag={key} type='orientation' handleChange={this.handleChange} title='Orientation'
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
                        <SelectWinProps tag={key} type='shade' handleChange={this.handleChange} title='Shade'
                            optionList={[
                                <option key='yes' value='yes'>Yes</option>,
                                <option key='no' value='no'>No</option>
                            ]}/>
                    </div>
                    <div className='col'>
                        <SelectWinProps tag={key} type='nominalThickness' handleChange={this.handleChange}
                                        title='Nominal thickness' optionList={this.nominalThickness}/>
                    </div>
                    <div className='col'>
                        <SelectWinProps tag={key} type='typeofGlass' handleChange={this.handleChange}
                                        title='Type of glass' optionList={this.typeofGlass}/>
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
