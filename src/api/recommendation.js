import axios from '@/utils/request';

const api = {
  getRecommendationList: '/recommendation/findById',
  getRecommendations: '/recommendation',
  getPrescriberByPrescriberIdAndStoreId:
    '/prescriber/getPrescriberByPrescriberIdAndStoreId',
  felinReco: '/felin/reco',
  shelterList: '/prescriber/shelter',
  recommendation: '/recommendation'
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
    url: `${api.getRecommendations}/token=${data.id}`,
    method: 'get',
    params: {
      allGoods: data.allGoods || false
    }
  });
}

export function getRecommendationList_prescriberId(data) {
  return axios({
    url: `${api.getRecommendations}/prescriberId=${data.id}`,
    method: 'get',
    params: {
      allGoods: data.allGoods || false
    }
  });
}

export function getShelterList(data) {
  return axios({
    url: `${api.shelterList}`,
    method: 'post',
    data
  });
}
export function getRecommendation(products, customerId) {
  return axios({
    url: `${api.recommendation}?products=${products}&customerId=${customerId}`,
    method: 'get',
    params: {
      allGoods: true
    }
  });
}

export function saveShelterId(data) {
  return axios({
    url: '/customerDetail/updateShelterId',
    method: 'post',
    data
  });
}
