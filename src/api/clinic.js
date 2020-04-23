import axios from '@/utils/request'

const api = {
  queryPrescription: '/goods/unLogin/spu'
}

export default api

export function getDetails (parameter) {
  return axios({
    url: `${api.details}/${parameter}`,
    method: 'get'
  })
}