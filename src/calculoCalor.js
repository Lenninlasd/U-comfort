import tablaPsat from '../json/Psat_tabla_A4E_simp.js';

export const setCalorPersonas = (
        n_personas,
        correcion,
        tablaCalorPersonas,
        aplicacion='TIENDAS MINORISTAS, BANCOS'
    ) => {
    const filtered = tablaCalorPersonas.filter(x => x['APLICACIONES_TIPICAS'] === aplicacion);
    const calorSensible = filtered.find( x => x['CALOR'] === 'CALOR SENSIBLE');
    const calorLatente = filtered.find( x => x['CALOR'] === 'CALOR LATENTE');

    return {
        sensible: calorSensible['BTUH'] * n_personas * 1.0 * correcion,
        latente:  calorLatente['BTUH']  * n_personas
    };
};

export const setCalorVentilacion = (n_personas, Δtemp, ΔHumedad, tablaCFM) => {

    const cfmRecomendado = tablaCFM.find(
        x => x.lugar === 'comercios: pisos de venta (pisos superiores)'
    )['cfm_recomendado'];

    // take the first cfm of the range
    const CFMventilacion = cfmRecomendado.split('-')[0] * n_personas;

    return {
        sensible: 1.1 * CFMventilacion * Δtemp,
        latente: 0.68 * CFMventilacion * ΔHumedad,
        CFMventilacion
    }
};

export const cargaEnfriamiento = (
        totalSensible,
        calorPersonas,
        calorVentilacion,
        infiltration
    ) => {

    const totalCalor = totalSensible            +
                       calorPersonas.latente    +
                       calorVentilacion.latente +
                       infiltration.sensible    +
                       infiltration.latente;

    return (totalCalor).toFixed(3); // Tons
};

export const getCFMCalorNetoSensible = (totalSensible, infiltration) => {
    const ΔtempAireSuministro = 20;
    return (totalSensible + infiltration.sensible) / ( ΔtempAireSuministro * 1.1 );
};

export const calculoTotalSensible = (
        vidrios = [{}],
        paredes = [{}],
        techo = {},
        piso = {},
        puerta =[{}],
        factorCorrecion
    ) => {
        const getCalorSensibleVidrio = element => {
            if (!element.length) return 0;

            return element
                .map(
                    i => i.SHGF * i.areaNeta * i.SC * i.CLF * factorCorrecion
                )
                .reduce( (acc, actual) => acc + actual);
        };

        // calculoIndividualSensible
        const getCalorSensibleArray = element => {
            if (!element.length) return 0;

            return element
                .map(i => getCalorSensible(i))
                .reduce( (anterior, actual) => anterior + actual );
        };

        const getCalorSensible = obj => {
            return obj.coeficiente_transferencia_calor *
                   obj.areaNeta                        *
                   obj.CLDT_correccion                 *
                   factorCorrecion;
        };

        const calorVidrio          = getCalorSensibleArray(vidrios);
        const calorPared           = getCalorSensibleArray(paredes);
        const calorTecho           = getCalorSensible(techo);
        const calorPiso            = getCalorSensible(piso);
        const calorPuerta          = getCalorSensibleArray(puerta);
        const calorRadiacionVidrio = getCalorSensibleVidrio(vidrios);

        return calorVidrio  +
               calorPared   +
               calorTecho   +
               calorPiso    +
               calorPuerta  +
               calorRadiacionVidrio;
};

export const getCalor_sensible = (vidrios, paredes, perimetro) => {
    let transferencia_calor_vidrio = 0;
    let transferencia_calor_pared = 0;
    let area_vidrio = 0;
    let area_pared = 0;

    if (vidrios.length) {
        transferencia_calor_vidrio = vidrios[0].coeficiente_transferencia_calor;
        area_vidrio = vidrios.reduce(
            (a, b) => ({ areaNeta: a.areaNeta + b.areaNeta })
        ).areaNeta;
    }
    if (paredes.length) {
        transferencia_calor_pared = paredes[0].coeficiente_transferencia_calor;
        area_pared = paredes.reduce(
            (a, b) => ({ areaNeta: a.areaNeta + b.areaNeta })
        ).areaNeta;
    }

    const K_ = (transferencia_calor_vidrio*area_vidrio + transferencia_calor_pared*area_pared) / perimetro;
    return 1 - 0.02 * K_;
};

const getPresionSat = tempBulbSecRecinto => {

    const tablaPsatN = tablaPsat.reduce( (acc, el) => {
        acc[el.T_F] = Number(el.Psat_psi);
        return acc;
    }, {});

    if (tempBulbSecRecinto % 5 === 0) {
        return tablaPsatN[tempBulbSecRecinto];
    }

    const tempLimiteInferior = tempBulbSecRecinto - (tempBulbSecRecinto % 5);
    const tempLimiteSuperior = tempBulbSecRecinto + 5 - (tempBulbSecRecinto % 5);
    const presInferior = tablaPsatN[tempLimiteInferior];
    const presSuperior = tablaPsatN[tempLimiteSuperior];
    const tempRatio = (tempBulbSecRecinto - tempLimiteInferior) / 5;

    return tempRatio * (presSuperior - presInferior) + presInferior;
}

export const calcularHumedadEntradaSerp = ( {recinto, exterior}, tempEntradaSerp) => {

    const presionSatBulboSecoInterior = getPresionSat(recinto.bulbo_seco);
    const humedadRelativa = recinto.humedad_relativa/100;
    const presionParcial = humedadRelativa * presionSatBulboSecoInterior;
    const presionAtmosferica = 14.696;

    const humedadAbsInterior = (7000 * 0.622 * presionParcial) /
                               (presionAtmosferica - presionParcial);

    return humedadAbsInterior +
        (tempEntradaSerp - recinto.bulbo_seco) *
        (exterior.humedad_especifica - humedadAbsInterior) /
        (exterior.bulbo_seco - recinto.bulbo_seco);
}
