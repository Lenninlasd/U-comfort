import {getCargaEnfriamiento} from './cargaEnfriamiento.js';
import initState from './model.js';
import * as reducers from './reducers/prepareData.js';
import { createStore, combineReducers } from 'redux';

const confortApp = combineReducers(reducers);

const store = createStore(confortApp, {
    vidrios: initState.elementos.vidrios,
    paredes: initState.elementos.paredes,
    techo:   initState.elementos.techo,
    puertas: initState.elementos.puerta,
    piso:    initState.elementos.piso,
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
}

export { data };
