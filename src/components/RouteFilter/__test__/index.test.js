import React from 'react';
import RouteFilter from '../index';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';

const location = {
  pathname: 'asdas',
  key: 'asd'
};
const sessionItemRoyal = window.__.sessionItemRoyal;
describe('RouteFilter Test', () => {
  test('RouteFilter Test1', async () => {
    renderWithProvider(<RouteFilter location={location} />, {
      stores
    });
  });
});
