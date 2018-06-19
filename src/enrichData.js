import tablaVidrio  from '../json/CLTD_vidrio';
import tablaPared   from '../json/CLTD_pared';
import tablaTecho   from '../json/CLTD_techo';
import tablaSHGF    from '../json/SHGF_lat_40';
import tablaCLF     from '../json/CLF_6_8_min';
import tablaUvidr   from '../json/U_vidrios';
import tablaSC      from '../json/SC_tabla_6_7';
import tablaLM      from '../json/LM_6_4';
import tablaUtechosParedesParticiones from '../json/U_techos_paredes_particiones';

import {getCargaEnfriamiento} from './cargaEnfriamiento.js';
import initState from './model.js';
import * as reducers from './reducers/setCLTD.js';
import { createStore, combineReducers } from 'redux';

const confortApp = combineReducers(reducers);

const store = createStore(confortApp, {
    vidrios: initState.elementos.vidrios.map(el => Object.assign({}, el)),
    paredes: initState.elementos.paredes.map(el => Object.assign({}, el)),
    techo:   Object.assign({}, initState.elementos.techo),
    puertas: initState.elementos.puerta.map(el => Object.assign({}, el)),
    piso:    Object.assign({}, initState.elementos.piso)
});

// store.subscribe(() => console.log('store', store.getState()) );

export default function enrichData(data) {
    const dataTemp = {
        tempExterior: data.exterior.bulbo_seco,
        tempInterior: data.recinto.bulbo_seco,
        rangoDiario: data.cargaPico.rangoDiario,
        Δtemp: data.exterior.bulbo_seco - data.recinto.bulbo_seco
    };

    store.dispatch({ type: 'SET_CLTD_VIDRIO' });
    store.dispatch(Object.assign({}, dataTemp, {
        type: 'SET_CLTD_CORRECCION_VIDRIO'
    }));
    store.dispatch({type: 'SET_SHGF_LAT_40_VIDRIO'});
    store.dispatch({type: 'SET_U_VIDRIO'});
    store.dispatch({type: 'SET_CLF_VIDRIO'});
    store.dispatch({type: 'SET_SC_VIDRIO'});
    store.dispatch({type: 'CALC_AREA_VIDRIO'});

    store.dispatch({type: 'SET_CLTD_PARED'});
    store.dispatch({type: 'SET_LM_PARED'});
    store.dispatch(Object.assign({}, dataTemp, {
        type: 'SET_CLTD_CORRECCION_PARED'
    }));
    store.dispatch({type: 'SET_U_PARED', element: 'PAREDES', material: 'MURO EJEMPLO'});

    store.dispatch({type: 'SET_CLTD_TECHO'});
    store.dispatch({type: 'SET_LM_TECHO'});
    store.dispatch(Object.assign({}, dataTemp, {
        type: 'SET_CLTD_CORRECCION_TECHO'
    }));
    store.dispatch({type: 'SET_U_TECHO', element: 'TECHO', material: 'CUBIERTA DE EJEMPLO'});

    store.dispatch({type: 'SET_U_PUERTA', element: 'PUERTA', material: 'PUERTA EJEMPLO'});

    store.dispatch({type: 'SET_U_PISO', element: 'PISO', material: 'PISO EJEMPLO'});
    store.dispatch({type: 'SET_CLTD_CORRECCION_PISO', Δtemp: dataTemp.Δtemp});

    const Carga = getCargaEnfriamiento(store.getState(), data);
    console.log('Carga final', Carga);
    //=========================================

    setCLTD_vidrio(data.elementos.vidrios, tablaVidrio);
    setCLTD_pared(data.elementos.paredes, tablaPared);
    setCLTD_techo(data.elementos.techo, tablaTecho);

    setLM(data.elementos.paredes, data.elementos.techo, tablaLM);

    getCLDT_correccion(data.elementos.vidrios, data.exterior.bulbo_seco,
            data.recinto.bulbo_seco, data.cargaPico.rangoDiario);
    getCLDT_correccion(data.elementos.paredes, data.exterior.bulbo_seco,
            data.recinto.bulbo_seco, data.cargaPico.rangoDiario);

    setSHGF_lat_40(data.elementos.vidrios, tablaSHGF);

    setU(data.elementos.techo, tablaUtechosParedesParticiones, 'TECHO', 'CUBIERTA DE EJEMPLO');
    setU(data.elementos.paredes, tablaUtechosParedesParticiones, 'PAREDES', 'MURO EJEMPLO');
    setU(data.elementos.puerta, tablaUtechosParedesParticiones, 'PUERTA', 'PUERTA EJEMPLO');
    setU(data.elementos.piso, tablaUtechosParedesParticiones, 'PISO', 'PISO EJEMPLO');

    setUvidrio(data.elementos.vidrios, tablaUvidr);

    setCLF(data.elementos.vidrios, tablaCLF);
    setSC(data.elementos.vidrios, tablaSC);

    getCLDT_correccion(data.elementos.techo, data.exterior.bulbo_seco,
            data.recinto.bulbo_seco, data.cargaPico.rangoDiario);

    return data;
}

