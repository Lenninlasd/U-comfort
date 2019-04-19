import * as actions from './index.js';

describe('test actions', () => {
  it('should create an action to setUFloor', () => {
    const element = 'test element';
    const material = 'test material';
    const expectedAction = {
      type: actions.SET_U_FLOOR,
      element,
      material
    };
    expect(actions.setUFloor(element, material)).toEqual(expectedAction);
  });
});
