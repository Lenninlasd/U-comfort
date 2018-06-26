import React from 'react';
import { connect } from 'react-redux';
import SizeDataForm from './sizeForm';
import GlassWindows from './glassWindow';

import u from '../reactData';

const CardForm = props => (
    <div className='card u-card'>
        <div className='card-body'>
            <SizeDataForm />
            <GlassWindows />

            <button type="button"
                    className="btn btn-primary"
                    onClick={props.submit}>Calcular</button>
        </div>
    </div>
);

const mapStateToProps = state => ({
    submit: event => {
        const data = u.getMetricData(state);
        console.log('data', data);
    }
});

export default connect(mapStateToProps)(CardForm);
