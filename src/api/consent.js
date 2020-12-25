import axios from '@/utils/request'

const api = {
    // findUserConsentList: `/${process.env.REACT_APP_STOREID}/consents/customer-id=`,
    findUserConsentList: '/consent/findUserConsentList',
    consentListDetail:'/consent/detail/list',
    userBindConsent:'/consent/userBindConsent',
    getStoreOpenConsentList:'/consent/getStoreOpenConsentList',
    findUserSelectedList:'/consent/findUserSelectedList'
}

export default api

export function findUserConsentList (parameter) {
    return axios({
      url: `${api.findUserConsentList}`,
      method: 'post',
      data: parameter
      // url: `${api.findUserConsentList}${parameter.customerId}`,
      // method: 'get',
      // params: parameter
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
      url: `${api.userBindConsent}`,
      method: 'post',
      data: parameter
  })
}

export function getStoreOpenConsentList (parameter) {
  return axios({
      url: `${api.getStoreOpenConsentList}`,
      method: 'post',
      data: parameter
  })
}

export function findUserSelectedList (parameter) {
  return axios({
      url: `${api.findUserSelectedList}`,
      method: 'post',
      data: parameter
  })
}