import axios from '@/utils/request';

const api = {
  nextStep: '/product/finder/nextStep',
  matchProducts: '/product/finder/products' // 根据问题，查询匹配产品
};

export default api;
export function query(parameter) {
  return axios({
    url: `${api.nextStep}`,
    method: 'post',
    data: parameter
  });
}

export function submit(parameter) {
  return axios({
    url: `${api.nextStep}`,
    method: 'put',
    data: parameter
  });
}

export function matchProducts(parameter) {
  return axios({
    url: `${api.matchProducts}`,
    method: 'post',
    data: parameter
  });
}
