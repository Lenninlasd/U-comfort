import React from 'react';
import { connect } from 'react-redux';
import SizeDataForm from '../containers/calcAreasSizeForm.js';
import GlassWindows from './glassWindow';

const CardForm = ({ submit }) => (
    <div className='card u-card'>
        <div className='card-body'>
            <SizeDataForm />
            <GlassWindows />

            <button type="button"
                    className="btn btn-primary"
                    onClick={submit}>Calcular</button>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    submit: () => {
        dispatch({type: 'CALC_AREA_NETA_PARED'});
        dispatch({type: 'SET_CARGA_EMFRIAMIENTO'});
    }
});

export default connect(
    null,
    mapDispatchToProps
)(CardForm);
