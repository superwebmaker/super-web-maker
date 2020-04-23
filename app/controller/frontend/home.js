const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.render('home');
  }

  async wxlogin() {
    const { ctx, app } = this;

    const { code, encryptedData, iv } = ctx.request.body;
    let response = await ctx.helper.$http.get(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        params: {
          appid: app.config.wx.AppID,
          secret: app.config.wx.AppSecret,
          js_code: code,
          grant_type: 'authorization_code'
        }
      }
    );

    let { openid, session_key, errcode, errmsg } = response.data;

    if (!errcode) {
      let data = await ctx.helper.getUserInfoByWx(app, {
        sessionKey: session_key,
        encryptedData,
        iv
      });

      console.log('result', data);

      ctx.body = {
        data
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: errmsg
      };
    }
  }
}

module.exports = HomeController;
