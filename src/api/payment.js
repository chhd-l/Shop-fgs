import axios from '@/utils/request'
import { register } from '../serviceWorker'

const api = {
  visitorRegisterAndLogin: 'visitorRegisterAndLogin',
  batchAdd: '/site/batchAdd',
  // confirmAndCommit: '/tradeCustom/confirmcommitAndPay'
  confirmAndCommit: '/tradeCustom/confirmcommitAndPaySync'
  
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