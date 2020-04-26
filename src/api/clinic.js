import axios from '@/utils/request'

const api = {
  queryPrescription: '/clinics/prescription',
  allClinics:'/clinics/queryPrescriptionNonsort'
}

export default api

export function getPrescription (parameter) {
  return axios({
    url: `${api.queryPrescription}`,
    method: 'post',
    data:parameter
  })
}
export function getAllPrescription (parameter) {
  return axios({
    url: `${api.allClinics}`,
    method: 'post',
    data:parameter
  })
}