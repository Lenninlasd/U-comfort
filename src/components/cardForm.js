import React from 'react';
import { connect } from 'react-redux';
import ExteriorConditions from './exteriorConditions.js'
import SizeDataForm from '../containers/calcAreasSizeForm.js';
import GlassWindows from './glassWindow';
import Doors from './doors.js';
import ListOfElements from './listOfElements.js'


const CardForm = ({ submit, showWindowsProps }) => (
    <div className='card u-card'>
        <div className='card-body'>
            {
                showWindowsProps ?
                <div><ListOfElements /></div> :
                <div>
                    <ExteriorConditions />
                    <SizeDataForm />
                    <GlassWindows />
                    <Doors />
                    <button type="button"
                            className="btn btn-primary"
                            onClick={submit}>Calcular</button>
                </div>
            }
        </div>
    </div>
);

const mapStateToProps = state => ({
    showWindowsProps: state.appConfig.showWindowsProps
})

const mapDispatchToProps = dispatch => ({
    submit: () => {
        dispatch({type: 'CALC_AREA_NETA_PARED'});
        dispatch({type: 'SET_CARGA_EMFRIAMIENTO'});
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardForm);
