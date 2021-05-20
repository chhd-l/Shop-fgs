import RedirectUrlJSON_fr from '../fr';
import RedirectUrlJSON_ru from '../ru';
import RedirectUrlJSON_tr from '../tr';
import fgsJSON_fr from '../fr/fgs';

let New_RedirectUrlJSON_fr = { ...RedirectUrlJSON_fr };

if (process.env.REACT_APP_COUNTRY == 'FR' && process.env.REACT_APP_HUB != 1) {
  //说明是法国fgs环境,加上fgs环境需要加上的跳转链接
  for (let item of fgsJSON_fr.RECORDS) {
    New_RedirectUrlJSON_fr.RECORDS.push(item);
  }
}

const redirectFun = () => {
  let RedirectUrlObj = {};
  let RedirectUrlJSON = {
    FR: New_RedirectUrlJSON_fr,
    RU: RedirectUrlJSON_ru,
    TR: RedirectUrlJSON_tr
  };
  if (RedirectUrlJSON[process.env.REACT_APP_COUNTRY]) {
    RedirectUrlJSON[process.env.REACT_APP_COUNTRY].RECORDS.filter(
      (item) => item.shortUrl !== item.redirectUrl
    )
      .map((item) => ({
        //[item.shortUrl]: item.redirectUrl
        [item.shortUrl
          .replace('%28', '(')
          .replace('%29', ')')]: item.redirectUrl //%28,%29会在浏览器自动转义成括号，所以这里提前替换成
      }))
      .forEach((item) => {
        RedirectUrlObj = { ...RedirectUrlObj, ...item }; //把数组对象合并成一个对象[{a:1},{b:1}] => {a:1,b:1}
      });
  }
  return RedirectUrlObj;
};

export { redirectFun };
