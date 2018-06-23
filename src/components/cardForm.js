import React from 'react';
import SizeDataForm from './sizeForm';
import GlassWindows from './glassWindow';

export const CardForm = props => (
    <div className='card u-card'>
        <div className='card-body'>
            <SizeDataForm />
            <GlassWindows />

            {/* <GlassWindows numberWindows={props.state.numberWindows}
                          vidrios={props.state.vidrios}
                          onWindowsChange={props.handleWindows}/> */}

            {/* <button type="button"
                    className="btn btn-primary"
                    onClick={props.handleSubmit}>Calcular</button> */}
        </div>
    </div>
);
