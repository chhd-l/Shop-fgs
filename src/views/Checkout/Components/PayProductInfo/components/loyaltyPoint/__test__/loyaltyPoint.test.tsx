import React from 'react';
import LoyaltyPoint from './index';
import stores from '@/store';

import renderWithProvider from '@/jest/renderWithProvider';
describe('EditCartBtn Test', () => {
  test('EditCartBtn Test', async () => {
    stores.checkoutStore.setEarnedPoint(100);
    renderWithProvider(<LoyaltyPoint />, { stores });
  });
});
