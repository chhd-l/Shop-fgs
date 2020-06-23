import axios from '@/utils/request'
import base64 from 'base-64'

const api = {
  login: 'login',
  getToken: '/okta/getJwtToken',
  getQuestions:'/questions/all',
  register:'/baseRegister',
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
    data: form
  })
}

export function getToken (parameter) {
  return axios({
    url: api.getToken,
    method: 'post',
    data: parameter
  })
}



export function getQuestions () {
  return axios({
    url: api.getQuestions,
    method: 'get'
  })
}
export function register (parameter) {
  parameter.email = base64.encode(parameter.email )
  parameter.customerPassword = base64.encode(parameter.customerPassword )
  parameter.confirmPassword = base64.encode(parameter.confirmPassword )

  return axios({
    url: api.register,
    method: 'post',
    data: parameter
  })
}
