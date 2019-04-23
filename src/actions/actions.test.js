import * as actions from './index.js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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

describe('test the card form actions', () => {
  beforeEach(() => {});
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({});

  it('should call ...', () => {
    store.dispatch(actions.submitForm());
    expect(store.getActions()).toEqual([actions.calcGrossWallArea(), actions.setcoolingLoad()]);
  });
});
