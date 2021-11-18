import axios from '@/utils/request';

export function queryDate(params = {}) {
  return axios({
    url: '/resourceDatePlan/queryDate',
    method: 'post',
    data: {
      serviceTypeId: '6',
      ...params
    }
  });
}

export function gitDict(params = {}) {
  return axios({
    url: '/goodsDictionary/queryGoodsDictionary',
    method: 'post',
    data: params
  });
}
