import store from 'storejs';

window.__ = {
  sessionItemRoyal: {
    set(key, val) {
      sessionStorage.setItem(`${process.env.REACT_APP_COUNTRY}-${key}`, val);
    },
    get(key) {
      return sessionStorage.getItem(`${process.env.REACT_APP_COUNTRY}-${key}`);
    },
    remove(key) {
      sessionStorage.removeItem(`${process.env.REACT_APP_COUNTRY}-${key}`);
    }
  },
  localItemRoyal: {
    set(key, val) {
      store.set(`${process.env.REACT_APP_COUNTRY}-${key}`, val);
    },
    get(key) {
      return store.get(`${process.env.REACT_APP_COUNTRY}-${key}`);
    },
    remove(key) {
      store.remove(`${process.env.REACT_APP_COUNTRY}-${key}`);
    }
  }
};
