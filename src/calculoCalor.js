export default {
    setCalorPersonas,
    setCalorVentilacion,
    cargaEnfriamiento,
    calculoTotalSensible,
    getCalor_sensible
}


function setCalorPersonas(n_personas, correcion, tablaCalorPersonas, aplicacion='TIENDAS MINORISTAS, BANCOS') {
    const filtered = tablaCalorPersonas.filter(x => x['APLICACIONES_TIPICAS'] === aplicacion);
    const calorSensible = filtered.find( x => x['CALOR'] === 'CALOR SENSIBLE');
    const calorLatente = filtered.find( x => x['CALOR'] === 'CALOR LATENTE');

    return {
        sensible: calorSensible['BTUH'] * n_personas * 1.0 * correcion,
        latente: calorLatente['BTUH'] * n_personas
    };
}

function setCalorVentilacion(n_personas, Δtemp, ΔHumedad, tablaCFM){

    const cfmRecomendado = tablaCFM.find(x =>
        x.lugar === 'comercios: pisos de venta (pisos superiores)')['cfm_recomendado'];
    // take the first cfm of the range
    const CFM = cfmRecomendado.split('-')[0];

    return {
        sensible: 1.1 * CFM * n_personas * Δtemp,
        latente: 0.68 * CFM * n_personas * ΔHumedad
    }
}

function cargaEnfriamiento(totalSensible, calorPersonas, calorVentilacion, infiltration){
    const totalCalor = totalSensible + calorPersonas.latente + calorVentilacion.latente + infiltration.sensible + infiltration.latente;
    return (totalCalor/12000).toFixed(3); // Tons
}

function getCFMCalorNetoSensible(totalSensible, infiltration){
    const ΔtempAireSuministro = 20;
    return (totalSensible + infiltration.sensible)/ ΔtempAireSuministro * 1.1;
}

function calculoTotalSensible(vidrios = [{}], paredes = [{}], techo = {}, piso = {}, puerta =[{}], factorCorrecion){

        const calorVidrio = getCalorSensibleArray(vidrios);
        const calorPared = getCalorSensibleArray(paredes);
        const calorTecho = getCalorSensible(techo);
        const calorPiso =     getCalorSensible(piso);
        const calorPuerta = getCalorSensibleArray(puerta);
        const calorRadiacionVidrio = getCalorSensibleVidrio(vidrios);

        return calorVidrio + calorPared + calorTecho + calorPiso + calorPuerta + calorRadiacionVidrio;


        function getCalorSensibleVidrio(el){
            if (!el.length) {
                return 0;
            }

            return el.map(i => i.SHGF * i.areaNeta * i.SC * i.CLF * factorCorrecion)
              .reduce( (anterior, actual) => {
                  return anterior + actual;
              });
        }

        function getCalorSensibleArray(el){ // calculoIndividualSensible
            if (!el.length) {
                return 0;
            }

            return el.map(i => getCalorSensible(i))
                .reduce( (anterior, actual) => {
                    return anterior + actual;
                });
        }

        function getCalorSensible(obj) {
          return obj.coeficiente_transferencia_calor * obj.areaNeta * obj.CLDT_correccion * factorCorrecion;
        }
}

function getCalor_sensible(vidrios, paredes, perimetro){
    let transferencia_calor_vidrio = 0;
    let transferencia_calor_pared = 0;
    let area_vidrio = 0;
    let area_pared = 0;

    if (vidrios.length) {
        transferencia_calor_vidrio = vidrios[0].coeficiente_transferencia_calor;
        area_vidrio = vidrios.reduce( (a, b) => ({ areaNeta: a.areaNeta + b.areaNeta }) ).areaNeta;
    }
    if (paredes.length) {
        transferencia_calor_pared = paredes[0].coeficiente_transferencia_calor;
        area_pared = paredes.reduce( (a, b) => ({ areaNeta: a.areaNeta + b.areaNeta }) ).areaNeta;
    }

    const K_ = (transferencia_calor_vidrio*area_vidrio + transferencia_calor_pared*area_pared) / perimetro;
    return 1 - 0.02 * K_;
}
