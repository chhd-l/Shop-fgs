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
