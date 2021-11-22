import axios from '@/utils/request';

const api = {
  // getDict:'/sysdict/querySysDictionary'
  getDict: '/sysdict/dictionary',
  getAppointDict: '/goodsDictionary/queryGoodsDictionary' //获取felin相关dictionary
};

export default api;
export function getDict(parameter) {
  return axios({
    url: `${api.getDict}`,
    method: 'get',
    params: parameter
  });
}

export function getAppointDict(parameter) {
  return axios({
    url: `${api.getAppointDict}`,
    method: 'post',
    data: parameter
  });
}
