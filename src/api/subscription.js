
import axios from '@/utils/request'

const api = {
  getList: '/sub/findPage'
}

export default api

export function getSubList (parameter) {
  return axios({
    url: `${api.getList}`,
    method: 'post',
    data: parameter
  })
}