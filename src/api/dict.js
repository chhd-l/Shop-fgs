import axios from '@/utils/request'

const api = {
  // getDict:'/sysdict/querySysDictionary'
  getDict:'/sysdict/dictionary'
}

export default api
export function getDict (parameter) {
  return axios({
    url: `${api.getDict}`,
    method: 'get',
    params: parameter
  })
}