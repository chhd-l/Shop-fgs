import axios from '@/utils/request';

const api = {
  storeCate: '/storeCate',
  uploadResource: '/common/uploadResource?resourceType=IMAGE',
  buryPoint: '/fgs.gif',
  getConfig: `/config/store/`,
  navigations: '/navigations', // 查询二级菜单
  seo: 'seo/setting',
  cancelEmail: '/customer/updateCustomerSendEmailFlag', // 取消用户邮箱绑定
  shopConfig: '/storeConfig/getShopConfig/' //查询基础配置信息
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

export function setBuryPoint(parameter) {
  return axios({
    url: api.buryPoint,
    method: 'post',
    data: parameter
  });
}

export function getConfig() {
  return axios({
    url: `${api.getConfig}${window.__.env.REACT_APP_STOREID}`,
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

//取消用户邮箱的绑定
export function cancelEmailBind(parameter) {
  return axios({
    url: `${api.cancelEmail}`,
    method: 'put',
    data: parameter
  });
}

export function fetchShopConfig(params) {
  return axios({
    url: `${api.shopConfig}${params}`,
    method: 'get',
    params
  });
}
