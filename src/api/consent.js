import axios from '@/utils/request'

const api = {
    findUserConsentList: '/consent/findUserConsentList',
    consentListDetail:'/consent/detail/list',
    userBindConsent:'/consent/userBindConsent'
}

export default api

export function findUserConsentList (parameter) {
    return axios({
      url: `${api.findUserConsentList}`,
      method: 'post',
      data: parameter
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
