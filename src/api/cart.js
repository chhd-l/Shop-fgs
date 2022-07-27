import axios from '@/utils/request';

const api = {
  purchases: '/site/front/purchases', // 游客计算价格
  sitePurchases: '/site/purchases', // 会员计算价格
  carts: `/site/${window.__.env.REACT_APP_STOREID}/carts`, // 单个商品加入后台购物车
  queryBackendCart: `/site/${window.__.env.REACT_APP_STOREID}/mini-carts`, // 查询后台购物车
  mergePurchase: `/site/${window.__.env.REACT_APP_STOREID}/carts/merge`, // 合并前后台购物车
  switchSize: `/site/${window.__.env.REACT_APP_STOREID}/carts/specific`, // 切换规格
  goodsRelationBatch: '/goodsRelation/batch', //购物车related product
  shippingCalculation: '/tempoline', // 计算运费
  querySurveyContent: '/survey/active', //us 获取问卷调查内容
  recordSurveyReview: '/survey/views', //统计survey 1 review
  valetGuestMiniCars: `/site/${window.__.env.REACT_APP_STOREID}`,
  batchAdd: `/site/${window.__.env.REACT_APP_STOREID}/batch-add`, // 批量加入后台购物车
  stockNoticeModify: `/stockNotice/modify`, // 登录无库存邮件通知
  stockNoticeModifyUnLogin: `/stockNotice/modifyPDP` // 未登录无库存邮件通知
};

export default api;

export function purchases(parameter) {
  // let goodsMarketingDTOList = {
  //   "id": null,
  //   "goodsInfoId": "ff80808171621c9f0172179136b70454",
  //   "customerId": null,
  //   "marketingId": 443
  // }
  let goodsMarketingDTOList = [];
  let goodsInfoIds = [];
  parameter.goodsInfoDTOList.map((el) => {
    goodsInfoIds.push(el.goodsInfoId);
    goodsMarketingDTOList.push({
      id: null,
      goodsInfoId: el.goodsInfoId,
      customerId: null,
      marketingId: 401 // todo
    });
    return el;
  });
  parameter.goodsMarketingDTOList = goodsMarketingDTOList;
  parameter.goodsInfoIds = goodsInfoIds;
  return axios({
    url: `${api.purchases}`,
    method: 'post',
    data: parameter
  });
}

// Add products to the cart
export function addItemToBackendCart(parameter) {
  return axios({
    url: `${api.carts}`,
    method: 'post',
    data: parameter
  });
}

// Update products in the cart
export function updateBackendCart(parameter) {
  return axios({
    url: `${api.carts}`,
    method: 'put',
    data: parameter
  });
}

// Delete products in the cart
export function deleteItemFromBackendCart(parameter) {
  return axios({
    url: `${api.carts}`,
    method: 'delete',
    data: parameter
  });
}

export function queryBackendCart(parameter) {
  // delFlag在checkout页面和buynow查询的时候不能删除ind商品，需要删除该字段
  if (
    location.pathname.includes('/checkout') ||
    location.pathname.includes('/register')
  ) {
    parameter.delFlag = 1;
  }
  if (parameter.delFlag == 1) {
    delete parameter.delFlag; //是否可以删除indiv产品的参数 delFlag ，可以不传，非空就可以删除indiv
  } else {
    parameter.delFlag = 2;
  }
  return axios({
    url: `${api.queryBackendCart}`,
    // method: 'post',
    // data: parameter
    method: 'get',
    params: parameter
  });
}

export function sitePurchases(parameter) {
  return axios({
    url: `${api.sitePurchases}`,
    method: 'post',
    data: parameter
  });
}

export function mergePurchase(parameter) {
  return axios({
    url: `${api.mergePurchase}`,
    method: 'post',
    data: parameter
  });
}

export function switchSize(parameter) {
  return axios({
    url: `${api.switchSize}`,
    method: 'put',
    data: parameter
  });
}

//购物车 查询related product
export function getGoodsRelationBatch(parameter) {
  return axios({
    url: `${api.goodsRelationBatch}`,
    method: 'post',
    data: parameter
  });
}
// 计算运费
export function shippingCalculation(parameter) {
  return axios({
    url: `${api.shippingCalculation}`,
    method: 'post',
    data: parameter
  });
}

//us 获取问卷调查内容
export function querySurveyContent(parameter) {
  return axios({
    url:
      parameter.customerId !== ''
        ? `${api.querySurveyContent}/${parameter.storeId}/${parameter.customerId}/${parameter.breedOrShelter}`
        : `${api.querySurveyContent}/${parameter.storeId}/${parameter.breedOrShelter}`,
    method: 'get',
    params: {}
  });
}

//统计survey 1 review
export function recordSurveyReview(parameter) {
  return axios({
    url: `${api.recordSurveyReview}`,
    method: 'post',
    data: parameter
  });
}

export function valetGuestMiniCars(guestId) {
  return axios({
    url: `${api.valetGuestMiniCars}/${guestId}/valet-guest-mini-carts`,
    method: 'get'
  });
}

//Felin游客代客下单查询resposne接口
export function valetGuestOrderPaymentResponse(guestId) {
  return axios({
    url: `/site/${guestId}/valet-guest-order-payment-response`,
    method: 'post'
  });
}

export function batchAdd(parameter) {
  return axios({
    url: api.batchAdd,
    method: 'post',
    data: parameter
  });
}

export function stockNoticeModify(parameter) {
  return axios({
    url: api.stockNoticeModify,
    method: 'post',
    data: parameter
  });
}
export function stockNoticeModifyUnLogin(parameter) {
  return axios({
    url: api.stockNoticeModifyUnLogin,
    method: 'post',
    data: parameter
  });
}
