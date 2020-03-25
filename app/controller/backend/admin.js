const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;

    console.log('ctx.locals.user', ctx.locals.user);

    await (ctx.locals.user
      ? ctx.render('admin/index')
      : ctx.render('admin/login'));
  }

  async login() {
    const { ctx, app } = this;

    // 获取用户端传递过来的参数
    const { username, password } = ctx.request.body;

    // 进行验证 data 数据 登录是否成功
    ctx.locals.user = await ctx.service.user.login(ctx, { username, password });

    console.log('ctx.locals.user', ctx.locals.user);
    console.log('--------');

    if (ctx.locals.user) {
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

  async logout() {}

  async refresh() {}

  async me() {
    return await this.ctx.locals.user;
  }
}

module.exports = AdminController;
