import {
    vidrios, paredes, techo, puertas,
    piso, luces, cargaEnfriamiento,
    exterior, recinto, cargaPico
} from './prepareData.js';

import {depth, width, height, numberOfPeople} from './size.js';
import { appConfig } from './config.js'

export default (state = {}, action) => {
  return {
    vidrios: vidrios(state.vidrios, action, state),
    paredes: paredes(state.paredes, action, state),
    techo: techo(state.techo, action, state),
    puertas: puertas(state.puertas, action),
    piso: piso(state.piso, action, state),
    luces: luces(state.luces, action),
    cargaEnfriamiento: cargaEnfriamiento(state.cargaEnfriamiento, action, state),
    depth: depth(state.depth, action),
    width: width(state.width, action),
    height: height(state.height, action),
    numberOfPeople: numberOfPeople(state.numberOfPeople, action),
    exterior: exterior(state.exterior, action),
    recinto: recinto(state.recinto),
    cargaPico: cargaPico(state.cargaPico),
    appConfig: appConfig(state.appConfig, action)
  };
};
