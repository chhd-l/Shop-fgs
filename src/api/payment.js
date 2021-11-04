import axios from '@/utils/request';

const api = {
  visitorRegisterAndLogin: `/${window.__.env.REACT_APP_STOREID}/guest/register`,
  batchAdd: `/site/${window.__.env.REACT_APP_STOREID}/batch-add`,
  confirmAndCommit: `/${window.__.env.REACT_APP_STOREID}/guest/checkout`,
  confirmAndCommitUs: `/us/${window.__.env.REACT_APP_STOREID}/guest/checkout`,
  addOrUpdatePaymentMethod: `/${window.__.env.REACT_APP_STOREID}/pay-payment-info`, // add a new card
  addOrUpdatePaymentMethodRu: `/${window.__.env.REACT_APP_STOREID}/card-authorization`, // 俄罗斯新增 card
  getPaymentMethod: `/${window.__.env.REACT_APP_STOREID}/pay-payment-info`, // query card list
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
  getWays: `/${window.__.env.REACT_APP_STOREID}/pay/getPayPspList`,
  adyenPaymentsDetails: `/${window.__.env.REACT_APP_STOREID}/adyen/payment`,
  payu3dsPaymentsDetails: `/payCallback/${window.__.env.REACT_APP_STOREID}/payu/${window.__.env.REACT_APP_LANG}/authorization`,
  // adyenPaymentsDetails: '/adyenPay/payments/details',
  getProductPetConfig: '/order/config/findPet',
  // getProductPetConfig: '/order/config/findPet'
  adyen3DSResult: `/${window.__.env.REACT_APP_STOREID}/adyen/identity/verification/payment`,
  Adyen3DSResult: '/Adyen3DSResult',
  //CYBER
  usPaymentInfo: `/${window.__.env.REACT_APP_STOREID}/us-pay-payment-info`, //CYBER绑卡
  usGuestPaymentInfo: `/${window.__.env.REACT_APP_STOREID}/us-guest-pay-payment-info`, //CYBER游客绑卡
  usPayCardSubscription: `/${window.__.env.REACT_APP_STOREID}/us-pay-card-subscription`, //CYBER查询卡类型-会员
  usGuestPayCardSubscription: `/${window.__.env.REACT_APP_STOREID}/us-guest-pay-card-subscription`, //CYBER查询卡类型-游客

  installments: '/payment-method/installments',

  pickupQueryCity: '/pick-up/queryCity',
  pickupQueryCityFee: '/pick-up/queryCityFee',
  dimensionsByPackage: '/pick-up/dimensionsByPackage', // 合并包裹
  confirmAndCommitFelin: `/${window.__.env.REACT_APP_STOREID}/feline/checkout` //felin checkout
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

export function usPayCardSubscription(parameter) {
  return axios({
    url: api.usPayCardSubscription,
    method: 'post',
    data: parameter
  });
}

export function usGuestPayCardSubscription(parameter) {
  return axios({
    url: api.usGuestPayCardSubscription,
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
    // url:
    //   window.__.env.REACT_APP_COUNTRY == 'us'
    //     ? api.confirmAndCommitUs
    //     : api.confirmAndCommit,
    url: api.confirmAndCommit,
    method: 'post',
    data: parameter
  });
}

export function confirmAndCommitFelin(parameter) {
  return axios({
    url: api.confirmAndCommitFelin,
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

export function addOrUpdatePaymentMethodRu(parameter) {
  return axios({
    url: api.addOrUpdatePaymentMethodRu,
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
    // url:
    //   window.__.env.REACT_APP_COUNTRY == 'us'
    //     ? api.customerCommitAndPayUs
    //     : api.customerCommitAndPay,
    url: api.customerCommitAndPay,
    method: 'post',
    data: parameter
  });
}

export function customerCommitAndPayMix(parameter) {
  return axios({
    // url:
    //   window.__.env.REACT_APP_COUNTRY == 'us'
    //     ? api.customerCommitAndPayMixUs
    //     : api.customerCommitAndPayMix,
    url: api.customerCommitAndPayMix,
    method: 'post',
    data: parameter
  });
}

export function rePay(parameter) {
  return axios({
    // url: window.__.env.REACT_APP_COUNTRY == 'us' ? api.rePayUs : api.rePay,
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

export function pickupQueryCity(parameter) {
  return axios({
    url: `${api.pickupQueryCity}?keyword=${parameter.keyword}`,
    method: 'get'
  });
}

export function pickupQueryCityFee(parameter) {
  return axios({
    url: `${api.pickupQueryCityFee}`,
    method: 'post',
    data: parameter
  });
}

export function dimensionsByPackage(parameter) {
  return axios({
    url: api.dimensionsByPackage,
    method: 'post',
    data: parameter
  });
}
