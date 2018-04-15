import { data } from "./data";

const vidrios = data.elementos.vidrios.map(getCLDT_correccion);

const pared = data.elementos.pared.map(getCLDT_correccion);

const calor_vidrio = 1.04;
const calor_pared = 0.13;
const Factor_correcion_calor_sensible = getCalor_sensible(vidrios, pared, calor_vidrio, calor_pared); //0.91

const  techo = getCLDT_correccion(data.elementos.techo);

const piso = data.elementos.piso;
piso.CLDT_correccion = data.design.exterior.bulbo_seco - data.design.recinto.bulbo_seco;

const puerta = data.elementos.puerta;

const radiacion_vidrio = data.elementos.radiacion_vidrio;

// Otros calculos
const luces = 16200 * 3.41 * 1.2 * 1.0 * 0.91; // RLHG BTU/h

const personas = {
	sensible: 315 * data.numero_personas * 1.0 * 0.91,
	latente: 325 * data.numero_personas
}

const ventilacion = {
	sensible: 1.1 * 600 * 12,
	latente: 0.68 * 600 * 29
}

	//Calculo final

	const ganancia_calor_recinto = calculoTotalSensible(vidrios, pared, techo, piso, puerta, radiacion_vidrio) + luces + personas.sensible;

	const ganancia_ventilador_forzado = ganancia_calor_recinto * 0.025;

	const total_sensible = ganancia_calor_recinto + ventilacion.sensible + ganancia_ventilador_forzado;

	const carga_enfriamiento = cargaEnfriamiento(total_sensible, personas, ventilacion); // Tons

	console.log(`# Carga de enfriamiento (tons): ${carga_enfriamiento}`);

	function cargaEnfriamiento(totalSensible, personas, ventilacion){
  		return (totalSensible + personas.latente + ventilacion.latente)/12000 // Tons
	}

	function calculoTotalSensible(vidrios = [{}], pared = [{}], techo = {}, piso = {}, puerta =[{}], radiacion_vidrio = [{}]){

	  	const calorVidrio = getCalorSensibleArray(vidrios);
	  	const calorPared = getCalorSensibleArray(pared);
	  	const calorTecho = getCalorSensible(techo);
	 	const calorPiso = 	getCalorSensible(piso);
	  	const calorPuerta = getCalorSensibleArray(puerta);
	  	const calorRadiacionVidrio = getCalorSensibleVidrio(radiacion_vidrio);

		return calorVidrio + calorPared + calorTecho + calorPiso + calorPuerta + calorRadiacionVidrio;


	    function getCalorSensibleVidrio(el){
	    	return el.map(i => i.SHGF * i.area * i.SC * i.CLF * Factor_correcion_calor_sensible)
	          .reduce( (anterior, actual) => {
	              return anterior + actual;
	          });
	    }

	    function getCalorSensibleArray(el){ // calculoIndividualSensible
	    	return el.map(i => getCalorSensible(i))
	          .reduce( (anterior, actual) => {
	              return anterior + actual;
	          });
	    }

	    function getCalorSensible(obj) {
	      return obj.coeficiente_transferencia_calor * obj.area_neta * obj.CLDT_correccion * Factor_correcion_calor_sensible;
	    }
	}

	// TODO: fn Calcular CLTD corregido

	function getCLDT_correccion(el) {
		// Note: investigar el CLDT_correccion de las puertas
		const DeltaTempDiseno = 78 - 85;
		const tempExterior = data.design.exterior.bulbo_seco;
		const rango_diario = data.carga_pico_enfriamiento.rango_diario;
		const tempInterior = data.design.recinto.bulbo_seco;
		const LM = el.correcion_latitud_mes_LM;
		const K = el.correcion_color_K;
		const CLDT_temp = LM !== undefined && K !== undefined ? (el.CLDT_tabla + LM) * K : el.CLDT_tabla;

		el.CLDT_correccion = CLDT_temp + DeltaTempDiseno + tempExterior - 0.5*rango_diario - tempInterior;
		return el;
	}

	function getCalor_sensible(vidrios, pared, transferencia_calor_vidrio, transferencia_calor_pared){
		const area_vidrio = vidrios.reduce( (a, b) => ({ area_neta: a.area_neta + b.area_neta }) ).area_neta;
		const area_pared = pared.reduce( (a, b) => ({ area_neta: a.area_neta + b.area_neta }) ).area_neta;
		const K_= (transferencia_calor_vidrio*area_vidrio + transferencia_calor_pared*area_pared) / data.design.perimetro;
		return 1 - 0.02 * K_;
	}