export { data };


// CLTD
function setCLTD_vidrio(vidrios, tablaVidrio) {
    const peakHour = '17';
    const d = Number(tablaVidrio[0][peakHour]);
    vidrios.forEach(vidrio => {
        vidrio.CLDT_tabla = d;
    });
}
function setCLTD_pared(paredes, tablaPared) {
    // el grupo es dado en la seleccion de los datos
    const dataPared = tablaPared.filter(x => x.grupo === 'b')
                        .map(x => ({orientacion: x.orientacion, 'CLTD': Number(x[17])}) );
    paredes.forEach(pared => {
        const CLTD = dataPared.find(x => x.orientacion === pared.orientacion).CLTD;
        pared.CLDT_tabla = CLTD;
    });
}
function setCLTD_techo(techo, tablaTecho) {
    const data_techo = tablaTecho.find(x => x.tipo_de_techo === 'sin cielo raso suspendido'
                                            && x.numero_techo === '3');
    techo.CLDT_tabla = Number(data_techo['17']);
}

function getCLDT_correccion(elementos, tempExterior, tempInterior, rangoDiario) {
    // Valores inmutables de la ecuacion.
    const DeltaTempDiseno = 78 - 85;
    elementos = !Array.isArray(elementos) ? [elementos] : elementos;
    elementos.map(correct);

    function correct(el) {
        const LM = el.correcion_latitud_mes_LM;
    	const K = el.correcion_color_K;
    	const CLDT_temp = LM !== undefined && K !== undefined ? (el.CLDT_tabla + LM) * K : el.CLDT_tabla;

    	el.CLDT_correccion = CLDT_temp + DeltaTempDiseno + tempExterior - 0.5*rangoDiario - tempInterior;
    }
}

//SHGF
function setSHGF_lat_40(radiacionVidrio, tablaSHGF) {
    const dataSHGF = tablaSHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

    radiacionVidrio.forEach(vidrio => {
        let dir = vidrio.orientacion;
        dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
        vidrio.SHGF = Number(dataSHGF[dir]);
    });
}

// U
function setU(techo, tablaU, type='TECHO', material='CUBIERTA DE EJEMPLO') {
    const Utechos = tablaU.find(
                        x => x.tipo === type && x.material === material
                    );
    techo = !Array.isArray(techo) ? [techo] : techo;

    techo.map(el => el.coeficiente_transferencia_calor = Number(Utechos.U) );
}

function setUvidrio(vidrios, tablaUvidr, glassDescription='vidrio sencillo') {
    const Uv_sencillo = tablaUvidr.find(x => x.descripcion === glassDescription)

    vidrios.forEach(vidrio => {
        vidrio.coeficiente_transferencia_calor = Number(Uv_sencillo.U_exterior);
    });
}

function setCLF(vidrios, tablaCLF, glassCapacity='M') {
    const CLF_ = tablaCLF.filter(x => x.CAPACIDAD === glassCapacity);

    vidrios.forEach(vidrio => {
        const value = CLF_.find(x => x.ORIENTACION === vidrio.orientacion);
        vidrio.CLF = Number(value['17']);
    });
}

function setSC(vidrios, tablaSC) {
    const dataSc = tablaSC.filter(x => x.vidrio === 'vidrio sencillo');
    vidrios.map(vidrio => {
        const dataScFiltered = dataSc.find(x => x.tipo_de_vidrio === vidrio.tipo_de_vidrio &&
                                           x.espesor_nominal === vidrio.espesor_nominal);
        vidrio.SC = Number(dataScFiltered.sin_sombreado_interior);
    });
}

function setLM(paredes, techo, tablaLM, mes="JUL") {
    const datoLM = tablaLM.find(x => Number(x.LATITUD) === 40 && x.MES === mes);
    paredes.map(pared => {
        pared.correcion_latitud_mes_LM = Number(datoLM[pared.orientacion]);
    });

    techo.correcion_latitud_mes_LM = Number(datoLM['HORA']);
}
