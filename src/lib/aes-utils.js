import { AES, enc, mode, pad } from 'crypto-js';

// 字符串解密
function decryptString(word) {
  var key = enc.Utf8.parse('AYHRJqH1zrfgWuKL3mN5xQQhSs7Srd62');
  var decrypt = AES.decrypt(word, key, { mode: mode.ECB, padding: pad.Pkcs7 });
  return enc.Utf8.stringify(decrypt).toString();
}

// 字符串加密
function encryptString(str) {
  var key = enc.Utf8.parse('AYHRJqH1zrfgWuKL3mN5xQQhSs7Srd62');
  var con = enc.Utf8.parse(str);
  let encrypt = AES.encrypt(con, key, {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString();
  return encrypt;
}

export { encryptString, decryptString };
