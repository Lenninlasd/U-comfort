import TABLA_VIDRIO   from '../../json/CLTD_vidrio';
import TABLA_TECHO    from '../../json/CLTD_techo';
import TABLA_SHGF     from '../../json/SHGF_lat_40';
import TABLA_U_VIDRIO from '../../json/U_vidrios';
import TABLA_CLF      from '../../json/CLF_6_8_min';
import TABLA_SC       from '../../json/SC_tabla_6_7';
import TABLA_PARED    from '../../json/CLTD_pared';
import TABLA_LM       from '../../json/LM_6_4';
import TABLA_U_TECHO_PARED_PARTICION from '../../json/U_techos_paredes_particiones';
import { getCargaEnfriamiento } from '../cargaEnfriamiento.js';


const LM = setLM();

export function vidrios(glassState=[], action, state) {

    const dataTemperature = getDataTemperature(state);

    switch (action.type) {
        case 'SET_CLTD_VIDRIO':
            return setCLDT_vidrios(glassState);
        case 'SET_CLTD_CORRECCION_VIDRIO':
            return setCLDT_correccion(glassState, dataTemperature);
        case 'SET_SHGF_LAT_40_VIDRIO':
            return setSHGF_lat_40(glassState);
        case 'SET_U_VIDRIO':
            return setUvidrio(glassState, action.glassDescription);
        case 'SET_CLF_VIDRIO':
            return setCLF(glassState, action.glassCapacity);
        case 'SET_SC_VIDRIO':
            return setSC(glassState, action.glassDescription);
        case 'CALC_AREA_VIDRIO_ALL':
            return calcAreaAllVidrio(glassState);
        case 'CALC_AREA_VIDRIO':
            return updateAreaGlass(glassState, action.id);
        case 'UPDATE_PROP_VIDRIO':
            return updatePropGlass(glassState, action.data);
        case 'REMOVE_VIDRIO':
            return [
                ...glassState.slice(0, action.key),
                ...glassState.slice(action.key + 1)
            ];
        case 'ADD_VIDRIO':
            return addNewGlass(glassState, action.data, dataTemperature);
        default:
            return glassState;
    }
}

export function paredes(paredesState=[], action, state){
    switch (action.type) {
        case 'SET_CLTD_PARED':
            return setCLTD_pared(paredesState);
        case 'SET_LM_PARED':
            return LM.paredes(paredesState);
        case 'SET_CLTD_CORRECCION_PARED':
            const dataTemperature = getDataTemperature(state);
            return setCLDT_correccion(paredesState, dataTemperature);
        case 'SET_U_PARED':
            return setU(paredesState, action.element, action.material);
        case 'CALC_AREA_NETA_PARED':
            const {depth, height, width, vidrios, puertas} = state;
            return calcAreaNetaPared(paredesState, vidrios, puertas, depth, height, width);
        default:
            return paredesState;
    }
}

export function techo(techoState={}, action, state){
    switch (action.type) {
        case 'SET_CLTD_TECHO':
            return setCLTD_techo(techoState);
        case 'SET_CLTD_CORRECCION_TECHO':
            if (!techoState.correcion_latitud_mes_LM) {
                console.error(
                    `For CLDT_correccion in techo,
                    correcion_latitud_mes_LM is needed`, techoState
                );
            }
            const dataTemperature = getDataTemperature(state);
            return setCLDT_correccion(techoState, dataTemperature);
        case 'SET_LM_TECHO':
            return LM.techo(techoState);
        case 'SET_U_TECHO':
            return setU(techoState, action.element, action.material);
        case 'CALC_AREA_TECHO':
            return Object.assign({}, techoState, {
                areaNeta: state.width * state.depth
            });
        default:
            return techoState;
    }
}

export function puertas(puertasState=[], action){
    switch (action.type) {
        case 'SET_U_PUERTA':
            return setU(puertasState, action.element, action.material);
        case 'UPDATE_PROP_PUERTA':
            return updatePropGlass(puertasState, action.data);
        case 'CALC_AREA_PUERTA_ALL':
            return puertasState.map(el => Object.assign({}, el, {
                areaNeta: el.width * el.height
            }));
        case 'CALC_AREA_PUERTA':
            return updateAreaGlass(puertasState, action.id);
        case 'REMOVE_DOOR':
            return [
                ...puertasState.slice(0, action.key),
                ...puertasState.slice(action.key + 1)
            ];
        default:
            return puertasState;
    }
}

