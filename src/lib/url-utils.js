/**
 *
 * @param {object} param0 search-search参数，截取?后的部分 name-需要删除的name
 * @returns {string}
 */
const removeArgFromUrl = ({ search, name }) => {
  var urlParam = search; //页面参数
  var arr = new Array();
  if (urlParam != '') {
    var urlParamArr = urlParam.split('&'); //将参数按照&符分成数组
    for (var i = 0; i < urlParamArr.length; i++) {
      var paramArr = urlParamArr[i].split('='); //将参数键，值拆开
      //如果键雨要删除的不一致，则加入到参数中
      if (paramArr[0] != name) {
        arr.push(urlParamArr[i]);
      }
    }
  }
  return arr.join('&');
};

/**
 * search参数操作全方法
 * @param {object|null} param0
 * name - 需要操作的name
 * value - 需要操作的value
 * type - 存在值,则返回search字符串;不存在值，则返回完整url
 * pathname - 可选，可传入react router路由参数，默认window对象上的值
 * search - 可选，可传入react router路由参数或想处理的字符串，默认window对象上的值
 *
 * @returns {string} a=1&b=2&c=3(不包含问号)
 * 1.funcUrl() - 获取完整search值
 * 2.funcUrl({name}) - 返回url中name的值
 * 3.funcUrl({name,value}) - 将search中name的值设置为value,并返回完整url
 * 4.funcUrl({name,value,type}) 作用和第3一样,但这只返回更新好的search字符串,type为任意字符
 */
const funcUrl = ({
  name,
  value,
  type,
  pathname = window.location.origin + window.location.pathname,
  search = window.location.search.substr(1)
} = {}) => {
  var baseUrl = type == undefined ? pathname + '?' : '';
  var query = search ? decodeURIComponent(search) : '';
  // 如果没有传参,就返回 search 值 不包含问号
  if (name == undefined) {
    return query;
  }
  // 如果没有传值,就返回要查询的参数的值
  if (value == undefined) {
    var val = query.match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)'));
    return val != null ? decodeURI(val[2]) : null;
  }
  var url;
  if (query == '') {
    // 如果没有 search 值,则返回追加了参数的 url
    url = baseUrl + name + '=' + value;
  } else {
    // 如果没有 search 值,则在其中修改对应的值,并且去重,最后返回 url
    var obj = {};
    var arr = query.split('&');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=');
      obj[arr[i][0]] = arr[i][1];
    }
    obj[name] = value;
    url =
      baseUrl +
      JSON.stringify(obj)
        .replace(/[\"\{\}]/g, '')
        .replace(/\:/g, '=')
        .replace(/\,/g, '&');
  }
  return url;
};

/**
 * 获取地址栏参数，并将其转换为json对象
 * @param {*} param0 url - search参数
 * @returns {object}
 */
const transferToObject = ({ url = window.location.search } = {}) => {
  var jsonList = {};
  if (url.indexOf('?') > -1) {
    var str = url.slice(url.indexOf('?') + 1);
    var strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      jsonList[strs[i].split('=')[0]] = strs[i].split('=')[1]; //如果出现乱码的话，可以用decodeURI()进行解码
    }
  }
  return jsonList;
};

export { removeArgFromUrl, funcUrl, transferToObject };
