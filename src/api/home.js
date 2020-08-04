import axios from '@/utils/request'

const api = {
  getBanner:'/banner/get'
}

export default api
export function getBanner() {
  return axios({
    url: `${api.getBanner}`,
    method: 'post',
    data: {storeId: process.env.REACT_APP_STOREID}
  })
}