export function piso(pisoState={}, action, state) {
    switch (action.type) {
        case 'SET_U_PISO':
            return setU(pisoState, action.element, action.material);
        case 'SET_CLTD_CORRECCION_PISO':
            const Δtemp = state.exterior.bulbo_seco - state.recinto.bulbo_seco;
            return Object.assign({}, pisoState, {
                CLDT_correccion: Δtemp
            });
        case 'CALC_AREA_PISO':
            return Object.assign({}, pisoState, {
                areaNeta: state.width * state.depth
            });
        default:
            return pisoState;
    }
}

export function cargaEnfriamiento(cargaState=null, action, state) {
    switch (action.type) {
        case 'SET_CARGA_EMFRIAMIENTO':
            return getCargaEnfriamiento(state);
        default:
            return cargaState;
    }
}

export const luces = (lucesState={}, action) => {
    switch (action.type){
        case 'SET_NUMBER_OF_LIGHTS':
            return Object.assign({}, lucesState, {
                numberOfLights: action.value
            })
        default:
            return lucesState;
    }
}

export const exterior = (exteriorState={}, action) => {
    switch (action.type) {
        case 'SET_EXTERIOR_CONDITIONS':
            return setExteriorConditions(exteriorState, action.exterior);
        default:
            return exteriorState;
    }
};

export const recinto = (interiorState={}, action) => interiorState;

export const cargaPico = (cargaPicoState={}) => cargaPicoState;

function calcAreaAllVidrio(glassState){
    return glassState.map(el => Object.assign({}, el, {
        areaNeta: el.width * el.height
    }));
}

function getDataTemperature({exterior, recinto, cargaPico}){
    return {
        tempExterior: exterior.bulbo_seco,
        tempInterior: recinto.bulbo_seco,
        rangoDiario: cargaPico.rangoDiario,
        Δtemp: exterior.bulbo_seco - recinto.bulbo_seco
    };
}

function addNewGlass(glassState, data, dataTemperature) {
    let newGlass = setCLDT_vidrios( [data] );
        newGlass = setCLDT_correccion(newGlass, dataTemperature);
        newGlass = setSHGF_lat_40(newGlass);
        newGlass = setUvidrio(newGlass);
        newGlass = setCLF(newGlass);
        newGlass = setSC(newGlass);
        newGlass = calcAreaAllVidrio(newGlass);
    return [
        ...glassState,
        ...newGlass
    ];
}

function setExteriorConditions(state, exterior){
    return Object.assign({}, state, {
        id: Number(exterior.id),
        ciudad: exterior.ciudad,
        latitud : Number(exterior.latitud),
        bulbo_seco: Number(exterior.bulbo_seco),
        bulbo_humedo: Number(exterior.bulbo_humedo),
        humedad_especifica: Number(exterior.humedad_especifica)
    });
}

function setCLDT_vidrios(glassState) {
    const peakHour = '17';
    const d = Number(TABLA_VIDRIO[0][peakHour]);
    return glassState.map(glass => {
        return Object.assign({}, glass, {
            CLDT_tabla: d
        });
    });
}

function setCLTD_pared(paredesState) {
    // el grupo es dado en la seleccion de los datos
    const dataPared = TABLA_PARED.filter(x => x.grupo === 'b')
                        .map(x => ({orientacion: x.orientacion, 'CLTD': Number(x[17])}) );
    return paredesState.map(pared => {
        const CLTD = dataPared.find(x => x.orientacion === pared.orientacion).CLTD;
        return Object.assign({}, pared, {
            CLDT_tabla: CLTD
        })
    });
}

function setCLTD_techo(techoState) {
    const data_techo = TABLA_TECHO.find(x =>
        x.tipo_de_techo === 'sin cielo raso suspendido' &&
        x.numero_techo === '3');
    return Object.assign({}, techoState, {
        CLDT_tabla: Number(data_techo['17'])
    });
}


