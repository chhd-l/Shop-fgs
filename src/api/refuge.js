import axios from '@/utils/request';

const api = {
  linkTransform: '/coupon-code/link/transform',
};

export default api;


export function linkTransform(parameter) {
    return axios({
      url: api.linkTransform,
      method: 'post',
      data: parameter
    });
  }