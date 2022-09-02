import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/iconfont/iconfont.css';
import '@/assets/css/global.less';
import '@/utils/global';
import './index.css';
import '@/env/init';

// import App from './App.jsx';

//import * as serviceWorker from './serviceWorker';
import '@/assets/css/checkout.css';

// import './polyfills';
//import registerServiceWorker from './registerServiceWorker';
import { initShopConfig } from './env';

const developerHelper = () => {
  if (window.location.hostname === "localhost") {
    let times = 0;
    const timer = setInterval(() => {
      times++;
      if (times >= 10) {
        clearInterval(timer);
      }
      document.getElementsByTagName("iframe")?.forEach?.(item => {
        if (item.style.zIndex === "2147483647") {
          item.style.display = "none";
          clearInterval(timer);
        }
      });
    }, 1000);
  }
}


initShopConfig().then(() => {
  const App = require('./App.jsx').default;
  ReactDOM.render(
    <App />,
    /*<React.StrictMode>
      <App />
    </React.StrictMode>,*/
    document.getElementById('root')
  );
  console.log('★★★★★★★★★ 当前国家： ', window.__.env.REACT_APP_COUNTRY);
  console.log('★★★★★★★★★ 当前环境： ', window.__.env.REACT_APP_GA_ENV);
  developerHelper();
});

// console.log('★★★★★★★★★ base url： ',window.__.env.REACT_APP_BASEURL);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
// registerServiceWorker();
