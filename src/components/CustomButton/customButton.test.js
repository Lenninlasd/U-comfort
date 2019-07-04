import { CustomButton } from './index';
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

describe('Test custon button', () => {
  beforeEach(cleanup);

  const props = {
    title: 'title',
    buttonText: 'buttonText',
    elementType: 'elementType',
    src: './img.svg',
    numberOfElements: 2,
    showElementProperties: jest.fn()
  };

  it('Should no render the button if there is no elementType', () => {
    const { queryByText } = render(<CustomButton {...props} elementType="" />);
    expect(queryByText(props.buttonText)).toBeNull();
  });

  it('Should trigger action on click', () => {
    const { getByText, queryByText } = render(<CustomButton {...props} />);
    expect(queryByText(`${props.title}: ${props.numberOfElements}`)).toBeTruthy();

    fireEvent.click(getByText(props.buttonText));
    expect(props.showElementProperties).toHaveBeenCalledTimes(1);
  });
});
