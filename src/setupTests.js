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
      REACT_APP_COUNTRY: 'jp'
    }
  }
});

// Object.defineProperty(stores, {
//   value: {
//     checkoutStore: {cartData: {}},
//   }
// });
