import axios from '@/utils/request';

const api = {
  getFaq: `/faqs/${window.__.env.REACT_APP_STOREID}`
};

export default api;
export function getFaq(data) {
  return axios({
    url: `${api.getFaq}`,
    method: 'get',
    params: data
  });
}
