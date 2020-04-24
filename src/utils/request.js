import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://121.37.129.70:8090/', // api base_url
  // baseURL: process.env.VUE_APP_URL,
  timeout: 60000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  const token = sessionStorage.getItem('rc-token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
})


// response interceptor
service.interceptors.response.use((response) => {
  if (response.data instanceof Blob) {
    return response
  }
  const res = response.data
  if (res.context) {
    return response.data
  } else {
    // return Promise.reject(new Error(res.message || 'Error'))
  }
  // if (res.code !== 200) {
  //   return Promise.reject(new Error(res.msg || 'Error'))
  // } else {
  //   return response.data
  // }
}, err => Promise.reject(err))

export default service