const data = {
    ubicacion: "Indianapolis, Ind",
    latitud : 39,
    numero_personas: 60,
    design: {
            perimetro: 300,
            exterior: {
                  bulbo_seco: 90, // A.9 condiciones exteriores de diseño
                  bulbo_humedo: 74, // A.9
                  humedad_especifica: 101 // formula pendiente
            },
            recinto: {
              // Estas condiciones no varian
              bulbo_seco: 78,
              humedad_relativa: 50,
              humedad_especifica: 72
              }
    },
	carga_pico_enfriamiento: {
	    rango_diario : 22, // Fahrenheit
	    fecha: "21-07-xxxx",
	    hora: "17",
	    promedio: 79, // Fahrenheit
	},
	elementos:  {
		/* md`## Elementos del cuarto. Materiales en el cual se esta haciendo la conducción de exterior a interior.` */
		vidrios: [
	        {
	            orientacion: "W",
	            coeficiente_transferencia_calor: 1.04,
	            area_neta: 830, //ft^2
	            CLDT_tabla: 13, // ºF **
	        },{
	            orientacion: "W",
	            coeficiente_transferencia_calor: 1.04,
	            area_neta: 42, //ft^2
	            CLDT_tabla: 13, // ºF
	        },{
	            orientacion: "E",
	            coeficiente_transferencia_calor: 1.04,
	            area_neta: 42, //ft^2
	            CLDT_tabla: 13, // ºF
	        }
	    ],
		pared: [
		    {
		        orientacion: "N",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_neta: 840, //ft^2
		        CLDT_tabla: 11, // ºF
		        correcion_latitud_mes_LM: 0,
		        correcion_color_K: 1,
		    },{
		        orientacion: "S",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_neta: 840, //ft^2
		        CLDT_tabla: 17, // ºF
		        correcion_latitud_mes_LM: 1,
		        correcion_color_K: 1,
		    },{
		        orientacion: "E",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_bruta: 1260,
		        area_neta: 1176, //ft^2
		        correcion_latitud_mes_LM: 0,
		        correcion_color_K: 1,
		        CLDT_tabla: 26, // ºF
		    },{
		        orientacion: "W",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_bruta: 1260,
		        area_neta: 388, //ft^2
		        correcion_latitud_mes_LM: 0,
		        correcion_color_K: 1,
		        CLDT_tabla: 17, // ºF
		    }
		],
		techo: {
		    color: "D",
		    coeficiente_transferencia_calor: 0.09,
		    area_neta: 5400, //ft^2
		    CLDT_tabla: 71, // ºF
		    correcion_latitud_mes_LM: 1,
		    correcion_color_K: 1,
		    CLDT_correccion: 66, // ºF
		},
		piso: {
		    coeficiente_transferencia_calor: 0.35,
		    area_neta: 5400, //ft^2
		},
		puerta: [
		    {
		        orientacion: "E",
		        coeficiente_transferencia_calor: 0.18,
		        area_neta: 42, //ft^2
		        CLDT_tabla: 27, // ºF
		        CLDT_correccion: 22, // ºF
		    }
		],
		// Radiación solar a través de vidrio. (investigar)
		radiacion_vidrio: [{
		        direccion: "W",
		        sombra: "no",
		        SHGF: 216, //investigar
		        area: 830,
		        SC: 0.69,
		        CLF: 0.56,
		    },{
		        direccion: "W",
		        sombra: "no",
		        SHGF: 216, //investigar
		        area: 42,
		        SC: 1,
		        CLF: 0.56,
		    },{
		        direccion: "E",
		        sombra: "no",
		        SHGF: 216, //investigar
		        area: 42,
		        SC: 1,
		        CLF: 0.23,
		    }
		]
	}
};

export { data }
