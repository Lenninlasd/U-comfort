import BackButton, { SaveAndCancel } from './index';
import React from 'react';
import { shallow } from 'enzyme';

describe('Test SaveAndCancel component', () => {
  it('should trigger callbacks', () => {
    const props = { handleAccept: jest.fn(), handleCancel: jest.fn() };
    const wrapper = shallow(<SaveAndCancel {...props} />);

    wrapper.find('button[name="accept"]').simulate('click');
    wrapper.find('button[name="cancel"]').simulate('click');

    expect(props.handleAccept.mock.calls.length).toBe(1);
    expect(props.handleCancel.mock.calls.length).toBe(1);
  });
});

describe('Test BackButton component', () => {
  it('uses Router for logout functionality', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<BackButton onClick={onClick} />);
    wrapper.find('button').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
