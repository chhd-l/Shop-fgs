import { fetchShopConfig } from '@/api';
import getCountryCodeFromHref from '@/lib/get-country-code-from-href';
import { decryptString } from '@/lib/aes-utils';
import ENV_LOCAL from '@/env/local';
import cloneDeep from 'lodash/cloneDeep';

const sessionItemRoyal = window.__.sessionItemRoyal;

const fetchDynamicConfig = async () => {
  const baseConfig = sessionItemRoyal.get('base-config-shop')
    ? JSON.parse(sessionItemRoyal.get('base-config-shop'))
    : null;
  let envVal = cloneDeep(
    Object.assign(window?.__?.env || {}, {
      // 设置默认值
      REACT_APP_EXTERNAL_ASSETS_PREFIX: 'https://fgs-cdn.azureedge.net/cdn'
    })
  );
  const param = getCountryCodeFromHref();
  try {
    if (baseConfig) {
      envVal = Object.assign(baseConfig);
    } else {
      const res = await fetchShopConfig(param?.countryCode);
      const tmpCfg = res?.context?.context
        ? JSON.parse(decryptString(res?.context?.context))
        : {};
      // 暂时删除来自storepotal的接口前缀配置，使用本地的，后续直接将storepotal对应字段删除即可，这两行代码也同时删除
      delete tmpCfg?.REACT_APP_HUB_APIURL;
      delete tmpCfg?.REACT_APP_BASEURL;
      envVal = Object.assign({}, envVal, tmpCfg, {
        REACT_APP_HUB: Boolean(res?.context?.enableHub),
        REACT_APP_LANG_LOCALE: res?.context?.language,
        REACT_APP_PRODUCT_IMAGE_CDN: res?.context?.cdn,
        REACT_APP_STOREID: res?.context?.storeId + '',
        REACT_APP_CURRENCY: res?.context?.currency,
        REACT_APP_GA_CURRENCY_CODE: res?.context?.currency,
        // phrase 编辑管理
        REACT_APP_PHRASE_CONTEXT_EDITOR:
          res?.context?.phraseConfig?.phraseEnabled,
        REACT_APP_PHRASE_BRANCH: res?.context?.phraseConfig?.branchName
      });
      const oktaSettingConfig = res?.context?.oktaSettingConfig;
      if (oktaSettingConfig) {
        // 本地开发环境，需要额外加载okta本地配置
        const domainName =
          process.env.REACT_APP_ACCESS_PATH || oktaSettingConfig.domainName;
        envVal = Object.assign(envVal, {
          REACT_APP_ACCESS_PATH: domainName,
          REACT_APP_CLIENT_ID: oktaSettingConfig.clientId
            ? decryptString(oktaSettingConfig.clientId)
            : '',
          REACT_APP_ISSUER: `${oktaSettingConfig.oktaDomain.replace(
            /\/$/gi,
            ''
          )}/oauth2/default`,
          REACT_APP_RedirectURL: `${domainName.replace(
            /\/$/gi,
            ''
          )}/implicit/callback`,
          REACT_APP_RegisterPrefix: `${oktaSettingConfig.ciamDomain}?redirect_uri=`,
          REACT_APP_RegisterCallback: `${domainName}?origin=register`
        });
      }

      sessionItemRoyal.set('base-config-shop', JSON.stringify(envVal));
    }
    console.log('★★★★★★★★★ current shop configuration:', envVal);
    if (envVal?.REACT_APP_HUB) {
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
