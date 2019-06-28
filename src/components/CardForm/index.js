import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ExteriorConditions from '../ExteriorConditions';
import Room from '../RoomConfig';
import Doors from '../Doors';
import WallsConfig from '../WallsConfig';
import ListOfElements from '../WindowsConfig';
import CustomButton from '../CustomButton';
import Roof from '../Roof';

import wallsImg from '../../../img/walls.svg';
import windowsImg from '../../../img/windows.svg';
import doorsImg from '../../../img/doors.svg';

import { submitForm } from '../../actions';

import boot from 'bootstrap/dist/css/bootstrap.min.css';

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

const CustomButtons = () => {
  const buttonsList = [
    {
      title: 'PAREDES',
      elementType: 'walls',
      src: wallsImg,
      buttonText: 'Configurar paredes'
    },
    {
      title: 'VENTANAS INSTALADAS',
      elementType: 'windows',
      src: windowsImg,
      buttonText: 'Agregar o eliminar ventanas'
    },
    {
      title: 'PUERTAS',
      elementType: 'doors',
      src: doorsImg,
      buttonText: 'Agregar o eliminar puertas'
    }
  ];
  return (
    <>
      {buttonsList.map((item, idx) => (
        <CustomButton
          key={idx}
          title={item.title}
          buttonText={item.buttonText}
          elementType={item.elementType}
          src={item.src}
        />
      ))}
    </>
  );
};

export const CardForm = ({ history, submitForm, windowsView }) => {
  const handleClick = () => {
    submitForm();
    history.push('/equipment');
  };

  return (
    <div className={`${boot.card}`}>
      <div className={boot.cardBody}>
        {switchViews(
          windowsView,
          <div>
            <ExteriorConditions />
            <Room />
            <CustomButtons />
            <Roof />
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
  submitForm: PropTypes.func.isRequired,
  windowsView: PropTypes.string
};

const mapStateToProps = state => ({
  windowsView: state.appConfig.windowsView
});

export default withRouter(
  connect(
    mapStateToProps,
    { submitForm }
  )(CardForm)
);
