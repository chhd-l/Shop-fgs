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
    config.headers['Authorization'] = 'Bearer ' 
    + 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNpkjsEKgzAQRP9lzyJZa7JZbz320l-QmKwg1CrGSEH898ZD6UHmMsw8mNkhpg4aQGtuZFCxRihgcCs0qC2zYVPbAnyK6zTK8giZ7XurspCQyAmjOl3Qna9qUooE_vzd-ym918vAr3-6Ua7r8xlVWN6oxIpLUjnc3CtJ60KQ0EZZtsFLzNh-5E4-83mXFVWGWB9fAAAA__8.TYxu5WgeM298vPLLUVi3iDHgwRmJudEcESxOTbGEWWw' // 让每个请求携带自定义 token 请根据实际情况自行修改
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