import getCalorPorInfiltracion from './infiltration';
import heat from './calculoCalor';

import tablaCalorPersonas from "../json/calor_personas_6_11";
import tablaCFM from "../json/CFM_6_15";

export default function getCargaEnfriamiento(data) {

    const vidrios = data.elementos.vidrios;
    const paredes = data.elementos.paredes;
    const techo = data.elementos.techo;
    const puerta = data.elementos.puerta;
    const luces = data.elementos.luces;

    const Δtemp = data.exterior.bulbo_seco - data.recinto.bulbo_seco;
    const ΔHumedad = data.exterior.humedad_especifica - data.recinto.humedad_especifica;

    const piso = data.elementos.piso;
          piso.CLDT_correccion = Δtemp;

    // Calculo de calor
    const infiltration = getCalorPorInfiltracion(piso.areaNeta, data.altura, Δtemp, ΔHumedad);

    const factorCorrecionCalorSensible = heat.getCalor_sensible(vidrios, paredes, data.perimetro);

    const calorLuces = luces.wattsPorLampara * luces.numeroLuces * luces.factConv * factorCorrecionCalorSensible;

    const calorPersonas = heat.setCalorPersonas(data.numero_personas, factorCorrecionCalorSensible, tablaCalorPersonas);

    const calorVentilacion = heat.setCalorVentilacion(data.numero_personas, Δtemp, ΔHumedad, tablaCFM);

    //Calculo final

    const ganancia_calor_recinto = heat.calculoTotalSensible(vidrios, paredes, techo, piso, puerta, factorCorrecionCalorSensible) + calorLuces + calorPersonas.sensible;

    const ganancia_ventilador_forzado = ganancia_calor_recinto * 0.025;

    const total_sensible = ganancia_calor_recinto + calorVentilacion.sensible + ganancia_ventilador_forzado;

    return heat.cargaEnfriamiento(total_sensible, calorPersonas, calorVentilacion, infiltration); // Tons
}

// CFMventilacion = CFM_tabla * Numero de personas (ver function setCalorVentilacion)
function getTempEntradaSerpentin(CFMnetoSensible, CFMventilacion, exterior, recinto){
    const aireExterior = CFMventilacion * exterior.bulbo_seco;
    const aireRetorno = recinto.bulbo_seco * (CFMnetoSensible - CFMventilacion);
    return (aireExterior +  aireRetorno ) / CFMnetoSensible;
}

function LineaSerpentin(tempEntradaSerpentin, CFTtotal) {

}
