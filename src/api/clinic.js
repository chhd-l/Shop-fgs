import axios from '@/utils/request'

const api = {
  queryPrescription: '/prescriber/listPagePrescriberMap',  //搜索Clinic
  prescriptionById: '/prescriber/', //Clinic详情
  allClinics: `/${process.env.REACT_APP_STOREID}/prescribers/all`, //所有Clinic
  getPrescriberByKeyWord: `/${process.env.REACT_APP_STOREID}/prescribers/key-word=`, //根据clinic name/id查询
  getPrescriberByCode: `/${process.env.REACT_APP_STOREID}/prescribers/code=`, //根据recommendation code查询(明文)
  getPrescriberByEncryptCode: '/prescribers/ecode=',//根据recommendation code查询(密文)
  // getPrescriberByEncryptCode: '/prescriber/getPrescriberByEncryptCode',//根据recommendation code查询(密文)
  getPrescriberByPrescriberIdAndStoreId: '/prescriber/getPrescriberByPrescriberIdAndStoreId',
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
    method: 'get',
    params: parameter
    // method: 'post',
    // data: parameter
  })
}

export function getPrescriptionById (parameter) {
  return axios({
    url: `${api.prescriptionById}${parameter.id}`,
    method: 'get',
    params: parameter
  })
}

export function getPrescriberByKeyWord (parameter) {
  return axios({
    url: `${api.getPrescriberByKeyWord}${parameter.keyWord}`,
    method: 'get',
    params: parameter
  })
}

export function getPrescriberByCode (parameter) {
  return axios({
    url: `${api.getPrescriberByCode}${parameter.code}`,
    method: 'get',
    params: parameter
  })
}

export function getPrescriberByEncryptCode (parameter) {
  return axios({
    url: `${api.getPrescriberByEncryptCode}${parameter.encryptCode}`,
    method: 'get',
    params: parameter
  })
}

export function getPrescriberByPrescriberIdAndStoreId (parameter) {
  return axios({
    url: `${api.getPrescriberByPrescriberIdAndStoreId}`,
    method: 'post',
    data: parameter
  })
}