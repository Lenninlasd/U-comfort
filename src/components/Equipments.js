import React from 'react';
import { connect } from 'react-redux';
import LISTADO_DE_EQUIPOS from '../../json/Listado_de_equipos.js';

const btuList = [...new Set(
    LISTADO_DE_EQUIPOS.map(eq => Number(eq.capacidad_BTU) )
)]
.sort( (a, b) => a - b);

const chooseBTU = (Q, btuList) => {
    for (let [i, q] of btuList.entries() ) {
        if(Q <= q * 0.8){
            return [i, q];
        }
    }
    return [];
};

const ListEq = equipments => {
    return (
        <ul className="list-group list-group-flush">
        {equipments.map(eq => (
            <li className='list-group-item' key={eq.marca + eq.modelo + eq.proveedor}>
                <div>SEER: {eq.SEER}</div>
                <div>Capacidad: {eq.capacidad_BTU} btu</div>
                <div>cfm_max: {eq.cfm_max}</div>
                <div>conex_liquido: {eq.conex_liquido}</div>
                <div>onex_succion: {eq.conex_succion}</div>
                <div>datos_electricos: {eq.datos_electricos}</div>
                <div>Equipo: {eq.equipo}</div>
                <div>Marca: {eq.marca}</div>
                <div>Modelo: {eq.modelo}</div>
                <div>Proveedor: {eq.proveedor}</div>
            </li>
        ))}
        </ul>
    );
};

const EquipmentsView = ({cargaEnfriamiento, QS_QL, CFMnetoSensible}) => {
    
    const choosenQ = chooseBTU(QS_QL, btuList);
    
    const availableEquip = choosenQ.length ? 
        LISTADO_DE_EQUIPOS.filter( eq => {
            return eq.capacidad_BTU == choosenQ[1] && Number(eq.cfm_max)*0.9 >= CFMnetoSensible;
        }) : [];

    return (
      <div className='card u-card'>
          <div className='card-body'>
              <div><strong>Carga de enfriamiento:</strong> {cargaEnfriamiento.toFixed(2)}</div>
              <div><strong>QS_QL: </strong> {QS_QL.toFixed(2)}</div>
              <div><strong>CFMnetoSensible: </strong> {CFMnetoSensible.toFixed(2)}</div>

                {availableEquip.length ? (
                    ListEq(availableEquip)
                ) : (
                    <div className="alert alert-warning" role="alert">
                        No hay equipos disponibles
                    </div>
                )}
          </div>
      </div>
  );
}

const mapStateToProps = state => state.results

export default connect(mapStateToProps)(EquipmentsView);