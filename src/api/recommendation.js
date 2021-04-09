import axios from '@/utils/request';

const api = {
  getRecommendationList: '/recommendation/findById',
  getRecommendationList_fr: '/recommendation',
  felinReco: '/reco'
};

export default api;
export function getRecommendationList(data) {
  return axios({
    url: `${api.getRecommendationList}`,
    // url: `${api.getRecommendationList}${data}`,
    method: 'post',
    data: {
      id: data
    }
    // method: 'get',
    // params: {
    //   id: data
    // }
  });
}

export function getRecommendationList_fr(data) {
  return axios({
    url: `${api.getRecommendationList_fr}/token=${data}`,
    method: 'get'
  });
}

export function getFelinReco(parameter) {
  return axios({
    url: `${api.felinReco}/${parameter}`,
    method: 'post'
  });
}
