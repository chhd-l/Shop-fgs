import axios from 'axios'
import Alert from '@/components/Alert'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://121.37.129.70:8090/', // api base_url
  // baseURL: process.env.VUE_APP_URL,
  timeout: 60000 // 请求超时时间
})

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data instanceof Blob) {
    return response
  }
  const res = response.data
  if (res.code === 'K-000000') {
    return response.data
  } else {
    return Promise.reject(Alert.open({
      alertTip:res.message
  }))
  }
  // if (res.code !== 200) {
  //   return Promise.reject(new Error(res.msg || 'Error'))
  // } else {
  //   return response.data
  // }
}, err => Promise.reject(err))

export default service