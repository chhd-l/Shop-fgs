import axios from '@/utils/request';

const api = {
  // apiupdate erreur de fonctionnement 原本接口就报错
  details: '/guest/products',
  // details: '/goods/unLogin/spu',
  loginDetails: '/goods/spu',
  detailsBySpu: '/goods/spu_no',
  detailsBySpuIgnoreDisplayFlag: '/goods/ignoreDisplayFlag/spu_no',
  goodsRelation: '/goodsRelation',
  getMixFeeding: '/goodsRelation/relatedInfo',
  getMixFeedings: '/goodsRelation/relatedInfoBySpuIds',
  productFinderDailyPortion: '/productFinderDailyPortion/breeds',
  productFinderDailyPortionRation: 'productFinderDailyPortion/ration'
};

export default api;

export function productFinderDailyPortion(data) {
  return axios({
    url: `${api.productFinderDailyPortion}`,
    method: 'post',
    data
  });
}

export function productFinderDailyPortionRation(data) {
  return axios({
    url: `${api.productFinderDailyPortionRation}`,
    method: 'post',
    data
  });
}

export function getDetails(parameter) {
  return axios({
    url: `${api.details}/${parameter}`,
    method: 'get'
  });
}

export function getLoginDetails(parameter) {
  return axios({
    url: `${api.loginDetails}/${parameter}`,
    method: 'get'
  });
}

export function getDetailsBySpuNo(parameter) {
  return axios({
    url: `${api.detailsBySpu}/${parameter}`,
    method: 'get'
  });
}

// display为no的时候也需要查询到商品详情数据
export function getDetailsBySpuNoIgnoreDisplayFlag(parameter) {
  return axios({
    url: `${api.detailsBySpuIgnoreDisplayFlag}/${parameter}`,
    method: 'get'
  });
}

// 已登录查询评价
export function getLoginGoodsEvaluate(data) {
  return axios({
    url: `/goodsEvaluate/spuGoodsEvaluatePageLogin`,
    method: 'post',
    data
  });
}
//未登录查询评价
export function getUnLoginGoodsEvaluate(data) {
  return axios({
    url: `/goodsEvaluate/spuGoodsEvaluatePage`,
    method: 'post',
    data
  });
}

//查询 Related Product
export function getGoodsRelation(parameter) {
  return axios({
    url: `${api.goodsRelation}/${parameter}`,
    method: 'get'
  });
}

export function getMixFeeding(id) {
  return axios({
    url: `${api.getMixFeeding}/${id}`,
    method: 'get'
  });
}

export function getMixFeedings(ids) {
  return axios({
    url: `${api.getMixFeedings}`,
    method: 'post',
    data: {
      goodsIds: ids
    }
  });
}
