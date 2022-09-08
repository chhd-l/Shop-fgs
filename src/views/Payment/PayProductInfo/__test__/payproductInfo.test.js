import React from 'react';
import PayproductInfo from '../index';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {},
    FormattedMessage: () => <div>phraseapp</div>
  };
});

describe('PayproductInfo Test', () => {
  test('PayproductInfo Test', async () => {
    stores.checkoutStore.setEarnedPoint(100);
    renderWithProvider(
      <PayproductInfo
        data={[]}
        fixToHeader={false}
        style={{
          background: '#fff',
          maxHeight: '80vh'
        }}
        ref="payProductInfo"
        location={window.location}
        history={window.location.history}
        buyWay="once"
        sendPromotionCode={() => {}}
        promotionCode=""
        operateBtnVisible={true}
        onClickHeader={this.toggleMobileCart.bind(this, 'less')}
        headerIcon={<span className="rc-icon rc-down--xs rc-iconography" />}
        isCheckOut={true}
        welcomeBoxChange={(value) => {
          this.setState({ welcomeBoxValue: value });
        }}
      />,
      { stores }
    );
  });
});
