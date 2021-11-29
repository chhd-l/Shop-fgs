const locales = {
  us: require('@/lang/en_US'),
  uk: require('@/lang/en_GB'),
  mx: require('@/lang/es_ES'),
  de: require('@/lang/de_DE'),
  fr: require('@/lang/fr_FR'),
  ru: require('@/lang/ru_RU'),
  tr: require('@/lang/tr_TR'),
  ca: require('@/lang/en_US'),
  se: require('@/lang/sv_SE'),
  core: require('@/lang/en_US')
};
// export default locales[window.__.env.REACT_APP_COUNTRY].default;

//Phrase翻译集成
const localLanguage = locales[window.__.env.REACT_APP_COUNTRY].default;

//拼接本地语言&phrase平台的语言用到的函数
function assignObj(obj, source) {
  const retObj = { ...obj };
  for (const [key, value] of Object.entries(source)) {
    retObj[key] = value ? value : obj[key];
  }
  return retObj;
}

async function getDynamicLanguage() {
  const key = {
    fr: 'fr',
    de: 'de',
    ru: 'ru',
    uk: 'en',
    us: 'en',
    ca: 'ca'
  }[window.__.env.REACT_APP_COUNTRY];
  const sessionItemRoyal = window.__.sessionItemRoyal;
  const phraseSession = sessionItemRoyal.get('PHRASE_LANGUAGE');
  let phraseRet = {};
  if (phraseSession) {
    phraseRet = JSON.parse(phraseSession);
  } else {
    const url = `https://api.phrase.com/v2/projects/8f0d7f6b0396b8af7f08bf9f36d81259/locales/${key}/download?access_token=31950e3e49b165b8b2c604b65574e6cf279d9ea395e3718ce52b1ec335bef6e5&include_empty_translations=true&file_format=node_json`;
    const res = await fetch(url, {
      method: 'get',
      mode: 'cors',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.ok ? res.json() : false;
      })
      .then((resJson) => {
        let resRet = {};
        if (resJson) {
          resRet = resJson;
          sessionItemRoyal.set('PHRASE_LANGUAGE', JSON.stringify(resRet));
        }
        return resRet;
      });
    phraseRet = res;
  }

  // const language = phraseRet;
  // const language = assignObj(localLanguage, phraseRet);
  // debugger;
  const language = localLanguage;
  // console.log(language, '拼接完成');
  return language;
}

export { localLanguage, getDynamicLanguage };
