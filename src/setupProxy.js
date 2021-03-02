const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app;
  // .use(
  //   proxy('/shop/api', {
  //     target: 'https://uatwedding.royalcanin.com/fr/shop/api',
  //     secure: false,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/royalcanin': '/'
  //     }
  //   })
  // )
  // .use(
  //   proxy('/api', {
  //     target: 'https://uatwedding.royalcanin.com/fr/api',
  //     secure: false,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '/'
  //     }
  //   })
  // );

  app
    .use(
      proxy('/api', {
        target: process.env.REACT_APP_BASEURL,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      })
    )
    .use(
      proxy('/navigation', {
        target: `${process.env.REACT_APP_HUB_APIURL}/navigation`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/navigation': '/'
        }
      })
    )
    .use(
      proxy('/footer', {
        target: `${process.env.REACT_APP_HUB_APIURL}/footer`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/footer': '/'
        }
      })
    )
    .use(
      proxy('/royalcanin', {
        target: `${process.env.REACT_APP_HUB_APIURL}/royalcanin`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/royalcanin': '/'
        }
      })
    )
    .use(
      proxy('/languagepicker', {
        target: `${process.env.REACT_APP_HUB_APIURL}/languagepicker`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/languagepicker': '/'
        }
      })
    );
};
