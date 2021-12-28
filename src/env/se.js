const env = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'se',

    // 语言文件
    REACT_APP_LANG_LOCALE: 'sv-SE',

    REACT_APP_CALENDAR_LOCALE: 'sv-SE',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-TML5H48',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'SE',
    REACT_APP_GA_CURRENCY_CODE: 'USD',

    // #language
    REACT_APP_LANG: 'se',
    REACT_APP_HTML_LANG: 'se',
    REACT_APP_NAVIGATOR_LANG: 'sv',
    REACT_APP_CURRENCY: 'SEK',

    // #storid
    REACT_APP_STOREID: '123457915',

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
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/se/',
    REACT_APP_CLIENT_ID: '0oaxwyr03sTQfHG7K0h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/se/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/se?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/se',
    REACT_APP_CLIENT_ID: '0oa22elmt4XWIrcNr0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/se/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/se?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/se',
    REACT_APP_CLIENT_ID: '0oa22elmt4XWIrcNr0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/se/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/se?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/se/',
    REACT_APP_CLIENT_ID: '0oa22elmt4XWIrcNr0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/se/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/se?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se',

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

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'production'
  },
  productionHub: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://www.royalcanin.com/se/shop',
    REACT_APP_CLIENT_ID: '0oa27u66xmv9zhxGI417',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://www.royalcanin.com/se/shop/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://www.royalcanin.com/se/shop',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/se/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se/shop',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://www.royalcanin.com/se/api',

    REACT_APP_HUB_URLPREFIX: 'https://www.royalcanin.com/se'
  },
  stgwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://stgwedding.royalcanin.com/se/shop/',
    REACT_APP_CLIENT_ID: '0oa22elmt4XWIrcNr0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://stgwedding.royalcanin.com/se/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://stgwedding.royalcanin.com/se/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/se/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se/shop',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/se/api',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/se'
  },
  uatwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://uatwedding.royalcanin.com/se/shop',
    REACT_APP_CLIENT_ID: '0oa22elmt4XWIrcNr0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://uatwedding.royalcanin.com/se/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://uatwedding.royalcanin.com/se/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/se/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/se/shop',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/se/api',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/se',

    // #HUB_GA
    REACT_APP_HUB_GA: '1'
  }
};

export default env;
