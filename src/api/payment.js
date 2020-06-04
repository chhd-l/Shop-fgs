import axios from '@/utils/request'
import { register } from '../serviceWorker'

const api = {
  visitorRegisterAndLogin: '/visitorRegisterAndLogin',
  batchAdd: '/site/batchAdd',
  confirmAndCommit: '/tradeCustom/confirmcommitAndPay',
<<<<<<< HEAD
  addOrUpdatePaymentMethod: '/payment-method/updata',
  getPaymentMethod: '/payment-method/query-by-customer-id',
  deleteCard: '/payment-method/delete-by-id'
  // confirmAndCommit: '/tradeCustom/confirmcommitAndPaySync'
  
=======
  customerCommitAndPay: 'tradeCustom/customerCommitAndPay'
>>>>>>> 051eb9d4e19e2e374160e4a2dec4ebc04aea37e6
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

<<<<<<< HEAD
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
=======
export function customerCommitAndPay (parameter) {
  return axios({
    url: api.customerCommitAndPay,
    method: 'post',
    data: parameter
  })
>>>>>>> 051eb9d4e19e2e374160e4a2dec4ebc04aea37e6
}