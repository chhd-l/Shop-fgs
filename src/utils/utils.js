import { getStoreCate } from '@/api'
import { STOREID } from '@/utils/constant'
import { purchases } from '@/api/cart'

/**
 * 
 * @param {*} val 
 * @param {*} currency 1-$ 2-₱
 */
export function formatMoney (val, currency = 1) {
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
    ret = res.context
  } catch (e) {

  } finally {
    return ret
  }
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