import {
    vidrios, paredes, techo, puertas,
    piso, luces, cargaEnfriamiento, numberOfPeople,
    exterior, recinto
} from './prepareData.js';

import {depth, width, height} from './size.js';

export default (state = {}, action) => {
  return {
    vidrios: vidrios(state.vidrios, action),
    paredes: paredes(state.paredes, action, state),
    techo: techo(state.techo, action),
    puertas: puertas(state.puertas, action),
    piso: piso(state.piso, action),
    luces: luces(state.luces, action),
    cargaEnfriamiento: cargaEnfriamiento(state.cargaEnfriamiento, action, state),
    depth: depth(state.depth, action),
    width: width(state.width, action),
    height: height(state.height, action),
    numberOfPeople: numberOfPeople(state.numberOfPeople, action),
    exterior: exterior(state.exterior),
    recinto: recinto(state.recinto)
  };
};