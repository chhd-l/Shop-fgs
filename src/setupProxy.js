const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    // target: process.env.VUE_APP_URL,
    target: "http://121.37.129.70:8090",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
  })
  );
};