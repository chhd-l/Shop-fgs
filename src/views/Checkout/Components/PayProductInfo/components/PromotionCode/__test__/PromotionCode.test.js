import React from 'react';
import PromotionCode from '../PromotionCode';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
describe('PromotionCode Test', () => {
  test('PromotionCode Test', async () => {
    await stores.checkoutStore.setPromotionCode('100');
    renderWithProvider(<PromotionCode />, { stores });
    const btn = screen.getByTestId('PromotionApplyBtn');
    fireEvent.click(btn, {});
  });
  debugger;
  test('PromotionCode Test2', async () => {
    await stores.checkoutStore.setPromotionCode('');
    // await stores.discount.setPromotionCode('');
    renderWithProvider(<PromotionCode />, { stores });
    const inpchange = screen.getByTestId('inpchange');
    fireEvent.change(inpchange, { target: { value: 'DFFFF-PHA7L8H9UR' } });
  });
  // test('PromotionCode Test3', async () => {
  //   render(<PromotionCode />);

  // });
});
