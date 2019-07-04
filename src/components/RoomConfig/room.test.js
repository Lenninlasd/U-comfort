import RoomForm from './index';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import { renderWithRedux } from '../../utils/tests';
import initialState from '../../initialState';

describe('Test the form changes modify the redux store', () => {
  const { getByLabelText, store } = renderWithRedux(<RoomForm />, { initialState });

  it('size input changes should modify the redux store', () => {
    const eventSize = { target: { value: Math.PI } };
    fireEvent.change(getByLabelText('LARGO (m)'), eventSize);
    fireEvent.change(getByLabelText('ANCHO (m)'), eventSize);
    fireEvent.change(getByLabelText('ALTO (m)'), eventSize);

    const { depth, width, height } = store.getState();

    expect(depth).toBe(Math.PI);
    expect(width).toBe(Math.PI);
    expect(height).toBe(Math.PI);
  });

  it('room input changes should modify the redux store', () => {
    const eventRoom = { target: { value: 101 } };
    fireEvent.change(getByLabelText('No. DE PERSONAS'), eventRoom);
    fireEvent.change(getByLabelText('No. DE LUCES'), eventRoom);

    const { numberOfPeople, lights } = store.getState();

    expect(numberOfPeople).toBe(101);
    expect(lights.numberOfLights).toBe(101);
  });

  it('room input changes should modify the redux store', () => {
    fireEvent.change(getByLabelText('ACTIVIDAD DEL RECINTO'), { target: { value: 'Deporte' } });
    fireEvent.change(getByLabelText('TIPO DE RECINTO'), { target: { value: 'Bares' } });
    fireEvent.change(getByLabelText('CANTIDAD DE EQUIPOS EN RECINTO'), {
      target: { value: 1.5 }
    });

    const { room } = store.getState();

    expect(room.typeOfRoom).toBe('Bares');
    expect(room.equitmentWattsPerSquaredFoot).toBe(1.5);
    expect(room.roomActivity).toBe('Deporte');
  });
});
