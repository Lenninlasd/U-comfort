export default {
  numberOfPeople: 60,
  height: 4.267,
  depth: 27.432,
  width: 18.288,
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
    actividad_recinto: 'Parado, trabajo ligero, caminando',
    tipo_recinto: 'Supermercados',
    equitmentWattsPerSquaredFoot: 1
  },
  cargaPico: {
    fecha: '21-07-xxxx', // julio, no va a cambiar
    hora: 17, // no va a cambiar
    promedio: 79 // Fahrenheit
  },
  elementos: {
    /* md`## Elementos del cuarto. Materiales en el cual se esta haciendo la conducción de exterior a interior.` */
    vidrios: [
      {
        orientacion: 'W',
        sombra: 'no', // usuario
        width: 25.298,
        height: 3.048,
        espesor_nominal: '3/16 a 1/4',
        tipo_de_vidrio: 'absorbente de calor'
      },
      {
        orientacion: 'W',
        sombra: 'no',
        width: 2.133,
        height: 1.828,
        espesor_nominal: '3/32 a 1/4',
        tipo_de_vidrio: 'claro'
      },
      {
        orientacion: 'E',
        sombra: 'no',
        width: 2.133,
        height: 1.828,
        espesor_nominal: '3/32 a 1/4',
        tipo_de_vidrio: 'claro'
      }
    ],
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
    puertas: [
      {
        width: 1.828,
        height: 2.133,
        orientacion: 'E',
        tipo: 'PUERTA',
        material: 'PUERTA_EJEMPLO',
        CLTD_tabla: 27, // ºF Aun no se tiene esa tabla
        CLTD_correccion: 22 // ºF
      }
    ],
    luces: {
      numberOfLights: 135,
      wattsPorLampara: 60,
      factConv: 3.41
    }
  }
};
