import axios from '@/utils/request';

const api = {
  getRecommendationList: '/recommendation/findById',
  getRecommendations: '/recommendation',
  getPrescriberByPrescriberIdAndStoreId:
    '/prescriber/getPrescriberByPrescriberIdAndStoreId',
  felinReco: '/felin/reco',
  shelterList: '/prescriber/shelter'
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

export function getFelinReco(parameter) {
  return axios({
    url: `${api.felinReco}/${parameter}`,
    method: 'post'
  });
}

export function getPrescriberByPrescriberIdAndStoreId(data) {
  return axios({
    url: `${api.getPrescriberByPrescriberIdAndStoreId}`,
    method: 'post',
    data
  });
}

export function getRecommendationList_token(data) {
  return axios({
    url: `${api.getRecommendations}/token=${data}`,
    method: 'get'
  });
}

export function getRecommendationList_prescriberId(data) {
  return axios({
    url: `${api.getRecommendations}/prescriberId=${data}`,
    method: 'get'
  });
}

export function getShelterList(data) {
  return axios({
    url: `${api.shelterList}`,
    method: 'post',
    data
  });
}
