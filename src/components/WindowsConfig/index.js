import React, { useState } from 'react';
import u from '../../reactData';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SaveAndCancel } from '../BackButton';
import {
  hideElementsView,
  updatePropWindow,
  calcAreaWindow,
  addWindow,
  removeWindow,
  setUndoWindows,
  calcGrossWallArea,
  clearHistory
} from '../../actions';

const formPropTypes = {
  type: PropTypes.string.isRequired,
  tag: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

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
  ...formPropTypes,
  optionList: PropTypes.array.isRequired
};

const InputWinProps = props => (
  <input
    id={`window-${props.type}-${props.tag}`}
    data-group={props.tag}
    data-type={props.type}
    className="form-control form-control-sm"
    type="number"
    value={props.value}
    placeholder={props.title}
    onChange={props.handleChange}
    min="0"
    required
  />
);
InputWinProps.propTypes = { ...formPropTypes };

const typeofGlass = u.getTypeofGlass().map(el => (
  <option key={el} value={el}>
    {el}
  </option>
));

const nominalThickness = type => {
  return u.getNominalThickness(type).map(el => (
    <option key={el} value={el}>
      {el}
    </option>
  ));
};

const GenerateWindowForm = ({ window = {}, keyForm = '', removeItem, handleChange }) => {
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
          <InputWinProps
            tag={keyForm}
            value={String(window.height)}
            type="height"
            title="height"
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <small>
            <strong>ANCHO (m)</strong>
          </small>
          <InputWinProps
            tag={keyForm}
            value={String(window.width)}
            type="width"
            title="width"
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <small>
            <strong>ORIENTACIÓN</strong>
          </small>
          <SelectWinProps
            tag={keyForm}
            value={window.orientacion}
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
      </div>
      <div className="form-row">
        <div className="col">
          <small>
            <strong>SOMBRA</strong>
          </small>
          <SelectWinProps
            tag={keyForm}
            value={window.sombra}
            type="sombra"
            handleChange={handleChange}
            title="Sombra"
            optionList={[
              <option key="yes" value="yes">
                Yes
              </option>,
              <option key="no" value="no">
                No
              </option>
            ]}
          />
        </div>
        <div className="col">
          <small>
            <strong>TIPO DE VIDRIO</strong>
          </small>
          <SelectWinProps
            tag={keyForm}
            value={window.tipo_de_vidrio}
            type="tipo_de_vidrio"
            handleChange={handleChange}
            title="Tipo de vidrio"
            optionList={typeofGlass}
          />
        </div>
        <div className="col">
          <small>
            <strong>ESPESOR NOMINAL</strong>
          </small>
          <SelectWinProps
            tag={keyForm}
            value={window.espesor_nominal}
            type="espesor_nominal"
            handleChange={handleChange}
            title="Espesor nominal"
            optionList={nominalThickness(window.tipo_de_vidrio)}
          />
        </div>
      </div>
    </div>
  );
};
GenerateWindowForm.propTypes = {
  window: PropTypes.object.isRequired,
  keyForm: PropTypes.number.isRequired,
  removeItem: PropTypes.func,
  handleChange: PropTypes.func.isRequired
};

const NewGlassForm = ({ submit }) => {
  const defaultState = {
    width: '',
    height: '',
    orientacion: '',
    sombra: '',
    espesor_nominal: '',
    tipo_de_vidrio: ''
  };

  const [state, setState] = useState(defaultState);

  function handleChange(event) {
    const el = event.target;
    const type = el.dataset.type;
    setState({ ...state, [type]: el.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    submit(state);
    setState(defaultState);
  }

  return (
    <form onSubmit={handleSubmit} className="new-form-bg">
      <GenerateWindowForm window={state} keyForm={100} handleChange={handleChange} />
      <div className="add-window-button row">
        <div className="col-sm">
          <button type="submit" className="btn btn-outline-primary float-right">
            Agregar ventana
          </button>
        </div>
      </div>
    </form>
  );
};
NewGlassForm.propTypes = {
  submit: PropTypes.func.isRequired
};

const ListOfElements = ({
  windows,
  removeItem,
  handleChange,
  handleAddButton,
  handleBackButton,
  handleCancel
}) => {
  const inputList = windows.map((window, key) => (
    <GenerateWindowForm
      window={window}
      removeItem={removeItem}
      key={key}
      keyForm={key}
      handleChange={handleChange}
    />
  ));

  return (
    <div>
      <small>
        <strong>PROPIEDADES DE LAS VENTANAS</strong>
      </small>
      {inputList}
      <NewGlassForm submit={handleAddButton} />
      <SaveAndCancel handleAccept={handleBackButton} handleCancel={handleCancel} />
    </div>
  );
};
ListOfElements.propTypes = {
  windows: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddButton: PropTypes.func.isRequired,
  handleBackButton: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  windows: state.windows
});

const mapDispatchToProps = dispatch => ({
  handleChange: event => {
    const el = event.target;
    const id = Number(el.dataset.group);
    const type = el.dataset.type;

    dispatch(updatePropWindow({ id, [type]: el.value }));
    dispatch(calcAreaWindow(id));
    dispatch(calcGrossWallArea());
  },
  handleAddButton: data => {
    dispatch(addWindow(data));
    dispatch(calcGrossWallArea());
  },
  removeItem: key => {
    dispatch(removeWindow(key));
    dispatch(calcGrossWallArea());
  },
  handleBackButton: () => dispatch(hideElementsView()),
  handleCancel: () => {
    dispatch(hideElementsView());
    dispatch(setUndoWindows());
    dispatch(clearHistory());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfElements);
