const env_fr = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'fr',

    // #Adyen
    REACT_APP_Adyen_locale: 'fr-FR',
    REACT_APP_Adyen_country: 'FR',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-PMW3VKL',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'FR',
    REACT_APP_GA_CURRENCY_CODE: 'EUR',

    // #onetrust
    REACT_APP_ONTRUST_SRC:
      'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
    REACT_APP_ONTRUST_STYLE:
      'https://d1a19ys8w1wkc1.cloudfront.net/one-trust-rc-styles.css?v=one-trust-rc-styles--001',

    // #storid
    REACT_APP_STOREID: '123457909',

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

    // #language
    REACT_APP_LANG: 'fr',
    REACT_APP_NAVIGATOR_LANG: 'fr',
    REACT_APP_CURRENCY: 'EUR',

    // #是否开启promotion
    REACT_APP_IS_PROMOTION: 'true',
    // #是否显示banner上方tip
    REACT_APP_SHOW_BANNERTIP: 'true',

    // #默认country
    REACT_APP_DEFAULT_COUNTRYID: '2612',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'false',

    // #PLP cover style
    REACT_APP_PLP_STYLE: 'layout-global',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-fr'
  },
  development: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.466920.com/fr/',
    REACT_APP_CLIENT_ID: '0oav5vxcw87QM2rd60h7',
    REACT_APP_ISSUER: 'https://accountdev.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shopuat.466920.com/fr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shopuat.466920.com/fr?origin=register',
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',
    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',
    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wdWF0LjQ2NjkyMC5jb20.q77RJ2MW5gIA3cRvKrL_ExnY97Lq7YQmKm_rwXdUZSE',
    REACT_APP_Adyen_ENV: 'test',
    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',
    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr'
  },
  shopsit: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopsit.royalcanin.com/fr',
    REACT_APP_CLIENT_ID: '0oaumim2wz6cyyubX0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopsit.royalcanin.com/fr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopsit.royalcanin.com/fr?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',
    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',
    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc2l0LnJveWFsY2FuaW4uY29t.dFwiVP07vLuJ0MRkzioYExlX4hnaBQnETquTzkjX49g',
    REACT_APP_Adyen_ENV: 'test',
    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',
    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr'
  },
  shopuat: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopuat.royalcanin.com/fr',
    REACT_APP_CLIENT_ID: '0oaumim2wz6cyyubX0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopuat.royalcanin.com/fr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopuat.royalcanin.com/fr?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc2l0LnJveWFsY2FuaW4uY29t.dFwiVP07vLuJ0MRkzioYExlX4hnaBQnETquTzkjX49g',
    REACT_APP_Adyen_ENV: 'test',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr'
  },
  uatwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://uatwedding.royalcanin.com/fr/shop',
    REACT_APP_CLIENT_ID: '0oaumim2wz6cyyubX0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://uatwedding.royalcanin.com/fr/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://uatwedding.royalcanin.com/fr/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/fr/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly91YXR3ZWRkaW5nLnJveWFsY2FuaW4uY29t.6fzWHm5A89YXisx2sZdrr_qOHKAdvji6rOXcwdB_lTA',
    REACT_APP_Adyen_ENV: 'test',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-fr',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr/shop',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/fr/api',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/fr',

    REACT_APP_HUB_MONROYALCANIN:
      'https://mon.royalcanin.fr/connexion/?_ga=2.267431690.500684309.1611668454-1487729967.1600939226',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #buy from retailer widget config
    REACT_APP_HUBPAGE_RETAILER_WIDGETID:
      'eQJAy3lYzN_bc061c10-9ad5-11ea-8690-bd692fbec1ed25',
    REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE: 'fr',
    REACT_APP_HUBPAGE_RETAILER_LOCALE: 'fr-FR',

    // #app下载链接
    REACT_APP_GOOGLEPLAY_APP_LINK:
      'https://play.google.com/store/apps/details?id=com.royalcanin.royalcaninetmoi&hl=en&gl=US',
    REACT_APP_APP_STORE_LINK:
      'https://apps.apple.com/fr/app/royal-canin-moi/id1440585946'
  },
  shopstg: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shopstg.royalcanin.com/fr',
    REACT_APP_CLIENT_ID: '0oaumim2wz6cyyubX0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://shopstg.royalcanin.com/fr/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://shopstg.royalcanin.com/fr?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zaG9wc3RnLnJveWFsY2FuaW4uY29t.ZJgztbWWD0AsiF8fRONvngA8Ar7WmuEKIoXl_SWOuTQ',
    REACT_APP_Adyen_ENV: 'test',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr'
  },
  stgwedding: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://stgwedding.royalcanin.com/fr/shop/',
    REACT_APP_CLIENT_ID: '0oaumim2wz6cyyubX0x6',
    REACT_APP_ISSUER: 'https://accountpreview.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://stgwedding.royalcanin.com/fr/shop/implicit/callback',
    REACT_APP_RegisterPrefix:
      'https://prd-weu1-rc-df-ciam-app-webapp-stg.cloud-effem.com/?redirect_uri=',
    REACT_APP_RegisterCallback:
      'https://stgwedding.royalcanin.com/fr/shop?origin=register',
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/fr/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.8015632026961356.aHR0cHM6Ly9zdGd3ZWRkaW5nLnJveWFsY2FuaW4uY29t.85XdEx9CVlOgIcsh4wbG_at50lHOt-Pp-c87g6IJMaE',
    REACT_APP_Adyen_ENV: 'test',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT:
      '83dcdb6d-4c72-4616-83c5-05930054b124-test',

    // #mars global footer
    REACT_APP_MARS_FOOTER:
      'https://footer.mars.com/js/footer.js.aspx?royalcanin-com-fr',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr/shop',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/fr/api',

    REACT_APP_HUB_MONROYALCANIN:
      'https://mon.royalcanin.preprod.b2c.royalcanin.typhon.net/',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/fr',

    // #buy from retailer widget config
    REACT_APP_HUBPAGE_RETAILER_WIDGETID:
      'eQJAy3lYzN_bc061c10-9ad5-11ea-8690-bd692fbec1ed25',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET:
      'eQJAy3lYzN_56bc9e30-5036-11eb-b747-4948961b961c27',

    REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE: 'fr',
    REACT_APP_HUBPAGE_RETAILER_LOCALE: 'fr-FR',

    // #app下载链接
    REACT_APP_GOOGLEPLAY_APP_LINK:
      'https://play.google.com/store/apps/details?id=com.royalcanin.royalcaninetmoi&hl=en&gl=US',
    REACT_APP_APP_STORE_LINK:
      'https://apps.apple.com/fr/app/royal-canin-moi/id1440585946'
  },
  production: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://shop.royalcanin.fr/',
    REACT_APP_CLIENT_ID: '0oade1kj2eANKVKr5416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL: 'https://shop.royalcanin.fr/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://shop.royalcanin.fr',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.fr/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.4116105963663555.aHR0cHM6Ly9zaG9wLnJveWFsY2FuaW4uZnI.rucJ6a_37NQ78_56FvoQZWw3HMo6xjqYm1fgrJ1lMjU',
    REACT_APP_Adyen_ENV: 'live',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '83dcdb6d-4c72-4616-83c5-05930054b124',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  },
  productionHub: {
    // #okta
    REACT_APP_ACCESS_PATH: 'https://www.royalcanin.com/fr/shop',
    REACT_APP_CLIENT_ID: '0oade1kj2eANKVKr5416',
    REACT_APP_ISSUER: 'https://signin.royalcanin.com/oauth2/default',
    REACT_APP_RedirectURL:
      'https://www.royalcanin.com/fr/shop/implicit/callback',
    REACT_APP_RegisterPrefix: 'https://welcome.royalcanin.com/?redirect_uri=',
    REACT_APP_RegisterCallback: 'https://www.royalcanin.com/fr/shop',
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/fr/shop/api',

    // #Adyen
    REACT_APP_AdyenOriginKEY:
      'pub.v2.4116105963663555.aHR0cHM6Ly93d3cucm95YWxjYW5pbi5jb20.Pt79h2nIGEEoEjZoUzEjYk_GoaF74rx1-GiJ-_GqQrc',
    REACT_APP_Adyen_ENV: 'live',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #onetrust
    REACT_APP_ONTRUST_DOMAIN_SCRIPT: '83dcdb6d-4c72-4616-83c5-05930054b124',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/fr/shop',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    // #根节点自定义样式名
    REACT_APP_ROOT_CLS: 'ui-custom-hub',

    REACT_APP_HUB: '1',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://www.royalcanin.com/fr/api',

    REACT_APP_HUB_URLPREFIX: 'https://www.royalcanin.com/fr',

    REACT_APP_HUB_MONROYALCANIN:
      'https://mon.royalcanin.fr/connexion/?_ga=2.267431690.500684309.1611668454-1487729967.1600939226',

    // #buy from retailer widget config
    REACT_APP_HUBPAGE_RETAILER_WIDGETID:
      'eQJAy3lYzN_4a90c5a0-9f60-11ea-9aad-0d70ed4f132015',
    REACT_APP_HUBPAGE_RETAILER_WIDGETID_VET:
      'eQJAy3lYzN_56bc9e30-5036-11eb-b747-4948961b961c27',
    REACT_APP_HUBPAGE_RETAILER_DISPLAY_LANGUAGE: 'fr',
    REACT_APP_HUBPAGE_RETAILER_LOCALE: 'fr-FR',

    // #app下载链接
    REACT_APP_GOOGLEPLAY_APP_LINK:
      'https://play.google.com/store/apps/details?id=com.royalcanin.royalcaninetmoi&hl=en&gl=US',
    REACT_APP_APP_STORE_LINK:
      'https://apps.apple.com/fr/app/royal-canin-moi/id1440585946'
  }
};
export default env_fr;
