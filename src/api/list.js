import axios from '@/utils/request'

const api = {
  list: '/goods/spuListFront',
  props: '/goods/props'
}

export default api

export function getProps (parameter) {
  return axios({
    url: `${api.props}/${parameter}`,
    method: 'get'
  })
}

export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}