import axios from '@/utils/request';

const api = {
  getBanner: `/${process.env.REACT_APP_STOREID}/banners`,
  findStoreCateList: `/${process.env.REACT_APP_STOREID}/categories`, // 查询首页产品分类
  mktCallBack: '/consent/mkt/callback',
  accountCallBack: '/consent/account/callback'
};

export default api;
export function getBanner() {
  return axios({
    url: `${api.getBanner}`,
    method: 'get',
    params: { storeId: process.env.REACT_APP_STOREID }
  });
}

export function findStoreCateList() {
  return axios({
    url: `${api.findStoreCateList}`,
    method: 'get'
  });
}

export function accountCallBack() {
  return axios({
    url: `${api.accountCallBack}`,
    method: 'POST',
    data: {}
  });
}

export function mktCallBack(parameter) {
  return axios({
    url: `${api.mktCallBack}`,
    method: 'POST',
    data: parameter
  });
}
