
import axios from '@/utils/request'

const api = {
  getPetList: '/pets/petsByConsumer',
  addPet: '/pets/addPets',
  petsById:'/pets/petsById',
  delPets:'/pets/delPets',
  editPets:'/pets/editPets',
  getDict:'/sysdict/querySysDictionary'
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

