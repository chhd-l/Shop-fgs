const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'ru',

    // #payu表单字段控制
    REACT_APP_PAYU_EMAIL: 0,
    REACT_APP_PAYU_PHONE: 0,

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-MH74J3M',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'RU',
    REACT_APP_GA_CURRENCY_CODE: 'RUB',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_STYLE: '',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-ru',

    // #storid
    REACT_APP_STOREID: '123457907',

    // #最低限额
    REACT_APP_MINIMUM_AMOUNT: 0,
    // #商品数量限制(所有产品)
    REACT_APP_LIMITED_NUM_ALL_PRODUCT: 100,
    // #商品数量限制(单个产品)
    REACT_APP_LIMITED_NUM: 20,
    // #商品种类限制
    REACT_APP_LIMITED_CATE_NUM: 100,

    // #language
    REACT_APP_LANG: 'ru',
    REACT_APP_HTML_LANG: 'ru',
    REACT_APP_NAVIGATOR_LANG: 'ru',
    REACT_APP_CURRENCY: 'RUB',

    // #是否开启promotion
    REACT_APP_IS_PROMOTION: false,
    // #是否显示banner上方tip
    REACT_APP_SHOW_BANNERTIP: false,

    // #默认country
    REACT_APP_DEFAULT_COUNTRYID: 1969,

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'true',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: 0,

    // #是否显示billing addr(account页)
    REACT_APP_HIDE_ACCOUNT_BILLING_ADDR: 1,
    // #是否显示billing addr(checkout页)
    REACT_APP_HIDE_CHECKOUT_BILLING_ADDR: 1,

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: 0,

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-RU-Site/ru_RU/Search-Show'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/ru/',
    REACT_APP_CLIENT_ID: '0oaxwyztoygwxy1cJ0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/ru/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/ru?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_ru_ms',
    REACT_APP_PaymentKEY_VISITOR: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_ru_ms',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    REACT_APP_HUB: 0,

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '493fcc19-7d1b-4628-bb7f-4b66c21c5927-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/ru',
    REACT_APP_CLIENT_ID: '0oa1dlcrg4I8ilKNY0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/ru/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/ru?origin=register',
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
      '493fcc19-7d1b-4628-bb7f-4b66c21c5927-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/ru',
    REACT_APP_CLIENT_ID: '0oa1dlcrg4I8ilKNY0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/ru/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/ru?origin=register',
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
      '493fcc19-7d1b-4628-bb7f-4b66c21c5927-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/ru/',
    REACT_APP_CLIENT_ID: '0oa1dlcrg4I8ilKNY0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/ru/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/ru?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_ru_ms',
    REACT_APP_PaymentKEY_VISITOR: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_ru_ms',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '493fcc19-7d1b-4628-bb7f-4b66c21c5927-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-stg.cloud-effem.com/ru-ru/manager/settings'
  },
  production: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shop.royal-canin.ru',
    REACT_APP_CLIENT_ID: '0oao1agpvtHW6eoZ6416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royal-canin.ru/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royal-canin.ru',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royal-canin.ru/api',

    // #payu
    REACT_APP_PaymentENV: 'live',
    REACT_APP_PaymentKEY_MEMBER: '7f25aba4-13e4-4f74-8f69-9f291b0d8d41',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.fgs_ru',
    REACT_APP_PaymentKEY_VISITOR: '7f25aba4-13e4-4f74-8f69-9f291b0d8d41',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.fgs_ru',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '493fcc19-7d1b-4628-bb7f-4b66c21c5927',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-stg.cloud-effem.com/ru-ru/manager/settings',

    // #HUB_GA
    REACT_APP_HUB_GA: 1
  },
  productionHub: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://www.royalcanin.com/ru/shop',
    REACT_APP_CLIENT_ID: '0oao1agpvtHW6eoZ6416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://www.royalcanin.com/ru/shop/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://www.royalcanin.com/ru/shop',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/ru/shop/api',

    // #payu
    REACT_APP_PaymentENV: 'live',
    REACT_APP_PaymentKEY_MEMBER: '7f25aba4-13e4-4f74-8f69-9f291b0d8d41',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.fgs_ru',
    REACT_APP_PaymentKEY_VISITOR: '7f25aba4-13e4-4f74-8f69-9f291b0d8d41',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.fgs_ru',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '493fcc19-7d1b-4628-bb7f-4b66c21c5927',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru/shop',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://www.royalcanin.com/ru/api',

    REACT_APP_HUB_URLPREFIX: 'https://www.royalcanin.com/ru',

    REACT_APP_HUB: '1',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://account.royalcanin.com/ru-ru/manager/settings',

    REACT_APP_HUB_BREEDER_PORTAL:
      'https://www.royal-canin.ru/breeders/?_ga=2.244801221.1134902572.1608548748-267828147.1607589014',
    REACT_APP_HUB_VET_PORTAL:
      'https://vetacademia.royalcanin.ru/for-vets?_ga=2.244801221.1134902572.1608548748-267828147.1607589014',

    // #HUB_GA
    REACT_APP_HUB_GA: 1
  },
  stgwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://stgwedding.royalcanin.com/ru/shop/',
    REACT_APP_CLIENT_ID: '0oa1dlcrg4I8ilKNY0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://stgwedding.royalcanin.com/ru/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://stgwedding.royalcanin.com/ru/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/ru/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_ru_ms',
    REACT_APP_PaymentKEY_VISITOR: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_ru_ms',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '493fcc19-7d1b-4628-bb7f-4b66c21c5927-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru/shop',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/ru',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/ru/api',

    REACT_APP_HUB: '1',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-stg.cloud-effem.com/ru-ru/manager/settings',

    REACT_APP_HUB_BREEDER_PORTAL:
      'https://www.royal-canin.ru/breeders/?_ga=2.244801221.1134902572.1608548748-267828147.1607589014',
    REACT_APP_HUB_VET_PORTAL:
      'https://vetacademia.royalcanin.ru/for-vets?_ga=2.244801221.1134902572.1608548748-267828147.1607589014',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  },
  uatwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://uatwedding.royalcanin.com/ru/shop',
    REACT_APP_CLIENT_ID: '0oa1dlcrg4I8ilKNY0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://uatwedding.royalcanin.com/ru/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://uatwedding.royalcanin.com/ru/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/ru/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #payu
    REACT_APP_PaymentENV: 'test',
    REACT_APP_PaymentKEY_MEMBER: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.dev_ru_ms',
    REACT_APP_PaymentKEY_VISITOR: 'f2346509-9c34-4299-8c07-9719dc4574e9',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.dev_ru_ms',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '493fcc19-7d1b-4628-bb7f-4b66c21c5927-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/ru/shop',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/ru',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/ru/api',

    REACT_APP_HUB: '1',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://account.royalcanin.com/ru-ru/manager/settings',

    REACT_APP_HUB_BREEDER_PORTAL:
      'https://www.royal-canin.ru/breeders/?_ga=2.244801221.1134902572.1608548748-267828147.1607589014',
    REACT_APP_HUB_VET_PORTAL:
      'https://vetacademia.royalcanin.ru/for-vets?_ga=2.244801221.1134902572.1608548748-267828147.1607589014',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  }
};

export default env;
