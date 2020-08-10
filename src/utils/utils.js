import { getStoreCate, getProps } from '@/api'
import { purchases, mergePurchase } from '@/api/cart'
import { getDict } from '@/api/dict'
import { find } from 'lodash'
import stores from '@/store';
import { getContactInfo } from '@/api/phone'
import { getConfig } from '@/api/user'

const checkoutStore = stores.checkoutStore

/**
 * 
 * @param {*} val 
 * @param {*} currency 1-$ 2-₱
 */
export function formatMoney (val, currency = 1) {
  if (isNaN(val)) {
    val = 0
  }
  val = val + ''
  let ret = val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  // const mapEnum = { 1: '$', 2: 'Mex$' }
  // return `${mapEnum[currency]} ${ret}`

  let currencyObj = {}
  if (sessionStorage.getItem('currency')) {
    currencyObj = JSON.parse(sessionStorage.getItem('currency'))
  }
  // else {
  //   await getConfig().then(res => {
  //     console.log(res, 'resssssss')
  //     sessionStorage.setItem('currency', JSON.stringify(res.context.currency))
  //     currencyObj = res.context.currency
  //   })
  // }
  // console.log(currencyObj.valueEn, 'currencyObj.valueEn')
  return `${currencyObj ? currencyObj.valueEn : ''} ${ret}`

}
export async function getStoreContentInfo () {
  let storeContentInfo = {}
  if (sessionStorage.getItem('storeContentInfo')) {
    storeContentInfo = JSON.parse(sessionStorage.getItem('storeContentInfo'))
    return storeContentInfo
  } else {
    try {
      let res = await getContactInfo(process.env.REACT_APP_STOREID)
      sessionStorage.setItem('storeContentInfo', JSON.stringify(res.context))
      return res.context
    } catch (err) {
      console.log(err)
    }
  }
}

export async function queryStoreCateIds () {
  let tmp = sessionStorage.getItem('rc-storeId-list')
  if (!tmp) {
    let res = await getStoreCate({ storeId: process.env.REACT_APP_STOREID })
    if (res.context && res.context.length) {
      sessionStorage.setItem('rc-storeId-list', JSON.stringify(res.context))
    }
  }
  return JSON.parse(sessionStorage.getItem('rc-storeId-list'))
}

/**
 * 获取商品属性
 */
export async function queryProps () {
  let tmp = sessionStorage.getItem('rc-goodsprop-list')
  if (!tmp) {
    let res = await getProps(process.env.REACT_APP_CATEID)
    if (res.context && res.context.length) {
      sessionStorage.setItem('rc-goodsprop-list', JSON.stringify(res.context))
    }
  }
  return JSON.parse(sessionStorage.getItem('rc-goodsprop-list'))
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
    ret = res.context
  } catch (e) {

  } finally {
    return ret
  }
}

/**
 * 合并购物车(登录后合并非登录态的购物车数据，购物车页面的合并在购物车页面本身触发)
 */
export async function mergeUnloginCartData () {
  const unloginCartData = checkoutStore.cartData
  await mergePurchase({
    purchaseMergeDTOList: unloginCartData.map(ele => {
      return {
        goodsInfoId: find(ele.sizeList, s => s.selected).goodsInfoId,
        goodsNum: ele.quantity,
        invalid: false,
        goodsCategory: ele.goodsCategory
      }
    })
  })
  checkoutStore.removeCartData()
}

/**
 * 数组扁平化
 * @param {Array} array - 数组 
 */
export function flat (arr) {
  var res = [];
  for (let el of arr) {
    if (Array.isArray(el)) {
      res = res.concat(flat(el));
    } else {
      res.push(el);
    }
  }
  return res;
}

/**
 * 获取字典并存入session
 * @param {type, name} type - 字典名 
 */
export async function getDictionary ({ type, name = '' }) {
  let ret = []
  const tmpKey = `dict-${type}`
  if (sessionStorage.getItem(tmpKey)) {
    ret = JSON.parse(sessionStorage.getItem(tmpKey))
  } else {
    let res = await getDict({
      delFlag: 0,
      storeId: process.env.REACT_APP_STOREID,
      type,
      name
    })
    const sysDictionaryVOS = res.context.sysDictionaryVOS
    sessionStorage.setItem(tmpKey, JSON.stringify(sysDictionaryVOS))
    ret = sysDictionaryVOS
  }
  return ret
}

export function getDeviceType () {
  let t = ''
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    t = 'M'
  } else {
    t = 'PC'
  }
  return t
}