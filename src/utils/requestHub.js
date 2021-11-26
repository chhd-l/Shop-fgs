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

export default service;
