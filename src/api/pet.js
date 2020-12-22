
import axios from '@/utils/request'

const api = {
  getPetList: '/pets/petsByConsumer',
  addPet: '/pets/addPets',
  petsById:'/pets/petsById',
  delPets:'/pets/delPets',
  editPets:'/pets/editPets',
  batchAddPets: '/pets/batchAddPets',
  getRecommendProducts: '/product/finder/pets/products',
}

export default api

export function getPetList (parameter) {
  return axios({
    url: `${api.getPetList}`,
    method: 'post',
    data: parameter
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
    method: 'post',
    data: parameter
  })
}
export function delPets (parameter) {
  return axios({
    url: `${api.delPets}`,
    method: 'post',
    data: parameter
  })
}
export function editPets (parameter) {
  return axios({
    url: `${api.editPets}`,
    method: 'post',
    data: parameter
  })
}

export function getRecommendProducts(parameter) {
  let param = ''
  for (let k in parameter) {
    param = param + k + '=' + parameter[k] + '&'
  }
  return axios({
    url: `${api.getRecommendProducts}?${param.slice(0, param.length - 2)}`,
    method: 'get',
    // data: JSON.stringify(parameter)
  })
}
