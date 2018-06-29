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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    submit: state => {
        console.log('state', state);
        const {depth, height, width, vidrios} = state;

        dispatch({
            type: 'CALC_AREA_NETA_PARED',
            glassState: vidrios,
            size: {depth, height, width}
        });
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    submit: () => dispatchProps.submit(stateProps)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(CardForm);
