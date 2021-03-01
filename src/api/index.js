import axios from '@/utils/request';

const api = {
  storeCate: '/storeCate',
  uploadResource: '/common/uploadResource',
  queryCityNameById: '/system-city/query-system-city-by-id', //http://localhost:3000/account/information
  queryCityByName: `${process.env.REACT_APP_STOREID}/system/city`,
  getProvincesList: `/systemState/queryByStoreId`, // 查询省份列表
  addressValidation: `/addressValidation/validation`,
  buryPoint: '/fgs.gif',
  getConfig: `/config/store/${process.env.REACT_APP_STOREID}`,
  navigations: '/navigations', //  查询二级菜单
  seo: 'seo/setting'
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

export function getProvincesList(parameter) {
  return axios({
    url: `${api.getProvincesList}`,
    method: 'post',
    data: parameter
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
    params: { storeId: process.env.REACT_APP_STOREID }
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
