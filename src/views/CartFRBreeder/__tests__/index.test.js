import React, { useState, useEffect } from 'react';
import CartFRBreeder, { CartFRBreeder as CC } from '../index.jsx';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
jest.mock('react-slick', () => {
  return {};
});

jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {}
  };
});

jest.mock('@/utils/utils', () => {
  const originalModule = jest.requireActual('@/utils/utils');

  return {
    __esModule: true,
    ...originalModule,
    getFrequencyDict: () => Promise.resolve({})
  };
});

describe('CartFRBreeder', () => {
  it('render test', () => {
    //const wrapper = mount(<CC />);
  });
});
