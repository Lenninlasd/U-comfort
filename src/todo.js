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
                    <input id='length' className="form-control" type="text" value={this.props.length} placeholder='length' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    width:
                    <input id='width' className="form-control" type="text" value={this.props.width}  placeholder='width'  onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    height:
                    <input id='height' className="form-control"  type="text" value={this.props.height} placeholder='height' onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    numero de ventanas:
                    <input id='numberWindows' className="form-control" type="text" value={this.props.numberWindows}
                        placeholder='numero de ventanas' onChange={this.handleChange} />
                </div>
            </form>
        );
    }
}


function Area(props){
    const data = u.getMetricData(props);
    console.log(data);
    return (
        <div>
            <p>Area piso: {data.floor.netArea}</p>
            <p>Perimetro piso: {data.perimeter}</p>
            <pre>{JSON.stringify(data.walls, undefined, 4)}</pre>
        </div>
    );
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { length: 90, width: 60, height: 14, numberWindows: 3 };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(target) {
        const state = {};
        state[target.id] = target.value
        this.setState(state);
    }

    render() {
        const state = this.state;
        return (
            <div>
                <SizeDataForm width={state.width} length={state.length} height={state.height} onSizeChange={this.handleChange}/>
                <Area width={state.width} length={state.length} height={state.height} />
            </div>
        );
    }
}


export default TodoApp;
