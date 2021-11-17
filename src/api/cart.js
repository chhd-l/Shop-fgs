import axios from '@/utils/request';

const api = {
  miniPurchases: '/site/front/miniPurchases',
  purchases: '/site/front/purchases', // 游客计算价格
  sitePurchases: '/site/purchases', // 会员计算价格
  sitePurchase: `/site/${window.__.env.REACT_APP_STOREID}/carts`, // 加入后台购物车
  siteMiniPurchases: `/site/${window.__.env.REACT_APP_STOREID}/mini-carts`, // 查询后台购物车
  mergePurchase: `/site/${window.__.env.REACT_APP_STOREID}/carts/merge`, // 合并前后台购物车
  switchSize: `/site/${window.__.env.REACT_APP_STOREID}/carts/specific`, // 切换规格
  goodsRelationBatch: '/goodsRelation/batch', //购物车related product
  shippingCalculation: '/tempoline', // 计算运费
  //todo  接口地址补充
  querySurveyContent: '/', //us 获取问卷调查内容
  accountHasClickSurvey: '/', //us 查询会员是否已经点击过survey
  recordSurveyReview: '/' //统计survey 1 review
};

export default api;

export function miniPurchases(parameter) {
  return axios({
    url: `${api.miniPurchases}`,
    method: 'post',
    data: parameter
  });
}

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

export function sitePurchase(parameter) {
  return axios({
    url: `${api.sitePurchase}`,
    method: 'post',
    data: parameter
  });
}

export function updateBackendCart(parameter) {
  return axios({
    url: `${api.sitePurchase}`,
    method: 'put',
    data: parameter
  });
}

export function deleteItemFromBackendCart(parameter) {
  return axios({
    url: `${api.sitePurchase}`,
    method: 'delete',
    data: parameter
  });
}

export function siteMiniPurchases(parameter) {
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
    url: `${api.siteMiniPurchases}`,
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
    url: `${api.querySurveyContent}`,
    method: 'get',
    params: parameter
  });
}

//us 查询会员是否已经点击过survey
export function accountHasClickSurvey(parameter) {
  return axios({
    url: `${api.accountHasClickSurvey}`,
    method: 'get',
    params: parameter
  });
}

//统计survey 1 review
export function recordSurveyReview(parameter) {
  return axios({
    url: `${api.recordSurveyReview}`,
    method: 'get',
    params: parameter
  });
}
