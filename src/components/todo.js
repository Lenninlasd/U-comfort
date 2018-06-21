import React from 'react';
import u from '../reactData';
import CanvasElement from './roomCanvasElement';
import {CardForm} from './cardForm.js';

import globalData from '../model.js';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depth: 90,
            width: 60,
            height: 14,
            numberWindows: globalData.elementos.vidrios.length,
            vidrios: globalData.elementos.vidrios,
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
    }

    render() {
        const size = {
            width: this.state.width,
            height: this.state.height,
            depth: this.state.depth
        };

        return (
            <div className='row'>
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
