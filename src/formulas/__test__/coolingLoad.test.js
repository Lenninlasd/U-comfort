import { createStore } from 'redux';
import rootReducer from '../../reducers/root.js';
import initState from '../../model.js';
import enrichData from '../enrichData.js';
import { getTempEntradaSerpentin, getcoolingLoad } from '../coolingLoad.js';

const store = createStore(rootReducer, {
  windows: initState.elementos.windows,
  walls: initState.elementos.walls,
  roof: initState.elementos.roof,
  doors: initState.elementos.doors,
  floor: initState.elementos.floor,
  lights: initState.elementos.lights,
  depth: initState.depth,
  width: initState.width,
  height: initState.height,
  numberOfPeople: initState.numberOfPeople,
  exterior: initState.exterior,
  recinto: initState.recinto
});

enrichData(store.dispatch);

test('Check getTempEntradaSerpentin', () => {
  const netSensibleCFM = 10680;
  const CFMventilacion = 420;
  const exterior = { bulbo_seco: 90 };
  const recinto = { bulbo_seco: 78 };

  expect(getTempEntradaSerpentin(netSensibleCFM, CFMventilacion, exterior, recinto)).toBeCloseTo(
    78.47
  );
});

test('Calculate the final getcoolingLoad', () => {
  const result = getcoolingLoad(store.getState());
  const expectedRasult = {
    QS_QL: 4957.659721751376,
    coolingLoad: 4685.0470557462295,
    netSensibleCFM: 155.3203207157377
  };
  expect(expectedRasult).toMatchObject(result);
});
