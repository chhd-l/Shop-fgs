import axios from '@/utils/request'

const api = {
    findUserConsentList: '/consent/findUserConsentList',
    consentListDetail:'/consent/detail/list'
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