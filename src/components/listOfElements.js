import React from 'react';
import u from '../reactData';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BackButton from './backButton.js';

const formPropTypes = {
  type: PropTypes.string.isRequired,
  tag: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
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
  value: PropTypes.string.isRequired,
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

const GenerateWindowForm = ({ vidrio = {}, keyForm = '', removeItem, handleChange }) => {
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
            <strong>ALTO</strong>
          </small>
          <InputWinProps
            tag={keyForm}
            value={vidrio.height}
            type="height"
            title="height"
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <small>
            <strong>ANCHO</strong>
          </small>
          <InputWinProps
            tag={keyForm}
            value={vidrio.width}
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
            value={vidrio.orientacion}
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
            value={vidrio.sombra}
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
            value={vidrio.tipo_de_vidrio}
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
            value={vidrio.espesor_nominal}
            type="espesor_nominal"
            handleChange={handleChange}
            title="Espesor nominal"
            optionList={nominalThickness(vidrio.tipo_de_vidrio)}
          />
        </div>
      </div>
    </div>
  );
};
GenerateWindowForm.propTypes = {
  vidrio: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    orientacion: PropTypes.string.isRequired,
    sombra: PropTypes.string.isRequired,
    tipo_de_vidrio: PropTypes.string.isRequired
  }).isRequired,
  keyForm: PropTypes.number.isRequired,
  removeItem: PropTypes.func,
  handleChange: PropTypes.func.isRequired
};

class NewGlassForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      width: 0,
      height: 0,
      orientacion: '',
      sombra: '',
      espesor_nominal: '',
      tipo_de_vidrio: ''
    };
    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const el = event.target;
    const type = el.dataset.type;
    this.setState({ [type]: el.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
    this.setState(this.defaultState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="new-form-bg">
        <GenerateWindowForm vidrio={this.state} keyForm={100} handleChange={this.handleChange} />
        <div className="add-window-button">
          <button type="submit" className="btn btn-outline-primary">
            Agregar ventana
          </button>
        </div>
      </form>
    );
  }
}
NewGlassForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export const ListOfElements = ({
  vidrios,
  removeItem,
  handleChange,
  handleAddButton,
  handleBackButton
}) => {
  const inputList = vidrios.map((vidrio, key) => (
    <GenerateWindowForm
      vidrio={vidrio}
      removeItem={removeItem}
      key={key}
      keyForm={key}
      handleChange={handleChange}
    />
  ));

  return (
    <div>
      <div>
        <BackButton onClick={handleBackButton} />
      </div>
      <small>
        <strong>PROPIEDADES DE LAS VENTANAS:</strong>
      </small>
      {inputList}
      <NewGlassForm submit={handleAddButton} />
    </div>
  );
};
ListOfElements.propTypes = {
  vidrios: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddButton: PropTypes.func.isRequired,
  handleBackButton: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vidrios: state.vidrios
});

const mapDispatchToProps = dispatch => ({
  handleChange: event => {
    const el = event.target;
    const id = Number(el.dataset.group);
    const type = el.dataset.type;

    dispatch({
      type: 'UPDATE_PROP_VIDRIO',
      data: { id, [type]: el.value }
    });
    dispatch({
      type: 'CALC_AREA_VIDRIO',
      id
    });
    dispatch({ type: 'CALC_AREA_NETA_PARED' });
  },
  handleAddButton: data => {
    dispatch({
      type: 'ADD_VIDRIO',
      data
    });
    dispatch({ type: 'CALC_AREA_NETA_PARED' });
  },
  removeItem: key => {
    dispatch({
      type: 'REMOVE_VIDRIO',
      key
    });
    dispatch({ type: 'CALC_AREA_NETA_PARED' });
  },
  handleBackButton: () =>
    dispatch({
      type: 'HIDE_WINDOWS_PROPS'
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfElements);
