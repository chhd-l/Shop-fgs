import axios from '@/utils/request'

const api = {
  getFaq:'/store/storeFAQList '
}

export default api
export function getFaq(data) {
  return axios({
    url: `${api.getFaq}`,
    method: 'post',
    data
  })
}