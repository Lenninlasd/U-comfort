import React from 'react';
import u from '../reactData';
import SizeDataForm from './sizeForm';
import GlassWindows from './glassWindow';

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
            <div className='row'>
                <div className='offset-md-6 col-md-6'>
                    <div className='card u-card'>
                        <div className='card-body'>
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
                    </div>
                </div>
            </div>
        );
    }
}


export default TodoApp;
