import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
});

Object.defineProperty(window, '__DEV__', {
  value: true
});
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
    env: 'REACT_APP_STOREID'
  }
});
