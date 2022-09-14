import React from 'react';
import Register from '../index';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import stores from '@/store';
import { Provider } from 'mobx-react';

jest.mock('react-intl', () => {
  return {
    FormattedMessage: ({ id, values }) => {
      let kkk = null;
      if (values && values?.val && values?.val?.props) {
        kkk = (
          <div
            data-testid={values?.val?.props['data-testid'] ?? ''}
            onClick={values?.val.props.onClick}
          ></div>
        );
      }
      // console.log('kkk', kkk)
      return (
        <span>
          {id}
          {kkk}
        </span>
      );
    },
    injectIntl: (e) => e,
    intl: (e) => e,
    createIntlCache: (e) => e,
    createIntl: (e) => e
  };
});

jest.mock('@/components/Footer', () => {
  return () => <div>Footer</div>;
});

jest.mock('@/components/GoogleTagManager', () => {
  return () => <div>GoogleTagManager</div>;
});

jest.mock('../addEventListener', () => {
  return {
    addEventListenerArr: [
      { id: 'tr_consent_c', modal: 'fullScreenModalC' },
      { id: 'tr_consent_d', modal: 'fullScreenModalD' },
      { id: 'tr_consent_tc', modal: 'fullScreenModalTC' },
      { id: 'tr_consent_pm', modal: 'fullScreenModalPM' },
      { id: 'tr_consent_opt_email', modal: 'fullScreenModalOptEmail' }
    ]
  };
});

