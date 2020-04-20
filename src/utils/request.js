import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 60000 // 请求超时时间
})

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data instanceof Blob) {
    return response
  }
  const res = response.data
  if (res.code !== 200) {
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return response.data
  }
}, err => Promise.reject(err))

export default service