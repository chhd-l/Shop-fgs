import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/iconfont/iconfont.css';
import '@/assets/css/global.less';
import '@/utils/global';
import './index.css';
import '@/env/init';
// import '@/assets/css/royal-canin/royal-canin.styles.forms.min.css';
// import '@/assets/css/royal-canin/royal-canin.styles.icons.min.css';
// import '@/assets/css/royal-canin/royal-canin.styles.progress.min.css';
// import '@/assets/css/royal-canin/royal-canin.styles.rc_type-medium.min.css';
// import '@/assets/css/royal-canin/royal-canin.min.css';
// import '@/assets/css/royal-canin/royal-canin.styles.rc_type-regular.min.css';
// import '@/assets/css/royal-canin/royal-canin.styles.selects.min.css';
// import '@/assets/css/royal-canin/royal-canin.styles.tooltip.min.css';

// import App from './App.jsx';

//import * as serviceWorker from './serviceWorker';
import '@/assets/css/checkout.css';

// import './polyfills';
//import registerServiceWorker from './registerServiceWorker';
import { initShopConfig } from './env';

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
});

// console.log('★★★★★★★★★ base url： ',window.__.env.REACT_APP_BASEURL);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
// registerServiceWorker();
