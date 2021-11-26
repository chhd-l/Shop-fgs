import axios from '@/utils/request';

const api = {
  getFaq: `/faqs/${window.__.env.REACT_APP_STOREID}`
};

export default api;
export function getFaq() {
  return axios({
    url: `${api.getFaq}`,
    method: 'get',
    params: { storeId: window.__.env.REACT_APP_STOREID }
  });
}
