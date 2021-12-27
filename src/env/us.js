const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'us',

    // 语言文件
    REACT_APP_LANG_LOCALE: 'en-US',

    REACT_APP_CALENDAR_LOCALE: 'en-US',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-TML5H48',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'US',
    REACT_APP_GA_CURRENCY_CODE: 'USD',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '',
    REACT_APP_ONTRUST_STYLE: '',

    // #language
    REACT_APP_LANG: 'en',
    REACT_APP_HTML_LANG: 'en',
    REACT_APP_NAVIGATOR_LANG: 'en',
    REACT_APP_CURRENCY: 'USD',

    // #storid
    REACT_APP_STOREID: '123457910',

    // #最低限额
    REACT_APP_MINIMUM_AMOUNT: '0',
    // #商品数量限制(所有产品)
    REACT_APP_LIMITED_NUM_ALL_PRODUCT: '100',
    // #商品数量限制(单个产品)
    REACT_APP_LIMITED_NUM: '20',
    // #商品种类限制
    REACT_APP_LIMITED_CATE_NUM: '100',

    // #默认country
    REACT_APP_DEFAULT_COUNTRYID: '3620',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'false',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_PHONE: '1',
    // #是否显示billing addr(account页)
    REACT_APP_HIDE_ACCOUNT_BILLING_ADDR: '1',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '1',
    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_EMAIL: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #Accessbility open a new window switch
    REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW: '1',

    // #启用BazaarVoice ratings&reviews功能
    REACT_APP_SHOW_BAZAARVOICE_RATINGS: '1',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-EN-Site/en_EN/Search-Show',
    REACT_APP_CUSTOM_REGISTER: '1',

    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',
    REACT_APP_COOKIE_SETTINGS_BTN_VISIBLE: '1'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/us/',
    REACT_APP_CLIENT_ID: '0oaxwyr03sTQfHG7K0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/us/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/us?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/us',
    REACT_APP_CLIENT_ID: '0oa1dl89f1H6xlJ5L0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/us/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/us?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/us',
    REACT_APP_CLIENT_ID: '0oa1dl89f1H6xlJ5L0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/us/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/us?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/us/',
    REACT_APP_CLIENT_ID: '0oa1dl89f1H6xlJ5L0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/us/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/us?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  production: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shop.royalcanin.com/',
    REACT_APP_CLIENT_ID: '0oamkkuay3Bdq8tHc416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royalcanin.com/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royalcanin.com',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '83dcdb6d-4c72-4616-83c5-05930054b124',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production'
  }
};

export default env;
