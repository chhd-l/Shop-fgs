
import axios from '@/utils/request'

const api = {
  customerInfoById: '/customer/customerInfoById/',
}

export default api

export function getCustomerInfoById (parameter) {
  return axios({
    url: `${api.customerInfoById}/${parameter}`,
    method: 'get'
  })
}