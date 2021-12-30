const env_fr = {
  base: {
    // #国家
    REACT_APP_COUNTRY: 'core',

    REACT_APP_CALENDAR_LOCALE: 'fr-FR',

    // #GA环境配置
    REACT_APP_GA_GTMID: 'GTM-PMW3VKL',
    REACT_APP_GTM_SITE_ID: 'RCGlobalPCO1',
    REACT_APP_GA_COUNTRY: 'FR',
    REACT_APP_GA_CURRENCY_CODE: 'EUR',

    // #storid
    REACT_APP_STOREID: '123457913',

    // #最低限额
    REACT_APP_MINIMUM_AMOUNT: '0',
    // #商品数量限制(所有产品)
    REACT_APP_LIMITED_NUM_ALL_PRODUCT: '100',
    // #商品数量限制(单个产品)
    REACT_APP_LIMITED_NUM: '20',
    // #商品种类限制
    REACT_APP_LIMITED_CATE_NUM: '100',

    // #language
    REACT_APP_LANG: 'en',
    REACT_APP_HTML_LANG: 'en',
    REACT_APP_NAVIGATOR_LANG: 'en',
    REACT_APP_CURRENCY: 'USD',

    // #默认country
    REACT_APP_DEFAULT_COUNTRYID: '2612',

    // #下单流程是否需要clinic
    REACT_APP_CHECKOUT_WITH_CLINIC: 'false',

    // #PDP RATING SETTING
    REACT_APP_PDP_RATING_VISIBLE: '0',

    REACT_APP_HIDE_ACCOUNT_COMMUNICATION_MESSENGERS: '1',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_SEARCH_LINK:
      '/on/demandware.store/Sites-CORE-Site/core_CORE/Search-show'
  },
  development: {
    REACT_APP_FaceBook_IDP: '0oat2htelxpazCKA70h7',
    REACT_APP_Google_IDP: '0oas0dmwhfcnkpIW80h7',
    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.466920.com/api',
    // #GA环境配置
    REACT_APP_GA_ENV: 'dev',
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core'
  },
  shopsit: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',
    // #接口配置
    REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api',
    // #GA环境配置
    REACT_APP_GA_ENV: 'sit',
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core'
  },
  shopuat: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core'
  },
  uatwedding: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://uatwedding.royalcanin.com/core/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'uat',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core/shop',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://uatwedding.royalcanin.com/core/api',

    REACT_APP_HUB_URLPREFIX: 'https://uatwedding.royalcanin.com/core',

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
      'https://apps.apple.com/core/app/royal-canin-moi/id1440585946'
  },
  shopstg: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core'
  },
  stgwedding: {
    REACT_APP_FaceBook_IDP: '0oarsmtlhd1q9NyPb0x6',
    REACT_APP_Google_IDP: '0oarsoyvckBINudT70x6',

    // #接口配置
    REACT_APP_BASEURL: 'https://stgwedding.royalcanin.com/core/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'stg',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core/shop',

    // #delete接口前缀
    REACT_APP_HUB_APIURL: 'https://stgwedding.royalcanin.com/core/api',

    REACT_APP_HUB_MONROYALCANIN:
      'https://mon.royalcanin.preprod.b2c.royalcanin.typhon.net/',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

    REACT_APP_HUB_URLPREFIX: 'https://stgwedding.royalcanin.com/core',

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
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://shop.royalcanin.fr/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  },
  productionHub: {
    REACT_APP_FaceBook_IDP: '0oa75jv7oSeLBnnkt416',
    REACT_APP_Google_IDP: '0oa75klujN7PkgedM416',

    // #接口配置
    REACT_APP_BASEURL: 'https://www.royalcanin.com/core/shop/api',

    // #GA环境配置
    REACT_APP_GA_ENV: 'prd',

    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/core/shop',

    // #HUB_GA
    REACT_APP_HUB_GA: '1',

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
