import {
  setPeopleHeat,
  setCalorVentilacion,
  getNetSensibleHeatCFM,
  totalSensibleCalculation
} from '../heatCalculationHelpers';

//
describe('Test all the calculations formulas', () => {
  it('should pass setPeopleHeat', () => {
    const expectedResult = { sensible: 1198.8763115, latente: 775 };

    const numberOfPeople = 5;
    const SensibleHeatCorrectionFactor = 0.97867454;
    const roomActivity = 'Sentado, trabajo ligero';

    expect(expectedResult).toMatchObject(
      setPeopleHeat(numberOfPeople, SensibleHeatCorrectionFactor, roomActivity)
    );
  });

  it('should pass setCalorVentilacion', () => {
    const numberOfPeople = 5;
    const Δtemp = 12;
    const ΔHumedad = 29;
    const cfmMinimo = 5;

    const expectedResult = {
      CFMventilacion: 25,
      latente: 493,
      sensible: 330
    };

    const expectedOne = {
      CFMventilacion: 1,
      latente: 0.68,
      sensible: 1.1
    };
    expect(expectedResult).toMatchObject(
      setCalorVentilacion(numberOfPeople, Δtemp, ΔHumedad, cfmMinimo)
    );

    expect(expectedOne).toMatchObject(setCalorVentilacion(1, 1, 1, 1));
  });

  test('test the getNetSensibleHeatCFM function', () => {
    const totalSensible = 3417.0470557462295;
    const netSensibleCFM = 155.3203207157377;
    expect(getNetSensibleHeatCFM(totalSensible)).toBe(netSensibleCFM);
    expect(getNetSensibleHeatCFM(22)).toBe(1);
  });
});

describe('it should the calculate the total of the sansible heat', () => {
  it('should returns the total Sensible Calculation', () => {
    const windows = [
      {
        CLTD_Correction: 7,
        SHGF: 38,
        coeficiente_transferencia_calor: 1.04,
        CLF: 0.75,
        SC: 1,
        areaNeta: 10.7639111056
      }
    ];
    const doors = [
      {
        CLTD_Correction: 22,
        coeficiente_transferencia_calor: 0.18,
        areaNeta: 21.5278222112
      }
    ];
    const roof = {
      areaNeta: 96.8751999504,
      CLTD_Correction: 60,
      coeficiente_transferencia_calor: 0.09
    };
    const walls = [
      {
        CLTD_Correction: 9,
        coeficiente_transferencia_calor: 0.13,
        areaNeta: 48.4375999752
      },
      {
        CLTD_Correction: 22,
        coeficiente_transferencia_calor: 0.13,
        areaNeta: 80.729333292
      },
      {
        CLTD_Correction: 26,
        coeficiente_transferencia_calor: 0.13,
        areaNeta: 80.729333292
      },
      {
        CLTD_Correction: 18,
        coeficiente_transferencia_calor: 0.13,
        areaNeta: 80.729333292
      }
    ];
    const SensibleHeatCorrectionFactor = 0.9751202966666667;

    const expectedTotalSensible = 1699.4773576787807;
    expect(
      totalSensibleCalculation(windows, walls, roof, doors, SensibleHeatCorrectionFactor)
    ).toBe(expectedTotalSensible);
  });

  it('should test the totalSensibleCalculation with defualt parameters', () => {
    expect(totalSensibleCalculation()).toBe(0);
  });
});