jest.mock('@/api/consent', () => {
  const originalModule = jest.requireActual('@/api/consent');
  return {
    __esModule: true,
    ...originalModule,
    getStoreOpenConsentList: jest.fn(
      ({}) =>
        new Promise((resolve) =>
          resolve({
            code: 'K-000000',
            message: '操作に成功しました',
            context: {
              optionalList: [
                {
                  id: 946,
                  parentId: null,
                  storeId: 123457919,
                  consentId: 'cb90bbbb-95a5-444e-8ec8-e4954ea76bb1',
                  consentCode: 'b6d4ab67-3df5-45a5-9927-0765d07fc30b',
                  consentType: 'Email in',
                  consentCategory: 'Consumer',
                  filedType: 'Optional',
                  consentPage: 'Landing page,check out',
                  languageTypeId: 55146,
                  consentTitleType: 'Content',
                  consentTitle: '<p>ロイヤルカナン</p>',
                  consentVersion: '10',
                  consentDesc: 'RC_DF_JP_MY_ROYAL_CANIN_B2C_OPT_MAIL_SMS',
                  createBy: '8a70815b7e53b407017e61ffdce000c9',
                  createTime: '2022-03-07 03:03:02.000',
                  updateBy: '8a70815b7e53b407017e61ffdce000c9',
                  updateTime: '2022-07-21 03:15:06.000',
                  sort: 1,
                  deleteBy: null,
                  deleteFlag: 0,
                  deleteTime: null,
                  openFlag: 1,
                  pushOktaFlag: 1,
                  consentGroup: 'default',
                  communicationType: 'email',
                  sendEmailFlag: 1,
                  consentRegisterTitle: null,
                  consentItemVersion: 3,
                  selectedFlag: null,
                  detailList: []
                },
                {
                  id: 947,
                  parentId: null,
                  storeId: 123457919,
                  consentId: '55f2b055-fff2-438b-aaf5-1bc09d8070fb',
                  consentCode: 'b6d4ab67-3df5-45a5-9927-0765d07fc30b',
                  consentType: '0',
                  consentCategory: 'Consumer',
                  filedType: 'Optional',
                  consentPage: 'Landing page,check out',
                  languageTypeId: 55146,
                  consentTitleType: 'Content',
                  consentTitle: '<p>マースペットケアと関連会社</p>',
                  consentVersion: '10',
                  consentDesc:
                    'MARS_PETCARE_JP_MY_ROYAL_CANIN_B2C_OPT_MAIL_SMS',
                  createBy: '8a70815b7e53b407017e61ffdce000c9',
                  createTime: '2022-03-07 03:04:38.000',
                  updateBy: '8a70815b7e53b407017e61ffdce000c9',
                  updateTime: '2022-06-17 08:23:15.000',
                  sort: 2,
                  deleteBy: null,
                  deleteFlag: 0,
                  deleteTime: null,
                  openFlag: 1,
                  pushOktaFlag: 1,
                  consentGroup: 'default',
                  communicationType: null,
                  sendEmailFlag: null,
                  consentRegisterTitle: null,
                  consentItemVersion: 2,
                  selectedFlag: null,
                  detailList: []
                },
                {
                  id: 965,
                  parentId: null,
                  storeId: 123457919,
                  consentId: 'a14ebcb5-da3d-4467-bd19-91239c9611b7',
                  consentCode: 'b6d4ab67-3df5-45a5-9927-0765d07fc30b',
                  consentType: 'Email in',
                  consentCategory: 'Consumer',
                  filedType: 'Optional',
                  consentPage: 'Landing page,check out',
                  languageTypeId: 55146,
                  consentTitleType: 'Content',
                  consentTitle:
                    '<p>上記に加え、私は「マースのプライバシーに関する声明」に記載されている目的を達成するために、私の個人情報が外国に提供されることに同意します</p>',
                  consentVersion: '10',
                  consentDesc: 'RC-DF_JP_MY-ROYAL-CANIN_B2C_TRANSFER-DATA',
                  createBy: '8a70815b7e53b407017e61ffdce000c9',
                  createTime: '2022-03-07 03:08:53.000',
                  updateBy: '8a70815b7e53b407017e61ffdce000c9',
                  updateTime: '2022-06-17 08:23:15.000',
                  sort: 4,
                  deleteBy: null,
                  deleteFlag: 0,
                  deleteTime: null,
                  openFlag: 1,
                  pushOktaFlag: 1,
                  consentGroup: 'default',
                  communicationType: null,
                  sendEmailFlag: null,
                  consentRegisterTitle: null,
                  consentItemVersion: 1,
                  selectedFlag: null,
                  detailList: []
                }
              ],
              requiredList: [
                {
                  id: 949,
                  parentId: null,
                  storeId: 123457919,
                  consentId: 'a2b0bb30-6235-4967-aa18-ad58dc00fd52',
                  consentCode: 'b6d4ab67-3df5-45a5-9927-0765d07fc30b',
                  consentType: 'Email in',
                  consentCategory: 'Consumer',
                  filedType: 'Required',
                  consentPage: 'Landing page,check out',
                  languageTypeId: 55146,
                  consentTitleType: 'Content',
                  consentTitle:
                    '<p><a href="https://shopsit.royalcanin.com/jp/general-terms-conditions" target="_blank" style="background-color: rgb(255, 255, 255); font-size: 14px;">利用规约</a>に同意する</p>',
                  consentVersion: '10',
                  consentDesc: 'RC_DF_JP_MY_ROYAL_CANIN_B2C_TC',
                  createBy: '8a70815b7e53b407017e61ffdce000c9',
                  createTime: '2022-03-07 03:08:53.000',
                  updateBy: '8a70815b7e53b407017e61ffdce000c9',
                  updateTime: '2022-06-22 05:01:53.000',
                  sort: 0,
                  deleteBy: null,
                  deleteFlag: 0,
                  deleteTime: null,
                  openFlag: 1,
                  pushOktaFlag: 1,
                  consentGroup: 'default',
                  communicationType: null,
                  sendEmailFlag: null,
                  consentRegisterTitle: null,
                  consentItemVersion: 2,
                  selectedFlag: null,
                  detailList: []
                }
              ],
              customerDetailVO: null
            },
            defaultLocalDateTime: '2022-09-08 23:38:18.532'
          })
        )
    ),
    userBindConsent: jest.fn(
      ({}) =>
        new Promise((resolve) =>
          resolve({
            code: 'K-000000',
            message: '操作に成功しました',
            defaultLocalDateTime: '2022-09-08 23:38:18.532'
          })
        )
    )
  };
});

