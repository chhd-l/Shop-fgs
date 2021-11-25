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
    REACT_APP_Adyen_locale: 'en-GB',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '8923767a-c9c8-4c36-ae5f-97af6af42bdb-test',
    REACT_APP_ONTRUST_STYLE: '',

    // #language
    REACT_APP_LANG: 'uk',
    REACT_APP_NAVIGATOR_LANG: 'en',
    REACT_APP_CURRENCY: 'GBP',

    // #storid
    REACT_APP_STOREID: '123457916',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
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
      '/on/demandware.store/Sites-EN-Site/en_EN/Search-Show',

    // #删除账户
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-stg.cloud-effem.com/en-us/manager/settings',

    LOYALTY_PROGRAMME_LINK: 'https://my.royalcanin.co.uk/account/loyalty'
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

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
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

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc2l0LnJveWFsY2FuaW4uY29t.dFwiVP07vLuJ0MRkzioYExlX4hnaBQnETquTzkjX49g',
    REACT_APP_Adyen_ENV: 'test',
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
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

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk',

    // #bazaarVoice环境配置
    REACT_APP_BAZAARVOICE_ENV: 'staging',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wdWF0LnJveWFsY2FuaW4uY29t.ACjjK1gDH6I6S1VqifJ1ifQlI9uZradDIClbzmdEuDQ',
    REACT_APP_Adyen_ENV: 'test',
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
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
    REACT_APP_CLIENT_ID: '0oa27u66xmv9zhxGI417',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royalcanin.com/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royalcanin.com',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '8923767a-c9c8-4c36-ae5f-97af6af42bdb',

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
  productionHub: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://www.royalcanin.com/uk/shop',
    REACT_APP_CLIENT_ID: '0oa27u66xmv9zhxGI417',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://www.royalcanin.com/uk/shop/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://www.royalcanin.com/uk/shop',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/uk/shop/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.4116377247202506.aHR0cHM6Ly93d3cucm95YWxjYW5pbi5jb20.dQWAy2uSu5M80k2hy9aZfeCAAAfIyB61SE_-2DhqRX4',
    REACT_APP_Adyen_ENV: 'live',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '8923767a-c9c8-4c36-ae5f-97af6af42bdb',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk/shop',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://www.royalcanin.com/uk/api',

    REACT_APP_HUB_URLPREFIX: 'https://www.royalcanin.com/uk'
  },
  stgwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://stgwedding.royalcanin.com/uk/shop/',
    REACT_APP_CLIENT_ID: '0oa22exzn8qt1uwnk0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://stgwedding.royalcanin.com/uk/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://stgwedding.royalcanin.com/uk/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/uk/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zdGd3ZWRkaW5nLnJveWFsY2FuaW4uY29t.85XdEx9CVlOgIcsh4wbG_at50lHOt-Pp-c87g6IJMaE',
    REACT_APP_Adyen_ENV: 'test',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-uk',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk/shop',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/uk/api',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/uk'
  },
  uatwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://uatwedding.royalcanin.com/uk/shop',
    REACT_APP_CLIENT_ID: '0oa22exzn8qt1uwnk0x7',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://uatwedding.royalcanin.com/uk/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://uatwedding.royalcanin.com/uk/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/uk/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly91YXR3ZWRkaW5nLnJveWFsY2FuaW4uY29t.6fzWHm5A89YXisx2sZdrr_qOHKAdvji6rOXcwdB_lTA',
    REACT_APP_Adyen_ENV: 'test',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-uk',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/uk/shop',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/uk/api',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/uk',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',
    REACT_APP_DELETE_My_ACCOUNT_URL:
      'https://prd-weu1-rc-df-myaccount-app-webapp-dev.cloud-effem.com/en-us/manager/settings'
  }
};

export default env;
