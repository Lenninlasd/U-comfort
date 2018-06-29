import getCalorPorInfiltracion from './infiltration';
import heat from './calculoCalor';

import tablaCalorPersonas from "../json/calor_personas_6_11";
import tablaCFM from "../json/CFM_6_15";

export function getCargaEnfriamiento(state) {
    const Δtemp = state.exterior.bulbo_seco - state.recinto.bulbo_seco;
    const ΔHumedad = state.exterior.humedad_especifica - state.recinto.humedad_especifica;


    // Calculo de calor
    const infiltration = getCalorPorInfiltracion(
        state.piso.areaNeta,
        state.height,
        Δtemp,
        ΔHumedad
    );

    const perimeter = 2*state.width + 2*state.depth;
    const factorCorrecionCalorSensible = heat.getCalor_sensible(
        state.vidrios,
        state.paredes,
        perimeter
    );

    const calorLuces = state.luces.wattsPorLampara *
                       state.luces.numeroLuces *
                       state.luces.factConv *
                       factorCorrecionCalorSensible;

    const calorPersonas = heat.setCalorPersonas(
        state.numberOfPeople,
        factorCorrecionCalorSensible,
        tablaCalorPersonas
    );

    const calorVentilacion = heat.setCalorVentilacion(
        state.numberOfPeople,
        Δtemp,
        ΔHumedad,
        tablaCFM
    );

    //Calculo final
    const sensibleEl = heat.calculoTotalSensible(
        state.vidrios,
        state.paredes,
        state.techo,
        state.piso,
        state.puertas,
        factorCorrecionCalorSensible
    );

    const ganancia_calor_recinto = sensibleEl + calorLuces + calorPersonas.sensible;

    const ganancia_ventilador_forzado = ganancia_calor_recinto * 0.025;

    const total_sensible = ganancia_calor_recinto + calorVentilacion.sensible + ganancia_ventilador_forzado;

    return heat.cargaEnfriamiento(
        total_sensible,
        calorPersonas,
        calorVentilacion,
        infiltration
    ); // Tons
}

// CFMventilacion = CFM_tabla * Numero de personas (ver function setCalorVentilacion)
function getTempEntradaSerpentin(CFMnetoSensible, CFMventilacion, exterior, recinto){
    const aireExterior = CFMventilacion * exterior.bulbo_seco;
    const aireRetorno = recinto.bulbo_seco * (CFMnetoSensible - CFMventilacion);
    return (aireExterior +  aireRetorno ) / CFMnetoSensible;
}

function LineaSerpentin(tempEntradaSerpentin, CFTtotal) {

}
