import axios from '@/utils/request'

const api = {
  queryPrescription: '/clinics/prescription',
  prescriptionById: '/clinics/prescriptionById',
  allClinics: '/clinics/queryPrescriptionNonsort'
}

export default api

export function getPrescription (parameter) {
  return axios({
    url: `${api.queryPrescription}`,
    method: 'post',
    data: parameter
  })
}
export function getAllPrescription (parameter) {
  return axios({
    url: `${api.allClinics}`,
    method: 'post',
    data: parameter
  })
}

export function getPrescriptionById (parameter) {
  return axios({
    url: `${api.prescriptionById}`,
    method: 'post',
    data: parameter
  })
}