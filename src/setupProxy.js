const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    // target: process.env.VUE_APP_URL,
    target: "https://shopuat.466920.com/api",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
  })
  );
};