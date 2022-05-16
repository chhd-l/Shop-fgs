import axios from '@/utils/request';

const api = {
  sevenPayApi: `/pay/voucher/`,
  visitorRegisterAndLogin: `/${window.__.env.REACT_APP_STOREID}/guest/register`,
  batchAdd: `/site/${window.__.env.REACT_APP_STOREID}/batch-add`,
  confirmAndCommit: `/${window.__.env.REACT_APP_STOREID}/guest/checkout`,
  addOrUpdatePaymentMethod: `/${window.__.env.REACT_APP_STOREID}/pay-payment-info`, // add a new card
  addOrUpdatePaymentMethodRu: `/${window.__.env.REACT_APP_STOREID}/card-authorization`, // 俄罗斯新增 card
  getPaymentMethod: `/${window.__.env.REACT_APP_STOREID}/pay-payment-info`, // query card list
  deleteCard: '/pay-payment-info', // delete a card
  setDefaltCard: '/pay-payment-info/default',

  customerCommitAndPay: `/${window.__.env.REACT_APP_STOREID}/trade-member/checkout`,
  rePay: '/trade-custom/repay',
  getMarketingDiscount: '/marketing/discount',
  getWays: `/${window.__.env.REACT_APP_STOREID}/pay/getPayPspList`,
  adyenPaymentsDetails: `/${window.__.env.REACT_APP_STOREID}/adyen/payment`,
  payu3dsPaymentsDetails: `/payCallback/${window.__.env.REACT_APP_STOREID}/payu/authorization`,
  getProductPetConfig: '/order/config/findPet',
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
  confirmAndCommitFelin: `/${window.__.env.REACT_APP_STOREID}/feline/checkout`, //felin checkout
  repayFelin: '/feline/repay', //felin repay
  getPaymentMethodV2: `/payment-method/query-by-StoreId/${window.__.env.REACT_APP_STOREID}`, //查询所有支持的支付方式图片
  adyenOriginClientKeyV2: `/${window.__.env.REACT_APP_STOREID}/payment-method/origin-client-keys`,
  checkUserOrEmailIsBlocked: '', //check user account or guest email is blocked or not
  swishCancelOrRefund: '/adyenPay/paying/cancelOrRefund', //swish取消订单
  calculateServiceFeeAndLoyaltyPoints:
    '/site/calculateServiceFeeAndLoyaltyPoints', //切换支付方式，重新计算价格
  ownerTotalPoints: '/points/owner-total-points', //获取总积分
  ownerPointsInfo: '/points/owner-points-info', //历史使用和挣得积分
  valetGuestOrderPaymentResponse: ''
};

export default api;

export function valetGuestOrderPaymentResponse({ guest_id, parameter }) {
  return axios({
    url: `/site/${guest_id}/valet-guest-order-payment-response`,
    method: 'post',
    data: parameter
  });
}

export function queryPosOrder(tidList) {
  return axios({
    url: `/all/order/queryPosOrder`,
    method: 'post',
    data: { tidList: [tidList] }
  });
}

export function cancelPosOrder(tid) {
  return axios({
    url: `/all/order/cancelPosOrder`,
    method: 'post',
    data: { tid }
  });
}

export function sevenPayApi(tid) {
  return axios({
    // SIRCFJP000001048
    // url:`https://shopsit.royalcanin.com/api/pay/voucher/`+tid,
    url: api.sevenPayApi + tid,
    method: 'GET',
    params: ''
  });
}

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

//除checkout 首次获取卡列表和 paypal支付方式获取卡列表外，其他地方获取排除paypal卡
export async function getPaymentMethod(parameter = {}, needPaypalCard = false) {
  const res = await getPaymentMethodCard(parameter);
  if (!needPaypalCard) {
    res.context = res?.context?.filter(
      (item) => item.paymentItem?.toLowerCase() !== 'adyen_paypal'
    );
  }
  return res;
}

export function getPaymentMethodCard(parameter) {
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
    url: api.customerCommitAndPay,
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

export function rePayFelin(parameter) {
  return axios({
    url: api.repayFelin,
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

export function getPaymentMethodV2(parameter) {
  return axios({
    url: api.getPaymentMethodV2,
    method: 'get',
    params: parameter
  });
}

export function fetchAdyenOriginClientKeyV2() {
  return axios({
    url: api.adyenOriginClientKeyV2,
    method: 'get'
  });
}

export function checkUserOrEmailIsBlocked(parameter) {
  return axios({
    url: api.checkUserOrEmailIsBlocked,
    method: 'get',
    params: parameter
  });
}

export function swishCancelOrRefund(parameter) {
  return axios({
    url: api.swishCancelOrRefund,
    method: 'post',
    data: parameter
  });
}

export function calculateServiceFeeAndLoyaltyPoints(parameter) {
  return axios({
    url: api.calculateServiceFeeAndLoyaltyPoints,
    method: 'post',
    data: parameter
  });
}

export function ownerTotalPoints(parameter) {
  return axios({
    url: api.ownerTotalPoints,
    method: 'post',
    data: parameter
  });
}

export function ownerPointsInfo(parameter) {
  return axios({
    url: api.ownerPointsInfo,
    method: 'post',
    data: parameter
  });
}
