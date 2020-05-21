import axios from '@/utils/request'

const api = {
  list: '/trade/page',
  details: '/trade',
  returnDetails: '/return/trade',
  returnAdd: '/return/add',
  cancelOrder: '/tradeCustom/cancelAndRefund',
  returnReason: '/return/reasons',
  returnWays: '/return/ways'
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

export function cancelOrder (parameter) {
  return axios({
    url: `${api.cancelOrder}/${parameter}`,
    method: 'get'
  })
}

export function returnAdd (parameter) {
  return axios({
    url: api.returnAdd,
    method: 'post',
    data: parameter
  })
}

export function getReturnReasons (parameter) {
  return axios({
    url: `${api.returnReason}`,
    method: 'get'
  })
}

export function getReturnWays (parameter) {
  return axios({
    url: `${api.returnWays}`,
    method: 'get'
  })
}
