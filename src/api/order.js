import axios from '@/utils/request'

const api = {
  list: '/trade/page',
  details: '/trade',
}

export default api

export function getOrderList (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}

export function getOrderDetails (parameter) {
  return axios({
    url: `${api.details}/${parameter}`,
    method: 'get'
  })
}