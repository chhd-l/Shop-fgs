import React from 'react';
import LoyaltyPoint from '../components/loyaltyPoint';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {},
    FormattedMessage: () => <div>phraseapp</div>
  };
});

describe('LoyaltyPoint Test', () => {
  test('LoyaltyPoint Test', async () => {
    stores.checkoutStore.setEarnedPoint(100);
    renderWithProvider(<LoyaltyPoint />, { stores });
  });
});
