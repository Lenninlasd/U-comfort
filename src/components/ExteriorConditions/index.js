import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Latidud
import condicionesClimaticas from '../../../json/condiciones_climaticas';

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
      <div className="form-row form-group">
        <div className="col-md-12 col-sm-12">
          <small>
            <strong>CIUDAD</strong>
          </small>
          <select id="ciudad" className="form-control" onChange={handleChange} value={exterior.id}>
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
    dispatch({
      type: 'SET_EXTERIOR_CONDITIONS',
      exterior: condicionesClimaticas[value]
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExteriorConditions);
