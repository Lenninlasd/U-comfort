import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LISTADO_DE_EQUIPOS from '../../json/Listado_de_equipos.js';
import BackButton from './backButton.js';

const btuList = [...new Set(LISTADO_DE_EQUIPOS.map(eq => Number(eq.capacidad_BTU)))].sort(
  (a, b) => a - b
);

const chooseBTU = (Q, btuList) => {
  for (let [i, q] of btuList.entries()) {
    if (Q <= q * 0.8) {
      return [i, q];
    }
  }
  return [];
};

const ListEq = equipments => {
  return (
    <ul className="list-group list-group-flush">
      {equipments.map((eq, index) => (
        <li className="list-group-item" key={index + eq.marca + eq.modelo + eq.proveedor}>
          <div>
            <strong>SEER:</strong> {eq.SEER}
          </div>
          <div>
            <strong>Capacidad:</strong> {eq.capacidad_BTU} btu
          </div>
          <div>
            <strong>cfm_max:</strong> {eq.cfm_max}
          </div>
          <div>
            <strong>conex_liquido:</strong> {eq.conex_liquido}
          </div>
          <div>
            <strong>onex_succion:</strong> {eq.conex_succion}
          </div>
          <div>
            <strong>datos_electricos:</strong> {eq.datos_electricos}
          </div>
          <div>
            <strong>Equipo:</strong> {eq.equipo}
          </div>
          <div>
            <strong>Marca:</strong> {eq.marca}
          </div>
          <div>
            <strong>Modelo:</strong> {eq.modelo}
          </div>
          <div>
            <strong>Proveedor:</strong> {eq.proveedor}
          </div>
        </li>
      ))}
    </ul>
  );
};

const EquipmentsView = ({ history, cargaEnfriamiento, QS_QL, CFMnetoSensible }) => {
  const choosenQ = chooseBTU(QS_QL, btuList);

  const availableEquip = choosenQ.length
    ? LISTADO_DE_EQUIPOS.filter(eq => {
        return eq.capacidad_BTU == choosenQ[1] && Number(eq.cfm_max) * 0.9 >= CFMnetoSensible;
      })
    : [];

  const handleBackButton = () => history.push('/');

  return (
    <div className="container-fluid">
      <div className="row justify-content-sm-center">
        <div className="card u-card col-xl-5 col-lg-6 col-md-8 col-sm-9">
          <div className="card-body">
            <div className="row">
              <BackButton className="col-1" onClick={handleBackButton} />
              <div className="col-2 back-button-text">Atrás</div>
            </div>
            {false && (
              <div>
                <strong>Carga de enfriamiento:</strong> {cargaEnfriamiento.toFixed(0)}
              </div>
            )}
            <div>
              <strong>Carga térmica de climatización: </strong> {QS_QL.toFixed(0)} Btu/h
            </div>
            <div>
              <strong>CFM: </strong> {CFMnetoSensible.toFixed(0)}
            </div>

            {availableEquip.length ? (
              ListEq(availableEquip)
            ) : (
              <div className="alert alert-warning" role="alert">
                No hay equipos disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
EquipmentsView.propTypes = {
  history: PropTypes.object.isRequired,
  cargaEnfriamiento: PropTypes.number.isRequired,
  QS_QL: PropTypes.number.isRequired,
  CFMnetoSensible: PropTypes.number.isRequired
};

const mapStateToProps = state => state.results;

export default withRouter(connect(mapStateToProps)(EquipmentsView));
