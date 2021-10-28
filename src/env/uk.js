const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'uk',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-TML5H48',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'UK',
    REACT_APP_GA_CURRENCY_CODE: 'GBP',

    // #Adyen
    REACT_APP_Adyen_country: 'GB',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '',
    REACT_APP_ONTRUST_STYLE: '',

    // #language
    REACT_APP_LANG: 'uk',
    REACT_APP_NAVIGATOR_LANG: 'en',
    REACT_APP_CURRENCY: 'GBP',

    // #storid
    REACT_APP_STOREID: '123457916',

    // #最低限额
    REACT_APP_MINIMUM_AMOUNT: '0',
    // #商品数量限制(所有产品)
    REACT_APP_LIMITED_NUM_ALL_PRODUCT: '100',
    // #商品数量限制(单个产品)
    REACT_APP_LIMITED_NUM: '20',
    // #商品种类限制
    REACT_APP_LIMITED_CATE_NUM: '100',

    // #货币单位
    REACT_APP_CURRENCY_TYPE: '3',

    // #是否开启promotion
    REACT_APP_IS_PROMOTION: 'true',
    // #是否显示banner上方tip
    REACT_APP_SHOW_BANNERTIP: 'true',

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

    // #PLP cover style
    REACT_APP_PLP_STYLE: 'layout-global',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #Accessbility open a new window switch
    REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW: '1',

    // #启用BazaarVoice ratings&reviews功能
    REACT_APP_SHOW_BAZAARVOICE_RATINGS: '0',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-EN-Site/en_EN/Search-Show'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/uk/',
    REACT_APP_CLIENT_ID: '0oaxwyr03sTQfHG7K0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/uk/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/uk?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://optanon.blob.core.windows.net/consent/82d92b37-7d64-443e-a23f-5efbb17770be-test.js',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/uk',
    REACT_APP_CLIENT_ID: '0oa22exzn8qt1uwnk0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/uk/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/uk?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://optanon.blob.core.windows.net/consent/82d92b37-7d64-443e-a23f-5efbb17770be-test.js',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc2l0LnJveWFsY2FuaW4uY29t.dFwiVP07vLuJ0MRkzioYExlX4hnaBQnETquTzkjX49g',
    REACT_APP_Adyen_ENV: 'test'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/uk',
    REACT_APP_CLIENT_ID: '0oa22exzn8qt1uwnk0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/uk/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/uk?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://optanon.blob.core.windows.net/consent/82d92b37-7d64-443e-a23f-5efbb17770be-test.js',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/uk/',
    REACT_APP_CLIENT_ID: '0oa22exzn8qt1uwnk0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/uk/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/uk?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://optanon.blob.core.windows.net/consent/82d92b37-7d64-443e-a23f-5efbb17770be-test.js',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc3RnLnJveWFsY2FuaW4uY29t.ZJgztbWWD0AsiF8fRONvngA8Ar7WmuEKIoXl_SWOuTQ',
    REACT_APP_Adyen_ENV: 'test'
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
    REACT_APP_ONTRUST_SRC:
      'https://optanon.blob.core.windows.net/consent/82d92b37-7d64-443e-a23f-5efbb17770be.js',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production'
  }
};

export default env;
