const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.render('home');
  }

  async wxlogin() {
    const { ctx, app } = this;

    const { sessionKey, encryptedData, iv } = ctx.request.body;
    let data = await ctx.helper.getUserInfoByWx(app, {
      sessionKey,
      encryptedData,
      iv
    });

    ctx.body = {
      data
    };
  }
}

module.exports = HomeController;
