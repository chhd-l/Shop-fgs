import axios from '@/utils/request';

const api = {
  getBanner: `/${process.env.REACT_APP_STOREID}/banners`,
  // "Invalid or Expired jwtToken" apiupdate
  // findStoreCateList: '/goods_filter/findStoreCateList' // 查询首页产品分类
  findStoreCateList: `/${process.env.REACT_APP_STOREID}/categories` // 查询首页产品分类
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
