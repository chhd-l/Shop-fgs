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
export function postSave(params = {}) {
  return axios({
    url: '/appt/save',
    method: 'post',
    data: params
  });
}
export function postUpdate(params = {}) {
  return axios({
    url: '/appt/update',
    method: 'post',
    data: params
  });
}
