import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ExteriorConditions from '../ExteriorConditions';
import SizeDataForm from '../../containers/calcAreasSizeForm.js';
import Doors from '../Doors';
import WallsConfig from '../WallsConfig';
import ListOfElements from '../WindowsConfig';
import CustomButton from '../CustomButton';

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

{
  /*TODO: Normalizar estos nombres en toda la app */
}
const buttonsList = [
  { title: 'PAREDES', typeElement: 'paredes', buttonText: 'Configurar paredes' },
  {
    title: 'VENTANAS INSTALADAS',
    typeElement: 'vidrios',
    buttonText: 'Agregar o eliminar ventanas'
  },
  { title: 'PUERTAS', typeElement: 'puertas', buttonText: 'Agregar o eliminar puertas' }
];

const CustomButtons = () => (
  <>
    {buttonsList.map((item, idx) => (
      <CustomButton
        key={idx}
        title={item.title}
        buttonText={item.buttonText}
        typeElement={item.typeElement}
      />
    ))}
  </>
);

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
            <CustomButtons />
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
