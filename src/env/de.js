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
    REACT_APP_CALENDAR_LOCALE: 'de-DE',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_STYLE:
      'https://d1a19ys8w1wkc1.cloudfront.net/one-trust-rc-styles.css?v=one-trust-rc-styles--001',

    // #language
    REACT_APP_LANG: 'de',
    REACT_APP_HTML_LANG: 'de',
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

    // #是否启用First Order Welcome Box功能
    REACT_APP_SHOW_CHECKOUT_WELCOMEBOX: '1',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-DE-Site/de_DE/Search-Show',
    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?shop-royalcanin-de-'
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

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      'a78ac3fc-256e-4f7a-a2db-f4b6972214bf-test',

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

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: 'a78ac3fc-256e-4f7a-a2db-f4b6972214bf',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  }
};

export default env_de;
