const env_de = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'de',

    // 语言文件
    REACT_APP_LANG_LOCALE: 'de-DE',

    REACT_APP_CALENDAR_LOCALE: 'de-DE',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-NCWZQ3',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'DE',
    REACT_APP_GA_CURRENCY_CODE: 'EUR',

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
    REACT_APP_CUSTOM_REGISTER: '1',
    REACT_APP_COOKIE_SETTINGS_BTN_VISIBLE: '1'
  },
  development: {
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  shopsit: {
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

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  shopuat: {
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

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  shopstg: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/de'
  },
  production: {
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.de/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  },
  productionWww: {
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.shop.royalcanin.de/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  }
};

export default env_de;
