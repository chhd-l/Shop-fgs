/**
 *
 * Multi language has integrated to Phrase app flatform.
 * https://app.phrase.com/
 * minytang@deloitte.com.cn/Test1106,,,^^^^^^
 *
 */

import Axios from 'axios';

async function getDynamicLanguage() {
  // key - 对应对应语言文件名
  const key = window.__.env.REACT_APP_LANG_LOCALE || 'en-US';
  const sessionItemRoyal = window.__.sessionItemRoyal;
  const phraseSession = sessionItemRoyal.get('PHRASE_LANGUAGE');
  let phraseRet = {};
  if (phraseSession) {
    phraseRet = JSON.parse(phraseSession);
  } else {
    try {
      const res = await Axios({
        method: 'get',
        url: `https://d2cshop.blob.core.windows.net/cdn/phrase/${
          window.__.env.REACT_APP_PHRASE_BRANCH || 'master'
        }/${key}.json`,
        // 禁用缓存
        headers: { 'Cache-Control': 'no-cache' }
      });
      // const res = await Axios.get(
      //   `https://d2cshop.blob.core.windows.net/cdn/phrase/${
      //     window.__.env.REACT_APP_PHRASE_BRANCH || 'master'
      //   }/${key}.json`
      // );

      // const url = `https://api.phrase.com/v2/projects/8f0d7f6b0396b8af7f08bf9f36d81259/locales/${key}/download?access_token=31950e3e49b165b8b2c604b65574e6cf279d9ea395e3718ce52b1ec335bef6e5&include_empty_translations=true&file_format=node_json`;

      // const resJson = await fetch(url, {
      //   method: 'get',
      //   mode: 'cors',
      //   cache: 'no-store',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const res = await resJson.json();
      sessionItemRoyal.set('PHRASE_LANGUAGE', JSON.stringify(res.data));
      phraseRet = res.data;
    } catch (err) {
      console.log('phrase langugage fetch error', err);
    } finally {
    }
  }

  const language = Object.assign(phraseRet || {});
  return language;
}

export { getDynamicLanguage };
