import React from 'react';
import u from '../reactData';
import SizeDataForm from './sizeForm';
import GlassWindows from './glassWindow';
import CanvasElement from './roomCanvasElement';

import globalData from '../model.js';

function CardForm(props) {
    return (
        <div className='card u-card'>
            <div className='card-body'>
                <SizeDataForm width={props.state.width} depth={props.state.depth}
                              height={props.state.height}
                              numberWindows={props.state.numberWindows}
                              onSizeChange={props.handleChange}/>

                <GlassWindows numberWindows={props.state.numberWindows}
                              vidrios={props.state.vidrios}
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
            numberWindows: globalData.elementos.vidrios.length,
            vidrios: globalData.elementos.vidrios,
            cargaEnfriamiento: null,
            globalData: globalData
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
            const filtered = prevState.vidrios.find( (_, key) => key === glassWindow.id);
            if (filtered) {
                Object.assign(filtered, glassWindow);
            }else {
                prevState.vidrios.push(glassWindow);
            }
            return {vidrios: prevState.vidrios};
        });
    }

    handleSubmit(){
        const data = u.getMetricData(this.state);
        this.setState(data);
        console.log('data', data);
        console.log('globalData', globalData);
    }

    render() {
        const size = {
            width: this.state.width,
            height: this.state.height,
            depth: this.state.depth
        };

        return (
            <div className='row'>
                <div className='col-lg-12'>
                    <h1> Carga de enfriamiento (tons): </h1>
                    <h2>{this.state.cargaEnfriamiento}</h2>
                </div>
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
