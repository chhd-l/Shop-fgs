import React from 'react';
import ForgetPassword from '../index';
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

// jest.mock('@/components/Footer', () => {
//   return () => <div>Footer</div>
// });

// jest.mock('@/components/GoogleTagManager', () => {
//   return () => <div>GoogleTagManager</div>
// });

// jest.mock('../addEventListener', () => {
//   return {
//     addEventListenerArr: [
//       { id: 'tr_consent_c', modal: 'fullScreenModalC' },
//       { id: 'tr_consent_d', modal: 'fullScreenModalD' },
//       { id: 'tr_consent_tc', modal: 'fullScreenModalTC' },
//       { id: 'tr_consent_pm', modal: 'fullScreenModalPM' },
//       { id: 'tr_consent_opt_email', modal: 'fullScreenModalOptEmail' }
//     ]
//   }
// });

// jest.mock('@/api/consent', () => {
//   const originalModule = jest.requireActual('@/api/consent');
//   return {
//     __esModule: true,
//     ...originalModule,
//     getStoreOpenConsentList: jest.fn(
//       ({ }) =>
//         new Promise((resolve) =>
//           resolve({
//             "code": "K-000000",
//             "message": "操作に成功しました",
//             "context": {
//               "optionalList": [{
//                 "id": 946,
//                 "parentId": null,
//                 "storeId": 123457919,
//                 "consentId": "cb90bbbb-95a5-444e-8ec8-e4954ea76bb1",
//                 "consentCode": "b6d4ab67-3df5-45a5-9927-0765d07fc30b",
//                 "consentType": "Email in",
//                 "consentCategory": "Consumer",
//                 "filedType": "Optional",
//                 "consentPage": "Landing page,check out",
//                 "languageTypeId": 55146,
//                 "consentTitleType": "Content",
//                 "consentTitle": "<p>ロイヤルカナン</p>",
//                 "consentVersion": "10",
//                 "consentDesc": "RC_DF_JP_MY_ROYAL_CANIN_B2C_OPT_MAIL_SMS",
//                 "createBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "createTime": "2022-03-07 03:03:02.000",
//                 "updateBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "updateTime": "2022-07-21 03:15:06.000",
//                 "sort": 1,
//                 "deleteBy": null,
//                 "deleteFlag": 0,
//                 "deleteTime": null,
//                 "openFlag": 1,
//                 "pushOktaFlag": 1,
//                 "consentGroup": "default",
//                 "communicationType": "email",
//                 "sendEmailFlag": 1,
//                 "consentRegisterTitle": null,
//                 "consentItemVersion": 3,
//                 "selectedFlag": null,
//                 "detailList": []
//               }, {
//                 "id": 947,
//                 "parentId": null,
//                 "storeId": 123457919,
//                 "consentId": "55f2b055-fff2-438b-aaf5-1bc09d8070fb",
//                 "consentCode": "b6d4ab67-3df5-45a5-9927-0765d07fc30b",
//                 "consentType": "0",
//                 "consentCategory": "Consumer",
//                 "filedType": "Optional",
//                 "consentPage": "Landing page,check out",
//                 "languageTypeId": 55146,
//                 "consentTitleType": "Content",
//                 "consentTitle": "<p>マースペットケアと関連会社</p>",
//                 "consentVersion": "10",
//                 "consentDesc": "MARS_PETCARE_JP_MY_ROYAL_CANIN_B2C_OPT_MAIL_SMS",
//                 "createBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "createTime": "2022-03-07 03:04:38.000",
//                 "updateBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "updateTime": "2022-06-17 08:23:15.000",
//                 "sort": 2,
//                 "deleteBy": null,
//                 "deleteFlag": 0,
//                 "deleteTime": null,
//                 "openFlag": 1,
//                 "pushOktaFlag": 1,
//                 "consentGroup": "default",
//                 "communicationType": null,
//                 "sendEmailFlag": null,
//                 "consentRegisterTitle": null,
//                 "consentItemVersion": 2,
//                 "selectedFlag": null,
//                 "detailList": []
//               }, {
//                 "id": 965,
//                 "parentId": null,
//                 "storeId": 123457919,
//                 "consentId": "a14ebcb5-da3d-4467-bd19-91239c9611b7",
//                 "consentCode": "b6d4ab67-3df5-45a5-9927-0765d07fc30b",
//                 "consentType": "Email in",
//                 "consentCategory": "Consumer",
//                 "filedType": "Optional",
//                 "consentPage": "Landing page,check out",
//                 "languageTypeId": 55146,
//                 "consentTitleType": "Content",
//                 "consentTitle": "<p>上記に加え、私は「マースのプライバシーに関する声明」に記載されている目的を達成するために、私の個人情報が外国に提供されることに同意します</p>",
//                 "consentVersion": "10",
//                 "consentDesc": "RC-DF_JP_MY-ROYAL-CANIN_B2C_TRANSFER-DATA",
//                 "createBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "createTime": "2022-03-07 03:08:53.000",
//                 "updateBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "updateTime": "2022-06-17 08:23:15.000",
//                 "sort": 4,
//                 "deleteBy": null,
//                 "deleteFlag": 0,
//                 "deleteTime": null,
//                 "openFlag": 1,
//                 "pushOktaFlag": 1,
//                 "consentGroup": "default",
//                 "communicationType": null,
//                 "sendEmailFlag": null,
//                 "consentRegisterTitle": null,
//                 "consentItemVersion": 1,
//                 "selectedFlag": null,
//                 "detailList": []
//               }],
//               "requiredList": [{
//                 "id": 949,
//                 "parentId": null,
//                 "storeId": 123457919,
//                 "consentId": "a2b0bb30-6235-4967-aa18-ad58dc00fd52",
//                 "consentCode": "b6d4ab67-3df5-45a5-9927-0765d07fc30b",
//                 "consentType": "Email in",
//                 "consentCategory": "Consumer",
//                 "filedType": "Required",
//                 "consentPage": "Landing page,check out",
//                 "languageTypeId": 55146,
//                 "consentTitleType": "Content",
//                 "consentTitle": "<p><a href=\"https://shopsit.royalcanin.com/jp/general-terms-conditions\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255); font-size: 14px;\">利用规约</a>に同意する</p>",
//                 "consentVersion": "10",
//                 "consentDesc": "RC_DF_JP_MY_ROYAL_CANIN_B2C_TC",
//                 "createBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "createTime": "2022-03-07 03:08:53.000",
//                 "updateBy": "8a70815b7e53b407017e61ffdce000c9",
//                 "updateTime": "2022-06-22 05:01:53.000",
//                 "sort": 0,
//                 "deleteBy": null,
//                 "deleteFlag": 0,
//                 "deleteTime": null,
//                 "openFlag": 1,
//                 "pushOktaFlag": 1,
//                 "consentGroup": "default",
//                 "communicationType": null,
//                 "sendEmailFlag": null,
//                 "consentRegisterTitle": null,
//                 "consentItemVersion": 2,
//                 "selectedFlag": null,
//                 "detailList": []
//               }],
//               "customerDetailVO": null
//             },
//             "defaultLocalDateTime": "2022-09-08 23:38:18.532"
//           })
//         )
//     ),
//     userBindConsent: jest.fn(
//       ({ }) =>
//         new Promise((resolve) =>
//           resolve({
//             "code": "K-000000",
//             "message": "操作に成功しました",
//             "defaultLocalDateTime": "2022-09-08 23:38:18.532"
//           })
//         )
//     ),
//   };
// });

