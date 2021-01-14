import axios from '@/utils/request';

const api = {
  visitorRegisterAndLogin: '/visitorRegisterAndLogin',
  batchAdd: '/site/batchAdd',
  confirmAndCommit: '/tradeCustom/confirmCommitAndPay',
  addOrUpdatePaymentMethod: '/payment-method/updata',
  getPaymentMethod: '/payment-method/query-by-customer-id',
  deleteCard: '/payment-method/delete-by-id',
  setDefaltCard: '/payment-method/default',
  // confirmAndCommit: '/tradeCustom/confirmcommitAndPaySync'

  customerCommitAndPay: '/tradeCustom/customerCommitAndPay',
  rePay: '/tradeCustom/rePay',
  customerCommitAndPayMix: '/tradeCustom/customerCommitAndPayMix',
  getMarketingDiscount: '/marketing/getMarketingDiscount',
  getWays: '/PayGateway/gateways',
  adyenPaymentsDetails: '/adyenPay/payments/details',
  getProductPetConfig: '/order/config/findPet',
  adyen3DSResult: `/${process.env.REACT_APP_STOREID}/adyen/identity/verification/payment`
};

export default api;

export function postVisitorRegisterAndLogin(parameter) {
  return axios({
    url: api.visitorRegisterAndLogin,
    method: 'post',
    data: parameter
  });
}

export function batchAdd(parameter) {
  return axios({
    url: api.batchAdd,
    method: 'post',
    data: parameter
  });
}

export function confirmAndCommit(parameter) {
  return axios({
    url: api.confirmAndCommit,
    method: 'post',
    data: parameter
  });
}

export function addOrUpdatePaymentMethod(parameter) {
  return axios({
    url: api.addOrUpdatePaymentMethod,
    method: 'post',
    data: parameter
  });
}

export function getPaymentMethod(parameter) {
  return axios({
    url: api.getPaymentMethod,
    method: 'post',
    data: parameter
  });
}

export function deleteCard(para) {
  return axios({
    url: api.deleteCard,
    method: 'post',
    data: para
  });
}

export function customerCommitAndPay(parameter) {
  return axios({
    url: api.customerCommitAndPay,
    method: 'post',
    data: parameter
  });
}

export function customerCommitAndPayMix(parameter) {
  return axios({
    url: api.customerCommitAndPayMix,
    method: 'post',
    data: parameter
  });
}

export function rePay(parameter) {
  return axios({
    url: api.rePay,
    method: 'post',
    data: parameter
  });
}

export function getMarketingDiscount(parameter) {
  return axios({
    url: api.getMarketingDiscount,
    method: 'post',
    data: parameter
  });
}

export function getWays(parameter) {
  return axios({
    url: api.getWays,
    method: 'get',
    data: parameter
  });
}

export function adyenPaymentsDetails(parameter) {
  return axios({
    url: api.adyenPaymentsDetails,
    method: 'post',
    data: parameter
  });
}

export function getProductPetConfig(parameter) {
  return axios({
    url: api.getProductPetConfig,
    method: 'post',
    data: parameter
  });
}
export function setDefaltCard(parameter) {
  return axios({
    url: `${api.setDefaltCard}/${parameter}`,
    method: 'post',
    data: parameter
  });
}

export function adyen3DSResult() {
  return axios({
    url: api.adyen3DSResult,
    method: 'get',
  });
}