import React from 'react';
import u from '../reactData';
import SizeDataForm from './sizeForm';
import GlassWindows from './glassWindow';
import CanvasElement from './roomCanvasElement';

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

function CardForm(props) {
    return (
        <div className='card u-card'>
            <div className='card-body'>
                <SizeDataForm width={props.state.width} length={props.state.length}
                              height={props.state.height}
                              onSizeChange={props.handleChange}/>

                <GlassWindows numberWindows={props.state.numberWindows}
                              windowList={props.state.windowList}
                              onWindowsChange={props.handleWindows}/>

                <button type="button"
                        className="btn btn-primary"
                        onClick={props.handleSubmit}>Calcular</button>

                <Area floor={props.state.floor}
                      perimeter={props.state.perimeter}
                      walls={props.state.walls} windowList={props.state.windowList}/>
            </div>
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
        return (
            <div className='row'>
                <div className='col-md-6'>
                    <CanvasElement id='cubeContainer'/>
                </div>
                <div className='col-md-6'>
                    <CardForm state={this.state}
                              handleChange={this.handleChange}
                              handleWindows={this.handleWindows}
                              handleSubmit={this.handleSubmit} />
                </div>
            </div>
        );
    }
}


export default TodoApp;
