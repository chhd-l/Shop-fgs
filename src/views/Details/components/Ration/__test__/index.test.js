import React from 'react';
import Index from '../index';
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

jest.mock('@/utils/utils', () => {
  return {
    getRation: jest.fn(
      ({ countryCode, species }) =>
        new Promise((resolve, reject) => {
          return resolve({
            code: 'K-000000',
            context: {
              rationResponseItems: [
                {
                  weight: 'sda',
                  weightUnit: 'Kg'
                }
              ]
            }
          });
        })
    ),
    getClubFlag: () => {
      return true;
    },
    getDeviceType: () => {
      return 'H5';
    }
  };
});
const propsData = {
  setState: jest.fn(),
  goodsNo: 'dsadadad'
};

describe('Index Test', () => {
  window.dataLayer = [];

  test('test jp', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';
    window.__.sessionItemRoyal.set(
      'pf-result',
      JSON.stringify({ queryParams: {} })
    );
    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
      // debug()
    });
  });
  test('test jp', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';
    localStorage.setItem('pfls', JSON.stringify({ lastQuery: {} }));
    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
    });
  });

  test('test ru', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'ru';
    window.__.env.REACT_APP_RU_LOCALIZATION_ENABLE = true;
    localStorage.setItem('pfls', JSON.stringify({ lastQuery: {} }));
    await act(async () => {
      const { debug } = await render(
        <Provider {...stores}>
          <Router history={{ ...history }}>
            <Index {...propsData} />
          </Router>
        </Provider>
      );
    });
  });
});
