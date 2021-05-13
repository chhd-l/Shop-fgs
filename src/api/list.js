import axios from '@/utils/request';

const api = {
  list: '/goods/spuListFront',
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
