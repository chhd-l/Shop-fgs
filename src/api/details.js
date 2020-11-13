import axios from '@/utils/request'

const api = {
  details: '/goods/unLogin/spu',
  loginDetails: '/goods/spu',
  goodsRelation: '/goodsRelation',
}

export default api

export function getDetails (parameter) {
  return axios({
    url: `${api.details}/${parameter}`,
    method: 'get'
  })
}

export function getLoginDetails (parameter) {
  return axios({
    url: `${api.loginDetails}/${parameter}`,
    method: 'get'
  })
}

// 已登录查询评价
export function getLoginGoodsEvaluate (data) {
  return axios({
    url: `/goodsEvaluate/spuGoodsEvaluatePageLogin`,
    method: 'post',
    data
  })
}
//未登录查询评价
export function getUnLoginGoodsEvaluate (data) {
  return axios({
    url: `/goodsEvaluate/spuGoodsEvaluatePage`,
    method: 'post',
    data
  })
}

//查询 Related Product
export function getGoodsRelation (parameter) {
  return axios({
    url: `${api.goodsRelation}/${parameter}`,
    method: 'get'
  })
}