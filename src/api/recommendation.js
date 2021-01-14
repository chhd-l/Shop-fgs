import axios from '@/utils/request'

const api = {
  getRecommendationList:'/recommendation/findById',
  getRecommendationList_fr:'/recommendation'
}

export default api
export function getRecommendationList(data) {
  return axios({
    url: `${api.getRecommendationList}`,
    method: 'post',
    data: {
      id: data
    }
  })
}

export function getRecommendationList_fr(data) {
  return axios({
    url: `${api.getRecommendationList_fr}/token=${data}`,
    method: 'get',
  })
}

