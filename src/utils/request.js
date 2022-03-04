import axios from 'axios';
import qs from 'qs';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

let env = process.env.NODE_ENV;
let base_url;
if (env === 'development') {
  base_url = '/api';
} else if (env === 'production') {
  base_url = window.__.env.REACT_APP_BASEURL;
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
    config.headers['Session-Key'] = 'Bearer ' + token;
  }
  if (config.method && config.method.toLocaleLowerCase() === 'get') {
    config.params = {
      requestId: Math.random(),
      ...config.params
    };
    Object.assign(config, {
      paramsSerializer: function (params) {
        return qs.stringify(params, {
          arrayFormat: 'indices',
          allowDots: true
        });
      }
    });
  }
  if (window.__.env?.REACT_APP_LANG_LOCALE) {
    config.headers['Accept-Language'] = window.__.env.REACT_APP_LANG_LOCALE;
  }
  // if (window.__.env?.REACT_APP_COUNTRY) {
  //   config.headers['Accept-Language'] = {
  //     us: 'en-US',
  //     mx: 'es-MX',
  //     de: 'de',
  //     fr: 'fr',
  //     tr: 'tr',
  //     ru: 'ru',
  //     cn: 'zh-CN',
  //     uk: 'en-GB',
  //     sv: 'sv-SE'
  //   }[window.__.env.REACT_APP_COUNTRY];
  // }
  if (window.__.env?.REACT_APP_STOREID) {
    config.headers['storeId'] = window.__.env.REACT_APP_STOREID;
    // config.headers['storeId'] =
    //   config.url == '/delivery/timeSlot'
    //     ? 123457907
    //     : window.__.env.REACT_APP_STOREID; //日本暂时用的俄罗斯店铺数据
  }
  config.headers['X-Content-Type-Options'] = 'nosniff';
  config.headers['Permissions-Policy'] = 'microphone=()';
  config.headers['Referrer-Policy'] = 'no-referrer';
  config.headers['X-Frame-Options'] = 'sameorigin';
  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Strict-Transport-Security'] =
    'max-age=31536000; includeSubDomains';

  // 添加取消标记
  config.cancelToken = new axios.CancelToken((cancel) => {
    window.axiosCancel = window.axiosCancel || [];
    window.axiosCancel.push({
      cancel
    });
  });

  return config;
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) {
      return response;
    }
    if (response.headers.jsessionid) {
      sessionItemRoyal.set('jsessionid', response.headers.jsessionid);
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
        // localItemRoyal.get('rc-token') &&
        response.status === 200 &&
        response.data &&
        (response.data.code === 'K-000002' || response.data.code === 'E-000049')
      ) {
        sessionItemRoyal.set('rc-token-lose', 1);
        window.location.href = window.__.env.REACT_APP_HOMEPAGE;
      }
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
