export default {
  numberOfPeople: 5,
  height: 2.5,
  depth: 3,
  width: 3,
  exterior: {
    id: 7,
    ciudad: 'Indianapolis',
    latitud: 40,
    bulbo_seco: 90,
    bulbo_humedo: 74,
    humedad_especifica: 101, // formula pendiente
    mes_carga_de_enfriamiento: 'JUL',
    rango_diario: 22 // Fahrenheit
  },
  recinto: {
    // Estas condiciones no varian
    bulbo_seco: 78,
    humedad_relativa: 50,
    humedad_especifica: 72,
    actividad_recinto: 'Sentado, trabajo ligero',
    tipo_recinto: 'Oficina',
    equitmentWattsPerSquaredFoot: 1
  },
  elementos: {
    /* md`## Elementos del cuarto. Materiales en el cual se esta haciendo la conducción de exterior a interior.` */
    windows: [],
    paredes: [
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
    techo: {
      color: 'D',
      correcion_color_K: 1,
      type: 'superficie_oscura',
      material: 'CUBIERTA_DE_EJEMPLO',
      tipo: 'TECHO'
    },
    piso: {},
    puertas: [],
    luces: {
      numberOfLights: 1,
      wattsPorLampara: 60,
      factConv: 3.41
    }
  }
};
