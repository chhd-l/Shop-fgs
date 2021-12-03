import axios from '@/utils/request';
import api from './order';

export function getAppointByApptNo(parameter) {
  return axios({
    url: '/appt/findForUpdate',
    method: 'post',
    data: parameter
  });
}
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

export function getServiceEvaluate(params = {}) {
  return axios({
    url: '/goodsEvaluate/getGoodsEvaluatePageContent',
    method: 'post',
    data: params
  });
}
export function postQueryPrice(params = {}) {
  return axios({
    url: '/resourceDatePlan/queryPrice',
    method: 'post',
    data: params
  });
}
