import axios from '@/utils/request'
import { register } from '../serviceWorker'

const api = {
  visitorRegisterAndLogin: 'visitorRegisterAndLogin'
}

export default api

export function getProps (parameter) {
  return axios({
    url: `${api.props}/${parameter}`,
    method: 'get'
  })
}

export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}