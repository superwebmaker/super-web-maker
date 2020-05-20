const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    const { ctx, app } = this;

    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.login({ username, password });

    if (user) {
      ctx.session.user = user;

      const payload = {
        username
      };
      const accessToken = app.jwt.sign(payload, app.config.jwt.secret);
      const refreshToken = app.jwt.sign(payload, app.config.jwt.secret, {
        expiresIn: app.config.jwt.refreshTokenExpiresIn
      });

      // Save refresh token
      await ctx.service.authToken.saveByUser(refreshToken, user);

      ctx.body = {
        accessToken,
        refreshToken
      };
    }

    if (ctx.status !== 200) {
      ctx.throw(400, 'Invalid username or password');
    }
  }

  async logout() {
    const { ctx } = this;

    ctx.session = null;

    ctx.body = {
      url: '/login'
    };
  }

  async refresh() {
    const { ctx, app } = this;

    const { token } = ctx.request.body;

    // Check current refresh token from DB
    const authToken = await ctx.service.authToken.load(token);
    if (authToken) {
      const accessToken = app.jwt.refresh(token, app.config.jwt.secret);
      const refreshToken = app.jwt.refresh(token, app.config.jwt.secret, {
        expiresIn: app.config.jwt.refreshTokenExpiresIn
      });

      // Save new refresh token
      await ctx.service.authToken.save(refreshToken, authToken.id);

      ctx.status = 201;
      ctx.body = {
        accessToken,
        refreshToken
      };
    }
  }

  async me() {
    const { ctx } = this;

    const user = ctx.session.user;

    ctx.body = user;
  }
}

module.exports = AuthController;
