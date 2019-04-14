import {
  windows,
  walls,
  techo,
  doors,
  piso,
  luces,
  results,
  exterior,
  recinto,
  past
} from './prepareData.js';

import { depth, width, height, numberOfPeople } from './size.js';
import { appConfig } from './config.js';

export default (state = {}, action) => ({
  past: past(state.past, action, state),
  windows: windows(state.windows, action, state),
  walls: walls(state.walls, action, state),
  techo: techo(state.techo, action, state),
  doors: doors(state.doors, action, state),
  piso: piso(state.piso, action, state),
  luces: luces(state.luces, action),
  results: results(state.results, action, state),
  depth: depth(state.depth, action),
  width: width(state.width, action),
  height: height(state.height, action),
  numberOfPeople: numberOfPeople(state.numberOfPeople, action),
  exterior: exterior(state.exterior, action),
  recinto: recinto(state.recinto, action),
  appConfig: appConfig(state.appConfig, action)
});
