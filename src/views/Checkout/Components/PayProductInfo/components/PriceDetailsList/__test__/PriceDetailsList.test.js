import React from 'react';
import PriceDetailsList from '../PriceDetailsList';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
describe('PriceDetailsList Test', () => {
  test('PriceDetailsList Test', async () => {
    const configStore = {
      info: {
        serviceFeeFlag: 1
      },
      customTaxSettingOpenFlag: 1,
      enterPriceType: 'NO_TAX'
    };
    const checkoutStore = {
      serviceFeePrice: 0,
      loyaltyPointsPrice: ''
    };
    const paymentStoreNew = {
      curPayWayInfo: 1
    };
    const data = {
      totalPrice: '',
      taxFeePrice: '',
      subscriptionDiscountPrice: '',
      promotionVOList: [{ 1: 1 }],
      deliveryPrice: '',
      freeShippingDiscountPrice: '',
      freeShippingFlag: '',
      installMentParam: ''
    };
    render(
      <IntlProvider>
        <PriceDetailsList
          configStore={configStore}
          checkoutStore={checkoutStore}
          paymentStoreNew={paymentStoreNew}
          data={data}
        />
      </IntlProvider>
    );
  });
});
