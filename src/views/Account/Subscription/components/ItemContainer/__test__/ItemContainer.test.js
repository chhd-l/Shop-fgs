import React from 'react';
import ItemContainer from '../ItemContainer';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import stores from '@/store';
import { Provider } from 'mobx-react';

jest.mock('react-intl', () => {
  return {
    FormattedMessage: ({ id, values, children }) => {
      let kkk = null;
      if (values && values?.val && values?.val?.props) {
        kkk = (
          <div
            data-testid={values?.val?.props['data-testid'] ?? ''}
            onClick={values?.val.props.onClick}
          ></div>
        );
      }
      return (
        <span>
          {id}
          {kkk}
          {children && children()}
        </span>
      );
    },
    injectIntl: (e) => e,
    intl: (e) => e,
    createIntlCache: (e) => e,
    createIntl: (e) => e,
    useIntl: () => {
      return {
        formatMessage: jest.fn()
      };
    }
  };
});

jest.mock('@/components/GoogleTagManager', () => {
  return () => <div>GoogleTagManager</div>;
});
jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});
jest.mock('@/components/Header', () => {
  return () => <div>Header</div>;
});
jest.mock('@/components/BannerTip', () => {
  return () => <div>BannerTip</div>;
});
jest.mock('@/components/SideMenu', () => {
  return () => <div>SideMenu</div>;
});
jest.mock('@/components/FrequencyMatch', () => {
  return () => <span>FrequencyMatch</span>;
});

jest.mock('@okta/okta-react', () => {
  const authState = {
    idToken: 'sdada',
    accessToken: {
      value: 'sdadad'
    },
    isAuthenticated: false
  };
  return {
    useOktaAuth: (e) => {
      return { authState, oktaAuth: jest.fn(), ...e };
    },
    withOktaAuth: (e) => e
  };
});

jest.mock('@/api/recommendation', () => {
  const originalModule = jest.requireActual('@/api/recommendation');
  return {
    __esModule: true,
    ...originalModule,
    getRecommendation: jest.fn(
      (products, customerId) =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            context: {
              recommendationGoodsInfoRels: [
                {
                  goodsInfos: [
                    {
                      selected: 'aaa',
                      goodsInfoId: 'aaa'
                    }
                  ],
                  goodsInfo: {
                    goodsInfoId: 'aaa',
                    goodsInfoNo: 21313132
                  },
                  goodsSpecDetails: {},
                  goodsSpecs: [],
                  goods: {
                    goodsId: 'sdajdhakkdjad'
                  }
                }
              ]
            },
            message: '操作に成功しました'
          });
        })
    ),
    saveShelterId: jest.fn(
      ({ countryCode, species }) =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            context: {
              breeds: [
                {
                  breedCode: 'american_curl_longhair',
                  localName: 'American Curl Longhair'
                },
                {
                  breedCode: 'serengeti',
                  localName: 'Serengeti'
                },
                {
                  breedCode: 'tiffanie',
                  localName: 'Tiffany'
                }
              ]
            },
            message: '操作に成功しました'
          });
        })
    )
  };
});

jest.mock('@/utils/request', () => {
  return {
    getRandom: () => {
      return 'dsadadasd';
    }
  };
});

const propsData = {
  subItem: {
    subscribeId: 'subscribeId',
    createTime: '2022-09-13',
    itemSpecLogoConf: {
      src: 'src',
      alt: 'alt'
    },
    goodsInfo: [
      {
        goodsPic: 'goodsPic',
        goodsName: 'goodsName',
        displayGoodsName: 'displayGoodsName',
        specText: 'specText',
        displaySubscribeNum: 2,
        periodTypeId: 'periodTypeId'
      }
    ]
  }
};

describe('Index Test', () => {
  window.dataLayer = [];

  test('test', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'jp';

    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <ItemContainer {...propsData} />
          </Router>
        </Provider>
      );
      // debug()
    });
  });

  test('test', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'jp';
    const data = {
      ...propsData,
      subItem: { ...propsData.subItem, subscribeStatus: '0' }
    };
    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <ItemContainer {...data} />
          </Router>
        </Provider>
      );
      // debug()
    });
  });

  test('test', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'jp';
    const data = {
      ...propsData,
      subItem: { ...propsData.subItem, subscribeStatus: '1' }
    };
    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <ItemContainer {...data} />
          </Router>
        </Provider>
      );
      // debug()
    });
  });
});
