import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ExteriorConditions from '../exteriorConditions.js';
import SizeDataForm from '../../containers/calcAreasSizeForm.js';
import GlassWindows from '../glassWindow.js';
import Walls from '../Walls.js';
import DoorsCounter from '../doorsCounter.js';
import Doors from '../doors.js';
import WallsConfig from '../WallsConfig';
import ListOfElements from '../listOfElements.js';

const switchViews = (windowsView, defaultView) => {
  switch (windowsView) {
    case 'glassView':
      return (
        <div>
          <ListOfElements />
        </div>
      );
    case 'doorView':
      return <Doors />;
    case 'wallsView':
      return <WallsConfig />;
    default:
      return defaultView;
  }
};

const CardForm = ({ history, submit, windowsView }) => {
  const handleClick = () => {
    submit();
    history.push('/equipment');
  };

  return (
    <div className="card u-card">
      <div className="card-body">
        {switchViews(
          windowsView,
          <div>
            <ExteriorConditions />
            <SizeDataForm />
            <Walls />
            <GlassWindows />
            <DoorsCounter />
            <button type="button" className="btn btn-primary" onClick={handleClick}>
              Calcular
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
CardForm.propTypes = {
  history: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  windowsView: PropTypes.string
};

const mapStateToProps = state => ({
  windowsView: state.appConfig.windowsView
});

const mapDispatchToProps = dispatch => ({
  submit: () => {
    dispatch({ type: 'CALC_AREA_NETA_PARED' });
    dispatch({ type: 'SET_CARGA_EMFRIAMIENTO' });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardForm)
);
