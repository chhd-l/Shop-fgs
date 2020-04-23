import axios from '@/utils/request'
import { register } from '../serviceWorker'

const api = {
  visitorRegisterAndLogin: 'visitorRegisterAndLogin'
}

export default api

export function postVisitorRegisterAndLogin (parameter) {
  return axios({
    url: api.visitorRegisterAndLogin,
    method: 'post',
    data: parameter
  })
}

export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}