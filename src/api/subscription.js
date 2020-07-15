
import axios from '@/utils/request'

const api = {
  getList: '/sub/findPage',
  getSubDetail: '/sub/getSubscriptionDetail/',
  updateDetail: '/sub/updateSubscription',
  getAddressDetail: '/customer/address/'
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