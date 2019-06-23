import React from 'react';
import PropTypes from 'prop-types';

const BackButton = ({ onClick }) => (
  <button type="button" className="btn btn-outline-dark btn-sm list-back-button" onClick={onClick}>
    <strong>&#8592;</strong>
  </button>
);

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const SaveAndCancel = ({ handleAccept, handleCancel }) => (
  <div className="row mt-3 pt-3">
    <div className="col-sm">
      <button
        name="accept"
        className="ml-1 mt-1 mb-1 btn btn-primary float-right"
        type="button"
        onClick={handleAccept}
      >
        Aceptar
      </button>
      <button
        name="cancel"
        className="m-1 btn btn-outline-danger float-right"
        type="button"
        onClick={handleCancel}
      >
        Cancelar
      </button>
    </div>
  </div>
);

SaveAndCancel.propTypes = {
  handleAccept: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default BackButton;
