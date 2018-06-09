/*
Pared:
[x] depth,
[x] Width,
[x] height ==> [x]gross area, perimeter,
        ==> [x] techo, piso area

glass:
[x] numero de vidrios,
[x] orientaciones
[x] sombra
[x] espesor_nominal,
[x] tipo_de_vidrio
[x] Width x height ==> [x] glass area_net
                  ==> [x] pared net area

[ ] memoria para los datos de las ventanas
[ ] opcion eliminar ventana: una vez se crea no se puede reducir el numero de ventanas
con el input, debera hacer clic en un link elimar, este eliminara el state, y cambiara
el min del input.
luces:
** estimar #luces
numeroLuces: 135,
wattsPorLampara: 120,
*/
import condicionesClimaticas from '../json/condiciones_climaticas';

export default {
    ubicacion: "Indianapolis, Ind",
    latitud : 39,
    numero_personas: 60,
    perimetro: 300,
    altura: 14,
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
    },
	cargaPico: {
	    rangoDiario : 22, // Fahrenheit no va a cambiar
	    fecha: "21-07-xxxx", // julio, no va a cambiar
	    hora: "17", // no va a cambiar
	    promedio: 79, // Fahrenheit
	},
	elementos:  {
		/* md`## Elementos del cuarto. Materiales en el cual se esta haciendo la conducción de exterior a interior.` */
		vidrios: [
            {
                orientacion: "W",
                sombra: "no", // usuario
                area_neta: 830, //ft^2
                espesor_nominal: "3/16 a 1/4",
                tipo_de_vidrio: "absorbente de calor"
            },{
                orientacion: "W",
                sombra: "no",
                area_neta: 42, //ft^2
                espesor_nominal: "3/32 a 1/4",
                tipo_de_vidrio: "claro"
            },{
                orientacion: "E",
                sombra: "no",
                area_neta: 42, //ft^2
                espesor_nominal: "3/32 a 1/4",
                tipo_de_vidrio: "claro"
            }
	    ],
		pared: [
		    {
		        orientacion: "N",
		        color: "D",
		        area_neta: 840, //ft^2
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    },{
		        orientacion: "S",
		        color: "D",
		        area_neta: 840, //ft^2
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    },{
		        orientacion: "E",
		        color: "D",
		        area_bruta: 1260,
		        area_neta: 1176, //ft^2
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    },{
		        orientacion: "W",
		        color: "D",
		        area_bruta: 1260,
		        area_neta: 388, //ft^2
		        correcion_color_K: 1,
                type: "superficie_oscura"
		    }
		],
		techo: {
		    color: "D",
		    area_neta: 5400, //ft^2
		    correcion_color_K: 1,
            type: "superficie_oscura"
		},
		piso: {
		    area_neta: 5400, //ft^2
		},
		puerta: [
		    {
		        orientacion: "E",
		        area_neta: 42, //ft^2
		        CLDT_tabla: 27, // ºF Aun no se tiene esa tabla
		        CLDT_correccion: 22, // ºF
		    }
		],
        luces: {
            numeroLuces: 135,
            wattsPorLampara: 120,
            factConv: 3.41
        }
	}
};
