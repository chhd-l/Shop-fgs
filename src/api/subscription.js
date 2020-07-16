
import axios from '@/utils/request'

const api = {
  getList: '/sub/findPage',
  getSubDetail: '/sub/getSubscriptionDetail/',
  updateDetail: '/sub/updateSubscription',
  getAddressDetail: '/customer/address/',
  skipNextSub: '/sub/cancelNextSubscription',
  cancelAllSub: '/sub/cancelSubscription'
}

export default api

export function getSubList (parameter) {
  return axios({
    url: `${api.getList}`,
    method: 'post',
    data: parameter
  })
}

export function updateDetail (parameter) {
  return axios({
    url: `${api.updateDetail}`,
    method: 'post',
    data: parameter
  })
}
export function getAddressDetail (parameter) {
  return axios({
    url: `${api.getAddressDetail}` + parameter,
    method: 'get'
  })
}

export function getSubDetail (parameter) {
  return axios({
    url: `${api.getSubDetail}` + parameter,
    method: 'post'
  })
}

export function skipNextSub (parameter) {
  return axios({
    url: `${api.skipNextSub}`,
    method: 'post',
    data: parameter
  })
}

export function cancelAllSub (parameter) {
  return axios({
    url: `${api.cancelAllSub}`,
    method: 'post',
    data: parameter
  })
}
