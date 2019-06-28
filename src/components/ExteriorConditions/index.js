import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExteriorConditions, setSHGFWindow, setWallCLTDCorretion } from '../../actions';

// Latidud
import condicionesClimaticas from '../../../json/condiciones_climaticas';

import boot from 'bootstrap/dist/css/bootstrap.min.css';

const OptionList = () => (
  <>
    {condicionesClimaticas.map(item => (
      <option key={item.id} value={item.id}>
        {item.ciudad}
      </option>
    ))}
  </>
);

const ExteriorConditions = ({ exterior, handleChange }) => {
  return (
    <form>
      <div className={`${boot.formRow} ${boot.formGroup}`}>
        <div className={`${boot.colMd12} ${boot.colSm12}`}>
          <small>
            <strong>CIUDAD</strong>
          </small>
          <select
            id="city"
            className={boot.formControl}
            onChange={handleChange}
            value={exterior.id}
          >
            <option hidden>CIUDAD</option>
            <OptionList />
          </select>
        </div>
      </div>
      <hr />
    </form>
  );
};
ExteriorConditions.propTypes = {
  exterior: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  exterior: state.exterior
});

const mapDispatchToProps = dispatch => ({
  handleChange: event => {
    const value = event.target.value;
    dispatch(setExteriorConditions(condicionesClimaticas[value]));
    dispatch(setSHGFWindow());
    dispatch(setWallCLTDCorretion());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExteriorConditions);
