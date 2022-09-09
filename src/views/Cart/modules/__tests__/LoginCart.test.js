import React from 'react';
import { render } from '@testing-library/react';
import LoginCart from '../loginCart';

jest.mock('react-intl-phraseapp', () => {
  return {
    FormattedMessage: ({ id }) => <div>{id}</div>,
    injectIntl: (e) => e
  };
});

jest.mock('@/components/DistributeLink', () => {
  return {
    DistributeHubLinkOrATag: (e) => e
  };
});

jest.mock('mobx-react', () => {
  return {
    inject: () => {
      return (e) => e;
    },
    observer: (e) => e
  };
});

jest.mock('react-skeleton-loader', () => {
  return () => <div>Skeleton</div>;
});

jest.mock('@/components/Header', () => {
  return () => <div>Header</div>;
});

jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});

jest.mock('@/components/LoginButton', () => {
  return () => <div>LoginButton</div>;
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }) => <div>{children}</div>
  };
});

jest.mock('@/utils/utils', () => {
  return {
    formatMoney: () => 'formatMoney',
    getFrequencyDict: () => Promise.resolve([{}]),
    distributeLinktoPrecriberOrPaymentPage: () => Promise.resolve('/'),
    unique: (e) => e,
    getDeviceType: (e) => e,
    handleRecommendation: () => {
      return {};
    },
    isShowMixFeeding: () => false,
    optimizeImage: () => '',
    setSeoConfig: () =>
      Promise.resolve({
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      })
  };
});

jest.mock('@/utils/GA', () => {
  return {
    GAInitLogin: () => {},
    GAInitUnLogin: () => {},
    GACartScreenLoad: (callback) => {
      callback();
    },
    GACartChangeSubscription: () => {}
  };
});

jest.mock('@/api/details', () => {
  return {
    getMixFeedings: () => Promise.resolve({ context: [] })
  };
});

jest.mock('@/api/cart', () => {
  return {
    getGoodsRelationBatch: () =>
      Promise.resolve({
        context: {
          goods: []
        }
      }),
    valetGuestMiniCars: () =>
      Promise.resolve({
        context: {
          goodsList: []
        }
      }),
    updateBackendCart: () =>
      Promise.resolve({
        context: {
          goodsList: []
        }
      }),
    deleteItemFromBackendCart: () => Promise.resolve({}),
    switchSize: () => Promise.resolve({})
  };
});

jest.mock('@/views/Payment/PayProductInfo', () => {
  return () => <div>PayProductInfo</div>;
});

jest.mock('@/components/Loading', () => {
  return () => <div>Loading</div>;
});

jest.mock('lodash/findIndex', () => {
  return () => 0;
});

jest.mock('lodash/find', () => {
  return () => {};
});

jest.mock('@/components/BannerTip', () => {
  return () => <div>BannerTip</div>;
});

jest.mock('react-lazyload', () => {
  return ({ children }) => <div>{children}</div>;
});

jest.mock('../../components/SubscriptionSelection', () => {
  return () => <div>SubscriptionSelection</div>;
});

jest.mock('../../components/OneOffSelection', () => {
  return () => <div>OneOffSelection</div>;
});

jest.mock('../../components/ClubSelection', () => {
  return () => <div>ClubSelection</div>;
});

jest.mock('../../components/ClubGiftBanner', () => {
  return () => <div>ClubGiftBanner</div>;
});

jest.mock('@/components/Product', () => {
  return {
    QuantityPicker: () => <div>QuantityPicker</div>,
    ProductCarousel: () => <div>ProductCarousel</div>
  };
});

jest.mock('uuid', () => {
  return {
    v4: () => '111'
  };
});

jest.mock('react-helmet', () => {
  return {
    Helmet: () => <div>Helmet</div>
  };
});

jest.mock('../../components/GiftList/index.tsx', () => {
  return () => <div>GiftList</div>;
});

jest.mock('../../components/CartSurvey', () => {
  return () => <div>CartSurvey</div>;
});

jest.mock('../../components/MixFeedingBox/index.tsx', () => {
  return () => <div>MixFeedingBox</div>;
});

jest.mock('@/components/Message', () => {
  return {
    ErrorMessage: () => <div>ErrorMessage</div>
  };
});

jest.mock('../../components', () => {
  return {
    PriceDetailsList: () => <div>PriceDetailsList</div>
  };
});

jest.mock('@/utils/GA/cart', () => {
  return {
    GACartButtonClick: () => {},
    GACartRecommendedProductClick: () => {}
  };
});

jest.mock('classnames', () => {
  return () => 'cn';
});

jest.mock('@/framework/cart', () => {
  return {
    AddItemsVisitor: () => Promise.resolve()
  };
});

jest.mock('@/framework/product', () => {
  return {
    handleSizeList: () => []
  };
});

jest.mock('@/components/Common', () => {
  return {
    Button: () => <div>Button</div>,
    Popover: ({ children }) => <div>{children}</div>
  };
});

jest.mock('@/api/user', () => {
  return {
    getCustomerInfo: () =>
      Promise.resolve({
        context: {}
      })
  };
});

jest.mock('@/lib/url-utils', () => {
  return {
    funcUrl: () => 'ss'
  };
});

jest.mock('mobx', () => {
  return {
    toJS: () => [],
    reaction: () => {
      return () => {};
    }
  };
});

jest.mock('@/api/consent', () => {
  return {
    getAppointPageSelected: () =>
      Promise.resolve({
        context: {
          requiredList: []
        }
      })
  };
});

jest.mock(
  '../../../Details/components/OSSReceiveBackNotificationContent',
  () => {
    return () => <div>OssReceiveBackNotificationContent</div>;
  }
);

const propsData = {
  checkoutStore: {
    promotionCode: '1',
    cartData: [],
    updateUnloginCart: () => {},
    loginCartData: []
  },
  history: {
    location: {
      state: {}
    }
  },
  loginStore: {
    isLogin: true,
    setUserInfo: () => {}
  },
  configStore: {
    info: {
      notifyMeStatus: '1',
      skuLimitThreshold: {},
      storeVO: {
        defaultSubscriptionClubFrequencyId: false
      }
    }
  },
  clinicStore: {
    get: () => '1'
  },
  intl: {
    get: () => '1'
  }
};

class WrapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.ref.state.productList = [{ selected: true, stock: true }];
    this.ref.totalNum;

    this.ref.handleLoginCartDataUpdates();
    this.ref.handleNotifyMeStatus();
  }

  setRef = (ref) => {
    this.ref = ref;
  };

  render() {
    return <LoginCart ref={this.setRef} {...this.props} />;
  }
}

test('UnLoginCart', async () => {
  window.__.sessionItemRoyal.set('rc-iframe-from-storepotal', 'true');
  await render(<WrapComponent {...propsData} />);
});
