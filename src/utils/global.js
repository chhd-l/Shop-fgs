import store from 'storejs';

window.__ = Object.assign(window.__ || {}, {
  sessionItemRoyal: {
    set(key, val) {
      sessionStorage.setItem(`${window.__.env.REACT_APP_COUNTRY}-${key}`, val);
    },
    get(key) {
      return sessionStorage.getItem(
        `${window.__.env.REACT_APP_COUNTRY}-${key}`
      );
    },
    remove(key) {
      sessionStorage.removeItem(`${window.__.env.REACT_APP_COUNTRY}-${key}`);
    }
  },
  localItemRoyal: {
    set(key, val) {
      store.set(`${window.__.env.REACT_APP_COUNTRY}-${key}`, val);
    },
    get(key) {
      return store.get(`${window.__.env.REACT_APP_COUNTRY}-${key}`);
    },
    remove(key) {
      store.remove(`${window.__.env.REACT_APP_COUNTRY}-${key}`);
    }
  }
});
