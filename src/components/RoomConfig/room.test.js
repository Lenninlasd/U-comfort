import { RoomForm } from './index';
import { shallow } from 'enzyme';
import React from 'react';

describe('Test Room component', () => {
  const props = {
    depth: 0,
    height: 0,
    width: 0,
    numberOfLights: 0,
    numberOfPeople: 0,
    wattsPerSquaredFoot: 0,
    actividadRecinto: '',
    setSizeChange: jest.fn(),
    setRoomChange: jest.fn()
  };

  it('Should trigger action on click', () => {
    const wrapper = shallow(<RoomForm {...props} />);

    wrapper.find('input#depth').simulate('change');
    wrapper.find('input#width').simulate('change');
    wrapper.find('input#height').simulate('change');

    wrapper.find('input#numberOfPeople').simulate('change');
    wrapper.find('input#numberOfLights').simulate('change');
    wrapper.find('select#actividadRecinto').simulate('change');
    wrapper.find('select#tipoRecinto').simulate('change');
    wrapper.find('select#amountOfEquipment').simulate('change');

    expect(props.setSizeChange.mock.calls.length).toBe(3);
    expect(props.setRoomChange.mock.calls.length).toBe(5);
  });
});
