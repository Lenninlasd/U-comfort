import tablaSC from '../json/SC_tabla_6_7';

const uniqueList = list => [...new Set(list)];

const getNominalThickness = windowType => {
  const filterGlass = windowType ? tablaSC.filter(i => i.tipo_de_vidrio === windowType) : tablaSC;

  const thickList = filterGlass.map(i => i.espesor_nominal).filter(i => i !== '-');
  return uniqueList(thickList);
};

const typeofGlass = uniqueList(tablaSC.map(i => i.tipo_de_vidrio));

const getTypeofGlass = () => typeofGlass;

export default {
  getNominalThickness,
  getTypeofGlass
};
