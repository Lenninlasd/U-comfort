/*
[x] numberOfPeople
[x] luces
[x] luces 3D
[x] bug de calculo
[x] puertas
	-[x] Forms
	-[x] Recalcular Area pared
	-[x] calcular area puerta by default
[x] Area Techo y Paredes
[x] ubicacion/latitud
[ ] cero luces 

[ ] intefaz para puertas y ventanas

[x] Resize 3D model
[x] hover model
[ ] Brujula 3D
[ ] Default position 3D buttons


[ ] opcion eliminar ventana: una vez se crea no se puede reducir el número de ventanas
con el input, debera hacer clic en un link eliminar, este eliminará el state, y cambiara
el min del input.

*/


export default {
    numberOfPeople: 60,
    perimetro: 300,
    height: 14,
    depth: 90,
    width: 60,
    exterior: {
        id: 7,
        ciudad: "Indianapolis",
        latitud : 39,
        bulbo_seco: 90,
        bulbo_humedo: 74,
        humedad_especifica: 101 // formula pendiente
    },
    recinto: {
      // Estas condiciones no varian
        bulbo_seco: 78,
        humedad_relativa: 50,
        humedad_especifica: 72
    },
	cargaPico: {
	    rangoDiario : 22, // Fahrenheit no va a cambiar
	    fecha: "21-07-xxxx", // julio, no va a cambiar
	    hora: 17, // no va a cambiar
	    promedio: 79, // Fahrenheit
	},
	elementos:  {
		/* md`## Elementos del cuarto. Materiales en el cual se esta haciendo la conducción de exterior a interior.` */
		vidrios: [
            {
                orientacion: "W",
                sombra: "no", // usuario
                width: 83,
                height: 10,
                espesor_nominal: "3/16 a 1/4",
                tipo_de_vidrio: "absorbente de calor"
            },{
                orientacion: "W",
                sombra: "no",
                width: 7,
                height: 6,
                espesor_nominal: "3/32 a 1/4",
                tipo_de_vidrio: "claro"
            },{
                orientacion: "E",
                sombra: "no",
                width: 7,
                height: 6,
                espesor_nominal: "3/32 a 1/4",
                tipo_de_vidrio: "claro"
            }
	    ],
		paredes: [
		    {
		        orientacion: "N",
		        color: "D",
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    },{
		        orientacion: "S",
		        color: "D",
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    },{
		        orientacion: "E",
		        color: "D",
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    },{
		        orientacion: "W",
		        color: "D",
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    }
		],
		techo: {
		    color: "D",
		    correcion_color_K: 1,
            type: "superficie_oscura"
		},
		piso: {},
		puerta: [
		    {
                width: 6,
                height: 7,
		        orientacion: "E",
		        CLDT_tabla: 27, // ºF Aun no se tiene esa tabla
		        CLDT_correccion: 22, // ºF
		    }
		],
        luces: {
            numberOfLights: 135,
            wattsPorLampara: 120,
            factConv: 3.41
        }
	}
};
