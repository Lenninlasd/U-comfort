import React from 'react';
import CanvasElement from './roomCanvasElement';
import CardForm from './cardForm.js';

export const App = () => (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-7 col-md-6'>
                <CanvasElement id='cubeContainer'/>
            </div>
            <div className='col-lg-5 col-md-6'>
                <CardForm />
            </div>
        </div>
    </div>
)
