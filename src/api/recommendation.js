import axios from '@/utils/request'

const api = {
  getRecommendationList:'/recommendation/findById'
  // getRecommendationList:'/recommendation/'
}

export default api
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
  })
}