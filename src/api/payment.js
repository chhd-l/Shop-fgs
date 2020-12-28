import axios from '@/utils/request';

const api = {
  visitorRegisterAndLogin: `/${process.env.REACT_APP_STOREID}/guest/register`,
  batchAdd: `/site/${process.env.REACT_APP_STOREID}/batch-add`,
  confirmAndCommit: `/${process.env.REACT_APP_STOREID}/guest/checkout`,
  // addOrUpdatePaymentMethod: '/payment-method/updata',
  addOrUpdatePaymentMethod: `/${process.env.REACT_APP_STOREID}/payment-method`,
  getPaymentMethod: `/${process.env.REACT_APP_STOREID}/payment-method/customer=`,
  // getPaymentMethod: '/payment-method/query-by-customer-id',
  deleteCard: '/payment-method',
  setDefaltCard: '/payment-method/default',
  // confirmAndCommit: '/tradeCustom/confirmcommitAndPaySync'

  customerCommitAndPay: '/trade-custom/checkout',
  // customerCommitAndPay: '/tradeCustom/customerCommitAndPay',
  rePay: '/trade-custom/repay',
  // rePay: '/tradeCustom/rePay',
  customerCommitAndPayMix: '/trade-custom/mix/checkout',
  customerCommitAndPayMix: '/tradeCustom/customerCommitAndPayMix',
  getMarketingDiscount: '/marketing/discount',
  // getMarketingDiscount: '/marketing/getMarketingDiscount',
  getWays: `/${process.env.REACT_APP_STOREID}/pay/gateways`,
  // getWays: '/PayGateway/gateways',
  adyenPaymentsDetails: `/${process.env.REACT_APP_STOREID}/adyen/payment`,
  // adyenPaymentsDetails: '/adyenPay/payments/details',
  getProductPetConfig: '/order/config/findPet'
  // getProductPetConfig: '/order/config/findPet'
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
    url: api.getPaymentMethod+parameter.customerId,
    method: 'get',
    params: parameter
  });
}

export function deleteCard(para) {
  return axios({
    url: `${api.deleteCard}/${para.id}`,
    method: 'delete',
    data: para
  });
}

export function customerCommitAndPay(parameter) {
  return axios({
    url: api.customerCommitAndPay,
    method: 'delete',
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
    params: parameter
  });
}

export function adyenPaymentsDetails(parameter) {
  return axios({
    url: api.adyenPaymentsDetails,
    method: 'get',
    params: parameter
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
