import React from 'react';
import stores from '@/store';
import PayInfoPreview from '../PayInfoPreview';
import { render, screen, fireEvent } from '@testing-library/react';

// selectDiscountWay,
//   convenienceStore,
//   email,
//   cardData,
//   paymentTypeCode,
//   buyWay
// import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('react-intl', () => {
  return {
    FormattedMessage: () => <p>1</p>,
    injectIntl: (e) => e
  };
});
const email = 'sdsad@dsad.com';
describe('PayInfoPreview Test', () => {
  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'payu'}
        email={email}
        cardData={{
          lastFourDeco: '213123',
          expirationDate: new Date(),
          holderNameDeco: 'dsada',
          brandDeco: 'dsdad'
        }}
        selectDiscountWay={'usePoint'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'payu_ru'}
        email={email}
        cardData={{
          lastFourDeco: '213123',
          expirationDate: new Date(),
          holderNameDeco: 'dsada',
          brandDeco: 'dsdad'
        }}
        selectDiscountWay={'usePoint'}
      />
    );
  });
  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'payu_tu'}
        email={email}
        cardData={{
          lastFourDeco: '213123',
          expirationDate: new Date(),
          holderNameDeco: 'dsada',
          brandDeco: 'dsdad'
        }}
        selectDiscountWay={'usePoint'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'adyen_credit_card'}
        email={email}
        cardData={{
          lastFourDeco: '213123',
          expirationDate: new Date(),
          holderNameDeco: 'dsada',
          brandDeco: 'dsdad'
        }}
        selectDiscountWay={'usePoint'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'pc_web'}
        cardData={{
          lastFourDeco: '213123',
          expirationDate: new Date(),
          holderNameDeco: 'dsada',
          brandDeco: 'dsdad'
        }}
        selectDiscountWay={'usePoint'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'pc_web'}
        cardData={{
          lastFourDeco: null,
          expirationDate: null,
          holderNameDeco: 'dsada',
          brandDeco: 'dsdad'
        }}
        selectDiscountWay={'dsadad'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'cod'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'adyen_paypal'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'adyen_point_of_sale'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'cash'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'adyen_moto'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'adyen_ideal'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'adyen_convenience_store'}
        selectDiscountWay={'usePoint'}
        buyWay={'once'}
      />
    );
  });
  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'adyen_convenience_store'}
        selectDiscountWay={'dsada'}
        buyWay={'once'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(<PayInfoPreview paymentTypeCode={'adyen_swish'} />);
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'cod_japan'}
        selectDiscountWay={'usePoint'}
      />
    );
  });
  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        paymentTypeCode={'cod_japan'}
        selectDiscountWay={'dsad'}
      />
    );
  });

  test('PayInfoPreview Test', async () => {
    render(
      <PayInfoPreview
        email={email}
        paymentTypeCode={''}
        selectDiscountWay={'usePoint'}
      />
    );
  });
});
