import axios from '@/utils/request'
import { register } from '../serviceWorker'

const api = {
  visitorRegisterAndLogin: '/visitorRegisterAndLogin',
  batchAdd: '/site/batchAdd',
  confirmAndCommit: '/tradeCustom/confirmcommitAndPay',
  addOrUpdatePaymentMethod: '/payment-method/updata',
  getPaymentMethod: '/payment-method/query-by-customer-id',
  deleteCard: '/payment-method/delete-by-id'
  // confirmAndCommit: '/tradeCustom/confirmcommitAndPaySync'
  
}

export default api

export function postVisitorRegisterAndLogin (parameter) {
  return axios({
    url: api.visitorRegisterAndLogin,
    method: 'post',
    data: parameter
  })
}

export function batchAdd (parameter) {
  return axios({
    url: api.batchAdd,
    method: 'post',
    data: parameter
  })
}

export function confirmAndCommit (parameter) {
  return axios({
    url: api.confirmAndCommit,
    method: 'post',
    data: parameter
  })
}

export function addOrUpdatePaymentMethod (parameter) {
  return axios({
    url: api.addOrUpdatePaymentMethod,
    method: 'post',
    data: parameter
  })
}

export function getPaymentMethod(parameter) {
  return axios({
    url: api.getPaymentMethod,
    method: 'post',
    data: parameter
  })
}

export function deleteCard(para) {
  return axios({
    url: api.deleteCard,
    method: 'post',
    data: para
  })
}