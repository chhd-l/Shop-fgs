const proxy = require('http-proxy-middleware');
const interfacePrefix = require('./env/interface-prefix');

// fgs/hub代理map
const baseUrlConfig = interfacePrefix[process.env.REACT_APP_START_ENV]({
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
      target: baseUrlConfig.REACT_APP_BASEURL,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
  if (baseUrlConfig.REACT_APP_HUB_APIURL) {
    app
      .use(
        proxy('/navigation', {
          target: `${baseUrlConfig.REACT_APP_HUB_APIURL}/navigation`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/navigation': '/'
          }
        })
      )
      .use(
        proxy('/footer', {
          target: `${baseUrlConfig.REACT_APP_HUB_APIURL}/footer`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/footer': '/'
          }
        })
      )
      .use(
        proxy('/royalcanin', {
          target: `${baseUrlConfig.REACT_APP_HUB_APIURL}/royalcanin`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/royalcanin': '/'
          }
        })
      )
      .use(
        proxy('/languagepicker', {
          target: `${baseUrlConfig.REACT_APP_HUB_APIURL}/languagepicker`,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/languagepicker': '/'
          }
        })
      );
  }
};
