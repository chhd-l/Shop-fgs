import store from 'storejs';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';

const countryLink = getCountryCodeFromHref()?.countryLink;

window.__ = Object.assign(window.__ || {}, {
  sessionItemRoyal: {
    set(key, val) {
      sessionStorage.setItem(`${countryLink}-${key}`, val);
    },
    get(key) {
      return sessionStorage.getItem(`${countryLink}-${key}`);
    },
    remove(key) {
      sessionStorage.removeItem(`${countryLink}-${key}`);
    }
  },
  localItemRoyal: {
    set(key, val) {
      store.set(`${countryLink}-${key}`, val);
    },
    get(key) {
      return store.get(`${countryLink}-${key}`);
    },
    remove(key) {
      store.remove(`${countryLink}-${key}`);
    }
  }
});
