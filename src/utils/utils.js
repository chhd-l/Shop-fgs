import { getSeoConfig, queryHeaderNavigations } from '@/api';
import { purchases, mergePurchase } from '@/api/cart';
import { findStoreCateList } from '@/api/home';
import { getDict } from '@/api/dict';
import { findFilterList, findSortList } from '@/api/list';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import stores from '@/store';
import { toJS } from 'mobx';
import { createIntl, createIntlCache } from 'react-intl';
import es from 'date-fns/locale/es';
import de from 'date-fns/locale/de';
import fr from 'date-fns/locale/de';
import { registerLocale } from 'react-datepicker';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
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
        goodsInfoFlag: ele.goodsInfoFlag,
        periodTypeId: ele.periodTypeId,
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
  type,
  id
}) {
  var script = document.createElement('script');
  if (className) {
    script.className = className;
  }
  script.type = type || 'text/javascript';

  if (id) {
    script.id = id;
  }

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
  if (url) {
    script.src = url;
  }
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

/**
 * 树形结构数据，根据子节点寻找父节点
 * @param {Array} data - 树形结构源数据
 * @param {Number/String} id - 需要操作的子节点id
 * @param {String} matchIdName - 需要匹配的节点key name
 */

export function getParentNodesByChild({ data: arr1, id, matchIdName }) {
  var temp = [];
  var forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (id && item[matchIdName] === id) {
        temp.push(item);
        forFn(arr1, item.parentId);
        break;
      } else {
        if (item.children) {
          forFn(item.children, id);
        }
      }
    }
  };
  forFn(arr1, id);
  return temp;
}

export async function setSeoConfig(
  obj = { goodsId: '', categoryId: '', pageName: '' }
) {
  // 如果页面调用了这个方法，就需要移除html里默认的字段
  document.getElementsByTagName('meta')[(name = 'description')] &&
    document.getElementsByTagName('meta')[(name = 'description')].remove();
  document.getElementsByTagName('meta')[(name = 'keywords')] &&
    document.getElementsByTagName('meta')[(name = 'keywords')].remove();
  let goodsSeo = {},
    cateSeo = {},
    pageSeo = {},
    siteSeo = {};
  if (obj.goodsId) {
    goodsSeo = await getGoodsSeo(obj.goodsId);
  }
  if (obj.categoryId) {
    cateSeo = await getCateSeo(obj.categoryId);
  }
  if (obj.pageName) {
    pageSeo = await getPageSeo(obj.pageName);
  }
  if (!sessionStorage.getItem('seoInfo')) {
    siteSeo = await getSiteSeo();
  } else {
    siteSeo = JSON.parse(sessionStorage.getItem('seoInfo'));
  }

  // setTimeout(() => {
  let seoInfo = {
    title:
      goodsSeo.title || cateSeo.title || pageSeo.title || siteSeo.title || '',
    metaKeywords:
      goodsSeo.metaKeywords ||
      cateSeo.metaKeywords ||
      pageSeo.metaKeywords ||
      siteSeo.metaKeywords ||
      '',
    metaDescription:
      goodsSeo.metaDescription ||
      cateSeo.metaDescription ||
      pageSeo.metaDescription ||
      siteSeo.metaDescription ||
      ''
  };
  // changeTitleAndMeta(seoInfo);
  return seoInfo;

  // }, 100);
}

export async function beforeSetSeoConfig(
  obj = { goodsId: '', categoryId: '', pageName: '' }
) {
  return;
  let goodsSeo = {},
    cateSeo = {},
    pageSeo = {},
    siteSeo = {};
  if (obj.goodsId) {
    goodsSeo = await getGoodsSeo(obj.goodsId);
  }
  if (obj.categoryId) {
    cateSeo = await getCateSeo(obj.categoryId);
  }
  if (obj.pageName) {
    pageSeo = await getPageSeo(obj.pageName);
  }
  if (!sessionStorage.getItem('seoInfo')) {
    siteSeo = await getSiteSeo();
  } else {
    siteSeo = JSON.parse(sessionStorage.getItem('seoInfo'));
  }

  setTimeout(() => {
    let seoInfo = {
      title:
        goodsSeo.title || cateSeo.title || pageSeo.title || siteSeo.title || '',
      metaKeywords:
        goodsSeo.metaKeywords ||
        cateSeo.metaKeywords ||
        pageSeo.metaKeywords ||
        siteSeo.metaKeywords ||
        '',
      metaDescription:
        goodsSeo.metaDescription ||
        cateSeo.metaDescription ||
        pageSeo.metaDescription ||
        siteSeo.metaDescription ||
        ''
    };
    changeTitleAndMeta(seoInfo);
    // return seoInfo
  }, 100);
}

