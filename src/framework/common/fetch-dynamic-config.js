import { fetchShopConfig } from '@/api';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';
import { decryptString } from '@/lib/aes-utils';
import ENV_LOCAL from '@/env/local';

const sessionItemRoyal = window.__.sessionItemRoyal;

const fetchDynamicConfig = async () => {
  const baseConfig = sessionItemRoyal.get('base-config')
    ? JSON.parse(sessionItemRoyal.get('base-config'))
    : null;
  let envVal = {};
  try {
    if (baseConfig) {
      envVal = Object.assign(baseConfig);
    } else {
      const param = getCountryCodeFromHref();
      const res = await fetchShopConfig(param?.countryCode);
      const tmpCfg = res?.context?.context
        ? JSON.parse(decryptString(res?.context?.context))
        : {};
      envVal = Object.assign(tmpCfg);

      const oktaSettingConfig = res?.context?.oktaSettingConfig;
      if (oktaSettingConfig) {
        envVal = Object.assign(envVal, {
          REACT_APP_ACCESS_PATH: oktaSettingConfig.domainName,
          REACT_APP_CLIENT_ID: decryptString(oktaSettingConfig.clientId),
          REACT_APP_ISSUER: `${oktaSettingConfig.oktaDomain.replace(
            /\/$/gi,
            ''
          )}/oauth2/default`,
          REACT_APP_RedirectURL: `${oktaSettingConfig.domainName.replace(
            /\/$/gi,
            ''
          )}/implicit/callback`,
          REACT_APP_RegisterPrefix: `${oktaSettingConfig.ciamDomain}?redirect_uri=`,
          REACT_APP_RegisterCallback: `${oktaSettingConfig.domainName}?origin=register`
        });
      }

      sessionItemRoyal.set('base-config', JSON.stringify(envVal));
    }
    console.log('★★★★★★★★★ current shop configuration:', envVal);
    if (envVal?.REACT_APP_HUB === '1') {
      console.warn('当前配置为HUB mode，请勿使用fgs mode.');
    }
    // 本地开发环境，需要额外加载本地ENV_LOCAL
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
