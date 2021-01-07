import axios from 'axios';
import qs from 'qs';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

let env = process.env.NODE_ENV;
let base_url;
if (env === 'development') {
  // base_url = process.env.REACT_APP_BASEURL
  base_url = '/api';
} else if (env === 'production') {
  base_url = process.env.REACT_APP_BASEURL;
}

// 创建 axios 实例
const service = axios.create({
  baseURL: base_url,
  timeout: 600000 // 请求超时时间
});

// request interceptor
service.interceptors.request.use((config) => {
  const token =
    sessionItemRoyal.get('rc-token') || localItemRoyal.get('rc-token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  if(config.method&&config.method.toLocaleLowerCase() === 'get'){
      Object.assign(config,{
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "indices" });
        }
      })
    }
  config.headers['Accept-Language'] = {
    en: 'en-US',
    es: 'es-MX',
    de: 'de',
    fr: 'fr',
    tr: 'tr',
    ru: 'ru',
    cn: 'zh-CN'
  }[process.env.REACT_APP_LANG];
  config.headers['storeId'] = process.env.REACT_APP_STOREID;
  return config;
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) {
      return response;
    }
    if (response.headers.jsessionid) {
      sessionItemRoyal.set('jsessionid', response.headers.jsessionid)
    }
    if (
      response.status === 200 &&
      response.data &&
      response.data.code === 'K-000000'
    ) {
      return response.data;
    } else {
      // token失效处理
      if (
        localItemRoyal.get('rc-token') &&
        response.status === 200 &&
        response.data &&
        response.data.code === 'K-000002'
      ) {
        sessionItemRoyal.set('rc-token-lose', 1);
        window.location.href = process.env.REACT_APP_HOMEPAGE;
      }
      console.log(response);
      let ret = response.data || 'Error';

      // 支付失败获取订单号处理
      if (
        response.data &&
        response.data.message &&
        (response.data.message
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes('paymenterror') ||
          response.data.message
            .replace(/\s+/g, '')
            .toLowerCase()
            .includes('payordererror'))
      ) {
        ret = {
          message: response.data.message,
          errorData: response.data.errorData
        };
      }
      return Promise.reject(ret);
    }
  },
  (err) => {
    if (
      err.response &&
      err.response.status >= 500 &&
      window.location.pathname !== '/500'
    ) {
      // history.push('/500')
      // window.location.href = window.location.href + '500'
      // window.location.reload()
    }
    return Promise.reject(err);
  }
);

export default service;
