import axios from '@/utils/request'

const api = {
  details: '/goods/unLogin/spu',
  loginDetails: '/goods/spu'
}

export default api

export function getDetails (parameter) {
  return axios({
    url: `${api.details}/${parameter}`,
    method: 'get'
  })
}

export function getLoginDetails (parameter) {
  return axios({
    url: `${api.loginDetails}/${parameter}`,
    method: 'get'
  })
}