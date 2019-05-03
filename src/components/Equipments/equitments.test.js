import { chooseBTU, getAvailableEquip } from './index.js';
const LISTADO_DE_EQUIPOS = [
  { capacidad_BTU: '11000', cfm_max: '367' },
  { capacidad_BTU: '11500', cfm_max: '348' },
  { capacidad_BTU: '12000', cfm_max: '312' },
  { capacidad_BTU: '16500', cfm_max: '550' },
  { apacidad_BTU: '17000', cfm_max: '505' },
  { capacidad_BTU: '18000', cfm_max: '447' },
  { capacidad_BTU: '20000', cfm_max: '667' },
  { capacidad_BTU: '22000', cfm_max: '600' },
  { capacidad_BTU: '24000', cfm_max: '647' },
  { capacidad_BTU: '30000', cfm_max: '3700' }
];

describe('Test chooseBTU function', () => {
  const btuList = [8991, 9000, 11000, 11500, 12000, 15000, 16500, 17000, 18000, 20000];
  it('Should test chooseBTU less than 8000', () => {
    expect(chooseBTU(4958, btuList)).toEqual([8991, 9000]);
  });

  it('Should test chooseBTU equal to 8000', () => {
    expect(chooseBTU(8000, btuList)).toEqual([11000, 11500, 12000, 15000]);
  });

  it('Should test chooseBTU greater than 8000', () => {
    expect(chooseBTU(10000, btuList)).toEqual([12000, 15000]);
  });
});

describe('Test getAvailableEquip', () => {
  it('Should return an empty array when receiving an empty list of btus', () => {
    expect(getAvailableEquip([])).toEqual([]);
  });

  const netSensibleCFM = 155;
  it('Should return a list of air conditioners that match with the btu boundaries', () => {
    const expectedResult = [
      { capacidad_BTU: '22000', cfm_max: '600' },
      { capacidad_BTU: '24000', cfm_max: '647' },
      { capacidad_BTU: '30000', cfm_max: '3700' }
    ];
    expect(getAvailableEquip([22000, 30000], netSensibleCFM, LISTADO_DE_EQUIPOS)).toEqual(
      expectedResult
    );

    expect(getAvailableEquip([22000, 30000], 1000, LISTADO_DE_EQUIPOS)).toEqual([
      { capacidad_BTU: '30000', cfm_max: '3700' }
    ]);
  });
});
