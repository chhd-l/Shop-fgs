import React from 'react';
import CancelOrderForJp from '../index';
import stores from '@/store';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('@/views/Account/OrdersDetail/modules/cancelOrderModal', () => {
  return () => (
    <div
      data-testid="one"
      close={() => {}}
      handleClickCancel={() => {}}
      handleClickConfirm={() => {}}
    >
      CancelOrderSuccessModal
    </div>
  );
});
jest.mock('@/utils/GA', () => {
  return {
    myAccountActionPushEvent: jest.fn()
  };
});
describe('CancelOrderForJp Test', () => {
  test('CancelOrderForJp Test', async () => {
    window.__.env.REACT_APP_GA_COUNTRY = 'jp';
    const props = {
      details: {
        id: '123',
        canCancelOrderForJP: true
      }
    };
    renderWithProvider(<CancelOrderForJp {...props} />, {
      stores
    });
    const one = screen.getByTestId('one');
    fireEvent.click(one);
    const CancelOrderForJp_BTN = screen.getByTestId('CancelOrderForJp-BTN');
    fireEvent.click(CancelOrderForJp_BTN);
  });
});
