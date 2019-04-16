import { appConfig } from './config.js';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(appConfig(undefined, {})).toEqual({});
  });
});
