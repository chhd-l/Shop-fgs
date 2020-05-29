import axios from '@/utils/request'

const api = {
  queryPrescription: '/clinics/prescription',  //搜索Clinic
  prescriptionById: '/clinics/prescriptionById', //Clinic详情
  allClinics: '/clinics/queryPrescriptionNonsort' //所有Clinic
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