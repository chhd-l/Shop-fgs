import React from 'react';
import CartFRBreeder from '../index.jsx';
//import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
// console.info(' jest.mock', jest.mock);
// jest.mock('../Cart', () => () => <div></div>);
describe('CartFRBreeder', () => {
  it('render test', () => {
    const wrapper = shallow(<CartFRBreeder />);
  });
});
