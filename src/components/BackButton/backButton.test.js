import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import BackButton, { SaveAndCancel } from './index';

afterEach(cleanup);

describe('Test SaveAndCancel component', () => {
  it('should trigger callbacks', () => {
    const props = {
      handleAccept: jest.fn(),
      handleCancel: jest.fn()
    };

    const { getByText } = render(<SaveAndCancel {...props} />);

    fireEvent.click(getByText('Aceptar'));
    fireEvent.click(getByText('Cancelar'));

    expect(props.handleAccept).toHaveBeenCalledTimes(1);
    expect(props.handleCancel).toHaveBeenCalledTimes(1);
  });
});

describe('Test BackButton component', () => {
  it('uses Router for logout functionality', () => {
    const onClick = jest.fn();
    const { getByText } = render(<BackButton onClick={onClick} />);
    fireEvent.click(getByText('←'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
