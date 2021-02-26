import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
//import * as serviceWorker from './serviceWorker';
import '@/assets/css/checkout.css'
// import './polyfills';
//import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
  <App />,
  /*<React.StrictMode>
    <App /> 
  </React.StrictMode>,*/
  document.getElementById('root')
);
console.log('★★★★★★★★★ 当前国家： ',process.env.REACT_APP_GA_COUNTRY);
console.log('★★★★★★★★★ 当前环境： ',process.env.REACT_APP_GA_ENV);
console.log('★★★★★★★★★ base url： ',process.env.REACT_APP_BASEURL);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
// registerServiceWorker();
