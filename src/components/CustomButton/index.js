import React from 'react';
import { connect } from 'react-redux';
import { showElementView, setElementHistory } from '../../actions';
import PropTypes from 'prop-types';

const CustomButton = ({ title, buttonText, elementType, data, showWindowsProps }) => (
  <div className="glass-windows form-group">
    <div>
      <small>
        <strong>{elementType === 'paredes' ? title : `${title}: ${data.length}`}</strong>
      </small>
    </div>
    <div>
      {/* Esto se puede mejorar Adicionando un svg-loader a webpack */}
      {elementType && (
        <button type="button" className="btn btn-light" onClick={showWindowsProps}>
          <img height="28" width="28" src={`./img/${elementType}.svg`} />
          <span>{` ${buttonText}`}</span>
        </button>
      )}
    </div>
  </div>
);

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  data: PropTypes.array,
  showWindowsProps: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  data: state[ownProps.elementType]
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { elementType } = ownProps;
  return {
    showWindowsProps: () => {
      dispatch(showElementView(elementType));
      dispatch(setElementHistory(elementType));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomButton);
