import axios from '@/utils/request'

const api = {
  getDict:'/sysdict/querySysDictionary'
}

export default api
export function getDict (parameter) {
  return axios({
    url: `${api.getDict}`,
    method: 'post',
    data: parameter
  })
}