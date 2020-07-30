import { getStoreCate, getProps } from '@/api'
import { purchases, mergePurchase } from '@/api/cart'
import { getDict } from '@/api/dict'
import { find } from 'lodash'
import stores from '@/store';
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
  const mapEnum = { 1: '$', 2: 'Mex$' }
  return `${mapEnum[currency]} ${ret}`

  let currencyObj = {}
  if(sessionStorage.getItem('currency')) {
    currencyObj = JSON.parse(sessionStorage.getItem('currency'))
  }
  // else {
  //   await getConfig().then(res => {
  //     console.log(res, 'resssssss')
  //     sessionStorage.setItem('currency', JSON.stringify(res.context.currency))
  //     currencyObj = res.context.currency
  //   })
  // }
  
  return `${currencyObj.valueEn} ${ret}`

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
 * 获取前几个月日期
 * @param {*} date 
 * @param {*} monthNum 
 */
export function getPreMonthDay (date, monthNum) {
  var dateArr = date.split('-');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - monthNum;
  if (month2 <= 0) {
    year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
    month2 = 12 - (Math.abs(month2) % 12);
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 1);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (days2 < 10) {
    days2 = '0' + days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + days2;
  return t2;
}

/**
 * 格式化时间
 * @param {Number} time - 毫秒数 
 */
export function dateFormat (fmt, date) {
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
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
