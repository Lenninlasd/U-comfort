import tablaInfiltracion from '../json/tabla_infiltracion';

export default function getCalor(area_neta, height, Δtemp, ΔHumedad){

    const tipoRecinto = 'puerta_o_ventanas_en_dos_lado_del_cuarto';
    const CambioAire = tablaInfiltracion.find(x => x.tipo_de_recinto === tipoRecinto);
    const CFM = Number(CambioAire['con_cinta_hermetica'])*area_neta*height/60;

    const sensible = 1.1 * CFM * Δtemp;
    const latente = 0.68 * CFM * ΔHumedad;

    return { sensible, latente };
}
