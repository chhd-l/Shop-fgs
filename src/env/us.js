const env = {
  base: {
    // #国家
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
  shopstg: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/us'
  },
  production: {
    // #设置二级子目录访问页面
    REACT_APP_HOMEPAGE: '/'
  }
};

export default env;
