import tablaVidrio from '../json/CLTD_vidrio';
import tablaPared from '../json/CLTD_pared';
import tablaTecho from '../json/CLTD_techo';
import tablaSHGF from '../json/SHGF_lat_40';
import tablaCLF from '../json/CLF_6_8_min';
import tablaUtechosParedesParticiones from '../json/U_techos_paredes_particiones';
import tablaUvidrios from '../json/U_vidrios';
import tablaSC from '../json/SC_tabla_6_7';
import tablaLM from '../json/LM_6_4';

console.log('tablaLM', tablaLM);

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
                area_neta: 830, //ft^2
            },{
                orientacion: "W",
                area_neta: 42, //ft^2
            },{
                orientacion: "E",
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
		    area_neta: 5400, //ft^2
		    correcion_latitud_mes_LM: 1,
		    correcion_color_K: 1
		},
		piso: {
		    coeficiente_transferencia_calor: 0.35, //Falta
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
                espesor_nominal: "3/16 a 1/4",
                tipo_de_vidrio: "absorbente de calor"
            },{
                direccion: "W",
                sombra: "no",
                area: 42,
                espesor_nominal: "3/32 a 1/4",
                tipo_de_vidrio: "claro"
            },{
                direccion: "E",
                sombra: "no",
                area: 42,
                espesor_nominal: "3/32 a 1/4",
                tipo_de_vidrio: "claro"
            }
		]
	}
};


setCLTD_vidrio(data.elementos.vidrios, tablaVidrio);
setCLTD_pared(data.elementos.pared, tablaPared);
setCLTD_techo(data.elementos.techo, tablaTecho);
setSHGF_lat_40(data.elementos.radiacion_vidrio, tablaSHGF);

setUtecho(data.elementos.techo, tablaUtechosParedesParticiones);
setUvidrio(data.elementos.vidrios, tablaUvidrios);

setCLF(data.elementos.radiacion_vidrio, tablaCLF);
setSC(data.elementos.radiacion_vidrio, tablaSC);

console.log('data.elementos', data.elementos);

export { data };


// CLTD
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

//SHGF
function setSHGF_lat_40(radiacionVidrio, tablaSHGF) {
    const dataSHGF = tablaSHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

    radiacionVidrio.forEach(vidrio => {
        let dir = vidrio.direccion;
        dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
        vidrio.SHGF = Number(dataSHGF[dir]);
    });
}

// U
function setUtecho(techo, tablaU, type='TECHO', material='CUBIERTA DE EJEMPLO') {
    const Utechos = tablaU.find(
                        x => x.tipo === type && x.material === material
                    );
    techo.coeficiente_transferencia_calor = Utechos.U;
}
function setUvidrio(vidrios, tablaUvidrios, glassDescription='vidrio sencillo') {
    const Uv_sencillo = tablaUvidrios.find(x => x.descripcion === glassDescription)

    vidrios.forEach(vidrio => {
        vidrio.coeficiente_transferencia_calor = Number(Uv_sencillo.U_exterior);
    });
}

function setCLF(radiacion_vidrio, tablaCLF, glassCapacity='M') {
    const CLF_ = tablaCLF.filter(x => x.CAPACIDAD === glassCapacity);

    radiacion_vidrio.forEach(vidrio => {
        const value = CLF_.find(x => x.ORIENTACION === vidrio.direccion);
        vidrio.CLF = Number(value['17']);
    });
}

function setSC(radiacion_vidrio, tablaSC) {
    const dataSc = tablaSC.filter(x => x.vidrio === 'vidrio sencillo');
    radiacion_vidrio.map(vidrio => {
        const dataScFiltered = dataSc.find(x => x.tipo_de_vidrio === vidrio.tipo_de_vidrio &&
                                           x.espesor_nominal === vidrio.espesor_nominal);
        vidrio.SC = Number(dataScFiltered.sin_sombreado_interior);
    });
}
