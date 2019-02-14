import tablaInfiltracion from '../json/tabla_infiltracion'

export default function getCalor(areaNeta, height, Δtemp, ΔHumedad) {
  const tipo_de_recinto = 'puerta_o_ventanas_en_dos_lado_del_cuarto'
  const CambioAire = tablaInfiltracion.find(x => x.tipo_de_recinto === tipo_de_recinto)
  const CFM = (Number(CambioAire['sin_cinta_hermetica']) * areaNeta * height) / 60

  const sensible = 1.1 * CFM * Δtemp
  const latente = 0.68 * CFM * ΔHumedad

  return { sensible, latente }
}
