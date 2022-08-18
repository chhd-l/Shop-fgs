import React from 'react';
import stores from '@/store';
import OSSReceiveBackNotificationContent from '../index';
import { render, screen, fireEvent } from '@testing-library/react';

// import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('react-intl', () => {
  return {
    FormattedMessage: () => <p>1</p>,
    injectIntl: (e) => e
  };
});

const details = { goodsId: 'ssss' };
describe('OSSReceiveBackNotificationContent Test', () => {
  // beforeEach(() => {
  //   window.__.env = { REACT_APP_COUNTRY: 'ru', ...window.__.env };
  // })
  test('OSSReceiveBackNotificationContent Test', async () => {
    // window.__.env = { REACT_APP_COUNTRY: 'ru', ...window.__.env };
    window.__.env.REACT_APP_COUNTRY = 'ru';
    render(
      <OSSReceiveBackNotificationContent
        visible={true}
        details={details}
        isLogin={true}
        selectedSpecItem={{
          stock: 2
        }}
        notifyMeConsent={[{ a: 111 }]}
      />
    );
  });

  test('OSSReceiveBackNotificationContent Test', async () => {
    window.__.env.REACT_APP_COUNTRY = 'jp';
    render(
      <OSSReceiveBackNotificationContent
        visible={true}
        details={details}
        isLogin={false}
        selectedSpecItem={{
          stock: 2
        }}
        notifyMeConsent={[]}
      />
    );
  });
});
