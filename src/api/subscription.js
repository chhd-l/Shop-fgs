import axios from '@/utils/request';

const api = {
  getList: `/${window.__.env.REACT_APP_STOREID}/subs`,
  getSubDetail: '/sub/',
  updateDetail: `/${window.__.env.REACT_APP_STOREID}/sub/`,
  changeSubscriptionDetailPets: `/${window.__.env.REACT_APP_STOREID}/subs/changeSubscriptionDetailPets`,
  getAddressDetail: '/customer/address/',
  skipNextSub: `/${window.__.env.REACT_APP_STOREID}/sub/cancel-next`,
  cancelAllSub: '/sub/cancel',
  orderNowSub: '/sub/order-now',
  startSubscription: '/sub/reStartSubscription',
  pauseSubscription: '/sub/pauseSubscription',
  // orderNowSub: '/sub/createOrderNow',
  // getPromotionPrice: `/${window.__.env.REACT_APP_STOREID}/sub/prom-price`,
  getPromotionPrice: '/sub/getPromotionPrice',
  // updateNextDeliveryTime: '/sub/updateNextDeliveryTime',
  updateNextDeliveryTime: `/${window.__.env.REACT_APP_STOREID}/sub/next-deliver/`,
  changeSubscriptionGoods: `/${window.__.env.REACT_APP_STOREID}/subs/changeSubscriptionGoods`,
  getListForPet: `/${window.__.env.REACT_APP_STOREID}/subGoodsByPetsId`,
  findPetProductForClub: '/product/finder/club/pets/products',
  checkSubscriptionAddressPickPoint: `/${window.__.env.REACT_APP_STOREID}/sub/checkSubscriptionAddressPickPoint` //订阅详情修改quantity、address、product时tempoline api验证
};

export default api;

export function getSubList(parameter) {
  return axios({
    url: `${api.getList}`,
    method: 'get',
    params: parameter
  });
}

export function getSubListForPet(parameter) {
  return axios({
    url: `${api.getListForPet}`,
    method: 'post',
    data: parameter
  });
}

export function changeSubscriptionDetailPets(parameter) {
  return axios({
    url: `${api.changeSubscriptionDetailPets}`,
    method: 'put',
    data: parameter
  });
}
export function updateDetail(parameter) {
  return axios({
    url: `${api.updateDetail}${parameter.subscribeId}`,
    method: 'put',
    data: parameter
  });
}
export function getAddressDetail(parameter) {
  return axios({
    url: `${api.getAddressDetail}` + parameter,
    method: 'get'
  });
}

export function getSubDetail(parameter) {
  return axios({
    url: `${api.getSubDetail}` + parameter,
    method: 'get'
  });
}

export function skipNextSub(parameter) {
  return axios({
    url: `${api.skipNextSub}`,
    method: 'post',
    data: parameter
  });
}

export function cancelAllSub(parameter) {
  return axios({
    url: `${api.cancelAllSub}`,
    method: 'post',
    data: parameter
  });
}

export function orderNowSub(parameter) {
  return axios({
    url: `${api.orderNowSub}`,
    method: 'post',
    data: parameter
  });
}

export function getPromotionPrice(parameter) {
  return axios({
    url: `${api.getPromotionPrice}`,
    // method: 'get',
    // params: parameter
    method: 'post',
    data: parameter
  });
}

export function updateNextDeliveryTime(parameter) {
  return axios({
    url: `${api.updateNextDeliveryTime}${parameter.subscribeId}`,
    method: 'put',
    data: parameter
  });
}
export function startSubscription(parameter) {
  return axios({
    url: `${api.startSubscription}`,
    method: 'post',
    data: parameter
  });
}
export function pauseSubscription(parameter) {
  return axios({
    url: `${api.pauseSubscription}`,
    method: 'post',
    data: parameter
  });
}

export function changeSubscriptionGoods(parameter) {
  return axios({
    url: `${api.changeSubscriptionGoods}`,
    method: 'put',
    data: parameter
  });
}

export function findPetProductForClub(parameter) {
  return axios({
    url: `${api.findPetProductForClub}`,
    method: 'get',
    params: parameter
  });
}

export function checkSubscriptionAddressPickPoint(parameter) {
  return axios({
    url: `${api.checkSubscriptionAddressPickPoint}`,
    method: 'post',
    data: parameter
  });
}

export function DeleteItem(Id, parma) {
  return axios({
    url: `/${Id}/subs/deleteSubscriptionGoods`,
    method: 'put',
    data: parma
  });
}
