import React from 'react';
import RouteFilterHook from '../RouteFilterHook';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {},
    FormattedMessage: () => <div>phraseapp</div>
  };
});

describe('RouteFilterHook Test', () => {
  test('RouteFilterHook Test1', async () => {
    // stores.checkoutStore.setEarnedPoint(100);
    renderWithProvider(<RouteFilterHook />, { stores });
  });
});
