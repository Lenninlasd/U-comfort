import {calcAreaPiso, calcAreaTecho} from './actions';

export default function enrichData(dispatch) {

    dispatch({type: 'SET_CLTD_VIDRIO' });
    dispatch({type: 'SET_CLTD_CORRECCION_VIDRIO' });
    dispatch({type: 'SET_SHGF_LAT_40_VIDRIO'});
    dispatch({type: 'SET_U_VIDRIO'});
    dispatch({type: 'SET_CLF_VIDRIO'});
    dispatch({type: 'SET_SC_VIDRIO'});
    dispatch({type: 'CALC_AREA_VIDRIO_ALL'});

    dispatch({type: 'SET_CLTD_PARED'});
    dispatch({type: 'SET_LM_PARED'});
    dispatch({ type: 'SET_CLTD_CORRECCION_PARED' });
    dispatch({type: 'SET_U_PARED', element: 'PAREDES', material: 'MURO EJEMPLO'});

    dispatch(calcAreaTecho());
    dispatch({type: 'SET_CLTD_TECHO'});
    dispatch({type: 'SET_LM_TECHO'});
    dispatch({ type: 'SET_CLTD_CORRECCION_TECHO' });
    dispatch({type: 'SET_U_TECHO', element: 'TECHO', material: 'CUBIERTA DE EJEMPLO'});

    dispatch({type: 'SET_U_PUERTA', element: 'PUERTA', material: 'PUERTA EJEMPLO'});
    dispatch({type: 'CALC_AREA_PUERTA_ALL'});

    dispatch({type: 'CALC_AREA_NETA_PARED'});

    dispatch(calcAreaPiso());
    dispatch({type: 'SET_U_PISO', element: 'PISO', material: 'PISO EJEMPLO'});
    dispatch({type: 'SET_CLTD_CORRECCION_PISO'});
}
