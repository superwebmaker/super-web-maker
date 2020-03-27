const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;

    await (ctx.session.user
      ? ctx.render('admin/index')
      : ctx.render('admin/login'));
  }

  async login() {
    const { ctx, app } = this;

    // 获取用户端传递过来的参数
    const { username, password } = ctx.request.body;

    // 进行验证 data 数据 登录是否成功
    const user = await ctx.service.user.login({ username, password });

    ctx.session.user = user;

    if (ctx.session.user) {
      // 生成 token
      const token = app.jwt.sign(
        {
          username,
          password
        },
        app.config.jwt.secret
      );

      // 返回 token
      ctx.body = token;
    } else {
      ctx.status = 401;
      ctx.body = 'Unauthorized';
    }
  }

  async logout() {
    const { ctx } = this;

    ctx.session = null;
    await ctx.redirect('/admin');
  }

  async refresh() {
    const { token } = this.ctx.request.body;
  }

  async me() {
    return await this.ctx.session.user;
  }
}

module.exports = AdminController;
