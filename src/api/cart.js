import axios from '@/utils/request'

const api = {
  miniPurchases: '/site/front/miniPurchases',
  purchases: '/site/front/purchases',

  sitePurchase: '/site/purchase', // 加入后台购物车
  siteMiniPurchases: '/site/miniPurchases', // 查询后台购物车
  sitePurchases: '/site/purchases', // 计算价格
  mergePurchase: '/site/mergePurchase', // 合并前后台购物车
  switchSize: '/site/updatePurchase' // 切换规格
}

export default api

export function miniPurchases (parameter) {
  return axios({
    url: `${api.miniPurchases}`,
    method: 'post',
    data: parameter
  })
}

export function purchases (parameter) {
  // let goodsMarketingDTOList = {
  //   "id": null,
  //   "goodsInfoId": "ff80808171621c9f0172179136b70454",
  //   "customerId": null,
  //   "marketingId": 443
  // }
  let goodsMarketingDTOList = []
  let goodsInfoIds = []
  parameter.goodsInfoDTOList.map(el => {
    goodsInfoIds.push(el.goodsInfoId)
    goodsMarketingDTOList.push({
      id: null,
      goodsInfoId: el.goodsInfoId,
      customerId: null,
      marketingId: 401 // todo
    })
    return el
  })
  parameter.goodsMarketingDTOList = goodsMarketingDTOList
  parameter.goodsInfoIds = goodsInfoIds
  return axios({
    url: `${api.purchases}`,
    method: 'post',
    data: parameter
  })
}

export function sitePurchase (parameter) {
  return axios({
    url: `${api.sitePurchase}`,
    method: 'post',
    data: parameter
  })
}

export function updateBackendCart (parameter) {
  return axios({
    url: `${api.sitePurchase}`,
    method: 'put',
    data: parameter
  })
}

export function deleteItemFromBackendCart (parameter) {
  return axios({
    url: `${api.sitePurchase}`,
    method: 'delete',
    data: parameter
  })
}

export function siteMiniPurchases (parameter) {
  return axios({
    url: `${api.siteMiniPurchases}`,
    method: 'post',
    data: parameter
  })
}

export function sitePurchases (parameter) {
  return axios({
    url: `${api.sitePurchases}`,
    method: 'post',
    data: parameter
  })
}

export function mergePurchase (parameter) {
  return axios({
    url: `${api.mergePurchase}`,
    method: 'post',
    data: parameter
  })
}

export function switchSize (parameter) {
  return axios({
    url: `${api.switchSize}`,
    method: 'post',
    data: parameter
  })
}