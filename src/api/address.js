import axios from '@/utils/request';

const api = {
  getAddressList: '/customer/addrs',
  addressInfo: '/customer/addressInfo',
  // addressInfoNew: '/customer/addr/default',
  setDefaltAddress: '/customer/addr/default',
  saveAddress: '/customer/addr'
};

export default api;

export function getAddressList(parameter) {
  return axios({
    url: `${api.getAddressList}`,
    method: 'get',
    data: parameter
  });
}
export function getAddressById(parameter) {
  return axios({
    url: `${api.saveAddress}/${parameter.id}`,
    method: 'get'
  });
}
export function saveAddress(parameter) {
  return axios({
    url: `${api.saveAddress}`,
    method: 'post',
    data: parameter
  });
}

export function setDefaltAddress(parameter) {
  return axios({
    url: `${api.setDefaltAddress}/${parameter.deliveryAddressId}`,
    method: 'post',
    data: parameter
  });
}
export function deleteAddress(parameter) {
  return axios({
    url: `${api.addressInfo}/${parameter.id}`,
    method: 'delete'
  });
}
export function editAddress(parameter) {
  return axios({
    url: `${api.addressInfo}`,
    method: 'put',
    data: parameter
  });
}
