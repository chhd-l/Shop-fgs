import axios from '@/utils/request'

const api = {
  storeCate: '/storeCate',
  props: '/goods/goodsProp',
  uploadResource: '/common/uploadResource',
  queryCityNameById: '/system-city/query-system-city-by-id',
  queryCityByName: '/system-city/query-system-city-by-name',
  buryPoint: '/wm.gif'
}

export default api

export function getStoreCate (parameter) {
  return axios({
    url: api.storeCate,
    method: 'post',
    data: parameter
  })
}

export function uploadResource (params) {
  return axios({
    url: api.uploadResource,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function getProps (parameter) {
  return axios({
    url: `${api.props}/${parameter}`,
    method: 'get'
  })
}

export function queryCityNameById (parameter) {
  return axios({
    url: api.queryCityNameById,
    method: 'post',
    data: parameter
  })
}

export function queryCityByName (parameter) {
  return axios({
    url: api.queryCityByName,
    method: 'post',
    data: parameter
  })
}

export function setBuryPoint (parameter) {
  return axios({
    url: api.buryPoint,
    method: 'post',
    data: parameter
  })
}