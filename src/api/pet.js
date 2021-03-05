
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

function addOktaTokenField(param) {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'))
  if(tokenObj.accessToken) {
    param.token = 'Bearer ' + tokenObj.accessToken.accessToken
  }
  return param
}

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
    data: addOktaTokenField(parameter)
  })
}
export function batchAddPets (parameter) {
  return axios({
    url: `${api.batchAddPets}`,
    method: 'post',
    data: addOktaTokenField(parameter)
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
    data: addOktaTokenField(parameter)
  })
}
export function editPets (parameter) {
  return axios({
    url: `${api.editPets}`,
    method: 'put',
    data: addOktaTokenField(parameter)
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
