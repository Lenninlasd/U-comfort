'use strict';

import tablaVidrio from '../json/CLTD_vidrio';
import tablaPared from '../json/CLTD_pared';
import tablaTecho from '../json/CLTD_techo';
import tablaSHGF from '../json/SHGF_lat_40';
import tablaCLF from '../json/CLF_6_8_min';
import tablaUtechosParedesParticiones from '../json/U_techos_paredes_particiones';
import tablaUvidrios from '../json/U_vidrios';
import tablaSC from '../json/SC_tabla_6_7';
import tablaLM from '../json/LM_6_4';

const data = {
    ubicacion: "Indianapolis, Ind",
    latitud : 39,
    numero_personas: 60,
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


setCLTD_vidrio(data.elementos.vidrios, tablaVidrio);
setCLTD_pared(data.elementos.pared, tablaPared);
setCLTD_techo(data.elementos.techo, tablaTecho);

setLM(data.elementos.pared, data.elementos.techo, tablaLM);

getCLDT_correccion(data.elementos.vidrios, data.exterior.bulbo_seco,
        data.recinto.bulbo_seco, data.cargaPico.rangoDiario);
getCLDT_correccion(data.elementos.pared, data.exterior.bulbo_seco,
        data.recinto.bulbo_seco, data.cargaPico.rangoDiario);

setSHGF_lat_40(data.elementos.vidrios, tablaSHGF);

setUtecho(data.elementos.techo, tablaUtechosParedesParticiones);
setUtecho(data.elementos.pared, tablaUtechosParedesParticiones, 'PAREDES', 'MURO EJEMPLO');
setUtecho(data.elementos.puerta, tablaUtechosParedesParticiones, 'PUERTA', 'PUERTA EJEMPLO');
setUtecho(data.elementos.piso, tablaUtechosParedesParticiones, 'PISO', 'PISO EJEMPLO');

setUvidrio(data.elementos.vidrios, tablaUvidrios);

setCLF(data.elementos.vidrios, tablaCLF);
setSC(data.elementos.vidrios, tablaSC);

getCLDT_correccion(data.elementos.techo, data.exterior.bulbo_seco,
        data.recinto.bulbo_seco, data.cargaPico.rangoDiario);


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

function getCLDT_correccion(elementos, tempExterior, tempInterior, rangoDiario) {
    const DeltaTempDiseno = 78 - 85;
    elementos = !Array.isArray(elementos) ? [elementos] : elementos;
    elementos.map(correct);

    function correct(el) {
        const LM = el.correcion_latitud_mes_LM;
    	const K = el.correcion_color_K;
    	const CLDT_temp = LM !== undefined && K !== undefined ? (el.CLDT_tabla + LM) * K : el.CLDT_tabla;

    	el.CLDT_correccion = CLDT_temp + DeltaTempDiseno + tempExterior - 0.5*rangoDiario - tempInterior;
    }
}

//SHGF
function setSHGF_lat_40(radiacionVidrio, tablaSHGF) {
    const dataSHGF = tablaSHGF.find(x => x.MES === 'jul' && x.LATITUD === '40');

    radiacionVidrio.forEach(vidrio => {
        let dir = vidrio.orientacion;
        dir = dir === 'E' || dir === 'W' ? 'E/W' : dir;
        vidrio.SHGF = Number(dataSHGF[dir]);
    });
}

// U
function setUtecho(techo, tablaU, type='TECHO', material='CUBIERTA DE EJEMPLO') {
    const Utechos = tablaU.find(
                        x => x.tipo === type && x.material === material
                    );
    techo = !Array.isArray(techo) ? [techo] : techo;

    techo.map(el => el.coeficiente_transferencia_calor = Utechos.U );
}

function setUvidrio(vidrios, tablaUvidrios, glassDescription='vidrio sencillo') {
    const Uv_sencillo = tablaUvidrios.find(x => x.descripcion === glassDescription)

    vidrios.forEach(vidrio => {
        vidrio.coeficiente_transferencia_calor = Number(Uv_sencillo.U_exterior);
    });
}

function setCLF(vidrios, tablaCLF, glassCapacity='M') {
    const CLF_ = tablaCLF.filter(x => x.CAPACIDAD === glassCapacity);

    vidrios.forEach(vidrio => {
        const value = CLF_.find(x => x.ORIENTACION === vidrio.orientacion);
        vidrio.CLF = Number(value['17']);
    });
}

function setSC(vidrios, tablaSC) {
    const dataSc = tablaSC.filter(x => x.vidrio === 'vidrio sencillo');
    vidrios.map(vidrio => {
        const dataScFiltered = dataSc.find(x => x.tipo_de_vidrio === vidrio.tipo_de_vidrio &&
                                           x.espesor_nominal === vidrio.espesor_nominal);
        vidrio.SC = Number(dataScFiltered.sin_sombreado_interior);
    });
}

function setLM(paredes, techo, tablaLM, mes="JUL") {
    const datoLM = tablaLM.find(x => Number(x.LATITUD) === 40 && x.MES === mes);
    paredes.map(pared => {
        pared.correcion_latitud_mes_LM = Number(datoLM[pared.orientacion]);
    });

    techo.correcion_latitud_mes_LM = Number(datoLM['HORA']);
}
