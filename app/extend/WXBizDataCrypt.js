const CryptoJS = require('crypto-js');

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  let decoded;

  try {
    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.enc.Base64.parse(encryptedData),
      CryptoJS.enc.Base64.parse(this.sessionKey),
      {
        iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    decoded = CryptoJS.enc.Utf8.stringify(decrypted);
  } catch (err) {
    throw new Error('Illegal Buffer');
  }

  if (!decoded || decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer');
  }

  return decoded;
};

module.exports = WXBizDataCrypt;
