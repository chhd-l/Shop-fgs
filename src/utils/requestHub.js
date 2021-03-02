import axios from 'axios';

let env = process.env.NODE_ENV;
let base_url;
if (env === 'development') {
  // base_url = process.env.REACT_APP_BASEURL
  base_url = '';
} else if (env === 'production') {
  base_url = process.env.REACT_APP_HUB_APIURL;
}

// 创建 axios 实例
const service = axios.create({
  baseURL: base_url,
  timeout: 600000 // 请求超时时间
});

export default service;
