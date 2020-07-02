
import axios from '@/utils/request'

const api = {
  customerBase: '/customer/customerBase'
}

export default api

export function getCustomerInfo (parameter) {
  return axios({
    url: `${api.customerBase}`,
    method: 'get'
  })
}

export function updateCustomerBaseInfo (parameter) {
  return axios({
    url: `${api.customerBase}`,
    method: 'put',
    data: parameter
  })
}