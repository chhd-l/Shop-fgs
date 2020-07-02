import axios from 'axios'

let env = process.env.NODE_ENV
let base_url
if (env === 'development') {
  // base_url = process.env.REACT_APP_BASEURL
  base_url = '/api'
} else if (env === 'production') {
  base_url = process.env.REACT_APP_BASEURL
}



// 创建 axios 实例
const service = axios.create({
  baseURL: base_url,
  timeout: 60000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  const token = sessionStorage.getItem('rc-token') || localStorage.getItem('rc-token')
  if (token) {
    config.headers['Authorization'] = 'Bearer '
      + token
  }
  return config
})


// response interceptor
service.interceptors.response.use((response) => {
  if (response.data instanceof Blob) {
    return response
  }
  if (response.status === 200 && response.data && response.data.code === 'K-000000') {
    return response.data
  } else {
    // token失效处理
    if (localStorage.getItem('rc-token') && response.status === 200 && response.data && response.data.code === 'K-000002') {
      sessionStorage.setItem('rc-token-lose', 1)
      window.location.href = '/'
    }
    console.log(response, response.data, response.data.message)
    let ret = response.data && response.data.message ? response.data.message : 'Error'

    // 支付失败获取订单号处理
    if (response.data
      && response.data.message
      && (response.data.message.toLowerCase().includes('payment error')
        || response.data.message.toLowerCase().includes('pay order error'))) {
      ret = {
        message: response.data.message,
        errorData: response.data.errorData
      }
    }
    return Promise.reject(ret)
  }
}, err => Promise.reject(err))

export default service