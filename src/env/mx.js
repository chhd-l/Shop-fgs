const env_mx = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'mx',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-NCWZQ3',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'MX',
    REACT_APP_GA_CURRENCY_CODE: 'MXN',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_STYLE:
      'https://d1a19ys8w1wkc1.cloudfront.net/one-trust-rc-styles.css?v=one-trust-rc-styles--001',

    // #storid
    REACT_APP_STOREID: '123456858',

    // #最低限额
    REACT_APP_MINIMUM_AMOUNT: '400',
    // #商品数量限制(所有产品)
    REACT_APP_LIMITED_NUM_ALL_PRODUCT: '100',
    // #商品数量限制(单个产品)
    REACT_APP_LIMITED_NUM: '20',
    // #商品种类限制
    REACT_APP_LIMITED_CATE_NUM: '100',

    REACT_APP_LANG: 'es',
    REACT_APP_NAVIGATOR_LANG: 'es-MX',
    REACT_APP_CURRENCY: 'MXN',

    // #货币单位
    REACT_APP_CURRENCY_TYPE: '1',

    // #是否开启promotion
    REACT_APP_IS_PROMOTION: 'false',
    // #是否显示banner上方tip
    REACT_APP_SHOW_BANNERTIP: 'true',

    // #默认country
    REACT_APP_DEFAULT_COUNTRYID: '6',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/mx',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'true',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    // #payu表单字段控制
    REACT_APP_PAYU_EMAIL: '1',
    REACT_APP_PAYU_PHONE: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_SHOPPER_LOCALE: 'es_ES',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_PHONE: '1',
    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '1',

    // #Adyen
    REACT_APP_Adyen_locale: 'es_ES',
    REACT_APP_Adyen_country: 'MX',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-ES-Site/es_ES/Search-Show'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/mx/',
    REACT_APP_CLIENT_ID: '0oar7ofrk3EJ4SYPT0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/mx/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/mx?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_mexico',
    REACT_APP_PaymentKEY_VISITOR: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_mexico',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wdWF0LjQ2NjkyMC5jb20.q77RJ2MW5gIA3cRvKrL_ExnY97Lq7YQmKm_rwXdUZSE',
    REACT_APP_Adyen_ENV: 'test',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'b31ead2c-51fc-4be0-b4e7-83a1d5c0218d-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/mx'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/mx/',
    REACT_APP_CLIENT_ID: '0oannemxw9bawuRAT0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/mx/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/mx?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_mexico',
    REACT_APP_PaymentKEY_VISITOR: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_mexico',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc2l0LnJveWFsY2FuaW4uY29t.dFwiVP07vLuJ0MRkzioYExlX4hnaBQnETquTzkjX49g',
    REACT_APP_Adyen_ENV: 'test',

    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'b31ead2c-51fc-4be0-b4e7-83a1d5c0218d-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/mx'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/mx/',
    REACT_APP_CLIENT_ID: '0oannemxw9bawuRAT0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/mx/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/mx?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_mexico',
    REACT_APP_PaymentKEY_VISITOR: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_mexico',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wdWF0LnJveWFsY2FuaW4uY29t.ACjjK1gDH6I6S1VqifJ1ifQlI9uZradDIClbzmdEuDQ',
    REACT_APP_Adyen_ENV: 'test',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'b31ead2c-51fc-4be0-b4e7-83a1d5c0218d-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/mx'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/mx/',
    REACT_APP_CLIENT_ID: '0oannemxw9bawuRAT0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/mx/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/mx?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_mexico',
    REACT_APP_PaymentKEY_VISITOR: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_mexico',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc3RnLnJveWFsY2FuaW4uY29t.ZJgztbWWD0AsiF8fRONvngA8Ar7WmuEKIoXl_SWOuTQ',
    REACT_APP_Adyen_ENV: 'test',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'b31ead2c-51fc-4be0-b4e7-83a1d5c0218d-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/mx'
  },
  production: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shop.royalcanin.mx/',
    REACT_APP_CLIENT_ID: '0oa56ipcyzHxlig9d416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royalcanin.mx/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royalcanin.mx',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.mx/api',

    // #payu
    REACT_APP_PaymentENV: 'live',
    REACT_APP_PaymentKEY_MEMBER: '4bd94fc2-11fe-4a53-a8a5-463c9494466c',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.rc_d2c_fgs_mexico_autoship',
    REACT_APP_PaymentKEY_VISITOR: 'e13025c1-e45e-4ead-a18b-782efcee5250',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.rc_b2b2_mexico',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wLnJveWFsY2FuaW4ubXg.xep6AFWzN-hmRPnzYfvPE3Yq8mdiB2zq1kNpIVBeujs',
    REACT_APP_Adyen_ENV: 'live',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: 'b31ead2c-51fc-4be0-b4e7-83a1d5c0218d',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  }
};

export default env_mx;
