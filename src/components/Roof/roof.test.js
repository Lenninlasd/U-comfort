import Roof from './index';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithRedux } from '../../utils/tests';
import initialState from '../../initialState';
import { setLMRoof } from '../../actions/roof.actions';

describe('Test Roof component', () => {
  it('Should trigger action on change and update the roof store', () => {
    const { getByLabelText, store } = renderWithRedux(<Roof />, { initialState });
    store.dispatch(setLMRoof());

    fireEvent.change(getByLabelText('TIPO DE TECHO'), { target: { value: 'CUBIERTA_SANDWICH' } });
    fireEvent.change(getByLabelText('COLOR'), { target: { value: 0.5 } });

    const { roof } = store.getState();
    expect(roof.correcion_color_K).toBe(0.5);
    expect(roof.material).toBe('CUBIERTA_SANDWICH');
  });
});
