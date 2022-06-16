const env = {
  base: {
    // #storid
    REACT_APP_STOREID: '123457911',
    REACT_APP_LANG_LOCALE: 'tr-TR',
    REACT_APP_CURRENCY: 'TRY'
  },
  development: {
    REACT_APP_HOMEPAGE: '/tr'
  },
  shopsit: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr'
  },
  shopuat: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr'
  },
  shopstg: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr'
  },
  production: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  },
  productionHub: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr/shop'
  },
  stgwedding: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr/shop'
  },
  uatwedding: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/tr/shop'
  }
};

export default env;
