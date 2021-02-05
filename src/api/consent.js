import axios from '@/utils/request'

const api = {
    findUserConsentList: `/${process.env.REACT_APP_STOREID}/consents/customer-id=`,
    // findUserConsentList: '/consent/findUserConsentList',
    // consentListDetail:'/consent/details/',
    consentListDetail:'/consent/detail/list',
    // userBindConsent:'/consent/userBindConsent',
    userBindConsent:'/consent/binds/customer-id=',
    getStoreOpenConsentList: `/consents/enable/store-id=${process.env.REACT_APP_STOREID}`,
    // getStoreOpenConsentList:'/consent/getStoreOpenConsentList',
    // findUserSelectedList:'/consent/findUserSelectedList'
    findUserSelectedList: '/consents/selected/customer_id='
}

export default api

export function findUserConsentList (parameter) {
    return axios({
      // url: `${api.findUserConsentList}`,
      // method: 'post',
      // data: parameter
      url: `${api.findUserConsentList}${parameter.customerId}`,
      method: 'get',
      params: parameter
    })
  }

export function consentListDetail (parameter) {
    return axios({
        url: `${api.consentListDetail}`,
        method: 'post',
        data: parameter
    })
}

export function userBindConsent (parameter) {
  return axios({
      url: `${api.userBindConsent}${parameter.customerId}`,
      method: 'post',
      data: parameter
  })
}

export function getStoreOpenConsentList (parameter) {
  return axios({
      url: `${api.getStoreOpenConsentList}`,
      method: 'get',
      params: parameter
  })
}

export function findUserSelectedList (parameter) {
  return axios({
      url: `${api.findUserSelectedList}${parameter.customerId}`,
      method: 'get',
      params: parameter
  })
}