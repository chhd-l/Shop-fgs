// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const sessionItem = {};
const localItem = {};

Object.defineProperty(window, '__', {
  value: {
    sessionItemRoyal: {
      get: (key) => sessionItem[key],
      set: (key, value) => (sessionItem[key] = value)
    },
    localItemRoyal: {
      get: (key) => localItem[key],
      set: (key, value) => (localItem[key] = value)
    },
    // env: 'REACT_APP_STOREID'
    env: {
      REACT_APP_COUNTRY: 'ru',
      REACT_APP_CUSTOM_REGISTER: '1',
      REACT_APP_COOKIE_SETTINGS_BTN_VISIBLE: '1',
      REACT_APP_PAYU_EMAIL: 0,
      REACT_APP_PAYU_PHONE: 0,
      REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
      REACT_APP_GA_COUNTRY: 'RU',
      REACT_APP_HTML_LANG: 'ru',
      REACT_APP_NAVIGATOR_LANG: 'ru',
      REACT_APP_DEFAULT_COUNTRYID: 1969,
      REACT_APP_CHECKOUT_WITH_CLINIC: 'true',
      REACT_APP_PDP_RATING_VISIBLE: 0,
      REACT_APP_HIDE_ACCOUNT_BILLING_ADDR: 1,
      REACT_APP_HIDE_CHECKOUT_BILLING_ADDR: 1,
      REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: 0,
      REACT_APP_SEARCH_LINK:
        '/on/demandware.store/Sites-RU-Site/ru_RU/Search-Show',
      REACT_APP_PaymentENV: 'test',
      REACT_APP_PaymentKEY_MEMBER: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
      REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_mexico',
      REACT_APP_PaymentKEY_VISITOR: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
      REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_mexico',
      REACT_APP_GA_ENV: 'sit',
      REACT_APP_HOMEPAGE: '/ru',
      REACT_APP_VCONSOLE: true,
      REACT_APP_DISABLE_CLOUDFLARE_CDN: true,
      REACT_APP_CLOSE_PRODUCT_FINDER: '1',
      REACT_APP_RU_LOCALIZATION_ENABLE: true,

      REACT_APP_IS_RULOCAL: true,
      REACT_APP_URLPREFIX: 'https://shopsit.royalcanin.com/ru',
      REACT_APP_DATEPICKER_LOCALE:
        '{"datePickerLocale":"ru","dateFnslocaleModuleLang":"ru"}'
    }
  }
});

window.scrollTo = jest.fn();

// const location = { pathname: '', }
// Object.defineProperty(window, 'location', {
//   value: {
//     ...location
//   }
// });

// Object.defineProperty(stores, {
//   value: {
//     checkoutStore: {cartData: {}},
//   }
// });
