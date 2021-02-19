import axios from '@/utils/request'

const api = {
    dispenser:'/food/dispenser'
}

export default api
export function getFoodDispenserList (parameter) {
  return axios({
    
    // url: `${api.list}/${process.env.REACT_APP_STOREID}/SP2102012016432/prods`,
    url: `${api.dispenser}/${process.env.REACT_APP_STOREID}/${parameter}/prods`,
    method: 'get'
  })
}

export function getFoodDispenserDes (parameter) {
    return axios({
      url: `${api.dispenser}/${process.env.REACT_APP_STOREID}/prodInfo`,
      // url: `${api.dispenser}/123456858/prodInfo`,
      method: 'post',
      data: parameter
    })
  }