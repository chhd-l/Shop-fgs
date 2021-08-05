const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: process.env.REACT_APP_BASEURL,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
  if (process.env.REACT_APP_HUB_APIURL) {
    app
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
  }
};
