import React from 'react';
import { App } from './index';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<App /> shallow rendering', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
