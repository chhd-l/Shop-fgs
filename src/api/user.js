
import axios from '@/utils/request'

const api = {
  customerBase: '/customer/customerBase',
  getConfig: '/initConfig/getConfig'
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

export function getConfig(parameter) {
  return axios({
    url: `${api.getConfig}`,
    method: 'post',
    data: {storeId: process.env.REACT_APP_STOREID}
  })
}