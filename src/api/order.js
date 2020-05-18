import axios from '@/utils/request'

const api = {
  list: '/trade/page',
}

export default api

export function getOrderList (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}