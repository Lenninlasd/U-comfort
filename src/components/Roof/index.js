import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TABLE_U_ROOF_WALL_PARTITION from '../../../json/U_techos_paredes_particiones';
import { setUoneRoof, setColorKRoof, setCLTDRoofCorrection } from '../../actions';

import boot from 'bootstrap/dist/css/bootstrap.min.css';

const optionsRoof = TABLE_U_ROOF_WALL_PARTITION.filter(element =>
  element.tipo.includes('TECHO')
).map(el => (
  <option key={el.material} value={el.material}>
    {`${el.tipo} - ${el.material}`}
  </option>
));

export const Roof = ({ roof = {}, handleChange, changeColorK }) => {
  return (
    <div className={boot.formGroup}>
      <div className="row">
        <div className="col">
          <div>
            <small>
              <strong> TIPO DE TECHO</strong>
            </small>
          </div>
          <select
            id="typeofRoof"
            className={boot.formControl}
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
            className={boot.formControl}
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
  roof: state.roof
});

const mapDispatchToProps = {
  handleChange: event => setUoneRoof(event.target.value),
  changeColorK: event => dispatch => {
    dispatch(setColorKRoof(event.target.value));
    dispatch(setCLTDRoofCorrection());
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roof);
