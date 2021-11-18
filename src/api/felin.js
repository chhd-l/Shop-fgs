import axios from '@/utils/request';

export function queryDate(params = {}) {
  return axios({
    url: '/resourceDatePlan/queryDate',
    method: 'post',
    body: JSON.stringify({
      serviceTypeId: '6',
      ...params
    })
  });
}
