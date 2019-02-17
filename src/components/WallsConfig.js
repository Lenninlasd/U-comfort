import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BackButton from './backButton.js';

import TABLA_U_TECHO_PARED_PARTICION from '../../json/U_techos_paredes_particiones';

const optionsWall = TABLA_U_TECHO_PARED_PARTICION.filter(element =>
  element.tipo.includes('PAREDES')
).map(el => (
  <option key={el.material} value={el.material}>
    {el.material}
  </option>
));

const SelectWinProps = props => (
  <select
    id={`window-${props.type}-${props.tag}`}
    data-group={props.tag}
    data-type={props.type}
    className="form-control form-control-sm"
    onChange={props.handleChange}
    value={props.value}
    required
  >
    <option hidden value="">
      {props.title}
    </option>
    {props.optionList}
  </select>
);
SelectWinProps.propTypes = {
  type: PropTypes.string.isRequired,
  tag: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  optionList: PropTypes.array.isRequired
};

const GenerateWallForm = ({ pared = {}, keyForm = '', handleChange }) => {
  const cardinalPoints = {
    N: 'PARED NORTE',
    S: 'PARED SUR',
    E: 'PARED ESTE',
    W: 'PARED OESTE (W)'
  };

  return (
    <div className="form-group list-of-elements">
      <div className="form-row">
        <div className="col">
          <small>
            <strong>{cardinalPoints[pared.orientacion]}</strong>
          </small>
          <div className="row">
            <div className="col">
              <small>
                <strong>MATERIAL</strong>
              </small>
              <SelectWinProps
                tag={keyForm}
                value={pared.material}
                type="material"
                handleChange={handleChange}
                title="Material"
                optionList={optionsWall}
              />
            </div>
            <div className="col">
              <small>
                <strong>COLOR</strong>
              </small>
              <SelectWinProps
                tag={keyForm}
                value={String(pared.correcion_color_K)}
                type="correcion_color_K"
                handleChange={handleChange}
                title="Color pared"
                optionList={[
                  <option key="oscuras" value={1}>
                    Superficies oscuras o áreas industriales
                  </option>,
                  <option key="claro" value={0.65}>
                    Paredes de color claro en zonas rurales
                  </option>
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
GenerateWallForm.propTypes = {
  pared: PropTypes.shape({
    orientacion: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired
  }).isRequired,
  keyForm: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

const ConfigWalls = ({ paredes, handleBackButton, handleChange }) => {
  return (
    <div>
      <div>
        <BackButton onClick={handleBackButton} />
      </div>
      <small>
        <strong>PROPIEDADES DE LOS MUROS</strong>
      </small>
      {paredes.map((pared, key) => (
        <GenerateWallForm pared={pared} key={key} keyForm={key} handleChange={handleChange} />
      ))}
    </div>
  );
};
ConfigWalls.propTypes = {
  paredes: PropTypes.array.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleBackButton: () =>
    dispatch({
      type: 'HIDE_WINDOWS_PROPS'
    }),
  handleChange: event => {
    const el = event.target;
    const id = Number(el.dataset.group);
    const type = el.dataset.type;

    switch (type) {
      case 'material':
        return dispatch({
          type: 'SET_U_1_PARED',
          data: { id, [type]: el.value }
        });
      case 'correcion_color_K':
        return dispatch({
          type: 'SET_COLOR_K',
          data: { id, k: el.value }
        });
    }
  }
});

const mapStateToProps = state => ({
  paredes: state.paredes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigWalls);
