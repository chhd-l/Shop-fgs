import axios from '@/utils/request'

const api = {
  getAddressList: '/customer/addressList',
  saveAddress: '/customer/address',
  setDefaltAddress:'/customer/defaultAddress'
}

export default api

export function getAddressList (parameter) {
  return axios({
    url: `${api.getAddressList}`,
    method: 'get',
    data: parameter
  })
}
export function saveAddress (parameter) {
  return axios({
    url: `${api.saveAddress}`,
    method: 'post',
    data: parameter
  })
}

export function setDefaltAddress (parameter) {
  return axios({
    url: `${api.setDefaltAddress}`,
    method: 'post',
    data: parameter
  })
}
export function deleteAddress (parameter) {
  return axios({
    url: `${api.saveAddress}/${parameter.id}`,
    method: 'delete'
  })
}
export function editAddress (parameter) {
  return axios({
    url: `${api.saveAddress}`,
    method: 'put',
    data: parameter
  })
}