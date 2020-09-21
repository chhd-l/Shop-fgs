import { getStoreCate, getProps } from '@/api';
import { purchases, mergePurchase } from '@/api/cart';
import { getDict } from '@/api/dict';
import { find } from 'lodash';
import stores from '@/store';
import store from 'storejs';

const sessionItemRoyal = window.__.sessionItemRoyal;
const checkoutStore = stores.checkoutStore;
const mapEnum = {
  1: { mark: '$', break: ' ', atEnd: false },
  2: { mark: 'Mex$', break: ' ', atEnd: false },
  3: { mark: '€', break: ',', atEnd: true, twoDecimals: true }
};

/**
 *
 * @param {*} val
 * @param {*} currency 1-$ 2-Mex$ 3-€
 */
export function formatMoney(
  val,
  currency = process.env.REACT_APP_CURRENCY_TYPE || 1
) {
  if (isNaN(val)) {
    val = 0;
  }
  val = Number(val).toFixed(2);
  const tmp = mapEnum[currency];
  if (!tmp.twoDecimals) { // 保留两位小数时，不填充0
    val = parseFloat(val);
  }
  val += '';
  let ret = val.replace(/\B(?=(\d{3})+(?!\d))/g, tmp.break);
  if (process.env.REACT_APP_HOMEPAGE === '/fr') {
    ret = ret.replace(/\./, '#');
    ret = ret.replace(/\,/, ' ');
    ret = ret.replace(/\#/, ',');
  }
  return tmp.atEnd ? `${ret} ${tmp.mark}` : `${tmp.mark} ${ret}`;
}

export async function queryStoreCateIds() {
  let tmp = sessionItemRoyal.get('rc-storeId-list');
  if (!tmp) {
    let res = await getStoreCate({ storeId: process.env.REACT_APP_STOREID });
    if (res.context && res.context.length) {
      sessionItemRoyal.set('rc-storeId-list', JSON.stringify(res.context));
    }
  }
  return JSON.parse(sessionItemRoyal.get('rc-storeId-list'));
}

/**
 * 获取商品属性
 */
export async function queryProps() {
  let tmp = sessionItemRoyal.get('rc-goodsprop-list');
  if (!tmp) {
    let res = await getProps(process.env.REACT_APP_CATEID);
    if (res.context && res.context.length) {
      sessionItemRoyal.set('rc-goodsprop-list', JSON.stringify(res.context));
    }
  }
  return JSON.parse(sessionItemRoyal.get('rc-goodsprop-list'));
}

export function getParaByName(search, name) {
  search = search.substr(1);
  if (typeof name === 'undefined') return search;
  let searchArr = search.split('&');
  for (let i = 0; i < searchArr.length; i++) {
    let searchStr = searchArr[i];
    searchArr[i] = searchStr.split('=');
    if (searchArr[i][0] === name) {
      return searchStr.replace(name + '=', '');
    }
  }
  return '';
}

export function translateHtmlCharater(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent;
}

export async function hanldePurchases(goodsInfoDTOList) {
  let ret = [];
  try {
    let res = await purchases({
      goodsInfoDTOList,
      goodsInfoIds: [],
      goodsMarketingDTOList: []
    });
    ret = res.context;
  } catch (e) {
  } finally {
    return ret;
  }
}

/**
 * 合并购物车(登录后合并非登录态的购物车数据，购物车页面的合并在购物车页面本身触发)
 */
export async function mergeUnloginCartData() {
  const unloginCartData = checkoutStore.cartData;
  await mergePurchase({
    purchaseMergeDTOList: unloginCartData.map((ele) => {
      return {
        goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
        goodsNum: ele.quantity,
        invalid: false,
        goodsCategory: ele.goodsCategory
      };
    })
  });
  checkoutStore.removeCartData();
}

/**
 * 数组扁平化
 * @param {Array} array - 数组
 */
export function flat(arr) {
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
export async function getDictionary({ type, name = '' }) {
  let ret = [];
  const tmpKey = `dict-${type}`;
  if (sessionItemRoyal.get(tmpKey)) {
    ret = JSON.parse(sessionItemRoyal.get(tmpKey));
  } else {
    let res = await getDict({
      delFlag: 0,
      storeId: process.env.REACT_APP_STOREID,
      type,
      name
    });
    const sysDictionaryVOS = res.context.sysDictionaryVOS;
    sessionItemRoyal.set(tmpKey, JSON.stringify(sysDictionaryVOS));
    ret = sysDictionaryVOS;
  }
  return ret;
}

export function getDeviceType() {
  let t = '';
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    t = 'M';
  } else {
    t = 'PC';
  }
  return t;
}
