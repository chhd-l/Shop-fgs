import axios from '@/utils/request';

const api = {
  getAddressList: '/customer/addrs', // 查询地址列表
  addressInfo: '/customer/addressInfo', // 修改地址信息
  setDefaltAddress: '/customer/addr/default', // 设置默认地址
  saveAddress: '/customer/addr', // 新增地址
  getAddressById: '/customer/address/', // 根据 addressId 查询地址信息
  queryCityNameById: '/system-city/query-system-city-by-id', //http://localhost:3000/account/information
  queryCityByName: `${window.__.env.REACT_APP_STOREID}/system/city`,
  getCityList: `/system/city`,
  getRegionByCityId: `/systemRegion/queryByStoreId`, // 根据cityId查询region
  getProvincesList: `/systemState/queryByStoreId`, // 查询省份列表
  getAddressBykeyWord: `/address-input-auto/list`, // DuData，根据输入的关键字返回详细地址信息
  addressValidation: `/addressValidation/validation`, // 地址校验接口
  getDeliveryDateAndTimeSlot: '/delivery/timeSlot', // 俄罗斯获取 DeliveryDate 和 TimeSlot
  validPostCodeBlock: '/addressDisplaySetting/validPostCodeBlock', // 邮编黑名单校验
  DQEAddressList: '/address-input-auto/DQElist', // DQE 地址查询
  queryOpenedApi: '/addressApiSetting/query-opened-api', // DQE 地址查询
  returnDQE: '/address-input-auto/returnDQE',
  addressDisplaySetting: '/addressDisplaySetting/queryFields' // 查询地址字段配置
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
    url: `${api.getAddressById}/${parameter.id}`,
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
  console.log('editAddress', parameter);
  return axios({
    url: `${api.addressInfo}`,
    method: 'put',
    data: parameter
  });
}

export function queryCityNameById(parameter) {
  return axios({
    // url: `${api.queryCityNameById}${parameter.id}`,
    // method: 'get',
    // params: parameter
    url: `${api.queryCityNameById}`,
    method: 'post',
    data: parameter
  });
}
export function queryCityByName(parameter) {
  return axios({
    url: `${api.queryCityByName}`,
    method: 'get',
    params: parameter
  });
}
export function getCityList(parameter) {
  return axios({
    url: `${api.getCityList}`,
    method: 'get',
    params: parameter
  });
}
export function getRegionByCityId(parameter) {
  return axios({
    url: `${api.getRegionByCityId}/${parameter.cityId}`,
    method: 'get'
  });
}
export function getProvincesList(parameter) {
  return axios({
    url: `${api.getProvincesList}`,
    method: 'post',
    data: parameter
  });
}
export function getAddressBykeyWord(parameter) {
  return axios({
    url: `${api.getAddressBykeyWord}?keyword=${parameter.keyword}`,
    method: 'get'
  });
}
export function addressValidation(parameter) {
  return axios({
    url: `${api.addressValidation}`,
    method: 'post',
    data: parameter
  });
}

export function getDeliveryDateAndTimeSlot(parameter) {
  return axios({
    url: `${api.getDeliveryDateAndTimeSlot}`,
    method: 'post',
    data: parameter
  });
}

export function validPostCodeBlock(postCode = '') {
  return axios({
    url: `${api.validPostCodeBlock}?postCode=${postCode}`,
    method: 'get'
  });
}

export function DQEAddressList(address = '') {
  return axios({
    url: `${api.DQEAddressList}?address=${address}`,
    method: 'get'
  });
}

export function queryOpenedApi() {
  return axios({
    url: `${api.queryOpenedApi}`,
    method: 'post'
  });
}

export function returnDQE(params) {
  return axios({
    url: `${api.returnDQE}`,
    method: 'post',
    data: params
  });
}

export function fetchAddressDisplaySetting() {
  return axios({
    url: `${api.addressDisplaySetting}`,
    method: 'get'
  });
}
