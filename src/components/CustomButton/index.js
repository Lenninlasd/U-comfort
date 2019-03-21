import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CustomButton = ({ title, buttonText, typeElement, data, showWindowsProps }) => (
  <div className="glass-windows form-group">
    <div>
      <small>
        <strong>{typeElement === 'paredes' ? title : `${title}: ${data.length}`}</strong>
      </small>
    </div>
    <div>
      {/* Esto se puede mejorar Adicionando un svg-loader a webpack */}
      {typeElement && (
        <button type="button" className="btn btn-light" onClick={showWindowsProps}>
          <img height="28" width="28" src={`./img/${typeElement}.svg`} />
          <span>{` ${buttonText}`}</span>
        </button>
      )}
    </div>
  </div>
);

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  typeElement: PropTypes.string.isRequired,
  data: PropTypes.array,
  showWindowsProps: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  data: state[ownProps.typeElement]
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typeElement } = ownProps;
  let view, type;

  switch (typeElement) {
    case 'paredes':
      view = 'wallsView';
      type = 'SET_WALL_HISTORY';
      break;
    case 'puertas':
      view = 'doorView';
      type = 'SET_DOORS_HISTORY';
      break;
    default:
      view = 'glassView';
      type = 'SET_WINDOWS_HISTORY';
      break;
  }

  return {
    showWindowsProps: () => {
      dispatch({
        type: 'SHOW_WINDOWS_PROPS',
        view
      });
      dispatch({
        type
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomButton);
