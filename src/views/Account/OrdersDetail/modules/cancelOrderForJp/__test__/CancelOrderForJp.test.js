import React from 'react';
import CancelOrderForJp from '../index';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';

jest.mock('src/views/Account/OrdersDetail/modules/CancelOrderModal', () => {
  return () => <div>CancelOrderModal</div>;
});
jest.mock(
  'src/views/Account/OrdersDetail/modules/CancelOrderSuccessModal',
  () => {
    return () => <div>CancelOrderSuccessModal</div>;
  }
);
describe('CancelOrderForJp Test', () => {
  test('CancelOrderForJp Test', async () => {
    const props = {
      details: {
        canCancelOrderForJP: true
      }
    };
    renderWithProvider(<CancelOrderForJp {...props} />, { stores });
  });
});
