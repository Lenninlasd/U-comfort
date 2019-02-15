import React from 'react';
import { connect } from 'react-redux';
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

const GenerateWallForm = ({ pared = {}, keyForm = '', handleChange }) => {
  const cardinalPoints = {
    N: 'NORTE',
    S: 'SUR',
    E: 'ESTE',
    W: 'OESTE (W)'
  };

  return (
    <div className="form-group list-of-elements">
      <div className="form-row">
        <div className="col">
          <small>
            <strong>{cardinalPoints[pared.orientacion]}:</strong>
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
      </div>
    </div>
  );
};

const ConfigWalls = ({ paredes, handleBackButton, handleChange }) => {
  return (
    <div>
      <div>
        <BackButton onClick={handleBackButton} />
      </div>
      <small>
        <strong>PROPIEDADES DE LOS MUROS:</strong>
      </small>
      {paredes.map((pared, key) => (
        <GenerateWallForm pared={pared} key={key} keyForm={key} handleChange={handleChange} />
      ))}
    </div>
  );
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

    dispatch({
      type: 'SET_U_1_PARED',
      data: { id, [type]: el.value }
    });
  }
});

const mapStateToProps = state => ({
  paredes: state.paredes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigWalls);
