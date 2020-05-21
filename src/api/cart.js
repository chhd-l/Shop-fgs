import axios from '@/utils/request'

const api = {
  miniPurchases: '/site/front/miniPurchases',
  purchases: '/site/front/purchases',
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
      "id": null,
      "goodsInfoId": el.goodsInfoId,
      "customerId": null,
      "marketingId": 401
    })
  })
  parameter.goodsMarketingDTOList = goodsMarketingDTOList
  parameter.goodsInfoIds = goodsInfoIds
  return axios({
    url: `${api.purchases}`,
    method: 'post',
    data: parameter
  })
}