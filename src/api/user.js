import axios from '@/utils/request';

const api = {
  customerBase: '/customer/customerBase',
  register: 'okta/register',
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
  return axios({
    url: `${api.register}`,
    method: 'POST',
    data: parameter
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
