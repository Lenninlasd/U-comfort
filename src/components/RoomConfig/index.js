import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import heatPeopleTable from '../../../json/calor_personas_6_11';
import tablaCFM from '../../../json/CFM_6_15';
import { setSizeChange, setRoomChange } from '../../actions';

import boot from 'bootstrap/dist/css/bootstrap.min.css';

const apliacionesTipicas = [...new Set(heatPeopleTable.map(element => element.ACTIVIDAD))].map(
  (item, i) => (
    <option key={i} value={item}>
      {item}
    </option>
  )
);

const tiposRecinto = tablaCFM.map((item, i) => (
  <option key={i} value={item.lugar}>
    {item.lugar}
  </option>
));

export const RoomForm = props => (
  <form className="size-data-form">
    <div className="form-row form-group">
      <div className="col-sm-12">
        <h6>INFORMACIÓN DE RECINTO</h6>
      </div>

      <div className="col-md-4 col-sm-12">
        <label htmlFor="depth">
          <small>
            <strong>LARGO (m)</strong>
          </small>
        </label>
        <input
          id="depth"
          className={boot.formControl}
          type="number"
          value={props.depth}
          placeholder="LARGO"
          onChange={props.setSizeChange}
          min="1"
        />
      </div>
      <div className="col-md-4 col-sm-12">
        <label htmlFor="width">
          <small>
            <strong>ANCHO (m)</strong>
          </small>
        </label>
        <input
          id="width"
          className={boot.formControl}
          type="number"
          value={props.width}
          placeholder="ANCHO"
          onChange={props.setSizeChange}
          min="1"
        />
      </div>
      <div className="col-md-4 col-sm-12">
        <label htmlFor="height">
          <small>
            <strong>ALTO (m)</strong>
          </small>
        </label>
        <input
          id="height"
          className={boot.formControl}
          type="number"
          value={props.height}
          placeholder="ALTO"
          onChange={props.setSizeChange}
          min="1"
        />
      </div>
      <div className="col-md-12 col-sm-12">
        <label htmlFor="numberOfPeople">
          <small>
            <strong>No. DE PERSONAS</strong>
          </small>
        </label>
        <input
          id="numberOfPeople"
          className={boot.formControl}
          type="number"
          value={props.numberOfPeople}
          placeholder="No. DE PERSONAS"
          onChange={props.setRoomChange}
          min="0"
        />
      </div>
      <div className="col-md-12 col-sm-12">
        <label htmlFor="numberOfLights">
          <small>
            <strong>No. DE LUCES</strong>
          </small>
        </label>
        <input
          id="numberOfLights"
          className={boot.formControl}
          type="number"
          value={props.numberOfLights}
          placeholder="No. DE LUCES"
          onChange={props.setRoomChange}
          min="0"
        />
      </div>
      <div className="col-md-12 col-sm-12">
        <div className="row">
          <div className="col">
            <label htmlFor="actividadRecinto">
              <small>
                <strong style={{ whiteSpace: 'nowrap' }}>ACTIVIDAD DEL RECINTO</strong>
              </small>
            </label>
            <select
              id="actividadRecinto"
              className={boot.formControl}
              onChange={props.setRoomChange}
              value={props.actividadRecinto}
            >
              <option hidden>ACTIVIDAD DEL RECINTO</option>
              {apliacionesTipicas}
            </select>
          </div>
          <div className="col">
            <label htmlFor="typeOfRoom">
              <small>
                <strong>TIPO DE RECINTO</strong>
              </small>
            </label>
            <select
              id="typeOfRoom"
              className={boot.formControl}
              onChange={props.setRoomChange}
              value={props.typeOfRoom}
            >
              <option hidden>TIPO DE RECINTO</option>
              {tiposRecinto}
            </select>
          </div>
        </div>
      </div>
      <div className="col-sm-12">
        <div className="form-row form-group">
          <div className="col-md-12 col-sm-12">
            <label htmlFor="amountOfEquipment">
              <small>
                <strong>CANTIDAD DE EQUIPOS EN RECINTO</strong>
              </small>
            </label>
            <select
              id="amountOfEquipment"
              className={boot.formControl}
              onChange={props.setRoomChange}
              value={props.wattsPerSquaredFoot}
            >
              <option hidden>CANTIDAD DE EQUIPOS EN RECINTO</option>
              <option value={0.5}>Bajo</option>
              <option value={1}>Moderado</option>
              <option value={1.5}>Medio</option>
              <option value={2}>Alto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </form>
);
RoomForm.propTypes = {
  depth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  numberOfLights: PropTypes.number.isRequired,
  numberOfPeople: PropTypes.number.isRequired,
  setSizeChange: PropTypes.func.isRequired,
  setRoomChange: PropTypes.func.isRequired,
  actividadRecinto: PropTypes.string.isRequired,
  wattsPerSquaredFoot: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  width: state.width,
  height: state.height,
  depth: state.depth,
  actividadRecinto: state.room.roomActivity,
  typeOfRoom: state.room.typeOfRoom,
  numberOfPeople: state.numberOfPeople,
  numberOfLights: state.lights.numberOfLights,
  wattsPerSquaredFoot: state.room.equitmentWattsPerSquaredFoot
});

export default connect(
  mapStateToProps,
  { setSizeChange, setRoomChange }
)(RoomForm);
