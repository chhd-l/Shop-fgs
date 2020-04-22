import axios from '@/utils/request'

const api = {
  list: '/goods/spuListFront'
}

export default api

// export function getList (parameter) {
//   return axios({
//     url: api.list,
//     method: 'post',
//     params: parameter,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }

export function getList (parameter) {
  return axios({
    url: `${api.list}/${parameter}`,
    method: 'get'
  })
}