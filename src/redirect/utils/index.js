import RedirectUrlJSON_fr from '../fr';
import RedirectUrlJSON_ru from '../ru';
import RedirectUrlJSON_tr from '../tr';

const redirectFun = () => {
  let RedirectUrlObj = {};
  let RedirectUrlJSON = {
    fr: RedirectUrlJSON_fr,
    ru: RedirectUrlJSON_ru,
    tr: RedirectUrlJSON_tr
  };
  if (RedirectUrlJSON[process.env.REACT_APP_LANG]) {
    RedirectUrlJSON[process.env.REACT_APP_LANG].RECORDS.filter(
      (item) => item.shortUrl !== item.redirectUrl
    )
      .map((item) => ({
        [item.shortUrl]: item.redirectUrl
      }))
      .forEach((item) => {
        RedirectUrlObj = { ...RedirectUrlObj, ...item }; //把数组对象合并成一个对象[{a:1},{b:1}] => {a:1,b:1}
      });
  }
  return RedirectUrlObj;
};

export { redirectFun };
