import { Roof } from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('Test Roof component', () => {
  const props = {
    roof: { material: '' },
    handleChange: jest.fn(),
    changeColorK: jest.fn()
  };

  it('Should trigger action on click', () => {
    const wrapper = shallow(<Roof {...props} />);

    wrapper.find('select#typeofRoof').simulate('change');
    wrapper.find('select#correcion_color_K').simulate('change');
    expect(props.handleChange.mock.calls.length).toBe(1);
    expect(props.changeColorK.mock.calls.length).toBe(1);
  });
});
