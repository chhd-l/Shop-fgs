import axios from '@/utils/request';

const api = {
  getBanner: '/banner/get',
  findStoreCateList: '/goods_filter/findStoreCateList' // 查询首页产品分类
};

export default api;
export function getBanner() {
  return axios({
    url: `${api.getBanner}`,
    method: 'post',
    data: { storeId: process.env.REACT_APP_STOREID }
  });
}

export function findStoreCateList() {
  return axios({
    url: `${api.findStoreCateList}`,
    method: 'get'
  });
}
