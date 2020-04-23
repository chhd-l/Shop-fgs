import { getStoreCate } from '@/api'

export function formatMoney (val) {
  val = val + ''
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export async function queryStoreCateIds () {
  let tmp = sessionStorage.getItem('rc-storeId-list')
  if (!tmp) {
    let res = await getStoreCate({ storeId: '123456858' })
    if (res.context && res.context.length) {
      sessionStorage.setItem('rc-storeId-list', JSON.stringify(res.context))
    }
  }
  return JSON.parse(sessionStorage.getItem('rc-storeId-list'))
}