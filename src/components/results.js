import React from 'react';
import { connect } from 'react-redux';

const Result = ({cargaEnfriamiento}) => (
    <div className="card">
        <div className="card-body">
            Carga de enfriamiento: {cargaEnfriamiento}
        </div>
    </div>
)


const mapStateToProps = state => ({
    cargaEnfriamiento: state.results.cargaEnfriamiento
});

export default connect(mapStateToProps)(Result);