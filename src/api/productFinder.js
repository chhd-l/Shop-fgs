import axios from '@/utils/request';
import { getClubFlag } from '@/utils/utils';

const api = {
  nextStep: '/product/finder/nextStep',
  matchProducts: '/product/finder/products', // 根据问题，查询匹配产品
  nextStep_club: '/product/finder/club/nextStep',
  matchProducts_club: '/product/finder/club/products',
  getRecommendationInfo: '/individualization/recommendationProduct'
};

export default api;
export function query(parameter) {
  let url = api.nextStep;
  if (getClubFlag()) {
    url = api.nextStep_club;
    Object.assign(parameter, {
      apiTree: 'club_V2'
    });
  }
  return axios({
    url: `${url}`,
    method: 'post',
    data: parameter
  });
}

export function edit(parameter) {
  let url = api.nextStep;
  if (['tr', 'ru'].indexOf(window.__.env.REACT_APP_COUNTRY) > -1) {
    url = api.nextStep_club;
    Object.assign(parameter, {
      apiTree: 'club_V2'
    });
  }
  return axios({
    url: `${url}`,
    method: 'put',
    data: parameter
  });
}

export function matchProducts(parameter) {
  let url = api.matchProducts;
  if (getClubFlag()) {
    url = api.matchProducts_club;
    Object.assign(parameter, {
      apiTree: 'club_V2'
    });
  }
  return axios({
    url: `${url}`,
    method: 'post',
    data: parameter
  });
}
export function getRecommendationInfo(parameter) {
  return axios({
    url: `${api.getRecommendationInfo}`,
    method: 'post',
    data: parameter
  });
}
