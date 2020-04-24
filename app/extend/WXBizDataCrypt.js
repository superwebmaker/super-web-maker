const CryptoJS = require('crypto-js');

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  let decoded;

  try {
    let encrypted = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Base64.parse(encryptedData)
    );
    let key = CryptoJS.enc.Base64.parse(this.sessionKey);
    let options = {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    };

    let decrypted = CryptoJS.AES.decrypt(encrypted, key, options);
    decoded = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    throw new Error('Illegal Data');
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Data');
  }

  return decoded;
};

module.exports = WXBizDataCrypt;
