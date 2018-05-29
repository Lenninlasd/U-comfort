import tablaSC from '../json/SC_tabla_6_7';

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
    const perimeter = 2*props.width + 2*props.depth;
    const height = props.height;
    const floor = getFloor(props);
    const windowList = getWindowList(props);
    const walls = getWalls(props, windowList);

    return {
        perimeter,
        height,
        walls,
        windowList,
        floor
    }
}

function getWalls(p, windowList){
    const glassHash = {};
    for (const w of windowList) {
        glassHash[w.orientation] = (glassHash[w.orientation] || 0) + w.netArea;
    }

    const base = [
        {
            orientation: 'N',
            grossArea: p.width * p.height
        },
        {
            orientation: 'S',
            grossArea: p.width * p.height
        },
        {
            orientation: 'E',
            grossArea: p.depth * p.height
        },
        {
            orientation: 'W',
            grossArea: p.depth * p.height
        },
    ]

    return base.map(p => {
        // TODO: Alert if netArea < 0
        p.netArea = p.grossArea - (glassHash[p.orientation] || 0);
        return p;
    });
}

function getFloor(p) {
    return { netArea: p.width * p.depth };
}
function getWindowList(props) {
    return props.windowList.map(w => {
        w.netArea = Number(w.height) * Number(w.width);
        return w
    });
}

export default {
    getMetricData,
    getNominalThickness,
    getTypeofGlass
}
