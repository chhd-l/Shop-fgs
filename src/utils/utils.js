import { getStoreCate } from '@/api'
import { STOREID } from '@/utils/constant'
import { purchases } from '@/api/cart'

/**
 * 
 * @param {*} val 
 * @param {*} currency 1-$ 2-₱
 */
export function formatMoney (val, currency = 2) {
  val = val + ''
  let ret = val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const mapEnum = { 1: '$', 2: 'Mex$' }
  return `${mapEnum[currency]} ${ret}`
}

export async function queryStoreCateIds () {
  let tmp = sessionStorage.getItem('rc-storeId-list')
  if (!tmp) {
    let res = await getStoreCate({ storeId: STOREID })
    if (res.context && res.context.length) {
      sessionStorage.setItem('rc-storeId-list', JSON.stringify(res.context))
    }
  }
  return JSON.parse(sessionStorage.getItem('rc-storeId-list'))
}

export function getParaByName (search, name) {
  search = search.substr(1);
  if (typeof name === 'undefined') return search
  let searchArr = search.split('&');
  for (let i = 0; i < searchArr.length; i++) {
    let searchStr = searchArr[i];
    searchArr[i] = searchStr.split('=');
    if (searchArr[i][0] === name) {
      return searchStr.replace(name + '=', '');
    }
  }
  return ''
}

export function translateHtmlCharater (html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent;
}

export async function hanldePurchases (goodsInfoDTOList) {
  let ret = []
  try {
    let res = await purchases({
      goodsInfoDTOList,
      goodsInfoIds: [],
      goodsMarketingDTOList: []
    })
    ret = res.context.goodsInfos
  } catch (e) {

  } finally {
    return ret
  }
}