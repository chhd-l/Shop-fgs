import React from 'react';
import LoyaltyPoint from '../index';
import { render, act, screen, fireEvent } from '@testing-library/react';
// import CheckoutStore from '@/store/checkoutStore';
import { IntlProvider } from 'react-intl';
describe('EditCartBtn Test', () => {
  test('EditCartBtn Test', async () => {
    const store = {
      checkoutStore: {
        earnedPoint: 0
      }
    };
    render(
      <IntlProvider locale="en" messages={locals}>
        <LoyaltyPoint checkoutStore={store} />
      </IntlProvider>
    );
  });
});
