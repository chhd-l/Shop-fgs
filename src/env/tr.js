const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'tr',

    // 语言文件
    REACT_APP_LANG_LOCALE: 'tr-TR',

    REACT_APP_CALENDAR_LOCALE: 'tr-TR',

    // #payu表单字段控制
    REACT_APP_PAYU_EMAIL: '0',
    REACT_APP_PAYU_PHONE: '0',
    REACT_APP_PAYU_SUPPORT_INSTALLMENT: '1',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-MH74J3M',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'TR',
    REACT_APP_GA_CURRENCY_CODE: 'TRY',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_STYLE: '',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-tr',

    // #storid
    REACT_APP_STOREID: '123457911',

    // #最低限额
    REACT_APP_MINIMUM_AMOUNT: '0 ',
    // #商品数量限制(所有产品)
    REACT_APP_LIMITED_NUM_ALL_PRODUCT: '100',
    // #商品数量限制(单个产品)
    REACT_APP_LIMITED_NUM: '20',
    // #商品种类限制
    REACT_APP_LIMITED_CATE_NUM: '100',

    // #language
    REACT_APP_LANG: 'tr',
    REACT_APP_HTML_LANG: 'tr',
    REACT_APP_NAVIGATOR_LANG: 'tr',
    REACT_APP_CURRENCY: 'TRY',

    // #是否开启promotion
    REACT_APP_IS_PROMOTION: 'true',
    // #是否显示banner上方tip
    REACT_APP_SHOW_BANNERTIP: 'true',

    // #默认country
    REACT_APP_DEFAULT_COUNTRYID: '4905',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'false',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '0',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-TR-Site/tr_TR/Search-Show'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/tr/',
    REACT_APP_CLIENT_ID: '0oaxwyuykheNWok6q0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/tr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/tr?origin=register',
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

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '8e43358c-1784-48e1-88b1-b6d1dcd73576-test'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/tr',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/tr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/tr?origin=register',
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
      '8e43358c-1784-48e1-88b1-b6d1dcd73576-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/tr',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/tr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/tr?origin=register',
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
      '8e43358c-1784-48e1-88b1-b6d1dcd73576-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/tr/',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/tr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/tr?origin=register',
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
      '8e43358c-1784-48e1-88b1-b6d1dcd73576-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr'
  },
  production: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shop.royalcanin.com.tr',
    REACT_APP_CLIENT_ID: '0oao1atdkNEZ5DQmK416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royalcanin.com.tr/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royalcanin.com.tr',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.com.tr/api',

    // #payu
    REACT_APP_PaymentENV: 'live',
    REACT_APP_PaymentKEY_MEMBER: '14e583fb-3878-4e85-94fb-4dc17ec38a36',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.fgs_tr_ms',
    REACT_APP_PaymentKEY_VISITOR: '14e583fb-3878-4e85-94fb-4dc17ec38a36',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.fgs_tr_ms',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '8e43358c-1784-48e1-88b1-b6d1dcd73576',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  },
  productionHub: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://www.royalcanin.com/tr/shop',
    REACT_APP_CLIENT_ID: '0oao1atdkNEZ5DQmK416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://www.royalcanin.com/tr/shop/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://www.royalcanin.com/tr/shop',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/tr/shop/api',

    // #payu
    REACT_APP_PaymentENV: 'live',
    REACT_APP_PaymentKEY_MEMBER: '14e583fb-3878-4e85-94fb-4dc17ec38a36',
    REACT_APP_PaymentAPPID_MEMBER: 'com.razorfish.fgs_tr_ms',
    REACT_APP_PaymentKEY_VISITOR: '14e583fb-3878-4e85-94fb-4dc17ec38a36',
    REACT_APP_PaymentAPPID_VISITOR: 'com.razorfish.fgs_tr_ms',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '8e43358c-1784-48e1-88b1-b6d1dcd73576',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr/shop',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://www.royalcanin.com/tr/api',

    REACT_APP_HUB_URLPREFIX: 'https://www.royalcanin.com/tr',

    REACT_APP_HUB: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  },
  stgwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://stgwedding.royalcanin.com/tr/shop/',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://stgwedding.royalcanin.com/tr/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://stgwedding.royalcanin.com/tr/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/tr/shop/api',

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
      '8e43358c-1784-48e1-88b1-b6d1dcd73576-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr/shop',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/tr',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/tr/api',

    REACT_APP_HUB: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',
    REACT_APP_HUBPAGE_RETAILER_ISURL: '1',
    REACT_APP_HUBPAGE_RETAILER_URL: 'http://www.royalcanin.com/tr/where-to-buy'
  },
  uatwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://uatwedding.royalcanin.com/tr/shop',
    REACT_APP_CLIENT_ID: '0oa1dlbj1dsOIbOLu0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://uatwedding.royalcanin.com/tr/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://uatwedding.royalcanin.com/tr/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/tr/shop/api',

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
      '8e43358c-1784-48e1-88b1-b6d1dcd73576-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr/shop',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/tr',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/tr/api',

    REACT_APP_HUB: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',
    REACT_APP_HUBPAGE_RETAILER_ISURL: '1',
    REACT_APP_HUBPAGE_RETAILER_URL: 'http://www.royalcanin.com/tr/where-to-buy'
  }
};

export default env;
