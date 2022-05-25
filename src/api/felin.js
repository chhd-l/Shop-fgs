import axios from '@/utils/request';
import api from './order';

// 预约详情
export function getAppointByApptNo(parameter) {
  return axios({
    url: '/appt/findForUpdate',
    method: 'post',
    data: parameter
  });
}
// 查询可预约时间
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
// 数字字典
export function gitDict(params = {}) {
  return axios({
    url: '/goodsDictionary/queryGoodsDictionary',
    method: 'post',
    data: params
  });
}
// 新增预约信息
export function postSave(params = {}) {
  return axios({
    url: '/appt/save',
    method: 'post',
    data: params
  });
}
// 更新预约信息
export function postUpdate(params = {}) {
  return axios({
    url: '/appt/update',
    method: 'post',
    data: params
  });
}
// 登陆之后跟新用户信息
export function postUpdateUser(params = {}) {
  return axios({
    url: '/appt/update-consumer-info',
    method: 'post',
    data: params
  });
}
// 未登录预约的时候，更新用户信息
export function postcustomerUpdate(params = {}) {
  return axios({
    url: '/appt/customer-update-consumer-info',
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
// 获取专家价格
export function postQueryPrice(params = {}) {
  return axios({
    url: '/resourceDatePlan/queryPrice',
    method: 'post',
    data: params
  });
}
