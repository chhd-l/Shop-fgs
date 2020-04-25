import axios from '@/utils/request'

const api = {
  queryPrescription: '/clinics/prescription'
}

export default api

export function getPrescription (parameter) {
  return axios({
    url: `${api.queryPrescription}`,
    method: 'post',
    data:parameter
  })
}