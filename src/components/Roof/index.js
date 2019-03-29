import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TABLA_U_TECHO_PARED_PARTICION from '../../../json/U_techos_paredes_particiones';
import { setUoneRoof, setColorKRoof } from '../../actions';

const optionsRoof = TABLA_U_TECHO_PARED_PARTICION.filter(element =>
  element.tipo.includes('TECHO')
).map(el => (
  <option key={el.material} value={el.material}>
    {`${el.tipo} - ${el.material}`}
  </option>
));

const Roof = ({ roof = {}, handleChange, changeColorK }) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col">
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
        <div className="col">
          <div>
            <small>
              <strong> COLOR</strong>
            </small>
          </div>
          <select
            id="correcion_color_K"
            className="form-control"
            value={String(roof.correcion_color_K)}
            onChange={changeColorK}
          >
            <option key="oscuras" value={1}>
              Superficies oscuras o áreas industriales
            </option>
            <option key="claro" value={0.5}>
              Paredes de color claro en zonas rurales
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
Roof.propTypes = {
  roof: PropTypes.shape({
    material: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  changeColorK: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roof: state.techo
});

const mapDispatchToProps = dispatch => ({
  handleChange: event => {
    dispatch(setUoneRoof(event.target.value));
  },
  changeColorK: event => {
    dispatch(setColorKRoof(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roof);
