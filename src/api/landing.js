import axios from '@/utils/request'

const api = {
    customerInfoSave: '/customer-info/save',
}


export function customerInfoSave (parameter) {
    return axios({
      url: api.customerInfoSave,
      method: 'post',
      data: parameter
    })
  }