function setCLDT_correccion(state, action){
    const DeltaTempDiseno = 78 - 85;

    return Array.isArray(state) ? state.map(CLDT_Obj) : CLDT_Obj(state);

    function CLDT_Obj(el) {
        const LM = el.correcion_latitud_mes_LM;
        const K = el.correcion_color_K;
        const CLDT_temp = LM !== undefined && K !== undefined ?
                (el.CLDT_tabla + LM) * K : el.CLDT_tabla;

        return Object.assign({}, el, {
            CLDT_correccion: CLDT_temp + DeltaTempDiseno +
                action.tempExterior - 0.5*action.rangoDiario - action.tempInterior
        });
    }
}

function setSHGF_lat_40(glassState) {
    const dataSHGF = TABLA_SHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

    return glassState.map(vidrio => {
        let dir = vidrio.orientacion;
        dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
        return Object.assign({}, vidrio, {
            SHGF: Number(dataSHGF[dir])
        });
    });
}

function setUvidrio(glassState, glassDescription='vidrio sencillo') {
    const Uv_sencillo = TABLA_U_VIDRIO.find(x => x.descripcion === glassDescription)

    return glassState.map(vidrio => {
        return Object.assign({}, vidrio, {
            coeficiente_transferencia_calor: Number(Uv_sencillo.U_exterior)
        });
    });
}

function setU(elState, type='TECHO', material='CUBIERTA DE EJEMPLO') {
    const Utechos = TABLA_U_TECHO_PARED_PARTICION.find(
                        x => x.tipo === type && x.material === material
                    );

    const setUobj = el => Object.assign({}, el, {
        coeficiente_transferencia_calor: Number(Utechos.U)
    });

    return Array.isArray(elState) ? elState.map(setUobj) : setUobj(elState);
}

function setCLF(glassState, glassCapacity='M') {
    const CLF_ = TABLA_CLF.filter(x => x.CAPACIDAD === glassCapacity);

    return glassState.map(vidrio => {
        const value = CLF_.find(x => x.ORIENTACION === vidrio.orientacion);
        return Object.assign({}, vidrio, {
            CLF: Number(value['17'])
        });
    });
}

function setSC(glassState, glassDescription='vidrio sencillo') {
    const dataSc = TABLA_SC.filter(x => x.vidrio === glassDescription);

    return glassState.map(vidrio => {
        const dataScFiltered = dataSc.find(x => x.tipo_de_vidrio === vidrio.tipo_de_vidrio &&
                                           x.espesor_nominal === vidrio.espesor_nominal);
        return Object.assign({}, vidrio, {
            SC: Number(dataScFiltered.sin_sombreado_interior)
        });
    });
}

function setLM(mes="JUL") {
    const datoLM = TABLA_LM.find(x => Number(x.LATITUD) === 40 && x.MES === mes);

    return {
        paredes(paredesState){
            return paredesState.map(pared => {
                return Object.assign({}, pared, {
                    correcion_latitud_mes_LM: Number(datoLM[pared.orientacion])
                });
            });
        },
        techo(techoState){
            return Object.assign({}, techoState, {
                correcion_latitud_mes_LM: Number(datoLM['HORA'])
            });
        }
    };
}

function updatePropGlass(glassState, data) {
    return glassState.map( (glass, key) => {
        if (key === data.id) {
            return Object.assign({}, glass, data);
        }
        return glass;
    });
}

function updateAreaGlass(glassState, id) {
    return glassState.map( (glass, key) => {
        if (key === id) {
            return Object.assign({}, glass, {
                areaNeta: glass.width * glass.height
            });
        }
        return glass;
    });
}

function calcAreaNetaPared(paredesState, glassState, doors, depth, height, width){
    const glassHash = {};
    const doorsHash = {};
    for (const glass of glassState) {
        glassHash[glass.orientacion] = (glassHash[glass.orientacion] || 0) + glass.areaNeta;
    }
    for (const door of doors) {
        doorsHash[door.orientacion] = (doorsHash[door.orientacion] || 0) + door.areaNeta;
    }

    const areaBruta = {
        N: width * height,
        S: width * height,
        E: depth * height,
        W: depth * height
    };

    return paredesState.map(pared => {
        const gross = areaBruta[pared.orientacion];
        const glassArea = glassHash[pared.orientacion] || 0;
        const doorArea = doorsHash[pared.orientacion] || 0;
        const areaNeta = gross - glassArea - doorArea;

        return Object.assign({}, pared, {
            areaNeta: areaNeta > 0 ? areaNeta : 0
        });
    });
}
