const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    // target: process.env.VUE_APP_URL,
    // target:'http://192.168.2.20:8090/api',
     target: process.env.REACT_APP_BASEURL,
    //target: 'https://shopstg.royalcanin.com/api', 
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
  })
  );
};