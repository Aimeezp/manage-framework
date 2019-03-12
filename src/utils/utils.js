const CryptoJS = require('crypto-js');

const key = CryptoJS.enc.Utf8.parse('hAnbnasdeibpjsw6'); // 16 bits secret key
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); // 16 bits secret key offset key

function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
export const keyWordReg = new RegExp('[\u4e00-\u9fa50-9a-zA-Z]');// match chinese english and number
export default {
  Decrypt,
  Encrypt,
};
