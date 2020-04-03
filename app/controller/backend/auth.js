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
          username
        },
        app.config.jwt.secret
      );

      const refreshToken = app.jwt.sign(
        {
          username
        },
        app.config.jwt.secret,
        {
          expiresIn: app.config.jwt.refreshTokenExpiresIn
        }
      );

      // TODO: save refreshToken

      ctx.body = {
        accessToken,
        refreshToken
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

    const { token } = ctx.request.body;

    const accessToken = app.jwt.refresh(token, app.config.jwt.secret);
    const refreshToken = app.jwt.refresh(token, app.config.jwt.secret, {
      expiresIn: app.config.jwt.refreshTokenExpiresIn
    });

    // TODO: save refreshToken

    ctx.status = 201;
    ctx.body = {
      accessToken,
      refreshToken
    };
  }

  async me() {
    return await this.ctx.session.user;
  }
}

module.exports = AuthController;
