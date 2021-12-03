import store from 'storejs';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';

const countryCode = getCountryCodeFromHref()?.countryCode;

window.__ = Object.assign(window.__ || {}, {
  sessionItemRoyal: {
    set(key, val) {
      sessionStorage.setItem(`${countryCode}-${key}`, val);
    },
    get(key) {
      return sessionStorage.getItem(`${countryCode}-${key}`);
    },
    remove(key) {
      sessionStorage.removeItem(`${countryCode}-${key}`);
    }
  },
  localItemRoyal: {
    set(key, val) {
      store.set(`${countryCode}-${key}`, val);
    },
    get(key) {
      return store.get(`${countryCode}-${key}`);
    },
    remove(key) {
      store.remove(`${countryCode}-${key}`);
    }
  }
});
