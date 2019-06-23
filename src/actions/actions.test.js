import * as actions from './index.js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Test room action creators', () => {
  it('get the correct action', () => {
    expect(actions.setDepth(10)).toEqual({
      type: 'SET_DEPTH',
      value: 10
    });
    expect(actions.setHeight(10)).toEqual({
      type: 'SET_HEIGHT',
      value: 10
    });
    expect(actions.setWidth(10)).toEqual({
      type: 'SET_WIDTH',
      value: 10
    });
    expect(actions.calcAreaFloor()).toEqual({
      type: 'CALC_AREA_FLOOR'
    });
    expect(actions.calcAreaRoof()).toEqual({
      type: 'CALC_AREA_ROOF'
    });
    expect(actions.setNumberOfPeople(100)).toEqual({
      type: 'SET_NUMBER_OF_PEOPLE',
      value: 100
    });
    expect(actions.setNumberOfLights(100)).toEqual({
      type: 'SET_NUMBER_OF_LIGHTS',
      value: 100
    });
    expect(actions.setRoomActivity('some activity')).toEqual({
      type: 'SET_ROOM_ACTIVITY',
      value: 'some activity'
    });
    expect(actions.setRoomType('some room type')).toEqual({
      type: 'SET_ROOM_TYPE',
      value: 'some room type'
    });
    expect(actions.setFloorCLTDCorrection()).toEqual({
      type: 'SET_FLOOR_CLTD_CORRECTION'
    });
    expect(actions.setUFloor('test element', 'test material')).toEqual({
      type: 'SET_U_FLOOR',
      element: 'test element',
      material: 'test material'
    });
    expect(actions.setEquitmentWattsPerSquaredFoot(2)).toEqual({
      type: 'SET_EQUITMENT_WATTS_PER_SQUARED_FOOT',
      value: 2
    });
  });

  it('setSizeChange should call actionSizeForm, calcAreaFloor, calcAreaRoof', () => {
    const actionsList = [];
    const dispatch = action => actionsList.push(action);
    actions.setSizeChange({ target: { id: 'depth', value: 1 } })(dispatch);
    expect(actionsList).toEqual([
      actions.setDepth(1),
      actions.calcAreaFloor(),
      actions.calcAreaRoof()
    ]);
  });
});

describe('test the cardForm action creators', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

  it('get the correct action', () => {
    expect(actions.calcGrossWallArea()).toEqual({
      type: 'CALC_GROSS_WALL_AREA'
    });
    expect(actions.setcoolingLoad()).toEqual({
      type: 'SET_COOLING_LOAD'
    });
  });

  it('should call ...', () => {
    store.dispatch(actions.submitForm());
    expect(store.getActions()).toEqual([actions.calcGrossWallArea(), actions.setcoolingLoad()]);
  });
});

describe('test roof action creators', () => {
  it('get the correct action', () => {
    expect(actions.setUoneRoof('concrete')).toEqual({
      type: 'SET_U_1_ROOF',
      material: 'concrete'
    });
    expect(actions.setColorKRoof(0.5)).toEqual({
      type: 'SET_COLOR_K_ROOF',
      k: 0.5
    });
    expect(actions.setCLTDRoof()).toEqual({ type: 'SET_CLTD_ROOF' });
    expect(actions.setCLTDRoofCorrection()).toEqual({ type: 'SET_CLTD_ROOF_CORRECTION' });
    expect(actions.setLMRoof()).toEqual({ type: 'SET_LM_ROOF' });
    expect(actions.setURoof('ROOF', 'EXAMPLE COVER')).toEqual({
      type: 'SET_U_ROOF',
      element: 'ROOF',
      material: 'EXAMPLE COVER'
    });
  });
});

