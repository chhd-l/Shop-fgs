import interfaceBaseUrl from './interface-base-url';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';

const param = getCountryCodeFromHref();

if (process.env.NODE_ENV === 'production') {
  let startEnv = '';
  const host = window.location.host;
  switch (host) {
    case 'shopuat.466920.com':
      startEnv = 'development';
      break;
    case 'shopsit.royalcanin.com':
      startEnv = 'shopsit';
      break;
    case 'shopuat.royalcanin.com':
      startEnv = 'shopuat';
      break;
    case 'uatwedding.royalcanin.com':
      startEnv = 'uatwedding';
      break;
    case 'stgwedding.royalcanin.com':
      startEnv = 'stgwedding';
      break;
    case 'shop.royalcanin.mx':
    case 'shop.royalcanin.de':
    case 'shop.royalcanin.com':
      startEnv = 'production';
      break;
    case 'www.royalcanin.com':
      startEnv = 'productionHub';
      break;
  }
  const targetConfig = interfaceBaseUrl[startEnv]({
    countryCode: param?.countryCode
  });

  window.__ = Object.assign(window.__ || {}, {
    env: Object.assign(window.__?.env || {}, targetConfig)
  });
  console.log(3243242342, window.__?.env);

  // 启动时，需要知道环境+countryCode
}
