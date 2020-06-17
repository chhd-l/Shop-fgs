import axios from '@/utils/request'

const api = {
  queryPrescription: '/prescriber/listPagePrescriberMap',  //搜索Clinic
  prescriptionById: '/prescriber/getPrescriberById', //Clinic详情
  allClinics: '/prescriber/listAll' //所有Clinic
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