describe('test walls action creators', () => {
  it('get the correct action', () => {
    expect(actions.setUoneWall({ id: 1, material: 'crystal' })).toEqual({
      type: 'SET_U_1_WALL',
      data: { id: 1, material: 'crystal' }
    });
    expect(actions.setColorkWall({ id: 1, k: 0.5 })).toEqual({
      type: 'SET_COLOR_K_WALL',
      data: { id: 1, k: 0.5 }
    });
    expect(actions.setUndoWall()).toEqual({ type: 'SET_UNDO_WALL' });
    expect(actions.setCLTDWall()).toEqual({ type: 'SET_CLTD_WALL' });
    expect(actions.setLMWall()).toEqual({ type: 'SET_LM_WALL' });
    expect(actions.setWallCLTDCorretion()).toEqual({ type: 'SET_CLTD_CORRECTION_WALL' });
    expect(actions.setUWall('WALLS', 'EXAMPLE_WALL')).toEqual({
      type: 'SET_U_WALL',
      element: 'WALLS',
      material: 'EXAMPLE_WALL'
    });
  });
});

describe('test windows action creators', () => {
  it('get the correct action', () => {
    expect(actions.updatePropWindow({ id: 0, sombra: 'yes' })).toEqual({
      type: 'UPDATE_PROP_WINDOW',
      data: { id: 0, sombra: 'yes' }
    });
    expect(actions.setCLTDWindow()).toEqual({ type: 'SET_CLTD_WINDOW' });
    expect(actions.setCLTDCorrectionWindow()).toEqual({ type: 'SET_CLTD_CORRECTION_WINDOW' });
    expect(actions.setSHGFWindow()).toEqual({ type: 'SET_SHGF_LAT_40_WINDOW' });
    expect(actions.setUWindow()).toEqual({ type: 'SET_U_WINDOW' });
    expect(actions.setCLFWindow()).toEqual({ type: 'SET_CLF_WINDOW' });
    expect(actions.setSCWindow()).toEqual({ type: 'SET_SC_WINDOW' });
    expect(actions.calcAreaWindowAll()).toEqual({ type: 'CALC_AREA_WINDOW_ALL' });
    expect(actions.calcAreaWindow(0)).toEqual({ type: 'CALC_AREA_WINDOW', id: 0 });
    expect(actions.removeWindow(0)).toEqual({ type: 'REMOVE_WINDOW', key: 0 });
    expect(actions.addWindow({ width: 4, height: 4 })).toEqual({
      type: 'ADD_WINDOW',
      data: { width: 4, height: 4 }
    });
    expect(actions.setUndoWindows()).toEqual({ type: 'SET_UNDO_WINDOWS' });
  });
});

describe('test doors action creators', () => {
  it('get the correct action', () => {
    expect(actions.setUoneDoor({})).toEqual({
      type: 'SET_U_1_DOOR',
      data: {}
    });
    expect(actions.updatePropDoor({})).toEqual({
      type: 'UPDATE_PROP_DOOR',
      data: {}
    });
    expect(actions.calcAreaDoor(0)).toEqual({
      type: 'CALC_AREA_DOOR',
      id: 0
    });
    expect(actions.removeDoor(0)).toEqual({
      type: 'REMOVE_DOOR',
      key: 0
    });
    expect(actions.addDoor({})).toEqual({
      type: 'ADD_DOOR',
      data: {}
    });
    expect(actions.setUDoors('element', 'material')).toEqual({
      type: 'SET_U_DOOR',
      element: 'element',
      material: 'material'
    });

    expect(actions.hideElementsView()).toEqual({ type: 'HIDE_ELEMENTS_VIEW' });
    expect(actions.setUndoDoors()).toEqual({ type: 'SET_UNDO_DOORS' });
    expect(actions.calcAreaDoorAll()).toEqual({ type: 'CALC_AREA_DOOR_ALL' });
  });
});

describe('test CustomButton actions', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

  it('showElementProperties should call showElementView and setElementHistory', () => {
    store.dispatch(actions.showElementProperties('elementType'));

    expect(store.getActions()).toEqual([
      actions.showElementView('elementType'),
      actions.setElementHistory('elementType')
    ]);
  });
});
