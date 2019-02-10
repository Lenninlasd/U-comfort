import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CanvasElement from './roomCanvasElement';
import CardForm from './cardForm.js';
import Result from './results.js';
import EquipmentsView from './Equipments.js';

const MainView = () => (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-12'>
                <Result />
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-7 col-md-6'>
                <CanvasElement id='cubeContainer'/>
            </div>
            <div className='col-lg-5 col-md-6'>
                <CardForm />
            </div>
        </div>
    </div>
);



export const App = () => (
    <Router>
        <div>
            <Link to="/">Home </Link>
            <Link to="/equipment">Equipment</Link>

            <Route exact path="/" component={MainView} />
            <Route path="/equipment" component={EquipmentsView} />
        </div>
    </Router>
)