// jest.mock('@/api/user', () => {
//   const originalModule = jest.requireActual('@/api/user');
//   return {
//     __esModule: true,
//     ...originalModule,
//     oktaRegister: jest.fn(
//       ({ storeId, customerPassword, customerAccount,
//         customerName,
//         firstName,
//         lastName,
//         phoneticFirstName,
//         phoneticLastName }) =>
//         new Promise((resolve) =>
//           resolve({
//             "code": "K-000000",
//             "message": "操作に成功しました",
//             context: {
//               customerDetail: {},
//               oktaSessionToken: 'ssdadad',
//               token: 'dsadad',
//               customerId: 'sdadadad'
//             }

//           })
//         )
//     )
//   };
// });

jest.mock('@/api/login', () => {
  const originalModule = jest.requireActual('@/api/login');
  return {
    __esModule: true,
    ...originalModule,
    forgetPassworSendEmail: jest.fn(
      ({ customerAccount }) =>
        new Promise((resolve, reject) => {
          if (customerAccount === 'dsada@dsad.com') {
            return resolve({
              code: 'K-000000',
              message: '操作に成功しました'
            });
          } else {
            reject({
              code: 'K-000001',
              message: '操作に成功しました'
            });
          }
        })
    )
  };
});

describe('ForgetPassword Index Test', () => {
  window.dataLayer = [];
  test('ForgetPassword test1', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'nl';

    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <ForgetPassword
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            history={{
              push: jest.fn()
            }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd',
                systemError: 'systemError'
              }
            }}
          />
        </Router>
      </Provider>
    );
    // debug();
    const email_input = screen.getByTestId('email_input');
    await userEvent.type(email_input, 'dsada@dsad.com');
    await fireEvent.blur(email_input);

    const sendEmail = screen.getByTestId('sendEmail');
    await userEvent.click(sendEmail);
  });

  test('ForgetPassword test2', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'nl';

    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <ForgetPassword
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            history={{
              push: jest.fn()
            }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd',
                systemError: 'systemError'
              }
            }}
          />
        </Router>
      </Provider>
    );
    const email_input = screen.getByTestId('email_input');
    await userEvent.type(email_input, ' ');
    await fireEvent.blur(email_input);
  });

  test('ForgetPassword test3', async () => {
    const history = createMemoryHistory();
    // window.__.env.REACT_APP_COUNTRY = 'nl';

    const { debug, container } = await render(
      <Provider {...stores}>
        <Router history={{ ...history }}>
          <ForgetPassword
            match={{ url: '' }}
            location={{ key: 'sdsad' }}
            history={{
              push: jest.fn()
            }}
            intl={{
              messages: {
                'register.welcomeToRoyalCanin': 'sdhdhd',
                systemError: 'systemError'
              }
            }}
          />
        </Router>
      </Provider>
    );
    const email_input = screen.getByTestId('email_input');
    await userEvent.type(email_input, 'dsadad@sdad.com');
    await fireEvent.blur(email_input);

    const sendEmail = screen.getByTestId('sendEmail');
    await userEvent.click(sendEmail);
  });
});
