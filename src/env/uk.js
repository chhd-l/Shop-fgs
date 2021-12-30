const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'uk',

    // 语言文件
    REACT_APP_LANG_LOCALE: 'en-GB',

    REACT_APP_CALENDAR_LOCALE: 'en-GB',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-TML5H48',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'UK',
    REACT_APP_GA_CURRENCY_CODE: 'GBP',

    // #language
    REACT_APP_LANG: 'uk',
    REACT_APP_HTML_LANG: 'en-GB',
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
    REACT_APP_SHOW_BAZAARVOICE_RATINGS: '0',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-EN-Site/en_EN/Search-Show',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-stg.cloud-effem.com/en-us/manager/settings',

    LOYALTY_PROGRAMME_LINK: 'https://my.royalcanin.co.uk/account/loyalty',
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
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
  },
  shopsit: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',

    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
  },
  shopuat: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',

    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
  },
  shopstg: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

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
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://account.royalcanin.com/en-us/manager/settings'
  },
  // production: {
  //   // #okta
  //   REACT_APP_ACCESS_PATH: 'https://shop.royalcanin.com/',
  //   REACT_APP_CLIENT_ID: '0oa27u66xmv9zhxGI417',
  //   REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
  //   REACT_APP_RedirectURL: 'https://shop.royalcanin.com/implicit/callback',
  //   REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
  //   REACT_APP_RegisterCallback: 'https://shop.royalcanin.com',
  //   REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
  //   REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

  //   // #接口配置
  //   REACT_APP_BASEURL: 'https://shop.royalcanin.com/api',

  //   // #GA环境配置
  //   REACT_APP_GA_ENV: 'prd',

  //   // #设置二级子目录访问页面
  //   REACT_APP_HOMEPAGE: '/',

  //   // #bazaarVoice环境配置
  //   REACT_APP_BAZAARVOICE_ENV: 'production',

  //   // #删除账户
  //   REACT_APP_DELETE_My_ACCOUNT_URL:
  //     'https://account.royalcanin.com/en-us/manager/settings'
  // },
  productionHub: {
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/uk/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk/shop',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://www.royalcanin.com/uk/api',

    REACT_APP_HUB_URLPREFIX: 'https://www.royalcanin.com/uk',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://account.royalcanin.com/en-us/manager/settings',

    // #buyFromRetailBtn
    REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE: 'en-US',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID:
      'eQJAy3lYzN_4a90c5a0-9f60-11ea-9aad-0d70ed4f132015',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET:
      'eQJAy3lYzN_56bc9e30-5036-11eb-b747-4948961b961c27',
    REACT_APP_HUBPAGE_RETAILER_LOCALE: 'en-GB',
    REACT_APP_HUBPAGE_RETAILER_ISAPI: '1'
  },
  stgwedding: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/uk/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk/shop',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/uk/api',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/uk',

    // #buyFromRetailBtn
    REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE: 'en-US',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID:
      'eQJAy3lYzN_4a90c5a0-9f60-11ea-9aad-0d70ed4f132015',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET:
      'eQJAy3lYzN_56bc9e30-5036-11eb-b747-4948961b961c27',
    REACT_APP_HUBPAGE_RETAILER_LOCALE: 'en-GB',
    REACT_APP_HUBPAGE_RETAILER_ISAPI: '1'
  },
  uatwedding: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/uk/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk/shop',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/uk/api',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/uk',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings',

    // #buyFromRetailBtn
    REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE: 'en-US',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID:
      'eQJAy3lYzN_4a90c5a0-9f60-11ea-9aad-0d70ed4f132015',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET:
      'eQJAy3lYzN_56bc9e30-5036-11eb-b747-4948961b961c27',
    REACT_APP_HUBPAGE_RETAILER_LOCALE: 'en-GB',
    REACT_APP_HUBPAGE_RETAILER_ISAPI: '1'
  }
};

export default env;
