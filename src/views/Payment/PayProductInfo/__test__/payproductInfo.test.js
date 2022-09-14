import React from 'react';
import PayproductInfo from '../index';
import stores from '@/store';
import renderWithProvider from '@/jest/renderWithProvider';
import { render } from '@testing-library/react';
import { Provider } from 'mobx-react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
jest.mock('@/utils/utils', () => {
  return {
    formatMoney: jest.fn(),
    getFrequencyDict: jest.fn(),
    getClubLogo: jest.fn(),
    formatDate: () => {
      return '2021-12-30';
    },
    sortPriceList: () => {
      return [
        'totalPrice',
        'consumptionTax', // 日本税费显示, 仅显示不参与总价计算
        'subscriptionDiscountPrice', // 订阅折扣
        'marketPrice',
        'promotionCode',
        'deliveryPrice',
        'freeShippingDiscountPrice', // 运费折扣 俄罗斯
        'estimatedTax',
        'installMentAdditionalFee', // 土耳其分期费
        'serviceFee', // 日本服务费
        'pointDiscount' // 日本积分折扣,
      ];
    }
  };
});
jest.mock('react-intl-phraseapp', () => {
  return {
    injectIntl: () => {},
    FormattedMessage: () => <div>phraseapp</div>
  };
});
jest.mock('@/store', () => {
  return {
    checkoutStore: {
      cartData: [
        {
          goodsInfoId: '',
          goodsNum: '',
          goodsInfoFlag: '',
          periodTypeId: '',
          invalid: false,
          recommendationInfos: [],
          recommendationId: '',
          recommendationName: '',
          goodsCategory: '',
          petsId: '',
          questionParams: '',
          prefixFn: '',
          sizeList: [{ selected: true }]
        }
      ],
      removeCartData: jest.fn()
    },
    loginStore: {},
    configStore: {},
    paymentStore: {},
    clinicStore: {}
  };
});

describe('PayproductInfo Test', () => {
  test('PayproductInfo Test', async () => {
    // stores.checkoutStore.setEarnedPoint(100);
    const history = createMemoryHistory();
    render(
      <Provider {...stores}>
        <PayproductInfo
          data={[]}
          fixToHeader={false}
          style={{
            background: '#fff',
            maxHeight: '80vh'
          }}
          // ref="payProductInfo"
          location={window.location}
          history={window.location.history}
          buyWay="once"
          sendPromotionCode={() => {}}
          promotionCode=""
          operateBtnVisible={true}
          onClickHeader={() => {}}
          headerIcon={<span className="rc-icon rc-down--xs rc-iconography" />}
          isCheckOut={true}
          welcomeBoxChange={() => {}}
        />
      </Provider>
    );
  });
});
