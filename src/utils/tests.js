import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/root';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}
