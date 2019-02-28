import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GlassWindows = ({ vidrios, showWindowsProps }) => (
  <div className="glass-windows form-group">
    <div>
      <small>
        <strong> VENTANAS INSTALADAS: {vidrios.length}</strong>
      </small>
    </div>
    <div>
      <button type="button" className="btn btn-light" onClick={showWindowsProps}>
        <img height="28" width="28" src="./img/ventana_sin_sombra.svg" />
        <span> Agregar o eliminar ventanas</span>
      </button>
    </div>
  </div>
);
GlassWindows.propTypes = {
  vidrios: PropTypes.array.isRequired,
  showWindowsProps: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vidrios: state.vidrios
});

const mapDispatchToProps = dispatch => ({
  showWindowsProps: () => {
    dispatch({
      type: 'SHOW_WINDOWS_PROPS',
      view: 'glassView'
    });
    dispatch({
      type: 'SET_WINDOWS_HISTORY'
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlassWindows);
