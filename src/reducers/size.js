export function depth(state=0, action){
    switch (action.type) {
        case 'SET_DEPTH':
            return action.value;
        default:
            return state;
    }
}

export function width(state=0, action){
    switch (action.type) {
        case 'SET_WIDTH':
            return action.value;
        default:
            return state;
    }
}

export function height(state=0, action){
    switch (action.type) {
        case 'SET_HEIGHT':
            return action.value;
        default:
            return state;
    }
}

export function numberOfPeople(state=0, action){
    switch (action.type) {
        case 'SET_NUMBER_OF_PEOPLE':
            return action.value;
        default:
            return state;
    }
}
