import { Roof } from './index';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

describe('Test Roof component', () => {
  const props = {
    roof: { material: '' },
    handleChange: jest.fn(),
    changeColorK: jest.fn()
  };

  it('Should trigger action on click', () => {
    const { getByTestId } = render(<Roof {...props} />);

    fireEvent.change(getByTestId('typeofRoof'));
    fireEvent.change(getByTestId('correcion_color_K'));
    expect(props.handleChange).toHaveBeenCalledTimes(1);
    expect(props.changeColorK).toHaveBeenCalledTimes(1);
  });
});
