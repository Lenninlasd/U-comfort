export const setDepth = value => ({ type: 'SET_DEPTH', value })

export const setHeight = value => ({ type: 'SET_HEIGHT', value })

export const setWidth = value => ({ type: 'SET_WIDTH', value })

export const calcAreaPiso = () => ({ type: 'CALC_AREA_PISO' })

export const calcAreaTecho = () => ({ type: 'CALC_AREA_TECHO' })

export const setNumberOfPeople = value => ({
  type: 'SET_NUMBER_OF_PEOPLE',
  value
})

export const setNumberOfLights = value => ({
  type: 'SET_NUMBER_OF_LIGHTS',
  value
})

export const setActividadRecinto = value => ({
  type: 'SET_ACTIVIDAD_RECINTO',
  value
})
