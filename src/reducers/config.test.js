import { appConfig } from './config';
import * as actions from '../actions';

describe('config reducers', () => {
  it('should return the initial state', () => {
    expect(appConfig(undefined, {})).toEqual({});
  });

  it('should handle SHOW_ELEMENTS_VIEW', () => {
    expect(
      appConfig(
        {},
        {
          type: actions.SHOW_ELEMENTS_VIEW,
          elementType: 'walls'
        }
      )
    ).toEqual({
      windowsView: 'wallsView'
    });
  });

  it('should handle SHOW_ELEMENTS_VIEW with default element view', () => {
    expect(
      appConfig(
        {},
        {
          type: actions.SHOW_ELEMENTS_VIEW
        }
      )
    ).toEqual({
      windowsView: 'glassView'
    });
  });

  it('should handle HIDE_ELEMENTS_VIEW', () => {
    expect(
      appConfig(
        {},
        {
          type: actions.HIDE_ELEMENTS_VIEW
        }
      )
    ).toEqual({
      windowsView: null
    });
  });
});
