import axios from '@/utils/request'

const api = {
  miniPurchases: '/site/front/miniPurchases',
  purchases: '/site/front/purchases',
}

export default api

export function miniPurchases (parameter) {
  return axios({
    url: `${api.miniPurchases}`,
    method: 'post',
    data: parameter
  })
}

export function purchases (parameter) {
  return axios({
    url: `${api.purchases}`,
    method: 'post',
    data: parameter
  })
}