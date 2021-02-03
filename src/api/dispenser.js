import axios from '@/utils/request'

const api = {
    dispenser:'/food/dispenser',
    detail: 'food/dispenser/123456858/prodInfo'
}

export default api
export function getFoodDispenserList (parameter) {
  return axios({
    // url: `${api.list}/${process.env.REACT_APP_STOREID}/SP2102012016432/prods`,
    url: `${api.dispenser}/123456858/SP2102012016432/prods`,
    method: 'get',
    data: parameter
  })
}

export function getFoodDispenserDes (parameter) {
    return axios({
      // url: `${api.list}/${process.env.REACT_APP_STOREID}/prodInfo`,
      url: `${api.dispenser}/123456858/prodInfo`,
      method: 'post',
      data: parameter
    })
  }