jest.mock('@/api/user', () => {
  const originalModule = jest.requireActual('@/api/user');
  return {
    __esModule: true,
    ...originalModule,
    oktaRegister: jest.fn(
      ({
        storeId,
        customerPassword,
        customerAccount,
        customerName,
        firstName,
        lastName,
        phoneticFirstName,
        phoneticLastName
      }) =>
        new Promise((resolve) =>
          resolve({
            code: 'K-000000',
            message: '操作に成功しました',
            context: {
              customerDetail: {},
              oktaSessionToken: 'ssdadad',
              token: 'dsadad',
              customerId: 'sdadadad'
            }
          })
        )
    )
  };
});

jest.mock('@/api/recommendation', () => {
  const originalModule = jest.requireActual('@/api/recommendation');
  return {
    __esModule: true,
    ...originalModule,
    saveShelterId: jest.fn(
      ({ shelterId, customerId, prescriberType }) =>
        new Promise((resolve) =>
          resolve({
            code: 'K-000000',
            message: '操作に成功しました'
          })
        )
    )
  };
});

describe('Register Index Test', () => {
  window.dataLayer = [];
  test('Register test1 nl', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'nl';
    // let div = document.createElement('div');
    // div.id = 'wrap';
    // document.getElementsByTagName('body')[0].appendChild(div);

    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
          />
        </Router>
      </Provider>
    );
    window.resizeTo(800, 800);
    // debug();
  });

  test('Register test2 uk', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'uk';

    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );

    const register_name = screen.getByTestId('register_name');
    await userEvent.type(register_name, '       ');
    const ChaChaIcon_name = screen.getByTestId('ChaChaIcon_name');
    await userEvent.click(ChaChaIcon_name);
  });

  test('Register test2 tr', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'tr';
    window.__.env.REACT_APP_FGS_SELF_LOGIN = '1';
    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            history={{
              push: jest.fn()
            }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );
    const registerHaveAccount = screen.getByTestId('registerHaveAccount');
    await userEvent.click(registerHaveAccount);
    let div = document.createElement('div');
    div.id = 'tr_consent_tc';
    document.getElementsByTagName('body')[0].appendChild(div);
    await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );
  });

  test('Register test2 jp1', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';

    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );
    const jpgologinBtn = screen.getByTestId('jpgologin');
    await userEvent.click(jpgologinBtn);
  });
  test('Register test2 jp2', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';

    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );
    // debug();
    const goToAccount = screen.getByTestId('goToAccount');
    await userEvent.click(goToAccount);
  });

  test('Register test2 jp3', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';

    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );
    const register_lastname = screen.getByTestId('register_lastname');
    await userEvent.type(register_lastname, '                      ');
    const register_lastname_ChaChaIcon = screen.getByTestId(
      'register_lastname_ChaChaIcon'
    );
    await userEvent.click(register_lastname_ChaChaIcon);

    const register_firstname = screen.getByTestId('register_firstname');
    await userEvent.type(register_firstname, '            ');
    const register_firstname_ChaChaIcon = screen.getByTestId(
      'register_firstname_ChaChaIcon'
    );
    await userEvent.click(register_firstname_ChaChaIcon);

    const register_phoneticlastname = screen.getByTestId(
      'register_phoneticlastname'
    );
    await userEvent.type(register_phoneticlastname, '            ');
    const phoneticLastName_ChaChaIcon = screen.getByTestId(
      'phoneticLastName_ChaChaIcon'
    );
    await userEvent.click(phoneticLastName_ChaChaIcon);

    const register_phoneticfirstname = screen.getByTestId(
      'register_phoneticfirstname'
    );
    await userEvent.type(register_phoneticfirstname, '            ');
    const phoneticFirstName_ChaChaIcon = screen.getByTestId(
      'phoneticFirstName_ChaChaIcon'
    );
    await userEvent.click(phoneticFirstName_ChaChaIcon);

    const register_email = screen.getByTestId('register_email');
    await userEvent.type(register_email, 'sdkjjdsak');
    const email_ChaChaIcon = screen.getByTestId('email_ChaChaIcon');
    await userEvent.click(email_ChaChaIcon);

    const register_password = screen.getByTestId('register_password');
    await userEvent.type(register_password, 'sdk');
    const passwordInputType_iconeye = screen.getByTestId(
      'passwordInputType_iconeye'
    );
    await userEvent.click(passwordInputType_iconeye);
    const passwordInputType_btn = screen.getByTestId('passwordInputType_btn');
    await userEvent.click(passwordInputType_btn);
    const ChaChaIcon_password = screen.getByTestId('ChaChaIcon_password');
    await userEvent.click(ChaChaIcon_password);
    const register_submit_btn = screen.getByTestId('register_submit_btn');
    await userEvent.click(register_submit_btn);
  });

  test('Register test2 jp4', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'jp';
    window.__.env.REACT_APP_FGS_SELF_REGISTER = '1';

    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );
    const register_lastname = screen.getByTestId('register_lastname');
    await userEvent.type(register_lastname, 'アカウントをお持ちの');

    const register_firstname = screen.getByTestId('register_firstname');
    await userEvent.type(register_firstname, 'アカウントをお持ちの');

    const register_phoneticlastname = screen.getByTestId(
      'register_phoneticlastname'
    );
    await userEvent.type(register_phoneticlastname, 'カウント');

    const register_phoneticfirstname = screen.getByTestId(
      'register_phoneticfirstname'
    );
    await userEvent.type(register_phoneticfirstname, 'カウント');

    const register_email = screen.getByTestId('register_email');
    await userEvent.type(register_email, 'dsadh@dsad.com');

    const register_password = screen.getByTestId('register_password');
    await userEvent.type(register_password, '123456==qQ');
    const passwordInputType_iconeye = screen.getByTestId(
      'passwordInputType_iconeye'
    );
    await userEvent.click(passwordInputType_iconeye);
    const passwordInputType_btn = screen.getByTestId('passwordInputType_btn');
    await userEvent.click(passwordInputType_btn);

    const consent_required = screen.getAllByTestId('consent_required');
    consent_required.forEach(async (item) => {
      await userEvent.click(item);
    });

    const register_submit_btn = screen.getByTestId('register_submit_btn');
    await userEvent.click(register_submit_btn);
  });

  test('Register test2 de', async () => {
    const history = createMemoryHistory();
    window.__.env.REACT_APP_COUNTRY = 'de';

    const { debug } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <Register
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            history={{
              push: jest.fn()
            }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd'
              }
            }}
            oktaAuth={{
              signInWithRedirect: jest.fn()
            }}
          />
        </Router>
      </Provider>
    );

    const register_firstname = screen.getByTestId('register_firstname');
    await userEvent.type(register_firstname, '              ');
    const ChaChaIcon_firstName = screen.getByTestId('ChaChaIcon_firstName');
    await userEvent.click(ChaChaIcon_firstName);

    const register_lastname = screen.getByTestId('register_lastname');
    await userEvent.type(register_lastname, '              ');
    const ChaChaIcon_lastName = screen.getByTestId('ChaChaIcon_lastName');
    await userEvent.click(ChaChaIcon_lastName);

    const register_email = screen.getByTestId('register_email');
    await userEvent.type(register_email, ' sdkjjdsak');
    const ChaChaIcon_email = screen.getByTestId('ChaChaIcon_email');
    await userEvent.click(ChaChaIcon_email);

    const register_password = screen.getByTestId('register_password');
    await userEvent.type(register_password, ' sdkjjdsak');
    const ChaChaIcon_password = screen.getByTestId('ChaChaIcon_password');
    await userEvent.click(ChaChaIcon_password);

    const passwordInputType_iconeye = screen.getByTestId(
      'passwordInputType_iconeye'
    );
    await userEvent.click(passwordInputType_iconeye);
    const passwordInputType_btn = screen.getByTestId('passwordInputType_btn');
    await userEvent.click(passwordInputType_btn);
  });
});
