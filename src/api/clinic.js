import axios from '@/utils/request'

const api = {
  queryPrescription: '/prescriber/listPagePrescriberMap',  //搜索Clinic
  prescriptionById: '/prescriber/getPrescriberById', //Clinic详情

  allClinics: '/prescriber/listAll', //所有Clinic
  getPrescriberByKeyWord: '/prescriber/getPrescriberByKeyWord', //根据clinic name/id查询
  getPrescriberByCode: '/prescriber/getPrescriberByCode', //根据recommendation code查询(明文)
  getPrescriberByEncryptCode: '/prescriber/getPrescriberByEncryptCode',//根据recommendation code查询(密文)
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

export function getPrescriberByKeyWord (parameter) {
  return axios({
    url: `${api.getPrescriberByKeyWord}`,
    method: 'post',
    data: parameter
  })
}

export function getPrescriberByCode (parameter) {
  return axios({
    url: `${api.getPrescriberByCode}`,
    method: 'post',
    data: parameter
  })
}

export function getPrescriberByEncryptCode (parameter) {
  return axios({
    url: `${api.getPrescriberByCode}`,
    method: 'post',
    data: parameter
  })
}