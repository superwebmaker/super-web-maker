const WXBizDataCrypt = require('./WXBizDataCrypt');

exports.parseInt = (string) => {
  if (typeof string === 'number') return string;
  if (!string) return string;

  return parseInt(string) || 0;
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

exports.getUserInfoByWx = (app, { sessionKey, encryptedData, iv }) => {
  let pc = new WXBizDataCrypt(app.config.wx.appId, sessionKey);
  let data = pc.decryptData(encryptedData, iv);

  return data;
};
