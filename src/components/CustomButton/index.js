import React from 'react';
import { connect } from 'react-redux';
import { showElementProperties } from '../../actions';
import PropTypes from 'prop-types';

export const CustomButton = ({
  title,
  buttonText,
  elementType,
  src,
  numberOfElements,
  showElementProperties
}) => (
  <div className="glass-windows form-group">
    <div>
      <small>
        <strong>{`${title}: ${numberOfElements}`}</strong>
      </small>
    </div>
    <div>
      {elementType && (
        <button
          type="button"
          className="btn btn-light"
          onClick={() => showElementProperties(elementType)}
        >
          <img height="28" width="28" src={src} />
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
  src: PropTypes.string,
  numberOfElements: PropTypes.number,
  showElementProperties: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  numberOfElements: state[ownProps.elementType].length
});

export default connect(
  mapStateToProps,
  { showElementProperties }
)(CustomButton);
