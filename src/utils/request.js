import axios from 'axios'

let env = process.env.NODE_ENV
let base_url
if(env === 'development') {
  base_url = '/api'
}else if(env === 'production') {
  base_url = process.env.REACT_APP_BASEURL
}



// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://121.37.129.70:8090/', // api base_url
  // baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://shopuat.466920.com/api/', // api base_url
  baseURL: base_url,
  timeout: 60000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  const token = sessionStorage.getItem('rc-token')
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
    console.log(response, response.data , response.data.message)
    return Promise.reject(response.data && response.data.message ? response.data.message : 'Error')
  }
}, err => Promise.reject(err))

export default service