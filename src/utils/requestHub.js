import axios from 'axios';

let env = process.env.NODE_ENV;
let base_url;
if (env === 'development') {
  base_url = '';
} else if (env === 'production') {
  base_url = window.__.env.REACT_APP_HUB_APIURL;
}

// 创建 axios 实例
const service = axios.create({
  baseURL: base_url,
  timeout: 600000 // 请求超时时间
});

// request interceptor
service.interceptors.request.use((config) => {
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
    if (
      response.status === 200 &&
      response.headers['content-type'].includes('application/json')
    ) {
      return response.data;
    } else {
      return Promise.reject(response.data || 'Error');
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default service;
