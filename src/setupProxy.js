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
  app.use(
    proxy('/royalcanin', {
      target: 'https://www.royalcanin.com/fr/api/royalcanin',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/royalcanin': '/'
      }
    })
  );
  app.use(
    proxy('/languagepicker', {
      target: 'https://www.royalcanin.com/fr/api/languagepicker',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/languagepicker': '/'
      }
    })
  );
};
