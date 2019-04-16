import React from 'react';
import { connect } from 'react-redux';
import { SaveAndCancel } from '../BackButton';
import PropTypes from 'prop-types';
import TABLE_U_ROOF_WALL_PARTITION from '../../../json/U_techos_paredes_particiones';
import {
  calcGrossWallArea,
  setUoneDoor,
  updatePropDoor,
  calcAreaDoor,
  removeDoor,
  addDoor,
  hideElementsView,
  setUndoDoors,
  clearHistory
} from '../../actions';

const optionsDoors = TABLE_U_ROOF_WALL_PARTITION.filter(element =>
  element.tipo.includes('PUERTA')
).map(el => (
  <option key={el.material} value={el.material}>
    {`${el.tipo} - ${el.material}`}
  </option>
));

const formPropTypes = {
  type: PropTypes.string.isRequired,
  tag: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const InputDoorProps = props => (
  <input
    id={`door-${props.type}-${props.tag}`}
    data-group={props.tag}
    data-type={props.type}
    className="form-control"
    type="number"
    value={props.value}
    placeholder={props.title}
    onChange={props.handleChange}
    min="0"
    required
  />
);
InputDoorProps.propTypes = { ...formPropTypes };

const SelectDoorProps = props => (
  <select
    id={`door-${props.type}-${props.tag}`}
    data-group={props.tag}
    data-type={props.type}
    className="form-control"
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
SelectDoorProps.propTypes = {
  ...formPropTypes,
  optionList: PropTypes.array.isRequired
};

const GenerateDoors = ({ door = {}, keyForm = '', removeItem, handleChange }) => {
  const deleteItem =
    typeof removeItem === 'function' ? (
      <div className="remove-item" onClick={() => removeItem(keyForm)}>
        {' '}
        &times;
      </div>
    ) : null;

  return (
    <div className="form-group list-of-elements">
      {deleteItem}
      <div className="form-row">
        <div className="col">
          <small>
            <strong>ALTO (m)</strong>
          </small>
          <InputDoorProps
            tag={keyForm}
            value={String(door.height)}
            type="height"
            title="height"
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <small>
            <strong>ANCHO (m)</strong>
          </small>
          <InputDoorProps
            tag={keyForm}
            value={String(door.width)}
            type="width"
            title="width"
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <small>
            <strong>ORIENTACIÓN</strong>
          </small>
          <SelectDoorProps
            tag={keyForm}
            value={door.orientacion}
            type="orientacion"
            handleChange={handleChange}
            title="Orientación"
            optionList={[
              <option key="N" value="N">
                N
              </option>,
              <option key="S" value="S">
                S
              </option>,
              <option key="E" value="E">
                E
              </option>,
              <option key="W" value="W">
                W
              </option>
            ]}
          />
        </div>
        <div className="col">
          <small>
            <strong>MATERIAL</strong>
          </small>
          <SelectDoorProps
            tag={keyForm}
            value={door.material}
            type="material"
            handleChange={handleChange}
            title="Material"
            optionList={optionsDoors}
          />
        </div>
      </div>
    </div>
  );
};
GenerateDoors.propTypes = {
  door: PropTypes.object.isRequired,
  keyForm: PropTypes.number.isRequired,
  removeItem: PropTypes.func,
  handleChange: PropTypes.func.isRequired
};

class NewDoorForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = { width: '', height: '', orientacion: '', material: '' };
    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const el = event.target;
    const type = el.dataset.type;
    const numericValue = Number(el.value);
    const value = Number.isNaN(numericValue) ? el.value : numericValue;
    this.setState({ [type]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
    this.setState(this.defaultState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="new-form-bg">
        <GenerateDoors door={this.state} keyForm={100} handleChange={this.handleChange} />
        <div className="add-window-button row">
          <div className="col-sm">
            <button type="submit" className="btn btn-outline-primary float-right">
              Agregar puerta
            </button>
          </div>
        </div>
      </form>
    );
  }
}
NewDoorForm.propTypes = {
  submit: PropTypes.func.isRequired
};

const Doors = ({
  doors,
  handleChange,
  handleBackButton,
  removeItem,
  handleAddButton,
  handleCancel
}) => {
  const inputList = doors.map((door, key) => (
    <GenerateDoors
      door={door}
      keyForm={key}
      key={key}
      removeItem={removeItem}
      handleChange={handleChange}
    />
  ));

  return (
    <div>
      <small>
        <strong>PROPIEDADES DE LAS PUERTAS:</strong>
      </small>
      {inputList}
      <NewDoorForm submit={handleAddButton} />
      <SaveAndCancel handleAccept={handleBackButton} handleCancel={handleCancel} />
    </div>
  );
};
Doors.propTypes = {
  doors: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  handleAddButton: PropTypes.func.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

const getDispatchData = (event, dispatch) => {
  const el = event.target;
  const value = el.type === 'number' ? Number(el.value) : el.value;
  const id = Number(el.dataset.group);
  const type = el.dataset.type;

  const data = { id, [type]: value };

  if (type === 'material') {
    dispatch(setUoneDoor(data));
  } else {
    dispatch(updatePropDoor(data));
    dispatch(calcAreaDoor(id));
    dispatch(calcGrossWallArea());
  }
};

const mapStateToProps = state => ({
  doors: state.doors
});

const mapDispatchToProps = dispatch => ({
  handleChange: event => getDispatchData(event, dispatch),
  removeItem: key => {
    dispatch(removeDoor(key));
    dispatch(calcGrossWallArea());
  },
  handleAddButton: data => {
    dispatch(addDoor(data));
    dispatch(calcGrossWallArea());
  },
  handleBackButton: () => dispatch(hideElementsView()),
  handleCancel: () => {
    dispatch(hideElementsView());
    dispatch(setUndoDoors());
    dispatch(clearHistory());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doors);
