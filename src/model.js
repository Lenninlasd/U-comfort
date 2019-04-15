export default {
  numberOfPeople: 5,
  height: 2.5,
  depth: 3,
  width: 3,
  exterior: {
    id: 7,
    city: 'Indianapolis',
    latitud: 40,
    bulbo_seco: 90,
    bulbo_humedo: 74,
    humedad_especifica: 101, // pending formula
    mes_carga_de_enfriamiento: 'JUL',
    rango_diario: 22 // Fahrenheit
  },
  recinto: {
    bulbo_seco: 78,
    humedad_relativa: 50,
    humedad_especifica: 72,
    actividad_recinto: 'Sentado, trabajo ligero',
    tipo_recinto: 'Oficina',
    equitmentWattsPerSquaredFoot: 1
  },
  elementos: {
    windows: [],
    walls: [
      {
        orientacion: 'N',
        color: 'D',
        correcion_color_K: 1,
        type: 'superficie_oscura',
        material: 'MURO_EJEMPLO',
        tipo: 'PAREDES'
      },
      {
        orientacion: 'S',
        color: 'D',
        correcion_color_K: 1,
        type: 'superficie_oscura',
        material: 'MURO_EJEMPLO',
        tipo: 'PAREDES'
      },
      {
        orientacion: 'E',
        color: 'D',
        correcion_color_K: 1,
        type: 'superficie_oscura',
        material: 'MURO_EJEMPLO',
        tipo: 'PAREDES'
      },
      {
        orientacion: 'W',
        color: 'D',
        correcion_color_K: 1,
        type: 'superficie_oscura',
        material: 'MURO_EJEMPLO',
        tipo: 'PAREDES'
      }
    ],
    roof: {
      color: 'D',
      correcion_color_K: 1,
      type: 'superficie_oscura',
      material: 'CUBIERTA_DE_EJEMPLO',
      tipo: 'roof'
    },
    floor: {},
    doors: [],
    lights: {
      numberOfLights: 1,
      wattsPorLampara: 60,
      factConv: 3.41
    }
  }
};
