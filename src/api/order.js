import axios from '@/utils/request'

const api = {
  list: '/trade/page',
  details: '/trade',
  returnTrade: '/return/trade',
  return: '/return',
  returnAdd: '/return/add',
  cancelOrder: '/tradeCustom/cancelAndRefund',
  returnReason: '/return/reasons',
  returnWays: '/return/ways',
  returnList: 'return/page',
  payRecord: '/pay/record',
  returnFindByTid: 'return/findByTid',

  addEvaluate: '/evaluate/addEvaluate'
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
    url: `${api.returnTrade}/${parameter}`,
    method: 'get'
  })
}

export function getReturnDetails (parameter) {
  return axios({
    url: `${api.return}/${parameter}`,
    method: 'post'
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

export function getReturnList (parameter) {
  return axios({
    url: api.returnList,
    method: 'post',
    data: parameter
  })
}

export function getPayRecord (parameter) {
  return axios({
    url: `${api.payRecord}/${parameter}`,
    method: 'get'
  })
}

export function returnFindByTid (parameter) {
  return axios({
    url: `${api.returnFindByTid}/${parameter}`,
    method: 'get'
  })
}

export function addEvaluate (parameter) {
  return axios({
    url: api.addEvaluate,
    method: 'post',
    data: parameter
  })
}