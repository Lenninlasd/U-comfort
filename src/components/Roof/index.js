import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TABLA_U_TECHO_PARED_PARTICION from '../../../json/U_techos_paredes_particiones';

const optionsRoof = TABLA_U_TECHO_PARED_PARTICION.filter(element =>
  element.tipo.includes('TECHO')
).map(el => (
  <option key={el.material} value={el.material}>
    {`${el.tipo} - ${el.material}`}
  </option>
));

const Roof = ({ roof = {}, handleChange }) => {
  return (
    <div className="form-group">
      <div>
        <small>
          <strong> TIPO DE TECHO</strong>
        </small>
      </div>
      <select
        id="typeofRoof"
        className="form-control"
        value={roof.material}
        onChange={handleChange}
      >
        <option hidden value="">
          TIPO DE TECHO
        </option>
        {optionsRoof}
      </select>
    </div>
  );
};
Roof.propTypes = {
  roof: PropTypes.shape({
    material: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roof: state.techo
});

const mapDispatchToProps = dispatch => ({
  handleChange: event => {
    dispatch({
      type: 'SET_U_1_TECHO',
      material: event.target.value
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roof);
