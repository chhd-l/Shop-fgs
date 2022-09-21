const env = {
  base: {
    // #国家
    REACT_APP_STOREID: '123457910',
    REACT_APP_COUNTRY: 'us',
    REACT_APP_LANG_LOCALE: 'en-US',
    REACT_APP_CURRENCY: 'USD'
  },
  development: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us'
  },
  shopsit: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us'
  },
  shopuat: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us'
  },
  uatwedding: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us/shop'
  },
  shopstg: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us'
  },
  stgwedding: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us/shop'
  },
  production: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  },
  productionHub: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us/shop'
  }
};

export default env;
