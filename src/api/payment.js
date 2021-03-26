import axios from '@/utils/request';

const api = {
  visitorRegisterAndLogin: `/${process.env.REACT_APP_STOREID}/guest/register`,
  batchAdd: `/site/${process.env.REACT_APP_STOREID}/batch-add`,
  confirmAndCommit: `/${process.env.REACT_APP_STOREID}/guest/checkout`,
  confirmAndCommitUs: `/us/${process.env.REACT_APP_STOREID}/guest/checkout`,
  addOrUpdatePaymentMethod: `/${process.env.REACT_APP_STOREID}/pay-payment-info`, // add a new card
  getPaymentMethod: `/${process.env.REACT_APP_STOREID}/pay-payment-info`, // query card list
  deleteCard: '/pay-payment-info', // delete a card
  setDefaltCard: '/pay-payment-info/default',
  // confirmAndCommit: '/tradeCustom/confirmcommitAndPaySync'

  customerCommitAndPay: '/trade-custom/checkout',
  customerCommitAndPayUs: '/us/trade-custom/checkout',
  rePay: '/trade-custom/repay',
  rePayUs: '/us/trade-custom/repay',
  customerCommitAndPayMix: '/trade-custom/mix/checkout',
  customerCommitAndPayMixUs: 'us/trade-custom/mix/checkout',
  getMarketingDiscount: '/marketing/discount',
  // getMarketingDiscount: '/marketing/getMarketingDiscount',
  getWays: `/${process.env.REACT_APP_STOREID}/pay/getPayPspList`,
  adyenPaymentsDetails: `/${process.env.REACT_APP_STOREID}/adyen/payment`,
  payu3dsPaymentsDetails: `/tradeCallback/v2/${process.env.REACT_APP_STOREID}/payu/${process.env.REACT_APP_LANG}/athorization`,
  // adyenPaymentsDetails: '/adyenPay/payments/details',
  getProductPetConfig: '/order/config/findPet',
  // getProductPetConfig: '/order/config/findPet'
  adyen3DSResult: `/${process.env.REACT_APP_STOREID}/adyen/identity/verification/payment`,
  Adyen3DSResult: '/Adyen3DSResult',
  //CYBER
  usPaymentInfo: `/${process.env.REACT_APP_STOREID}/us-pay-payment-info`, //CYBER绑卡
  usGuestPaymentInfo: `/${process.env.REACT_APP_STOREID}/us-guest-pay-payment-info`, //CYBER游客绑卡

  installments: '/payment-method/installments'
};

export default api;

export function usPaymentInfo(parameter) {
  return axios({
    url: api.usPaymentInfo,
    method: 'post',
    data: parameter
  });
}

export function usGuestPaymentInfo(parameter) {
  return axios({
    url: api.usGuestPaymentInfo,
    method: 'post',
    data: parameter
  });
}

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
    url:
      process.env.REACT_APP_GA_COUNTRY == 'US'
        ? api.confirmAndCommitUs
        : api.confirmAndCommit,
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
    url:
      process.env.REACT_APP_GA_COUNTRY == 'US'
        ? api.customerCommitAndPayUs
        : api.customerCommitAndPay,
    method: 'post',
    data: parameter
  });
}

export function customerCommitAndPayMix(parameter) {
  return axios({
    url:
      process.env.REACT_APP_GA_COUNTRY == 'US'
        ? api.customerCommitAndPayMixUs
        : api.customerCommitAndPayMix,
    method: 'post',
    data: parameter
  });
}

export function rePay(parameter) {
  return axios({
    url: process.env.REACT_APP_GA_COUNTRY == 'US' ? api.rePayUs : api.rePay,
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

export function payu3dsPaymentsDetails(parameter) {
  return axios({
    url: api.payu3dsPaymentsDetails,
    method: 'post',
    params: parameter
  });
}

export function getProductPetConfig(parameter) {
  // parameter.goodsInfos.map((ele) => {
  //   if (ele.goods) {
  //     ele.goods.goodsDetail = '';
  //   }
  //   if (ele.goodsInfos) {
  //     ele.goodsInfos.map((el) => {
  //       el.goods = null;
  //     });
  //   }
  //   return Object.assign(ele, {
  //     goodsDetail: ''
  //   });
  // });
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

export function adyen3DSResult(parameter) {
  return axios({
    url: api.adyen3DSResult,
    method: 'post',
    data: parameter
  });
}

export function Adyen3DSResultParam() {
  return axios({
    url: api.Adyen3DSResult,
    method: 'post'
  });
}

export function queryIsSupportInstallMents(parameter) {
  return axios({
    url: api.installments,
    method: 'post',
    data: parameter
  });
}
