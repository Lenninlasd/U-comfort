import React from 'react';
import { CardForm } from './index';
import { shallow } from 'enzyme';

describe('<cardForm /> should sumbit', () => {
  it('should trigger submit event and change the route to equitments', () => {
    const submitForm = jest.fn();
    const mockHistory = { push: jest.fn() };

    const wrapper = shallow(<CardForm submitForm={submitForm} history={mockHistory} />);
    wrapper.find('button').simulate('click');

    expect(submitForm).toHaveBeenCalled();
    expect(mockHistory.push).toBeCalledWith('/equipment');
  });
});
