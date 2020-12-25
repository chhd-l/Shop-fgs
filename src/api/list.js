import axios from '@/utils/request';

const api = {
  // "erreur de fonctionnement" apiupdate
  list: '/goods/spuListFront',
  // list: `/${process.env.REACT_APP_STOREID}/guest/products`,
  loginList: '/goods/spus',
  // loginList: `/${process.env.REACT_APP_STOREID}/products`,
  findFilterList: '/goods_filter/findFilterList', // 查询filter信息
  findSortList: '/goods_filter/findSortList' // 查询sort信息
};

export default api;

export function getList(parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
    // method: 'get',
    // params: parameter
  });
}

export function getLoginList(parameter) {
  return axios({
    url: api.loginList,
    // method: 'post',
    // data: parameter
    method: 'get',
    params: parameter
  });
}

export function findFilterList() {
  return axios({
    url: `${api.findFilterList}`,
    method: 'get'
  });
}

export function findSortList() {
  return axios({
    url: `${api.findSortList}`,
    method: 'get'
  });
}
