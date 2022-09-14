import React from 'react';
import Adyen3DForm from '../3d';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('@adyen/adyen-web', (n) => {
  let fn = {
    createFromAction: (c) => {
      return { mount: (b) => {} };
    }
  };
  console.info('test', n);
  return () =>
    Promise.resolve({
      createFromAction: () => {
        return {
          mount: () => {}
        };
      }
    });
});
jest.mock('@/lib/get-payment-conf', () => {
  return () =>
    Promise.resolve([
      {
        appId: 'ROYALCANIN_FRANCE_D2C',
        environment: 'test',
        locale: 'fr_FR',
        openPlatformSecret: 'test_Y5XPLQLX2RBVZN5PZ7X4VKOEEE2OLBDF',
        pspItemCode: 'adyen_credit_card',
        pspName: 'ADYEN',
        publicKey: ''
      }
    ]);
});
const mockAction = {
  data: {
    MD: 'azlka1hSTDVpOVo2UjhxRUtsVGw5Zz09IYqyo6r_ezP2u0DQdvTWad6Otu6aRzfEp8LGC6GTjme1Jbh56XD9F9KmeL8uB7fn_qZUTE8bJhO4aSXCDaWhNHidU8ivcRGUC6sTkBGqc_Hom5bySXHbo9kkRzVpiHMjVBMorz8CQFs_LR5vxE7NLk5Y_qTbNnrpuXZtsFWJJT5BMWM125nhYJRub_IDjpKZb9USc6NnD1TancDBN0LJQT-OpZBJcHuHXatXbTjOd07ZrNKyFjtsbmlEp2jmTDJtJWUpO9saW7ul_EW0AOZPhNkSsvY3JtUyLbS80p-tqx_RV6z043BIB8r7w9_r5NMp4yK2lWBhMqHOQQxIVEVG8u5o8SwedtEqlzfz79drHto0klzRX5KYuH0yTXiw3k84H49S0Q_SX_b-VgPXxxiJeU5pJA',
    PaReq:
      'eNpVUttygjAQ/RXrBxAIUpBZMxNRKzOVUry0fXKYmAoz3AzQqX59E8Ta5mnPnt3NydnAJhGcz9actYITWPG6jo98kB4mQ9eLzOh9ugzN3WbxFjl4SCCkET8R+OKiTsuCGJquYUA3KNsFS+KiIRCz09QPiGVgcwSoR5Bz4c/IhtdNmOeUndpUcEEZK9uiAXRloYhzTrZ0T70HN3r5oM8eDfxgv4ho4M33M+wB6kqgaxNngi0d0A1AKzKSNE1Vuwitk7LSRHmOMxYXaaF9CkCKB3RXGrYqquW87/RAXg3/ss0Sb72gl10WPe0Mf7Q6UnUmgFQFHOKGE6xjrI91e6A7rmm5hgmoy0OcKyFkvo0GhqnpUlmfgUpdRK/AMBXzNwNyAYIX7EzGtiOfc0PAv6uy4LJCGv0bA7rL9pbKbtZI70ZY+W092s5Yl5GtnO8INSWV7shrzW6MAoBUK+p3ivrdy+jfn/gBD6qy/A==',
    TermUrl:
      'https://stgwedding.royalcanin.com/fr/shop/api/Adyen3DSResult/STGRCFFR000012196'
  },
  method: 'POST',
  paymentData: `Ab02b4c0!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`,
  paymentMethodType: 'scheme',
  type: 'redirect',
  url: 'https://test.adyen.com/hpp/3d/validate.shtml'
};
const paymentStore = {
  curPayWayInfo: { code: '' }
};
describe('Adyen3DForm Test', () => {
  test('Adyen3DForm Test', async () => {
    const props = {
      action: mockAction,
      intl: {
        messages: {}
      },
      paymentStore
    };
    renderWithProvider(<Adyen3DForm {...props} />, { stores });
  });
});
