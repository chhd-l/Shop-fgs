/**
 *
 * Multi language has integrated to Phrase app flatform.
 * https://app.phrase.com/
 * minytang@deloitte.com.cn/Test1106,,,^^^^^^
 *
 */

// const locales = {
//   us: require('@/lang/en_US'),
//   uk: require('@/lang/en_GB'),
//   mx: require('@/lang/es_ES'),
//   de: require('@/lang/de_DE'),
//   fr: require('@/lang/fr_FR'),
//   ru: require('@/lang/ru_RU'),
//   tr: require('@/lang/tr_TR'),
//   ca: require('@/lang/en_US'),
//   se: require('@/lang/sv_SE'),
//   core: require('@/lang/en_US')
// };
// export default locales[window.__.env.REACT_APP_COUNTRY].default;

import en_US from './en_US';

const localLanguage = en_US;

//拼接本地语言&phrase平台的语言用到的函数
function assignObj(obj, source) {
  const retObj = { ...obj };
  for (const [key, value] of Object.entries(source)) {
    retObj[key] = value ? value : obj[key];
  }
  return retObj;
}

async function getDynamicLanguage() {
  // key - 对应对应语言文件名
  const key = '111' || window.__.env.REACT_APP_LANG_LOCALE || 'en-US';
  const sessionItemRoyal = window.__.sessionItemRoyal;
  const phraseSession = sessionItemRoyal.get('PHRASE_LANGUAGE');
  console.log(1111);
  let phraseRet = {};
  if (phraseSession) {
    console.log(2222);
    phraseRet = JSON.parse(phraseSession);
  } else {
    const url = `https://api.phrase.com/v2/projects/8f0d7f6b0396b8af7f08bf9f36d81259/locales/${key}/download?access_token=31950e3e49b165b8b2c604b65574e6cf279d9ea395e3718ce52b1ec335bef6e5&include_empty_translations=true&file_format=node_json`;
    const resJson = await fetch(url, {
      method: 'get',
      mode: 'cors',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    try {
      const res = await resJson.json();
      console.log(3333);
      sessionItemRoyal.set('PHRASE_LANGUAGE', JSON.stringify(res));
      phraseRet = res;
    } catch (err) {
      console.log(4444);
      console.log('phrase langugage fetch error', err);
    } finally {
      console.log(5555);
    }
  }

  // const language = phraseRet;
  const language = assignObj(localLanguage, phraseRet || {});
  // debugger;
  // const language = localLanguage;
  // console.log(language, '拼接完成');
  return language;
}

export { getDynamicLanguage };
