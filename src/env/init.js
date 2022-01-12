const interfacePrefix = require('./interface-prefix');
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';

const param = getCountryCodeFromHref();

/**
 * 设置接口请求前缀
 * 1. 加载时，需要在接口请求前，设置接口请求前缀
 * 2. 根据访问url，确定环境和国家，从而设置接口请求前缀
 */
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
    case 'shopstg.royalcanin.com':
      startEnv = 'shopstg';
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
  const baseUrlConfig = interfacePrefix[startEnv]({
    countryFromLink: param?.countryLink
  });
  window.__ = Object.assign(window.__ || {}, {
    env: Object.assign(
      window.__?.env || {},
      baseUrlConfig,
      {
        se: require('@/env/se').default
      }[param?.countryLink][startEnv]
    )
  });
  console.log(
    121212,
    Object.assign(window.__ || {}, {
      env: Object.assign(
        window.__?.env || {},
        baseUrlConfig,
        {
          se: require('@/env/se').default
        }[param?.countryLink][startEnv]
      )
    })
  );
}
