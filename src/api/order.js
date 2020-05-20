import axios from '@/utils/request'

const api = {
  list: '/trade/page',
  details: '/trade',
  returnDetails: '/return/trade',
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

export function getOrderReturnDetails (parameter) {
  return axios({
    url: `${api.returnDetails}/${parameter}`,
    method: 'get'
  })
}
