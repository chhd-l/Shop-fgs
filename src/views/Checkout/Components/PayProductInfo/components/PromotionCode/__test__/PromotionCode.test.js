import React from 'react';
import PromotionCode from '../PromotionCode';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
import userEvent from '@testing-library/user-event';

// jest.mock('../webapi', () => {
//   const originalModule = jest.requireActual('../webapi');

//   return {
//     __esModule: true,
//     ...originalModule,
//     customerEmailExist: jest.fn(
//       (email) =>
//         new Promise((resolve) =>
//           resolve({ res: { code: 'K-000000', context: email === 'aa@bb.cc', message: '' } })
//         )
//     ),
//     customerSaveEmail: jest.fn(
//       (customerId, email) =>
//         new Promise((resolve) =>
//           resolve({ res: { code: 'K-000000', context: email === 'aa2@bb.cc', message: '' } })
//         )
//     )
//   };
// });
debugger;
describe('PromotionCode Test', () => {
  test('PromotionCode Test', async () => {
    await stores.checkoutStore.setPromotionCode('');
    await stores.loginStore.changeIsLogin(false);
    renderWithProvider(<PromotionCode />, { stores });
    const btn = screen.getByTestId('PromotionApplyBtn');
    fireEvent.click(btn, {});
  });

  test('PromotionCode Test2', async () => {
    const sendPromotionCode = () => {};
    await stores.checkoutStore.setPromotionCode('100');
    await stores.loginStore.changeIsLogin(true);
    renderWithProvider(
      <PromotionCode sendPromotionCode={sendPromotionCode} />,
      { stores }
    );
    fireEvent.change(screen.getByTestId('inpchange'), {
      target: { value: 'IS1JRVT221' }
    });
    const btn = screen.getByTestId('PromotionApplyBtn');
    fireEvent.click(btn, {});
    // userEvent.click(screen.getByTestId('btn'));
  });
  // test('PromotionCode Test3', async () => {

  // });
});
