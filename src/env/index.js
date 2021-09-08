import ENV_FR from './fr';
import ENV_DE from './de';
import ENV_MX from './mx';
import ENV_RU from './ru';
import ENV_TR from './tr';
import ENV_US from './us';
import ENV_CORE from './core';
import ENV_CA from './ca';
import ENV_SE from './se';
import ENV_UK from './uk';
import ENV_LOCAL from './local';
import GLOBAL_ENV from './global';

let envKey = '';
let countryKey = '';

const ALL_ENV = {
  ENV_FR,
  ENV_DE,
  ENV_MX,
  ENV_RU,
  ENV_TR,
  ENV_US,
  ENV_CORE,
  ENV_CA,
  ENV_SE,
  ENV_UK
};

const pathnameToCountryEnv = [
  {
    reg: /^\/fr/,
    envFileName: 'ENV_FR'
  },
  {
    reg: /^\/de/,
    envFileName: 'ENV_DE'
  },
  {
    reg: /^\/ru/,
    envFileName: 'ENV_RU'
  },
  {
    reg: /^\/tr/,
    envFileName: 'ENV_TR'
  },
  {
    reg: /^\/mx/,
    envFileName: 'ENV_MX'
  },
  {
    reg: /^\/us/,
    envFileName: 'ENV_US'
  },
  {
    reg: /^\/core/,
    envFileName: 'ENV_CORE'
  },
  {
    reg: /^\/ca/,
    envFileName: 'ENV_CA'
  },
  {
    reg: /^\/se/,
    envFileName: 'ENV_SE'
  },
  {
    reg: /^\/uk/,
    envFileName: 'ENV_UK'
  }
];

countryKey =
  pathnameToCountryEnv.filter((item) => {
    return item.reg.test(location.pathname) && item.envFileName;
  })[0]?.envFileName || 'ENV_CORE';
// if (!pathnameKey) {
//   console.warn('匹配不到国家');
// }
// countryKey = pathnameToCountryEnv[pathnameKey || '/us'];

switch (location.host) {
  case '124.71.151.9':
  case 'shopuat.466920.com':
    envKey = 'development';
    break;
  case 'shopsit.royalcanin.com':
    envKey = 'shopsit';
    break;
  case 'shopuat.royalcanin.com':
    envKey = 'shopuat';
    break;
  case 'uatwedding.royalcanin.com':
    envKey = 'uatwedding';
    break;
  case 'shopstg.royalcanin.com':
    envKey = 'shopstg';
    break;
  case 'stgwedding.royalcanin.com':
    envKey = 'stgwedding';
    break;
  case 'shop.royalcanin.mx':
    countryKey = 'ENV_MX';
    envKey = 'production';
    break;
  case 'shop.royalcanin.de':
    countryKey = 'ENV_DE';
    envKey = 'production';
    break;
  case 'shop.royalcanin.com':
    countryKey = 'ENV_US';
    envKey = 'production';
    break;
  case 'shop.royalcanin.de':
    countryKey = 'ENV_DE';
    envKey = 'production';
    break;
  case 'www.shop.royalcanin.de':
    countryKey = 'ENV_DE';
    envKey = 'productionWww';
    break;
  case 'shop.royalcanin.fr':
    countryKey = 'ENV_FR';
    envKey = 'production';
    break;
  case 'shop.royal-canin.ru':
  case 'www.shop.royal-canin.ru':
    countryKey = 'ENV_RU';
    envKey = 'production';
    break;
  case 'shop.royalcanin.com.tr':
  case 'www.shop.royalcanin.com.tr':
    countryKey = 'ENV_TR';
    envKey = 'production';
    break;
  case 'www.royalcanin.com':
    envKey = 'productionHub';
    break;
}

if (location.host.includes('localhost')) {
  countryKey = process.env.REACT_APP_ENV_COUNTRY;
  envKey = process.env.REACT_APP_ENV_CONFIG;
}

const ENV = ALL_ENV[countryKey][envKey];
const BASE_ENV = ALL_ENV[countryKey]['base'];

let envVal = {
  env: Object.assign(BASE_ENV, ENV, GLOBAL_ENV)
};

if (process.env.NODE_ENV === 'development') {
  const ENV = ALL_ENV[countryKey][envKey];
  const BASE_ENV = ALL_ENV[countryKey]['base'];
  envVal = {
    env: Object.assign(BASE_ENV, ENV, ENV_LOCAL, GLOBAL_ENV)
  };
}

window.__ = Object.assign(window.__ || {}, envVal);

export default ENV;
