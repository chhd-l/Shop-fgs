const env_de = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'de',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-NCWZQ3',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'DE',
    REACT_APP_GA_CURRENCY_CODE: 'EUR',

    // #Adyen
    REACT_APP_Adyen_locale: 'de-DE',
    REACT_APP_Adyen_country: 'DE',
    // #adyenKlarnaPayNow,adyenKlarnaPayLater,directEbanking跳转到三方页面的语言
    REACT_APP_SHOPPER_LOCALE: 'de_DE',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_STYLE:
      'https://d1a19ys8w1wkc1.cloudfront.net/one-trust-rc-styles.css?v=one-trust-rc-styles--001',

    // #language
    REACT_APP_LANG: 'de',
    REACT_APP_NAVIGATOR_LANG: 'de-DE',
    REACT_APP_CURRENCY: 'EUR',

    // #storid
    REACT_APP_STOREID: '123457908',

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
    REACT_APP_DEFAULT_COUNTRYID: '981',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'true',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_PHONE: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '1',

    // #显示PrescriberCodeModal
    REACT_APP_SHOWPRESCRIBERCODEMODAL: '1',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-DE-Site/de_DE/Search-Show'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/de/',
    REACT_APP_CLIENT_ID: '0oat2785o3ZJ42Fkm0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/de/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/de?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wdWF0LjQ2NjkyMC5jb20.q77RJ2MW5gIA3cRvKrL_ExnY97Lq7YQmKm_rwXdUZSE',
    REACT_APP_Adyen_ENV: 'test',
    REACT_APP_SUCCESSFUL_URL: 'https://shopuat.466920.com/de',
    REACT_APP_Adyen3DSUrl: 'https://shopuat.466920.com',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      ' a78ac3fc-256e-4f7a-a2db-f4b6972214bf-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/de',
    REACT_APP_CLIENT_ID: '0oaq4l7mz80pZlTd00x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/de/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/de?origin=register',
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

    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc2l0LnJveWFsY2FuaW4uY29t.dFwiVP07vLuJ0MRkzioYExlX4hnaBQnETquTzkjX49g',
    REACT_APP_Adyen_ENV: 'test',
    REACT_APP_SUCCESSFUL_URL: 'https://shopsit.royalcanin.com/de',
    REACT_APP_Adyen3DSUrl: 'https://shopsit.royalcanin.com',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'a78ac3fc-256e-4f7a-a2db-f4b6972214bf-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/de',
    REACT_APP_CLIENT_ID: '0oaq4l7mz80pZlTd00x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/de/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/de?origin=register',
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
    REACT_APP_SUCCESSFUL_URL: 'https://shopuat.royalcanin.com/de',
    REACT_APP_Adyen3DSUrl: 'https://shopuat.royalcanin.com',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'a78ac3fc-256e-4f7a-a2db-f4b6972214bf-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/de/',
    REACT_APP_CLIENT_ID: '0oaq4l7mz80pZlTd00x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/de/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/de?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc3RnLnJveWFsY2FuaW4uY29t.ZJgztbWWD0AsiF8fRONvngA8Ar7WmuEKIoXl_SWOuTQ',
    REACT_APP_Adyen_ENV: 'test',
    REACT_APP_SUCCESSFUL_URL: 'https://shopstg.royalcanin.com/de',
    REACT_APP_Adyen3DSUrl: 'https://shopstg.royalcanin.com',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'a78ac3fc-256e-4f7a-a2db-f4b6972214bf-test',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  production: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shop.royalcanin.de/',
    REACT_APP_CLIENT_ID: '0oa69yn8jTwmN2j2p416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royalcanin.de/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royalcanin.de',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.de/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.4116105963663555.aHR0cHM6Ly9zaG9wLnJveWFsY2FuaW4uZGU.3BMa6HlRkpsM4ZMIgm7yJ5M30W8rL3Ccu8ns6K5GVQ8',
    REACT_APP_Adyen_ENV: 'live',
    REACT_APP_SUCCESSFUL_URL: 'https://shop.royalcanin.de',
    REACT_APP_Adyen3DSUrl: 'https://shop.royalcanin.de',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: 'a78ac3fc-256e-4f7a-a2db-f4b6972214bf',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  },
  productionWww: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://www.shop.royalcanin.de',
    REACT_APP_CLIENT_ID: '0oa69yn8jTwmN2j2p416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://www.shop.royalcanin.de/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://www.shop.royalcanin.de',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.shop.royalcanin.de/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.4116105963663555.aHR0cDovL3d3dy5yb3lhbGNhbmluLmNvbQ.O6vgqj5rS3bHzGVTI6PUpzWt9UpulJAIAyhC7BaSPmA',

    REACT_APP_Adyen_ENV: 'live',
    REACT_APP_SUCCESSFUL_URL: 'https://www.shop.royalcanin.de',
    REACT_APP_Adyen3DSUrl: 'https://www.shop.royalcanin.de',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: 'a78ac3fc-256e-4f7a-a2db-f4b6972214bf',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  }
};

export default env_de;
