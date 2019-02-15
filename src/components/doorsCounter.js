import React from 'react';
import { connect } from 'react-redux';

const DoorsCounter = ({ puertas, showWindowsProps }) => (
  <div className="glass-windows form-group">
    <div>
      <small>
        <strong> PUERTAS INSTALADAS: {puertas.length}</strong>
      </small>
    </div>
    <div>
      <button type="button" className="btn btn-light" onClick={showWindowsProps}>
        <img height="30" width="30" src="./img/puerta-de-entrada-abierta.svg" />
        <span> Agregar o eliminar puertas</span>
      </button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  puertas: state.puertas
});

const mapDispatchToProps = dispatch => ({
  showWindowsProps: () =>
    dispatch({
      type: 'SHOW_WINDOWS_PROPS',
      view: 'doorView'
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoorsCounter);
