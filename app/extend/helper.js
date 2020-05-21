const axios = require('axios');
const WXBizDataCrypt = require('./WXBizDataCrypt');

exports.isMobile = (account) => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
    account
  );
};

exports.isEmail = (account) => {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(account);
};

exports.parseInt = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return str;

  return parseInt(str) || 0;
};

// 获取 Access Token
exports.getAccessToken = (ctx) => {
  let token = ctx.request.header.authorization;

  return token && token.replace(/^Bearer\s/, '');
};

// 校验 Token
// exports.verifyToken = async (ctx, userId) => {
//   let token = this.getAccessToken(ctx);
//   let verifyResult = await ctx.service.user.verifyToken(token);
//   if (!verifyResult.verify) {
//     ctx.helper.error(ctx, 401, verifyResult.message);
//     return false;
//   }
//   if (userId != verifyResult.message.id) {
//     ctx.helper.error(ctx, 401, '用户 ID 与 Token 不一致');
//     return false;
//   }
//   return true;
// };

// 处理成功响应
exports.success = (ctx, result = null, message = '请求成功', status = 200) => {
  ctx.body = {
    code: 0,
    message: message,
    data: result
  };
  ctx.status = status;
};

// 处理失败响应
exports.error = (ctx, code, message) => {
  ctx.body = {
    code: code,
    message: message
  };
  ctx.status = code;
};

exports.$http = axios;

exports.getUserInfoByWx = (appId, { sessionKey, encryptedData, iv }) => {
  const pc = new WXBizDataCrypt(appId, sessionKey);

  return pc.decryptData(encryptedData, iv);
};
