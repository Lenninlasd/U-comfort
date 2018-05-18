function getMetricData(props) {
    const perimeter = 2*props.width + 2*props.length;
    const height = props.height;
    const walls = getWalls(props);
    const floor = getFloor(props);

    return {
        perimeter,
        height,
        walls,
        floor
    }
}

function getWalls(p){
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
            grossArea: p.length * p.height
        },
        {
            orientation: 'W',
            grossArea: p.length * p.height
        },
    ]

    return base;
}

function getFloor(p) {
    return { netArea: p.width * p.length };
}

export default {
    getMetricData
}
