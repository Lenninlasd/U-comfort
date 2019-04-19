import {
  calcAreaFloor,
  calcAreaRoof,
  setCLTDWindow,
  setCLTDCorrectionWindow,
  setSHGFWindow,
  setUWindow,
  setCLFWindow,
  setSCWindow,
  calcAreaWindowAll,
  calcGrossWallArea,
  setCLTDWall,
  setLMWall,
  setWallCLTDCorretion,
  setUWall,
  setCLTDRoof,
  setLMRoof,
  setCLTDRoofCorrection,
  setURoof,
  setUDoors,
  calcAreaDoorAll,
  setUFloor,
  setFloorCLTDCorrection,
  setcoolingLoad
} from '../actions';

export default function enrichData(dispatch) {
  dispatch(setCLTDWindow());
  dispatch(setCLTDCorrectionWindow());
  dispatch(setSHGFWindow());
  dispatch(setUWindow());
  dispatch(setCLFWindow());
  dispatch(setSCWindow());
  dispatch(calcAreaWindowAll());

  dispatch(setCLTDWall());
  dispatch(setLMWall());
  dispatch(setWallCLTDCorretion());
  dispatch(setUWall('PAREDES', 'MURO_EJEMPLO'));

  dispatch(calcAreaRoof());
  dispatch(setCLTDRoof());
  dispatch(setLMRoof());
  dispatch(setCLTDRoofCorrection());
  dispatch(setURoof('TECHO', 'CUBIERTA_DE_EJEMPLO'));

  dispatch(setUDoors('PUERTA', 'PUERTA_EJEMPLO'));
  dispatch(calcAreaDoorAll());

  dispatch(calcGrossWallArea());

  dispatch(calcAreaFloor());
  dispatch(setUFloor('PISO', 'PISO_EJEMPLO'));
  dispatch(setFloorCLTDCorrection());

  dispatch(setcoolingLoad());
}
