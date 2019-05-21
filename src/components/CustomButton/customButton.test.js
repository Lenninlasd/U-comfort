import { CustomButton } from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('Test custon button', () => {
  const props = {
    title: 'title',
    buttonText: 'buttonText',
    elementType: 'elementType',
    src: './img.svg',
    numberOfElements: 2,
    showElementProperties: jest.fn()
  };

  it('Should no render the button if there is no elementType', () => {
    const wrapper = shallow(<CustomButton {...props} elementType="" />);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('Should trigger action on click', () => {
    const wrapper = shallow(<CustomButton {...props} />);

    expect(wrapper.find('strong').text()).toBe(`${props.title}: ${props.numberOfElements}`);

    wrapper.find('button').simulate('click');
    expect(props.showElementProperties.mock.calls.length).toBe(1);
  });
});
