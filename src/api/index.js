import axios from '@/utils/request'

const api = {
  storeCate: '/storeCate'
}

export default api

export function getStoreCate (parameter) {
  return axios({
    url: api.storeCate,
    method: 'post',
    data: parameter
  })
}