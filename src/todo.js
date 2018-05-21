import React from 'react';
import u from './reactData';

class SizeDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onSizeChange(event.target);
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    length:
                    <input id='length' className="form-control" type="number" value={this.props.length} placeholder='length' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    width:
                    <input id='width' className="form-control" type="number" value={this.props.width}  placeholder='width'  onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    height:
                    <input id='height' className="form-control"  type="number" value={this.props.height} placeholder='height' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    numero de ventanas:
                    <input id='numberWindows' className="form-control" type="number" value={this.props.numberWindows}
                        placeholder='numero de ventanas' onChange={this.handleChange} min='0' max='20' />
                </div>
            </form>
        );
    }
}

class GlassWindows extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.list = [];
        this.nominalThickness = [...u.getNominalThickness()].map(el =>
            <option key={el} value={el}>{el}</option>
        );
        this.typeofGlass = [...u.getTypeofGlass()].map(el =>
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
            <div key={key.toString()} className='form-row'>
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
        ));

        return (
            <div className="form-group">
                { inputList }
            </div>
        )
    }
}


function Area(props){
    return !props.perimeter ? null : (
        <div className="card">
            <p>Area piso: {props.floor.netArea || 'hello'}</p>
            <p>Perimetro piso: {props.perimeter}</p>
            <pre>{JSON.stringify(props.walls, undefined, 4)}</pre>
            <pre>{JSON.stringify(props.windowList, undefined, 4)}</pre>
        </div>
    );
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 90, width: 60, height: 14,
            numberWindows: 3 ,
            windowList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWindows = this.handleWindows.bind(this);
    }

    handleChange(target) {
        const state = {};
        state[target.id] = Number(target.value);
        this.setState(state);
    }

    handleWindows(glassWindow){
        this.setState( prevState => {
            const filtered = prevState.windowList.find(item => item.id === glassWindow.id);
            if (filtered) {
                Object.assign(filtered, glassWindow);
            }else {
                prevState.windowList.push(glassWindow);
            }
            return {windowList: prevState.windowList};
        });
    }

    handleSubmit(){
        const data = u.getMetricData(this.state);
        this.setState(data);
    }

    render() {
        const state = this.state;
        return (
            <div>
                <SizeDataForm width={state.width} length={state.length}
                              height={state.height}
                              onSizeChange={this.handleChange}/>

                <GlassWindows numberWindows={state.numberWindows}
                              windowList={state.windowList}
                              onWindowsChange={this.handleWindows}/>

                <button type="button"
                        className="btn btn-primary"
                        onClick={this.handleSubmit}>Calcular</button>

                <Area floor={state.floor}
                      perimeter={state.perimeter}
                      walls={state.walls} windowList={state.windowList}/>
            </div>
        );
    }
}


export default TodoApp;
