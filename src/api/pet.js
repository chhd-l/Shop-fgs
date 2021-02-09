
import axios from '@/utils/request'

const api = {
  getPetList: '/pets/consumer=',
  addPet: '/pets',
  petsById:'/pets/',
  delPets:'/pets/',
  // delPets:'/pets/delPets',
  editPets:'/pets',
  batchAddPets: '/pets/batchAddPets',
  getRecommendProducts: '/product/finder/pets/products',
}

export default api

export function getPetList (parameter) {
  return axios({
    url: `${api.getPetList}${parameter.customerId}`,
    method: 'get',
    params: parameter
  })
}
export function addPet (parameter) {
  return axios({
    url: `${api.addPet}`,
    method: 'post',
    data: parameter
  })
}
export function batchAddPets (parameter) {
  return axios({
    url: `${api.batchAddPets}`,
    method: 'post',
    data: parameter
  })
}

export function petsById (parameter) {
  return axios({
    url: `${api.petsById}`,
    url: `${api.petsById}${parameter.petsId}`,
    method: 'post',
    data: parameter
  })
}
export function delPets (parameter) {
  return axios({
    url: `${api.delPets}`,
    method: 'delete',
    data: parameter
  })
}
export function editPets (parameter) {
  return axios({
    url: `${api.editPets}`,
    method: 'put',
    data: parameter
  })
}

export function getRecommendProducts(parameter) {
  let param = ''
  for (let k in parameter) {
    param = param + k + '=' + parameter[k] + '&'
  }
  return axios({
    url: `${api.getRecommendProducts}?${param.slice(0, param.length - 1)}`,
    method: 'get',
    // data: JSON.stringify(parameter)
  })
}
