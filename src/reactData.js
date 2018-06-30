import tablaSC from '../json/SC_tabla_6_7';
import getCargaEnfriamiento2 from './cargaEnfriamiento.js';

const uniqueList = list => [...(new Set(list))];

const nominalThickness = uniqueList(
    tablaSC.map(i => i['espesor_nominal'])
           .filter(i => i !== '-')
);

const typeofGlass = uniqueList(
    tablaSC.map(i => i['tipo_de_vidrio'])
);

const getNominalThickness = () => nominalThickness;

const getTypeofGlass = () => typeofGlass;


export default {
    getNominalThickness,
    getTypeofGlass
}
