import { fetchShopConfig } from '@/api';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';
import { decryptString } from '@/lib/ase-utils';
import ENV_LOCAL from '@/env/local';

const fetchDynamicConfig = async () => {
  let envVal = {};
  try {
    const param = getCountryCodeFromHref();
    const res = await fetchShopConfig({
      countryCode: param?.countryCode,
      configType: param?.isHub ? 'baseHubConfig' : 'baseConfig'
    });
    const tmpCfg = res?.context?.context
      ? decryptString(res?.context?.context)
      : {};

    // 本地开发环境，需要额外加载本地ENV_LOCAL
    envVal = Object.assign(tmpCfg);
    console.log(11111333, decryptString(res?.context?.context));
    if (process.env.NODE_ENV === 'development') {
      envVal = Object.assign(envVal, ENV_LOCAL);
    }
  } catch (err) {
    console.log('shop config fetch error', err);
  } finally {
    window.__ = Object.assign(window.__ || {}, { env: envVal });
  }
};

export default fetchDynamicConfig;
