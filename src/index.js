import React from 'react';
import ReactDOM from 'react-dom';

import { data } from "./data";
import tablaCalorPersonas from "../json/calor_personas_6_11";
import tablaCFM from "../json/CFM_6_15";

import infiltration from './infiltration';

const vidrios = data.elementos.vidrios;

const pared = data.elementos.pared;

// TODO: Remove hardcode
const calor_vidrio = 1.04; //coeficiente_transferencia_calor
const calor_pared = 0.13; // coeficiente_transferencia_calor
const Factor_correcion_calor_sensible = getCalor_sensible(vidrios, pared, calor_vidrio, calor_pared); //0.91

const  techo = data.elementos.techo;

const diffTemp = data.exterior.bulbo_seco - data.recinto.bulbo_seco;
const diffHumedad = data.exterior.humedad_especifica - data.recinto.humedad_especifica;

const piso = data.elementos.piso;
piso.CLDT_correccion = diffTemp;

const puerta = data.elementos.puerta;
const luces = data.elementos.luces;

const calorLuces = luces.wattsPorLampara * luces.numeroLuces * luces.factConv * Factor_correcion_calor_sensible;

const calorPersonas = setCalorPersonas(data.numero_personas, Factor_correcion_calor_sensible, tablaCalorPersonas);

const calorVentilacion = setCalorVentilacion(data.numero_personas, diffTemp, diffHumedad, tablaCFM);

	//Calculo final

const ganancia_calor_recinto = calculoTotalSensible(vidrios, pared, techo, piso, puerta) + calorLuces + calorPersonas.sensible;

const ganancia_ventilador_forzado = ganancia_calor_recinto * 0.025;

const total_sensible = ganancia_calor_recinto + calorVentilacion.sensible + ganancia_ventilador_forzado;

const carga_enfriamiento = cargaEnfriamiento(total_sensible, calorPersonas, calorVentilacion, infiltration); // Tons

ReactDOM.render(
    <div>
        <h1> Carga de enfriamiento (tons):</h1>
        <h2>{carga_enfriamiento}</h2>
    </div>,
    document.getElementById('root')
);

function setCalorPersonas(n_personas, correcion, tablaCalorPersonas, aplicacion='TIENDAS MINORISTAS, BANCOS') {
    const filtered = tablaCalorPersonas.filter(x => x['APLICACIONES_TIPICAS'] === aplicacion);
    const calorSensible = filtered.find( x => x['CALOR'] === 'CALOR SENSIBLE');
    const calorLatente = filtered.find( x => x['CALOR'] === 'CALOR LATENTE');

    return {
    	sensible: calorSensible['BTUH'] * n_personas * 1.0 * correcion,
    	latente: calorLatente['BTUH'] * n_personas
    };
}

function setCalorVentilacion(n_personas, diffTemp, diffHumedad, tablaCFM){

    const cfmRecomendado = tablaCFM.find(x =>
        x.lugar === 'comercios: pisos de venta (pisos superiores)')['cfm_recomendado'];
    // take the first cfm of the range
    const CFM = cfmRecomendado.split('-')[0];

    return {
    	sensible: 1.1 * CFM * n_personas * diffTemp,
    	latente: 0.68 * CFM * n_personas * diffHumedad
    }
}

function cargaEnfriamiento(totalSensible, calorPersonas, calorVentilacion){
    const totalCalor = totalSensible + calorPersonas.latente + calorVentilacion.latente + infiltration.sensible + infiltration.latente;
    return totalCalor/12000; // Tons
}

function calculoTotalSensible(vidrios = [{}], pared = [{}], techo = {}, piso = {}, puerta =[{}]){

	  	const calorVidrio = getCalorSensibleArray(vidrios);
	  	const calorPared = getCalorSensibleArray(pared);
	  	const calorTecho = getCalorSensible(techo);
	 	const calorPiso = 	getCalorSensible(piso);
	  	const calorPuerta = getCalorSensibleArray(puerta);
	  	const calorRadiacionVidrio = getCalorSensibleVidrio(vidrios);

		return calorVidrio + calorPared + calorTecho + calorPiso + calorPuerta + calorRadiacionVidrio;


	    function getCalorSensibleVidrio(el){
	    	return el.map(i => i.SHGF * i.area_neta * i.SC * i.CLF * Factor_correcion_calor_sensible)
	          .reduce( (anterior, actual) => {
	              return anterior + actual;
	          });
	    }

	    function getCalorSensibleArray(el){ // calculoIndividualSensible
	    	return el.map(i => getCalorSensible(i))
	          .reduce( (anterior, actual) => {
	              return anterior + actual;
	          });
	    }

	    function getCalorSensible(obj) {
	      return obj.coeficiente_transferencia_calor * obj.area_neta * obj.CLDT_correccion * Factor_correcion_calor_sensible;
	    }
}

function getCalor_sensible(vidrios, pared, transferencia_calor_vidrio, transferencia_calor_pared){
	const area_vidrio = vidrios.reduce( (a, b) => ({ area_neta: a.area_neta + b.area_neta }) ).area_neta;
	const area_pared = pared.reduce( (a, b) => ({ area_neta: a.area_neta + b.area_neta }) ).area_neta;
	const K_= (transferencia_calor_vidrio*area_vidrio + transferencia_calor_pared*area_pared) / data.perimetro;
	return 1 - 0.02 * K_;
}
