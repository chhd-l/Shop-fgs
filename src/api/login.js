import axios from '@/utils/request'
import base64 from 'base-64'

const api = {
  login: 'login'
}

export default api

export function login (parameter) {
  let form =  {
    customerAccount: '',
    customerPassword: ''
  }
  form.customerAccount = base64.encode(parameter.customerAccount)
  form.customerPassword = base64.encode(parameter.customerPassword)
  return axios({
    url: api.login,
    method: 'post',
    data: parameter
  })
}