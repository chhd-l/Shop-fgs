import React from 'react';
import Cyber from '../index';
import stores from '@/store';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import renderWithProvider from '@/jest/renderWithProvider';
describe('Cyber Test', () => {
  test('Cyber Test', async () => {
    const props = {
      paymentStore: {
        supportPaymentMethods: [1, 2, 3]
      },
      curPayWayInfo: { paymentFormType: 'MICRO_FORM' }
    };
    stores.loginStore.changeIsLogin(true);
    renderWithProvider(<Cyber {...props} />, {
      stores
    });
    const showCyberList = screen.getByTestId('showCyberList');
    fireEvent.click(showCyberList);
    // const input = screen.getByTestId('input');
    // fireEvent.change(input, {
    //   target: { value: 'aaa' }
    // });
    // const CancelOrderForJp_BTN = screen.getByTestId('CancelOrderForJp-BTN');
    // fireEvent.click(CancelOrderForJp_BTN);
  });
});
