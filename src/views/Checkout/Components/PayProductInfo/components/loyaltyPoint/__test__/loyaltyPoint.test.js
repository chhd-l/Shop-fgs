import React from 'react';
import LoyaltyPoint from '../index';
import { render, act, screen, fireEvent } from '@testing-library/react';
// import CheckoutStore from '@/store/checkoutStore';
// import { useDynamicLanguage } from '@/framework/common';
import { IntlProvider } from 'react-intl';
describe('LoyaltyPoint Test', () => {
  test('LoyaltyPoint Test', async () => {
    const store = {
      checkoutStore: {
        earnedPoint: 0
      }
    };
    // const [loading, dynamicLanguage] = useDynamicLanguage();
    render(
      <IntlProvider>
        <LoyaltyPoint checkoutStore={store} />
      </IntlProvider>
    );
  });
});