// export function setSeoConfig(
//   obj = { goodsId: '', categoryId: '', pageName: '' }
// ) {
//   if (!sessionStorage.getItem('seoInfo')) {
//     let params = {
//       type: 4,
//       storeId: process.env.REACT_APP_STOREID
//     };
//     getSeoConfig(params).then((res) => {
//       if (res.code === 'K-000000') {
//         let seoInfo = res.context.seoSettingVO;
//         sessionStorage.setItem('seoInfo', JSON.stringify(seoInfo));
//         changeTitleAndMeta(seoInfo);
//         if (obj.pageName) {
//           getPageSeo(obj.goodsId, obj.categoryId, obj.pageName);
//         } else if (obj.categoryId) {
//           getCateSeo(obj.goodsId, obj.categoryId);
//         } else if (obj.goodsId) {
//           getGoodsSeo(obj.goodsId);
//         }
//       }
//     });
//   } else {
//     let seoInfo = JSON.parse(sessionStorage.getItem('seoInfo'));
//     changeTitleAndMeta(seoInfo);
//     if (obj.pageName) {
//       getPageSeo(obj.goodsId, obj.categoryId, obj.pageName);
//     } else if (obj.categoryId) {
//       getCateSeo(obj.goodsId, obj.categoryId);
//     } else if (obj.goodsId) {
//       getGoodsSeo(obj.goodsId);
//     }
//   }
// }
async function getSiteSeo() {
  try {
    const res = await getSeoConfig({
      type: 4,
      storeId: process.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}

async function getPageSeo(pageName) {
  try {
    const res = await getSeoConfig({
      type: 3,
      pageName: pageName,
      storeId: process.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}
async function getCateSeo(categoryId) {
  try {
    const res = await getSeoConfig({
      type: 2,
      storeCateId: categoryId,
      storeId: process.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}
async function getGoodsSeo(goodsId) {
  try {
    const res = await getSeoConfig({
      type: 1,
      goodsId: goodsId,
      storeId: process.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}

// 修改title和meta
function changeTitleAndMeta(seoInfo) {
  console.log('changeTitleAndMeta');
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

// 分发跳转prescriber/payment页面
// 一旦正向流程跳转prescriber/payment页面，则需使用此方法，以替代routeFilter.js中的相关拦截，以此解决闪现/presciber页面的bug
export function distributeLinktoPrecriberOrPaymentPage({
  configStore = {},
  checkoutStore,
  clinicStore,
  isLogin = false
}) {
  const {
    autoAuditFlag,
    AuditData = [],
    loginCartData,
    cartData
  } = checkoutStore;
  console.log(toJS(AuditData), 'sas');
  // 不开启地图，跳过prescriber页面
  if (!configStore.prescriberMap) {
    return '/checkout';
  }
  // 校验审核
  if (isLogin) {
    let needPrescriber;
    if (autoAuditFlag) {
      needPrescriber =
        loginCartData.filter((el) => el.prescriberFlag).length > 0;
    } else {
      needPrescriber = AuditData.length > 0;
    }
    if (!needPrescriber || localItemRoyal.get(`rc-linkedAuditAuthorityFlag`)) {
      return '/checkout';
    }
  } else {
    let needPrescriber;
    if (autoAuditFlag) {
      needPrescriber = cartData.filter((el) => el.prescriberFlag).length > 0;
    } else {
      needPrescriber = AuditData.length > 0;
    }
    if (!needPrescriber || localItemRoyal.get(`rc-linkedAuditAuthorityFlag`)) {
      return '/checkout';
    }
  }

  // 校验本地prescriber缓存，有则跳过prescriber页面
  if (
    (localItemRoyal.get(`rc-linkedAuditAuthorityFlag`) ||
      localItemRoyal.get(`rc-linkedAuditAuthorityFlag`) === undefined) &&
    ((localItemRoyal.get(`rc-clinic-id-link`) &&
      localItemRoyal.get(`rc-clinic-name-link`)) ||
      (localItemRoyal.get(`rc-clinic-id-select`) &&
        localItemRoyal.get(`rc-clinic-name-select`)) ||
      (localItemRoyal.get(`rc-clinic-id-default`) &&
        localItemRoyal.get(`rc-clinic-name-default`)))
  ) {
    if (localItemRoyal.get(`rc-linkedAuditAuthorityFlag`)) {
      if (clinicStore.linkClinicId) {
        clinicStore.setSelectClinicId(clinicStore.linkClinicId);
        clinicStore.setSelectClinicName(clinicStore.linkClinicName);
      }
    } else if (
      !clinicStore.linkClinicId &&
      !clinicStore.selectClinicId &&
      clinicStore.defaultClinicId
    ) {
      clinicStore.setSelectClinicId(clinicStore.defaultClinicId);
      clinicStore.setSelectClinicName(clinicStore.defaultClinicName);
    }
    return '/checkout';
  }
  return '/prescription';
}

export async function getFrequencyDict() {
  return Promise.all([
    getDictionary({ type: 'Frequency_day' }),
    getDictionary({ type: 'Frequency_week' }),
    getDictionary({ type: 'Frequency_month' })
  ]).then((res) => {
    return Promise.resolve(flatten(res));
  });
}

/**
 * 查询home页分类信息
 */
export async function queryStoreCateList() {
  let ret = sessionItemRoyal.get('home-navigations');
  if (ret) {
    ret = JSON.parse(ret);
  } else {
    const res = await findStoreCateList();
    if (res.context) {
      ret = res.context;
      Array.from(ret, (ele) => {
        const tmpImgList = JSON.parse(ele.cateImg);
        ele.cateImgForHome = tmpImgList[0] ? tmpImgList[0].artworkUrl : '';
        ele.cateImgForList = tmpImgList.length > 1 && tmpImgList[1].artworkUrl;
        return ele;
      });

      sessionItemRoyal.set('home-navigations', JSON.stringify(ret));
    }
  }
  return ret;
}

/**
 * 查询PLP filter数据
 */
export async function fetchFilterList() {
  let ret = sessionItemRoyal.get('filter-navigations');
  if (ret) {
    ret = JSON.parse(ret);
  } else {
    const res = await findFilterList();
    if (res.context) {
      ret = res.context;
      sessionItemRoyal.set('filter-navigations', JSON.stringify(ret));
    }
  }
  return ret;
}
/**
 * 查询PLP sort数据
 */
export async function fetchSortList() {
  let ret = sessionItemRoyal.get('sort-navigations');
  if (ret) {
    ret = JSON.parse(ret);
  } else {
    const res = await findSortList();
    if (res.context) {
      ret = res.context;
      sessionItemRoyal.set('sort-navigations', JSON.stringify(ret));
    }
  }
  return ret;
}

// findSortList

/**
 * 查询二级导航
 */
export async function fetchHeaderNavigations() {
  let ret = sessionItemRoyal.get('header-navigations');
  if (ret) {
    ret = JSON.parse(ret);
  } else {
    const res = await queryHeaderNavigations();
    if (res.context) {
      ret = res.context.filter((el) => el.enable);
      sessionItemRoyal.set('header-navigations', JSON.stringify(ret));
    }
  }
  return ret;
}

export function getFormatDate(date) {
  if (process.env.REACT_APP_LANG === 'fr') {
    const cache = createIntlCache();
    const intl = createIntl(
      {
        locale: 'fr-FR',
        messages: {}
      },
      cache
    );
    return intl.formatDate(date);
  } else {
    return date;
  }
}

function getDatePickerConfig() {
  const lang = process.env.REACT_APP_LANG;

  switch (lang) {
    case 'de':
      registerLocale('de', de);
      break;
    case 'es':
      registerLocale('es', es);
      break;
    case 'fr':
      registerLocale('fr', fr);
      break;
    default:
      break;
  }

  const datePickerCfg = {
    es: { format: 'yyyy-MM-dd', locale: 'es' },
    de: { format: 'dd.MM.yyyy', locale: 'de' },
    fr: { format: 'dd/MM/yyyy', locale: 'fr' },
    default: { format: 'yyyy-MM-dd', locale: '' }
  };

  const curDatePickerCfg =
    datePickerCfg[process.env.REACT_APP_LANG] || datePickerCfg.default;
  return curDatePickerCfg;
}
let datePickerConfig = getDatePickerConfig();
export { datePickerConfig };

/**
 * 根据id匹配name
 * @param {Array} dictList 字典数据
 * @param {Number/String} id 需要匹配的id
 */
export function matchNamefromDict(dictList = [], id) {
  return dictList.filter(
    (ele) => ele && id && ele.id.toString() === id.toString()
  )[0]
    ? dictList.filter(
        (ele) => ele && id && ele.id.toString() === id.toString()
      )[0].name
    : id;
}
//js获取地址栏参数，并将其转换为json对象

//例如 ： http://localhost:3000/mother-&-babycat-2544?utm_source=vanityURL&utm_medium=leaflet&utm_campaign=shelter108782
//转化成:  {utm_source: "vanityURL", utm_medium: "leaflet", utm_campaign: "shelter108782"}
export function getRequest() {
  var url = window.location.search;
  var jsonList = {};
  if (url.indexOf('?') > -1) {
    var str = url.slice(url.indexOf('?') + 1);
    var strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      jsonList[strs[i].split('=')[0]] = strs[i].split('=')[1]; //如果出现乱码的话，可以用decodeURI()进行解码
    }
  }
  return jsonList;
}
