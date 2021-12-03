const proxy = require('http-proxy-middleware');

// fgs/hub代理map
const localEnv = {
  development: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopuat.466920.com/api'
    };
  },
  shopsit: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopsit.royalcanin.com/api'
    };
  },
  shopuat: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopuat.royalcanin.com/api'
    };
  },
  uatwedding: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: `https://uatwedding.royalcanin.com/${countryFromLink}/shop/api`,
      REACT_APP_HUB_APIURL: `https://uatwedding.royalcanin.com/${countryFromLink}/api`
    };
  },
  shopstg: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: 'https://shopstg.royalcanin.com/api'
    };
  },
  stgwedding: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: `https://stgwedding.royalcanin.com/${countryFromLink}/shop/api`,
      REACT_APP_HUB_APIURL: `https://stgwedding.royalcanin.com/${countryFromLink}/api`
    };
  },
  production: ({ countryFromLink }) => {
    let ret = {};
    switch (countryFromLink) {
      case 'mx':
        ret = {
          REACT_APP_BASEURL: 'https://shop.royalcanin.mx/api'
        };
        break;
      case 'us':
        ret = {
          REACT_APP_BASEURL: 'https://shop.royalcanin.com/api'
        };
        break;
      case 'de':
        ret = {
          REACT_APP_BASEURL: 'https://shop.royalcanin.de/api'
        };
        break;
    }
    return ret;
  },
  productionHub: ({ countryFromLink }) => {
    return {
      REACT_APP_BASEURL: `https://www.royalcanin.com/${countryFromLink}/shop/api`,
      REACT_APP_HUB_APIURL: `https://www.royalcanin.com/${countryFromLink}/api`
    };
  }
};

const targetConfig = localEnv[process.env.REACT_APP_START_ENV]({
  countryFromLink: process.env.REACT_APP_START_COUNTRY_LINK
});

// if (!process.env.REACT_APP_BASEURL) {
//   throw new Error(
//     '亲爱的前端er, 您启动了开发模式，但接口代理未设置成功，请在.env文件中设置对应变量，以确保正常运行'
//   );
// }

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: targetConfig.REACT_APP_BASEURL,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
  if (targetConfig.REACT_APP_HUB_APIURL) {
    app
      .use(
        proxy('/navigation', {
          target: `${targetConfig.REACT_APP_HUB_APIURL}/navigation`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/navigation': '/'
          }
        })
      )
      .use(
        proxy('/footer', {
          target: `${targetConfig.REACT_APP_HUB_APIURL}/footer`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/footer': '/'
          }
        })
      )
      .use(
        proxy('/royalcanin', {
          target: `${targetConfig.REACT_APP_HUB_APIURL}/royalcanin`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/royalcanin': '/'
          }
        })
      )
      .use(
        proxy('/languagepicker', {
          target: `${targetConfig.REACT_APP_HUB_APIURL}/languagepicker`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/languagepicker': '/'
          }
        })
      );
  }
};
