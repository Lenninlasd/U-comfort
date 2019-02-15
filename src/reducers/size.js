const setValue = (state, action, type) => {
  switch (action.type) {
    case type:
      return action.value;
    default:
      return state;
  }
};

export const depth = (state = 0, action) => {
  return setValue(state, action, 'SET_DEPTH');
};

export const width = (state = 0, action) => {
  return setValue(state, action, 'SET_WIDTH');
};

export const height = (state = 0, action) => {
  return setValue(state, action, 'SET_HEIGHT');
};

export const numberOfPeople = (state = 0, action) => {
  return setValue(state, action, 'SET_NUMBER_OF_PEOPLE');
};
