
import axios from '@/utils/request'

const api = {
  phone: '/store/storeContentInfo'
}

export default api

export function getContactInfo (parameter) {
  return axios({
    url: `${api.phone}/${parameter}`,
    method: 'get'
  })
}
