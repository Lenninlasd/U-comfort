import tablaVidrio  from '../../json/CLTD_vidrio';
import tablaSHGF    from '../../json/SHGF_lat_40';
import tablaUvidr   from '../../json/U_vidrios';
import tablaCLF     from '../../json/CLF_6_8_min';
import tablaSC      from '../../json/SC_tabla_6_7';

export function setVidrio(glassState=[], action) {
    switch (action.type) {
        case 'SET_CLTD':
            return setCLDT_tabla(glassState);
        case 'SET_CLTD_CORRECCION':
            return setCLDT_correccion(glassState, action);
        case 'SET_SHGF_LAT_40':
            return setSHGF_lat_40(glassState);
        case 'SET_U_VIDRIO':
            return setUvidrio(glassState, action.glassDescription);
        case 'SET_CLF':
            return setCLF(glassState, action.glassCapacity);
        case 'SET_SC':
            return setSC(glassState, action.glassDescription);
        default:
            return glassState
    }
}

function setCLDT_tabla(glassState) {
    const peakHour = '17';
    const d = Number(tablaVidrio[0][peakHour]);
    return glassState.map(glass => {
        return Object.assign({}, glass, {
            CLDT_tabla: d
        });
    });
}

function setCLDT_correccion(glassState, action){
    const DeltaTempDiseno = 78 - 85;
    return glassState.map(el => {
        const LM = el.correcion_latitud_mes_LM;
        const K = el.correcion_color_K;
        const CLDT_temp = LM !== undefined && K !== undefined ?
                (el.CLDT_tabla + LM) * K : el.CLDT_tabla;

        return Object.assign({}, el, {
            CLDT_correccion: CLDT_temp + DeltaTempDiseno +
                action.tempExterior - 0.5*action.rangoDiario - action.tempInterior
        });
    });
}

function setSHGF_lat_40(glassState) {
    const dataSHGF = tablaSHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

    return glassState.map(vidrio => {
        let dir = vidrio.orientacion;
        dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
        return Object.assign({}, vidrio, {
            SHGF: Number(dataSHGF[dir])
        });
    });
}

function setUvidrio(glassState, glassDescription='vidrio sencillo') {
    const Uv_sencillo = tablaUvidr.find(x => x.descripcion === glassDescription)

    return glassState.map(vidrio => {
        return Object.assign({}, vidrio, {
            coeficiente_transferencia_calor: Number(Uv_sencillo.U_exterior)
        });
    });
}

function setCLF(glassState, glassCapacity='M') {
    const CLF_ = tablaCLF.filter(x => x.CAPACIDAD === glassCapacity);

    return glassState.map(vidrio => {
        const value = CLF_.find(x => x.ORIENTACION === vidrio.orientacion);
        return Object.assign({}, vidrio, {
            CLF: Number(value['17'])
        });
    });
}

function setSC(glassState, glassDescription='vidrio sencillo') {
    const dataSc = tablaSC.filter(x => x.vidrio === glassDescription);
    return glassState.map(vidrio => {
        const dataScFiltered = dataSc.find(x => x.tipo_de_vidrio === vidrio.tipo_de_vidrio &&
                                           x.espesor_nominal === vidrio.espesor_nominal);
        return Object.assign({}, vidrio, {
            SC: Number(dataScFiltered.sin_sombreado_interior)
        });
    });
}
