import tablaSC from '../json/SC_tabla_6_7';

import enrichData from "./enrichData.js";
import getCargaEnfriamiento2 from './cargaEnfriamiento.js';

const uniqueList = list => [...(new Set(list))];

const nominalThickness = uniqueList(
    tablaSC.map(i => i['espesor_nominal'])
           .filter(i => i !== '-')
);

const typeofGlass = uniqueList(
    tablaSC.map(i => i['tipo_de_vidrio'])
);

const getNominalThickness = () => nominalThickness;

const getTypeofGlass = () => typeofGlass;

function getMetricData(props) {
    const perimetro = 2*props.width + 2*props.depth;
    const height = props.height;
    const piso = getFloor(props);
    const vidrios = getWindowList(props);
    const paredes = getWalls(props, vidrios);

    enrichData(props.globalData);
    return {
        perimetro,
        height,
        paredes,
        vidrios,
        piso
    }
}

function getWalls(p, vidrios){
    const glassHash = {};
    for (const w of vidrios) {
        glassHash[w.orientacion] = (glassHash[w.orientacion] || 0) + w.areaNeta;
    }

    const base = [
        {
            orientacion: 'N',
            areaBruta: p.width * p.height
        },
        {
            orientacion: 'S',
            areaBruta: p.width * p.height
        },
        {
            orientacion: 'E',
            areaBruta: p.depth * p.height
        },
        {
            orientacion: 'W',
            areaBruta: p.depth * p.height
        },
    ]

    return base.map(p => {
        // TODO: Alert if areaNeta < 0
        p.areaNeta = p.areaBruta - (glassHash[p.orientacion] || 0);
        return p;
    });
}

function getFloor(p) {
    return { areaNeta: p.width * p.depth };
}
function getWindowList(props) {
    return props.vidrios.map(w => {
        w.areaNeta = w.height && w.width ? Number(w.height) * Number(w.width) : 0;
        return w
    });
}

export default {
    getMetricData,
    getNominalThickness,
    getTypeofGlass
}
