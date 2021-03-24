import axios from '@/utils/request';

const api = {
  nextStep: '/product/finder/nextStep',
  matchProducts: '/product/finder/products', // 根据问题，查询匹配产品
  nextStep_club: '/product/finder/club/nextStep',
  matchProducts_club: '/product/finder/club/products'
};

export default api;
export function query(parameter) {
  let url = api.nextStep;
  if (['tr', 'ru'].indexOf(process.env.REACT_APP_LANG) > -1) {
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
  if (['tr', 'ru'].indexOf(process.env.REACT_APP_LANG) > -1) {
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
  if (['tr', 'ru'].indexOf(process.env.REACT_APP_LANG) > -1) {
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
