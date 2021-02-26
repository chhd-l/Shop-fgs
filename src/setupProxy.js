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
      target: `${process.env.REACT_APP_HUB_URL}/api/languagepicker`,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/languagepicker': '/'
      }
    })
  );
  app.use(
    proxy('/footer', {
      target: `${process.env.REACT_APP_HUB_FOOTER_URL}/api/footer`,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/footer': '/'
      }
    })
  );
  app.use(
    proxy('/navigation', {
      target:
        'https://59ab1f42-09ad-4a54-bc25-475844fd5238.mock.pstmn.io/uk/api/navigation',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/navigation': '/'
      }
    })
  );
};
