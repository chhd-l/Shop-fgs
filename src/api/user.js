import axios from '@/utils/request';
import base64 from 'base-64';

const fgsRegister = window.__.env.REACT_APP_FGS_SELF_REGISTER;

const api = {
  customerBase: '/customer/customerBase',
  register: fgsRegister ? '/register' : 'okta/register',
  isNewAccount: '/trade/countTradeByCustomerIdAndStoreId',
  isFirstOrder: '/trade/countTradeByCustomerIdAndStoreIdAndStatus', //判断会员是否首单
  customerBaseNew: '/customer'
};

export default api;

export function getCustomerInfo(parameter) {
  return axios({
    // url: `${api.customerBase}`,
    url: `${api.customerBaseNew}/${parameter.customerId}`,
    method: 'get'
  });
}

export function updateCustomerBaseInfo(parameter) {
  return axios({
    url: `${api.customerBase}`,
    method: 'put',
    data: parameter
  });
}

export function oktaRegister(parameter) {
  let params = Object.assign({}, parameter);
  if (fgsRegister) {
    params.customerPassword = base64.encode(parameter.customerPassword);
    params.customerAccount = base64.encode(parameter.customerAccount);
  }
  return axios({
    url: `${api.register}`,
    method: 'POST',
    data: params
  });
}

export function isNewAccount() {
  return axios({
    url: `${api.isNewAccount}`,
    method: 'get'
  });
}

export function isFirstOrder() {
  return axios({
    url: `${api.isFirstOrder}`,
    method: 'get'
  });
}
