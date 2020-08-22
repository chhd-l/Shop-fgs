import axios from '@/utils/request'

const api = {
  getRecommendationList:'/recommendation/findById'
}

export default api
export function getRecommendationList(data) {
  return axios({
    url: `${api.getRecommendationList}`,
    method: 'post',
    data: {
      id: 5
    }
  })
}