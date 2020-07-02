import axios from '@/utils/request'

const api = {
  storeCate: '/storeCate',
  props: '/goods/goodsProp',
  uploadResource: '/common/uploadResource'
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