import RedirectUrlJSON_fr from '../fr';
import RedirectUrlJSON_ru from '../ru';
import RedirectUrlJSON_tr from '../tr';
import fgsJSON_fr from '../fr/fgs';
import tempHubFrRedirect from '../fr/temp_hub';

let New_RedirectUrlJSON_fr = { ...RedirectUrlJSON_fr };

if (window.__.env.REACT_APP_COUNTRY == 'fr' && !window.__.env.REACT_APP_HUB) {
  //说明是法国fgs环境,加上fgs环境需要加上的跳转链接
  for (let item of fgsJSON_fr.RECORDS) {
    New_RedirectUrlJSON_fr.RECORDS.push(item);
  }
}

if (window.__.env.REACT_APP_COUNTRY == 'fr' && window.__.env.REACT_APP_HUB) {
  // cancel redirection, instead of canonical tag
  //说明是法国hub环境,加上hub环境需要加上的跳转链接
  // for (let item of tempHubFrRedirect.RECORDS) {
  //   New_RedirectUrlJSON_fr.RECORDS.push(item);
  // }
}

const redirectFun = () => {
  let RedirectUrlObj = {};
  let RedirectUrlJSON = {
    fr: New_RedirectUrlJSON_fr,
    ru: RedirectUrlJSON_ru,
    tr: RedirectUrlJSON_tr
  };
  if (RedirectUrlJSON[window.__.env.REACT_APP_COUNTRY]) {
    RedirectUrlJSON[window.__.env.REACT_APP_COUNTRY].RECORDS.filter(
      (item) => item.shortUrl !== item.redirectUrl
    )
      .map((item) => ({
        //[item.shortUrl]: item.redirectUrl
        [decodeURI(item.shortUrl)]: item.redirectUrl //转义
      }))
      .forEach((item) => {
        RedirectUrlObj = { ...RedirectUrlObj, ...item }; //把数组对象合并成一个对象[{a:1},{b:1}] => {a:1,b:1}
      });
  }
  return RedirectUrlObj;
};

export { redirectFun, tempHubFrRedirect };
