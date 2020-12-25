import axios from '@/utils/request'
import base64 from 'base-64'

const api = {
  login: 'login',
  
  // login:'/base/login', //okta
  // getToken: '/okta/getJwtToken',
  getToken: `/${process.env.REACT_APP_STOREID}/okta/token`,
  getQuestions:'/questions/all',
  register:'/baseRegister',
  forgetPassword:'/base/forgetPassword',
  // modifyPassword:'/base/modifyPassword',
  modifyPassword:'/base/modify-pass',
  logout: '/logout'
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
export function doLogout () {
  return axios({
    url: api.logout,
    method: 'get'
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

export function modifyPassword (parameter) {
  parameter.oldPassword = base64.encode(parameter.oldPassword )
  parameter.newPassword = base64.encode(parameter.newPassword )
  parameter.confirmNewPassword = base64.encode(parameter.confirmNewPassword )

  return axios({
    url: api.modifyPassword,
    method: 'post',
    data: parameter
  })
}
export function forgetPassword (parameter) {
  parameter.customerAccount = base64.encode(parameter.customerAccount )
  return axios({
    url: api.forgetPassword,
    method: 'post',
    data: parameter
  })
}