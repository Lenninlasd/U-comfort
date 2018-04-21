import tablaVidrio from '../json/CLTD_vidrio';
import tablaPared from '../json/CLTD_pared';
import tablaTecho from '../json/CLTD_techo';
import tablaSHGF from '../json/SHGF_lat_40';
import tablaCLF from '../json/CLF_6_8_min';
import UtechosParedesParticiones from '../json/U_techos_paredes_particiones';
import Uvidrios from '../json/U_vidrios';

const CLF_ = tablaCLF.filter(x => x.CAPACIDAD === "M");
console.log('CLF_', CLF_);

const Uv_sencillo = Uvidrios.filter(x => x.descripcion === 'vidrio sencillo')
console.log('Uvidrios', Uv_sencillo[0].U_exterior);

console.log('UtechosParedesParticiones', UtechosParedesParticiones);


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
	    rango_diario : 22, // Fahrenheit no va a cambiar
	    fecha: "21-07-xxxx", // julio, no va a cambiar
	    hora: "17", // no va a cambiar
	    promedio: 79, // Fahrenheit
	},
	elementos:  {
		/* md`## Elementos del cuarto. Materiales en el cual se esta haciendo la conducción de exterior a interior.` */
		vidrios: [
            {
                orientacion: "W",
                coeficiente_transferencia_calor: 1.04,
                area_neta: 830, //ft^2
            },{
                orientacion: "W",
                coeficiente_transferencia_calor: 1.04,
                area_neta: 42, //ft^2
            },{
                orientacion: "E",
                coeficiente_transferencia_calor: 1.04,
                area_neta: 42, //ft^2
            }
	    ],
		pared: [
		    {
		        orientacion: "N",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_neta: 840, //ft^2
		        correcion_latitud_mes_LM: 0,
		        correcion_color_K: 1,
		    },{
		        orientacion: "S",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_neta: 840, //ft^2
		        correcion_latitud_mes_LM: 1,
		        correcion_color_K: 1,
		    },{
		        orientacion: "E",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_bruta: 1260,
		        area_neta: 1176, //ft^2
		        correcion_latitud_mes_LM: 0,
		        correcion_color_K: 1
		    },{
		        orientacion: "W",
		        color: "D",
		        coeficiente_transferencia_calor: 0.13,
		        area_bruta: 1260,
		        area_neta: 388, //ft^2
		        correcion_latitud_mes_LM: 0,
		        correcion_color_K: 1
		    }
		],
		techo: {
		    color: "D",
		    coeficiente_transferencia_calor: 0.09,
		    area_neta: 5400, //ft^2
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
		        CLDT_tabla: 27, // ºF Aun no se tiene esa tabla
		        CLDT_correccion: 22, // ºF
		    }
		],
        // Radiación solar a través de vidrio. (investigar)
        radiacion_vidrio: [
            {
                direccion: "W", //usuario
                sombra: "no", // usuario
                area: 830, // usuario
                SC: 0.69, // tabla 6.7
                CLF: 0.56,  // tabla 6.8
            },{
                direccion: "W",
                sombra: "no",
                area: 42,
                SC: 1,
                CLF: 0.56,
            },{
                direccion: "E",
                sombra: "no",
                area: 42,
                SC: 1,
                CLF: 0.23,
            }
		]
	}
};


setCLTD_vidrio(data.elementos.vidrios, tablaVidrio);
setCLTD_pared(data.elementos.pared, tablaPared);
setCLTD_techo(data.elementos.techo, tablaTecho);
setSHGF_lat_40(data.elementos.radiacion_vidrio, tablaSHGF);

console.log('data.elementos', data.elementos);

function setCLTD_vidrio(vidrios, tablaVidrio) {
    const d = Number(tablaVidrio[0]['17']);
    vidrios.forEach(vidrio => {
        vidrio.CLDT_tabla = d;
    });
}

function setCLTD_pared(paredes, tablaPared) {
    // el grupo es dado en la seleccion de los datos
    const dataPared = tablaPared.filter(x => x.grupo === 'b')
                        .map(x => ({orientacion: x.orientacion, 'CLTD': Number(x[17])}) );
    paredes.forEach(pared => {
        const CLTD = dataPared.find(x => x.orientacion === pared.orientacion).CLTD;
        pared.CLDT_tabla = CLTD;
    });
}

function setCLTD_techo(techo, tablaTecho) {
    const data_techo = tablaTecho.find(x => x.tipo_de_techo === 'sin cielo raso suspendido'
                                            && x.numero_techo === '3');
    techo.CLDT_tabla = Number(data_techo['17']);
}

function setSHGF_lat_40(radiacionVidrio, tablaSHGF) {
    const dataSHGF = tablaSHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

    radiacionVidrio.forEach(vidrio => {
        let dir = vidrio.direccion;
        dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
        vidrio.SHGF = Number(dataSHGF[dir]);
    });
}

export { data }
