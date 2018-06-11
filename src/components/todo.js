import React from 'react';
import u from '../reactData';
import SizeDataForm from './sizeForm';
import GlassWindows from './glassWindow';
import CanvasElement from './roomCanvasElement';

function CardForm(props) {
    return (
        <div className='card u-card'>
            <div className='card-body'>
                <SizeDataForm width={props.state.width} depth={props.state.depth}
                              height={props.state.height}
                              numberWindows={props.state.numberWindows}
                              onSizeChange={props.handleChange}/>

                <GlassWindows numberWindows={props.state.numberWindows}
                              windowList={props.state.windowList}
                              onWindowsChange={props.handleWindows}/>

                <button type="button"
                        className="btn btn-primary"
                        onClick={props.handleSubmit}>Calcular</button>
            </div>
        </div>
    );
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depth: 90,
            width: 60,
            height: 14,
            numberWindows: 3,
            windowList: [],
            cargaEnfriamiento: null
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
        console.log('data', data);
    }

    render() {
        const size = {
            width: this.state.width,
            height: this.state.height,
            depth: this.state.depth
        };

        return (
            <div className='row'>
                <h1> Carga de enfriamiento (tons):</h1>
                <h3>{this.state.cargaEnfriamiento}</h3>
                <div className='col-lg-7 col-md-6'>
                    <CanvasElement id='cubeContainer' size={size}/>
                </div>
                <div className='col-lg-5 col-md-6'>
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
