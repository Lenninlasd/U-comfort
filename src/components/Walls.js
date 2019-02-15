import React from 'react';
import { connect } from 'react-redux';

const Walls = ({ showWindowsProps }) => (
  <div className="glass-windows form-group">
    <div>
      <small>
        <strong> PAREDES: </strong>
      </small>
    </div>
    <div>
      <button type="button" className="btn btn-light" onClick={showWindowsProps}>
        <img height="28" width="28" src="./img/pared.svg" />
        <span> Configurar paredes</span>
      </button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  paredes: state.paredes
});

const mapDispatchToProps = dispatch => ({
  showWindowsProps: () =>
    dispatch({
      type: 'SHOW_WINDOWS_PROPS',
      view: 'wallsView'
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Walls);
