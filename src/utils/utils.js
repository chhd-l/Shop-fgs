import { getStoreCate, getSeoConfig } from '@/api';
import { purchases, mergePurchase } from '@/api/cart';
import { getDict } from '@/api/dict';
import { find } from 'lodash';
import stores from '@/store';

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
  if (!tmp.twoDecimals) {
    // 保留两位小数时，不填充0
    val = parseFloat(val);
  }
  val += '';
  return new Intl.NumberFormat(process.env.REACT_APP_NAVIGATOR_LANG, {
    style: 'currency',
    currency: process.env.REACT_APP_CURRENCY
  }).format(val);
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
    t = 'H5';
  } else {
    t = 'PC';
  }
  return t;
}

/**
 * validate data
 * @param {Object} data - data needs validate
 */
export async function validData(rule, data) {
  for (let key in data) {
    const val = data[key];
    const targetRule = find(rule, (ele) => ele.key === key);
    if (targetRule) {
      if (targetRule.require && !val) {
        throw new Error(targetRule.errMsg);
      }
      if (targetRule.regExp && val && !targetRule.regExp.test(val)) {
        throw new Error(targetRule.errMsg);
      }
    }
  }
}

export function generatePayUScript(deviceSessionId) {
  loadJS({
    url: `https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200`
  });
  loadNoScriptIframeJS({
    style:
      'width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;',
    src: `https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200`
  });
}

export function loadJS({
  url,
  callback = function () {},
  dataSets,
  code,
  className,
  type
}) {
  var script = document.createElement('script');
  if (className) {
    script.className = className;
  }
  script.type = type || 'text/javascript';

  if (dataSets) {
    for (let key in dataSets) {
      script.dataset[key] = dataSets[key];
    }
  }
  if (code) {
    script.innerHTML = code;
  }
  //IE
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //其他浏览器
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

export function loadNoScriptIframeJS({ style, src }) {
  var script = document.createElement('noscript');
  let iframe = document.createElement('iframe');
  iframe.style = style;
  iframe.src = src;

  script.appendChild(iframe);
  document.getElementsByTagName('head')[0].appendChild(script);
}

export function dynamicLoadCss(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  head.appendChild(link);
}

/**
 * 递归生成树形结构，依赖关系为id和parentId
 * @param {Array} params - 需要递归的源数据
 */
export function generateOptions(params) {
  let result = [];
  for (let param of params) {
    if (!param.parentId) {
      //判断是否为顶层节点
      let parent = {
        //转换成el-Cascader可以识别的数据结构
        ...param
      };
      parent.children = getchilds(param.id, params); //获取子节点
      result.push(parent);
    }
  }
  result.sort((a, b) => a.sort - b.sort);
  return result;
}

function getchilds(id, array) {
  let childs = new Array();
  for (let arr of array) {
    //循环获取子节点
    if (arr.parentId == id) {
      childs.push({
        ...arr
      });
    }
  }
  for (let child of childs) {
    //获取子节点的子节点
    let childscopy = getchilds(child.id, array); //递归获取子节点
    if (childscopy.length) {
      child.children = childscopy;
    }
  }
  childs.sort((a, b) => a.sort - b.sort);
  return childs;
}

export function setSeoConfig(
  obj = { goodsId: '', categoryId: '', pageName: '' }
) {
  if (!sessionStorage.getItem('seoInfo')) {
    let params = {
      type: 4,
      storeId: process.env.REACT_APP_STOREID
    };
    getSeoConfig(params).then((res) => {
      if (res.code === 'K-000000') {
        let seoInfo = res.context.seoSettingVO;
        sessionStorage.setItem('seoInfo', JSON.stringify(seoInfo));
        changeTitleAndMeta(seoInfo);
        if (obj.pageName) {
          getPageSeo(obj.goodsId, obj.categoryId, obj.pageName);
        } else if (obj.categoryId) {
          getCateSeo(obj.goodsId, obj.categoryId);
        } else if (obj.goodsId) {
          getGoodsSeo(obj.goodsId);
        }
      }
    });
  } else {
    let seoInfo = JSON.parse(sessionStorage.getItem('seoInfo'));
    changeTitleAndMeta(seoInfo);
    if (obj.pageName) {
      getPageSeo(obj.goodsId, obj.categoryId, obj.pageName);
    } else if (obj.categoryId) {
      getCateSeo(obj.goodsId, obj.categoryId);
    } else if (obj.goodsId) {
      getGoodsSeo(obj.goodsId);
    }
  }
}
function getPageSeo(goodsId, categoryId, pageName) {
  let params = {
    type: 3,
    pageName: pageName,
    storeId: process.env.REACT_APP_STOREID
  };
  getSeoConfig(params).then((res) => {
    if (res.code === 'K-000000') {
      let seoInfo = res.context.seoSettingVO;
      changeTitleAndMeta(seoInfo);
      if (categoryId) {
        getCateSeo(goodsId, categoryId);
      } else if (goodsId) {
        getGoodsSeo(goodsId);
      }
    }
  });
}
function getCateSeo(goodsId, categoryId) {
  let params = {
    type: 2,
    storeCateId: categoryId,
    storeId: process.env.REACT_APP_STOREID
  };
  getSeoConfig(params).then((res) => {
    if (res.code === 'K-000000') {
      let seoInfo = res.context.seoSettingVO;
      changeTitleAndMeta(seoInfo);
      if (goodsId) {
        getGoodsSeo(goodsId);
      }
    }
  });
}
function getGoodsSeo(goodsId) {
  let params = {
    type: 1,
    goodsId: goodsId,
    storeId: process.env.REACT_APP_STOREID
  };
  getSeoConfig(params).then((res) => {
    if (res.code === 'K-000000') {
      let seoInfo = res.context.seoSettingVO;
      changeTitleAndMeta(seoInfo);
    }
  });
}

//修改title和meta
function changeTitleAndMeta(seoInfo) {
  if (seoInfo.title) {
    document.title = seoInfo.title;
  }
  let metaList = document.getElementsByTagName('meta');
  if (seoInfo.metaKeywords) {
    for (let i = 0; i < metaList.length; i++) {
      if (metaList[i].getAttribute('name') === 'keysword') {
        metaList[i].content = seoInfo.metaKeywords;
      }
    }
  }
  if (seoInfo.metaDescription) {
    for (let i = 0; i < metaList.length; i++) {
      if (metaList[i].getAttribute('name') === 'description') {
        metaList[i].content = seoInfo.metaDescription;
      }
    }
  }
}
