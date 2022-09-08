// import React from 'react';
// import AddressList from '../AddressList';
// import stores from '@/store';
// import renderWithProvider from '@/jest/renderWithProvider';

// jest.mock('@/lib/get-payment-conf', () => {
//   return () =>
//     Promise.resolve([
//       {
//         appId: 'ROYALCANIN_FRANCE_D2C',
//         environment: 'test',
//         locale: 'fr_FR',
//         openPlatformSecret: 'test_Y5XPLQLX2RBVZN5PZ7X4VKOEEE2OLBDF',
//         pspItemCode: 'adyen_credit_card',
//         pspName: 'ADYEN',
//         publicKey: ''
//       }
//     ]);
// });

// describe('AddressList Test', () => {
//   test('AddressList Test', async () => {
//     const props = {
//       action: mockAction,
//       intl: {
//         messages: {}
//       },
//       paymentStore
//     };
//     renderWithProvider(<AddressList {...props} />, { stores });
//   });
// });
