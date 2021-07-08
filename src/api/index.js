import axios from '@/utils/request';

const api = {
  storeCate: '/storeCate',
  uploadResource: '/common/uploadResource',
  queryCityNameById: '/system-city/query-system-city-by-id', //http://localhost:3000/account/information
  queryCityByName: `${window.__.env.REACT_APP_STOREID}/system/city`,
  getCityList: `/system/city`,
  getRegionByCityId: `/systemRegion/queryByStoreId`, // 根据cityId查询region
  getProvincesList: `/systemState/queryByStoreId`, // 查询省份列表
  getAddressBykeyWord: `/address-input-auto/list`, // DuData，根据输入的关键字返回详细地址信息
  addressValidation: `/addressValidation/validation`, // 地址校验接口
  buryPoint: '/fgs.gif',
  getConfig: `/config/store/${window.__.env.REACT_APP_STOREID}`,
  navigations: '/navigations', // 查询二级菜单
  seo: 'seo/setting',
  getSystemConfig: '/system/config',
  addressSetting: '/addressDisplaySetting/queryByStoreId', // 查询文本框设置
  getPrescriberSettingInfo: '/order/config/listSystemConfig', // 查询是否需要显示用户选择绑定prescriber弹框
  cancelEmail: '/customer/updateCustomerSendEmailFlag', // 取消用户邮箱绑定
  getDeliveryDateAndTimeSlot: '/delivery/timeSlot' // 俄罗斯获取 DeliveryDate 和 TimeSlot
};

export default api;

export function getStoreCate(parameter) {
  return axios({
    url: api.storeCate,
    method: 'post',
    data: parameter
  });
}

export function uploadResource(params) {
  return axios({
    url: api.uploadResource,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
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

export function setBuryPoint(parameter) {
  return axios({
    url: api.buryPoint,
    method: 'post',
    data: parameter
  });
}

export function getConfig() {
  return axios({
    url: `${api.getConfig}`,
    method: 'get',
    params: { storeId: window.__.env.REACT_APP_STOREID }
  });
}

export function queryHeaderNavigations() {
  return axios({
    url: `${api.navigations}`,
    method: 'get'
  });
}
export function getSeoConfig(parameter) {
  return axios({
    url: `${api.seo}`,
    method: 'get',
    params: parameter
  });
}
export function getSystemConfig(parameter) {
  return axios({
    url: `${api.getSystemConfig}/${parameter.configType}`,
    method: 'get'
  });
}
export function getAddressSetting(parameter) {
  return axios({
    url: `${api.addressSetting}/${parameter.addressApiType}`,
    method: 'get'
  });
}

//查询prescription页面是否需要显示用户选择绑定prescriber弹框
export function getPrescriberSettingInfo() {
  return axios({
    url: `${api.getPrescriberSettingInfo}`,
    method: 'get',
    params: { storeId: window.__.env.REACT_APP_STOREID }
  });
}

//取消用户邮箱的绑定
export function cancelEmailBind(parameter) {
  return axios({
    url: `${api.cancelEmail}`,
    method: 'put',
    data: parameter
  });
}

// 俄罗斯获取 DeliveryDate 和 TimeSlot
export function getDeliveryDateAndTimeSlot(parameter) {
  return axios({
    url: `${api.getDeliveryDateAndTimeSlot}`,
    method: 'post',
    data: parameter
  });
}
