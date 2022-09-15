import React from 'react';
import PromotionCodeText from '../promotionCodeText';
import { render, act, screen, fireEvent } from '@testing-library/react';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
describe('PromotionCodeText Test', () => {
  test('PromotionCodeText Test', async () => {
    const el = { marketingName: 100.123 };
    renderWithProvider(<PromotionCodeText el={el} />, { stores });
    const promotionCodeText1 = screen.getByTestId('promotionCodeText');
    fireEvent.mouseEnter(promotionCodeText1);
    fireEvent.mouseLeave(promotionCodeText1);
  });
});
