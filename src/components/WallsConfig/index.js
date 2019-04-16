import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SaveAndCancel } from '../BackButton';
import TABLE_U_ROOF_WALL_PARTITION from '../../../json/U_techos_paredes_particiones';
import {
  hideElementsView,
  setUoneWall,
  setColorkWall,
  setUndoWall,
  setWallCLTDCorretion,
  clearHistory
} from '../../actions';

const optionsWall = TABLE_U_ROOF_WALL_PARTITION.filter(element =>
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

const GenerateWallForm = ({ wall = {}, keyForm = '', handleChange }) => {
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
            <strong>{cardinalPoints[wall.orientacion]}</strong>
          </small>
          <div className="row">
            <div className="col">
              <small>
                <strong>MATERIAL</strong>
              </small>
              <SelectWinProps
                tag={keyForm}
                value={wall.material}
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
                value={String(wall.correcion_color_K)}
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
  wall: PropTypes.shape({
    orientacion: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired
  }).isRequired,
  keyForm: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

const ConfigWalls = ({ walls, handleBackButton, handleChange, handleCancel }) => {
  return (
    <div>
      <small>
        <strong>PROPIEDADES DE LOS MUROS</strong>
      </small>
      {walls.map((wall, key) => (
        <GenerateWallForm wall={wall} key={key} keyForm={key} handleChange={handleChange} />
      ))}
      <SaveAndCancel handleAccept={handleBackButton} handleCancel={handleCancel} />
    </div>
  );
};
ConfigWalls.propTypes = {
  walls: PropTypes.array.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleBackButton: () => dispatch(hideElementsView()),
  handleChange: event => {
    const el = event.target;
    const id = Number(el.dataset.group);
    const type = el.dataset.type;

    switch (type) {
      case 'material':
        dispatch(setUoneWall({ id, [type]: el.value }));
        dispatch(setWallCLTDCorretion());
        return;
      case 'correcion_color_K':
        dispatch(setColorkWall({ id, k: el.value }));
        dispatch(setWallCLTDCorretion());
        return;
    }
  },
  handleCancel: () => {
    dispatch(hideElementsView());
    dispatch(setUndoWall());
    dispatch(clearHistory());
  }
});

const mapStateToProps = state => ({
  walls: state.walls
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigWalls);
