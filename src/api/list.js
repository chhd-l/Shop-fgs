import axios from '@/utils/request';

const api = {
  list: '/goods/spuListFront',
  findFilterList: '/goods_filter/findFilterList', // 查询filter信息
  findSortList: '/goods_filter/findSortList', // 查询sort信息
  suggestion: '/esSuggestion' //搜索关键词建议
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

export function getSearchSuggestion(parameter) {
  return axios({
    url: `${api.suggestion}/${parameter}`,
    method: 'get'
  });
}
