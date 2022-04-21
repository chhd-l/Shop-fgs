const interfacePrefix = require('./interface-prefix');
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';
import ENV_GLOBAL from '@/env/global';

import ca from '@/env/ca';
import core from '@/env/core';
import de from '@/env/de';
import fr from '@/env/fr';
import mx from '@/env/mx';
import ru from '@/env/ru';
import se from '@/env/se';
import tr from '@/env/tr';
import uk from '@/env/uk';
import us from '@/env/us';

const param = getCountryCodeFromHref();

/**
 * 设置接口请求前缀
 * 1. 加载时，需要在接口请求前，设置接口请求前缀
 * 2. 根据访问url，确定环境和国家，从而设置接口请求前缀
 * 3. 容错，当/storeConfig/getShopConfig/接口失败时，加载本地src/env相关，以容错用，使该店铺正常使用
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
    case 'royalcanin.com':
    case 'www.royalcanin.com':
    case 'prd-royalcanin-cd-01.royalcanin.com':
      startEnv = 'productionHub';
      break;
  }
  const baseUrlConfig = interfacePrefix[startEnv]
    ? interfacePrefix[startEnv]({
        countryFromLink: param?.countryLink
      })
    : { REACT_APP_BASEURL: `${window.location.origin}/api` };
  // 当/storeConfig/getShopConfig/接口失败时，容错用，使该店铺正常使用
  const baseStoreConfig = {
    ca,
    core,
    de,
    fr,
    mx,
    ru,
    se,
    tr,
    uk,
    us
  }[param?.countryLink];
  window.__ = Object.assign(window.__ || {}, {
    env: Object.assign(
      window.__?.env || {},
      baseUrlConfig,
      ENV_GLOBAL,
      baseStoreConfig?.base || {},
      baseStoreConfig ? baseStoreConfig[startEnv] : {}
    )
  });
}
