const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'ca',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

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
    REACT_APP_STOREID: '123457914',

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
    REACT_APP_DEFAULT_COUNTRYID: '3620',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'false',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_PHONE: '1',
    // #是否显示billing addr(account页)
    REACT_APP_HIDE_ACCOUNT_BILLING_ADDR: '1',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #Accessbility open a new window switch
    REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW: '1',

    // #启用BazaarVoice ratings&reviews功能
    REACT_APP_SHOW_BAZAARVOICE_RATINGS: '1',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-CA-Site/ca_CA/Search-Show'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/ca/',
    REACT_APP_CLIENT_ID: '0oaxwyr03sTQfHG7K0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/ca/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/ca?origin=register',
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
    REACT_APP_HOMEPAGE: '/ca',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/ca',
    REACT_APP_CLIENT_ID: '0oa1dl89f1H6xlJ5L0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/ca/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/ca?origin=register',
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
    REACT_APP_HOMEPAGE: '/ca',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/ca',
    REACT_APP_CLIENT_ID: '0oa1dl89f1H6xlJ5L0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/ca/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/ca?origin=register',
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
    REACT_APP_HOMEPAGE: '/ca',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/ca/',
    REACT_APP_CLIENT_ID: '0oa1dl89f1H6xlJ5L0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/ca/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/ca?origin=register',
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
    REACT_APP_HOMEPAGE: '/ca',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production'
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
  },
  stgwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://stgwedding.royalcanin.com/ca/shop/',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://stgwedding.royalcanin.com/ca/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://stgwedding.royalcanin.com/ca/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/ca/shop/api',

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
    REACT_APP_HOMEPAGE: '/ca/shop',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/ca',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/ca/api',

    REACT_APP_HUB: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  },
  uatwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://uatwedding.royalcanin.com/ca/shop',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://uatwedding.royalcanin.com/ca/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://uatwedding.royalcanin.com/ca/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/ca/shop/api',

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
    REACT_APP_HOMEPAGE: '/ca/shop',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/ca',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/ca/api',

    REACT_APP_HUB: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  }
};

export default env;
