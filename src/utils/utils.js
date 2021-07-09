import { getSeoConfig, queryHeaderNavigations } from '@/api';
import { purchases, mergePurchase } from '@/api/cart';
import { findStoreCateList } from '@/api/home';
import { getDict } from '@/api/dict';
import { findFilterList, findSortList } from '@/api/list';
import { getRation as getRation_api } from '@/api/pet';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import stores from '@/store';
import { toJS } from 'mobx';
import { createIntl, createIntlCache } from 'react-intl';
import mx from 'date-fns/locale/es';
import de from 'date-fns/locale/de';
import fr from 'date-fns/locale/fr';
import tr from 'date-fns/locale/tr';
import us from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';
import { format, utcToZonedTime } from 'date-fns-tz';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const checkoutStore = stores.checkoutStore;
const configStore = stores.configStore;
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
  currency = window.__.env.REACT_APP_CURRENCY_TYPE || 1,
  noFixed
) {
  if (isNaN(val)) {
    val = 0;
  }
  val = noFixed ? Number(val) : Number(val).toFixed(2);
  const tmp = mapEnum[currency];
  if (!tmp.twoDecimals) {
    // 保留两位小数时，不填充0
    val = parseFloat(val);
  }
  val += '';
  let length = val.length;
  if (window.__.env.REACT_APP_COUNTRY === 'tr') {
    return val + ' TL';
  }
  if (window.__.env.REACT_APP_COUNTRY === 'ru') {
    // console.log(val, 'val----');
    val = parseInt(Math.round(val));
    return new Intl.NumberFormat(window.__.env.REACT_APP_NAVIGATOR_LANG, {
      style: 'currency',
      currency: window.__.env.REACT_APP_CURRENCY,
      maximumSignificantDigits: length
    }).format(val);
  }

  return new Intl.NumberFormat(window.__.env.REACT_APP_NAVIGATOR_LANG, {
    style: 'currency',
    currency: window.__.env.REACT_APP_CURRENCY
  }).format(val);
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
  // 线下店orderSource埋点L_ATELIER_FELIN
  let orderSource = sessionItemRoyal.get('orderSource') || '';
  let params = {
    purchaseMergeDTOList: unloginCartData.map((ele) => {
      return {
        goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
        goodsNum: ele.quantity,
        goodsInfoFlag: ele.goodsInfoFlag,
        periodTypeId: ele.periodTypeId,
        invalid: false,
        recommendationInfos: ele.recommendationInfos,
        recommendationId: ele.recommendationId,
        recommendationName: ele.recommendationName,
        goodsCategory: ele.goodsCategory,
        petsId: find(ele.sizeList, (s) => s.selected).petsId,
        questionParams: ele.questionParams
      };
    })
  };
  if (orderSource) {
    params.orderSource = orderSource;
  }

  await mergePurchase(params);
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
      storeId: window.__.env.REACT_APP_STOREID,
      type,
      name
    });
    const sysDictionaryVOS = res.context.sysDictionaryVOS;
    sessionItemRoyal.set(tmpKey, JSON.stringify(sysDictionaryVOS));
    ret = sysDictionaryVOS;
  }
  return ret;
}
export function getElementToPageTop(el) {
  if (el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop;
  }
  return el.offsetTop;
}
export function getDeviceType() {
  let t = '';
  if (navigator.userAgent.match(/(pad|iPad)/i)) {
    t = 'Pad';
  } else if (
    navigator.userAgent.match(
      /(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
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
      if (
        targetRule.require &&
        targetRule.regExp &&
        val &&
        !targetRule.regExp.test(val)
      ) {
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
  if (obj.goodsId && obj.pageName) {
    goodsSeo = await getGoodsSeo(obj.goodsId, obj.pageName);
  } else if (obj.categoryId && obj.pageName) {
    cateSeo = await getCateSeo(obj.categoryId, obj.pageName);
  } else if (obj.pageName) {
    pageSeo = await getPageSeo(obj.pageName);
  } else if (!sessionStorage.getItem('seoInfo')) {
    siteSeo = await getSiteSeo();
  } else {
    siteSeo = JSON.parse(sessionStorage.getItem('seoInfo'));
  }

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
      '',
    headingTag:
      goodsSeo.headingTag ||
      cateSeo.headingTag ||
      pageSeo.headingTag ||
      siteSeo.headingTag ||
      ''
  };
  return seoInfo;
}

async function getSiteSeo() {
  try {
    const res = await getSeoConfig({
      type: 4,
      storeId: window.__.env.REACT_APP_STOREID
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
      storeId: window.__.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}
async function getCateSeo(categoryId, pageName) {
  try {
    const res = await getSeoConfig({
      type: 2,
      pageName,
      storeCateId: categoryId,
      storeId: window.__.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}
async function getGoodsSeo(goodsId, pageName) {
  try {
    const res = await getSeoConfig({
      type: 1,
      goodsId,
      pageName,
      storeId: window.__.env.REACT_APP_STOREID
    });
    return res.context.seoSettingVO;
  } catch (err) {
    return {};
  }
}

// 分发跳转prescriber/payment页面
// 一旦正向流程跳转prescriber/payment页面，则需使用此方法，以替代routeFilter.js中的相关拦截，以此解决闪现/presciber页面的bug
export async function distributeLinktoPrecriberOrPaymentPage({
  configStore,
  checkoutStore,
  clinicStore,
  isLogin = false
}) {
  const { loginCartData, cartData } = checkoutStore;
  //1、先判断商品是否含VET商品（store Portal商品类型的Need Prescriber是否打开）
  const productData = isLogin ? loginCartData : cartData;
  const needPrescriber =
    productData.filter((el) => el.prescriberFlag).length > 0;
  if (!needPrescriber) {
    //如果商品全都是SPT或者都不need prescriber,直接进入checkout页面并且不显示prescriber信息
    //并且下单时不传审核者信息,但是推荐者信息要回传回去
    clinicStore.removeSelectClinicInfo();
    localItemRoyal.set('checkOutNeedShowPrescriber', 'false');
    return '/checkout';
  }
  //2、判断是否是通过推荐链接购买
  // 通过推荐链接，指定clinic/recommendation code/recommendation id/recommendation token进入
  if (clinicStore.linkClinicId && clinicStore.linkClinicName) {
    //直接进入checkout页面并且在checkout页面上方显示prescriber信息
    if (!(clinicStore.selectClinicId && clinicStore.selectClinicName)) {
      clinicStore.setSelectClinicId(clinicStore.linkClinicId);
      clinicStore.setSelectClinicName(clinicStore.linkClinicName);
      clinicStore.setSelectClinicCode(clinicStore.linkClinicCode);
    }
    localItemRoyal.set('checkOutNeedShowPrescriber', 'true');
    return '/checkout';
  }
  //3、正常购买流程判断
  //3.1没有开启mandatory且浏览器有缓存直接进入并且在页面上方显示prescriber信息
  if (!configStore.isShowPrescriberModal) {
    if (clinicStore.selectClinicId && clinicStore.selectClinicName) {
      localItemRoyal.set('checkOutNeedShowPrescriber', 'true');
      return '/checkout';
    }
    if (clinicStore.defaultClinicId && clinicStore.defaultClinicName) {
      //没有缓存但是my account 有默认clinic
      clinicStore.setSelectClinicId(clinicStore.defaultClinicId);
      clinicStore.setSelectClinicName(clinicStore.defaultClinicName);
      clinicStore.setSelectClinicCode(clinicStore.defaultClinicCode);
      localItemRoyal.set('checkOutNeedShowPrescriber', 'true');
      return '/checkout';
    }
  }
  //3.2 如果selectType是recommendation Code直接进入checkout并且在页面上方显示prescriber--recommendation code输入框
  if (configStore.prescriberSelectTyped === 1) {
    localItemRoyal.set('checkOutNeedShowPrescriber', 'true');
    return '/checkout';
  }
  return '/prescription';
}

export async function getFrequencyDict(currentFrequencyId, frequencyType) {
  const lang = window.__.env.REACT_APP_COUNTRY;

  let autoShipFrequency = await Promise.all([
    getDictionary({ type: 'Frequency_day' }),
    getDictionary({ type: 'Frequency_week' }),
    getDictionary({ type: 'Frequency_month' })
  ]);
  autoShipFrequency = flatten(autoShipFrequency).map((el) => {
    el.goodsInfoFlag = 1;
    // 设置法国周一、周二不可选
    if (lang == 'fr') {
      el.id == 5744 || el.id == 3558
        ? (el.disabled = true)
        : (el.disabled = false);
    }
    return el;
  });
  if (lang == 'de') {
    autoShipFrequency = autoShipFrequency.filter((el) => {
      // 德国只展示1-3个月的frequency
      return (
        (el.type == 'Frequency_month' &&
          (el.valueEn === '1' || el.valueEn === '2' || el.valueEn === '3')) ||
        el.id === currentFrequencyId
      );
    });
  }
  let clubFrequency = await Promise.all([
    getDictionary({ type: 'Frequency_day_club' }),
    getDictionary({ type: 'Frequency_week_club' }),
    getDictionary({ type: 'Frequency_month_club' })
  ]);
  clubFrequency = flatten(clubFrequency).map((el) => {
    el.goodsInfoFlag = 2;
    // 设置法国周一、周二不可选
    if (lang == 'fr') {
      el.id == 5744 || el.id == 3558
        ? (el['disabled'] = true)
        : (el['disabled'] = false);
    }
    return el;
  });
  let frequencyList = autoShipFrequency;
  if (!frequencyType) {
    frequencyList = autoShipFrequency.concat(clubFrequency);
  } else if (frequencyType === 'club') {
    frequencyList = clubFrequency;
  }
  if (lang == 'de') {
    // 德国不存在club，并且只展示1-3个月的frequency
    frequencyList = autoShipFrequency;
  }
  return Promise.resolve(frequencyList);
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
        ele.cateImgForHome = (tmpImgList[0] && tmpImgList[0].artworkUrl) || '';
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

export function getFormatDate(date, callback, lang) {
  if (isMatchedLang(['fr'])) {
    const cache = createIntlCache();
    const intl = createIntl(
      {
        locale: 'fr-FR',
        messages: {}
      },
      cache
    );
    if (callback && typeof callback === 'function') {
      return callback(intl.formatDate(getZoneTime(date)));
    } else {
      return intl.formatDate(getZoneTime(date));
    }
  } else if (isMatchedLang(['us'])) {
    return format(getZoneTime(date), 'MM/dd/yyyy', {
      locale: datePickerConfig.locale_module
    });
  } else if (isMatchedLang(['tr'])) {
    return format(getZoneTime(date), 'dd-MM-yyyy', {
      locale: datePickerConfig.locale_module
    });
  } else if (isMatchedLang(['ru'])) {
    return format(getZoneTime(date), 'dd/MM/yyyy', {
      locale: datePickerConfig.locale_module
    });
  } else if (isMatchedLang(['de'])) {
    return format(getZoneTime(date), 'dd.MM.yyyy', {
      locale: datePickerConfig.locale_module
    });
  } else {
    if (callback && typeof callback === 'function') {
      return callback(date);
    } else {
      return date;
    }
  }
}
window.getFormatDate = getFormatDate;

function getDatePickerConfig() {
  const lang = window.__.env.REACT_APP_COUNTRY;

  switch (lang) {
    case 'de':
      registerLocale('de', de);
      break;
    case 'mx':
      registerLocale('es', mx);
      break;
    case 'fr':
      registerLocale('fr', fr);
      break;
    case 'us':
      registerLocale('en', us);
      break;
    case 'ru':
      registerLocale('ru', ru);
      break;
    case 'tr':
      registerLocale('tr', tr);
      break;
    default:
      break;
  }

  const datePickerCfg = {
    mx: { format: 'yyyy-MM-dd', locale: 'es', locale_module: mx },
    de: { format: 'dd.MM.yyyy', locale: 'de', locale_module: de },
    fr: { format: 'dd/MM/yyyy', locale: 'fr', locale_module: fr },
    us: { format: 'MM/dd/yyyy', locale: 'en', locale_module: us },
    ru: { format: 'dd/MM/yyyy', locale: 'ru', locale_module: ru },
    tr: { format: 'dd-MM-yyyy', locale: 'tr', locale_module: tr },
    default: { format: 'yyyy-MM-dd', locale: '' }
  };

  const curDatePickerCfg =
    datePickerCfg[window.__.env.REACT_APP_COUNTRY] || datePickerCfg.default;
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

// 数组去重
export function unique(arr) {
  return Array.from(new Set(arr));
}

export async function queryApiFromSessionCache({ sessionKey, api }) {
  let ret = sessionItemRoyal.get(sessionKey);
  if (ret) {
    ret = JSON.parse(ret);
  } else {
    const res = await api();
    ret = res;
    sessionItemRoyal.set(sessionKey, JSON.stringify(ret));
  }
  return ret;
}

// 处理对象属性值（排除属性值为：“”/null/undefined）
export function filterObjectValue(obj) {
  let nonEmpty = {};
  if (obj === null || obj === undefined || obj === '') return nonEmpty;
  for (let key in obj) {
    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      nonEmpty[key] = obj[key];
    }
  }
  return nonEmpty;
}

// 递归处理对象属性值（排除属性值为：“”/null/undefined）
export function filterObjectValueDeep(obj) {
  let nonEmpty = {};
  for (let key in obj) {
    let type = Object.prototype.toString.call(obj[key]).slice(8, -1);
    if (
      type !== 'Object' &&
      obj[key] !== '' &&
      obj[key] !== null &&
      obj[key] !== undefined
    ) {
      nonEmpty[key] = obj[key];
    }
    if (type === 'Object') {
      nonEmpty[key] = filterObjectValueDeep(obj[key]);
    }
  }

  for (let key in nonEmpty) {
    //删除空对象
    if (JSON.stringify(nonEmpty[key]) === '{}') {
      delete nonEmpty[key];
    }
  }
  return nonEmpty;
}

export function isCountriesContainer(countries) {
  return countries.indexOf(window.__.env.REACT_APP_COUNTRY) > -1;
}

/**
 *
 * @param {Array} list
 * @returns 为所支持的支付方式，拼接img
 */
export function computedSupportPaymentMethods(list = []) {
  return list
    .map((el) => ({
      name: el,
      img: CREDIT_CARD_IMGURL_ENUM[el.toUpperCase()]
    }))
    .filter((el) => el.img);
}

export function getOktaCallBackUrl(sessionToken) {
  // hard code
  const state =
    'Opb8u3tUtFEVO9Y9Fpj4XG3xevZOTh0r9ue8lF3seJP8DFQNxM7YOHM8I1OcJyKo';
  const nonce =
    '49HBgn9gMZs4BBUAWkMLOlGwerv7Cw89sT6gooduzyPfg98fOOaCBQ2oDOyCgb3T';
  // hard code
  let homePage = window.__.env.REACT_APP_HOMEPAGE;
  const regiserUrl =
    homePage.substring(homePage.length - 1, homePage.length) === '/'
      ? 'implicit/callback'
      : '/implicit/callback';
  const redirectUri = window.location.origin + homePage + regiserUrl;
  var callOktaCallBack = `${window.__.env.REACT_APP_ISSUER}/v1/authorize?client_id=${window.__.env.REACT_APP_CLIENT_ID}&response_type=id_token token&scope=openid&prompt=none&response_mode=fragment&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}&sessionToken=${sessionToken}`;
  return callOktaCallBack;
}

export function cancelPrevRequest() {
  // 设置一个函数，在执行请求前先执行这个函数
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  let cancelArr = window.axiosCancel;
  cancelArr.forEach((ele, index) => {
    ele.cancel('取消了请求'); // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index];
  });
}

export function getClubFlag() {
  return ['tr', 'ru'].indexOf(window.__.env.REACT_APP_COUNTRY) > -1;
}

// 美国订单号去掉RCFUS开头
/**
 * 统一处理显示订单号
 * @param {Object} orderNo  orderNoForOMS
 * @returns {String} orderNo
 */
export const filterOrderId = ({ orderNo, orderNoForOMS }) => {
  return (
    {
      // 1. 美国订单号去掉RCFUS开头
      // 2. 美国先展示OMS order number，否则展示order number
      us: orderNoForOMS || orderNo.replace(/RCFUS/, '')
    }[window.__.env.REACT_APP_COUNTRY] || orderNo
  );
};

export const getRation = async (params) => {
  let res = await getRation_api(params);
  return res;
};
/**
 * transTime [把传进来的时间，通过时区转化成当地时间]
 * @param    date   [date:Date] [需要转换的时间,默认为当前时间]
 * @param    timeZone   [timeZone: String]   [需要转的时区]
 * @return   Date
 */
export const transTime = ({ date = new Date(), timeZone }) => {
  return utcToZonedTime(date, timeZone);
};

/**
 * isDuringDate(判断时间是否处于某个时间段内)
 * @param    date   [date:Date] [需要比较的时间]
 * @param    beginDateStr   [beginDateStr: String] [开始时间]
 * @param   endDateStr [endDateStr: String] [结束时间]
 * @return Boolean
 */
export const isDuringDate = (date, beginDateStr, endDateStr) => {
  let beginDate = new Date(beginDateStr),
    endDate = new Date(endDateStr);
  if (date >= beginDate && date <= endDate) {
    return true;
  }
  return false;
};

//延时函数
export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
export function getZoneTime(date) {
  if (window.__.env.REACT_APP_COUNTRY === 'us') {
    return new Date(date).addHours(12);
  }
  return new Date(date);
}
function isMatchedLang(langArr, lang) {
  return langArr?.find(
    (crLang) => window.__.env.REACT_APP_COUNTRY === crLang || lang === crLang
  );
}
import Club_Logo from '@/assets/images/Logo_club.png';
import Club_Logo_ru from '@/assets/images/Logo_club_ru.png';
import { el } from 'date-fns/locale';
export function getClubLogo() {
  if (window.__.env.REACT_APP_COUNTRY === 'ru') {
    return Club_Logo_ru;
  } else {
    return Club_Logo;
  }
}

export function bindSubmitParam(list) {
  let obj = { optionalList: [], requiredList: [] };
  list
    .filter((item) => !item.isRequired)
    .forEach((item) => {
      obj.optionalList.push({ id: item.id, selectedFlag: item.isChecked });
    });
  list
    .filter((item) => item.isRequired)
    .forEach((item) => {
      if (item.desc == 'RC_DF_TR_FGS_A' || item.desc == 'RC_DF_TR_FGS_B') {
      } else {
        obj.requiredList.push({ id: item.id, selectedFlag: true });
      }
    });

  return obj;
}
