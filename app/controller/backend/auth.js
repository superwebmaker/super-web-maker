const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    const { ctx, app } = this;

    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.login({ username, password });

    if (user) {
      ctx.session.user = user;

      const accessToken = app.jwt.sign(
        {
          username,
          password
        },
        app.config.jwt.secret
      );

      ctx.body = {
        accessToken,
        expiresIn: app.config.jwt.signOptions.expiresIn
      };
    }

    // if (ctx.status !== 200) {
    //   ctx.throw(401, 'Unauthorized');
    // }
  }

  async logout() {
    const { ctx } = this;

    ctx.session = null;
    await ctx.redirect('/admin');
  }

  async refresh() {
    const { ctx, app } = this;

    const accessToken = ctx.helper.getAccessToken(ctx);
    const refreshToken = app.jwt.refresh(accessToken, app.config.jwt.secret);

    ctx.body = {
      accessToken: refreshToken,
      expiresIn: app.config.jwt.signOptions.expiresIn
    };
  }

  async me() {
    return await this.ctx.session.user;
  }
}

module.exports = AuthController;
