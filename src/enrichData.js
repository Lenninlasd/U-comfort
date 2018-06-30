export default function enrichData(data, dispatch) {
    const dataTemp = {
        tempExterior: data.exterior.bulbo_seco,
        tempInterior: data.recinto.bulbo_seco,
        rangoDiario: data.cargaPico.rangoDiario,
        Δtemp: data.exterior.bulbo_seco - data.recinto.bulbo_seco
    };

    dispatch({ type: 'SET_CLTD_VIDRIO' });
    dispatch(Object.assign({}, dataTemp, {
        type: 'SET_CLTD_CORRECCION_VIDRIO'
    }));
    dispatch({type: 'SET_SHGF_LAT_40_VIDRIO'});
    dispatch({type: 'SET_U_VIDRIO'});
    dispatch({type: 'SET_CLF_VIDRIO'});
    dispatch({type: 'SET_SC_VIDRIO'});
    dispatch({type: 'CALC_AREA_VIDRIO_ALL'});

    dispatch({type: 'SET_CLTD_PARED'});
    dispatch({type: 'SET_LM_PARED'});
    dispatch(Object.assign({}, dataTemp, {
        type: 'SET_CLTD_CORRECCION_PARED'
    }));
    dispatch({type: 'SET_U_PARED', element: 'PAREDES', material: 'MURO EJEMPLO'});

    dispatch({type: 'SET_CLTD_TECHO'});
    dispatch({type: 'SET_LM_TECHO'});
    dispatch(Object.assign({}, dataTemp, {
        type: 'SET_CLTD_CORRECCION_TECHO'
    }));
    dispatch({type: 'SET_U_TECHO', element: 'TECHO', material: 'CUBIERTA DE EJEMPLO'});

    dispatch({type: 'SET_U_PUERTA', element: 'PUERTA', material: 'PUERTA EJEMPLO'});

    dispatch({type: 'SET_U_PISO', element: 'PISO', material: 'PISO EJEMPLO'});
    dispatch({type: 'SET_CLTD_CORRECCION_PISO', Δtemp: dataTemp.Δtemp});
}
