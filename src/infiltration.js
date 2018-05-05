import tablaInfiltracion from '../json/tabla_infiltracion';

function getCalor(area_neta=5400, height=14, Δtemp=90-78, ΔHumedad=29){

    const tipoRecinto = 'puerta_o_ventanas_en_dos_lado_del_cuarto';
    const CambioAire = tablaInfiltracion.find(x => x.tipo_de_recinto === tipoRecinto);
    const CFM = Number(CambioAire['con_cinta_hermetica'])*area_neta*height/60;

    const sensible = 1.1 * CFM * Δtemp;
    const latente = 0.68 * CFM * ΔHumedad;

    return { sensible, latente };
}

const infiltration = getCalor();

export default infiltration;
