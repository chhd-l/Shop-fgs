import axios from '@/utils/request'

const api = {
    dispenser:'/food/dispenser',
    remainings: `food/dispenser/${process.env.REACT_APP_STOREID}/remainings`
}

export default api
export function getFoodDispenserList (parameter) {
  return axios({
    
    // url: `${api.list}/${process.env.REACT_APP_STOREID}/SP2102012016432/prods`,
    url: `${api.dispenser}/${process.env.REACT_APP_STOREID}/${parameter}/prods`,
    data: {},
    method: 'post'
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
export function getRemainings (parameter) {
    return axios({
      url: `${api.remainings}`,
      method: 'post',
      data: parameter,
    })
  }