import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { render, cleanup, fireEvent } from '@testing-library/react';

import reducer from '../../reducers/root';
import { CardForm } from './index';
import initialState from '../../initialState';

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

describe('<cardForm /> should sumbit', () => {
  afterEach(cleanup);
  const submitForm = jest.fn();
  const mockHistory = { push: jest.fn() };

  it('should trigger submit event and change the route to equitments', () => {
    const submitForm = jest.fn();
    const mockHistory = { push: jest.fn() };

    const { getByText } = renderWithRedux(
      <CardForm submitForm={submitForm} history={mockHistory} />,
      { initialState }
    );

    fireEvent.click(getByText('Calcular'));

    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(mockHistory.push).toBeCalledWith('/equipment');
  });

  it('should show the setup wall view', () => {
    const { queryByText } = renderWithRedux(
      <CardForm submitForm={submitForm} history={mockHistory} windowsView="wallsView" />,
      { initialState }
    );
    expect(queryByText('PROPIEDADES DE LOS MUROS')).toBeTruthy();
  });

  it('should show the setup windows view', () => {
    const { queryByText } = renderWithRedux(
      <CardForm submitForm={submitForm} history={mockHistory} windowsView="glassView" />,
      { initialState }
    );
    expect(queryByText('PROPIEDADES DE LAS VENTANAS')).toBeTruthy();
  });

  it('should show the setup doors view', () => {
    const { queryByText } = renderWithRedux(
      <CardForm submitForm={submitForm} history={mockHistory} windowsView="doorView" />,
      { initialState }
    );
    expect(queryByText('PROPIEDADES DE LAS PUERTAS')).toBeTruthy();
  });
});
