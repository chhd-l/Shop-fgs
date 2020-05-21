
import axios from '@/utils/request'

const api = {
  getPetList: '/pets/petsByConsumer',
  addPet: '/pets/addPets',
  petsById:'/pets/petsById'
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