const Service = require('egg').Service;

class AuthTokenService extends Service {
  async load(token) {
    const authToken = await this.ctx.model.AuthToken.findOne({
      where: {
        token
      }
    });

    if (!authToken) {
      this.ctx.throw(404, 'invalid token');
    }

    return authToken;
  }

  async save(token, id = 0) {
    const authToken = this.ctx.model.AuthToken;

    if (!token) {
      this.ctx.throw(404, 'empty token');
    }

    return id
      ? authToken.update(
          {
            token
          },
          {
            where: {
              id
            }
          }
        )
      : authToken.create(token); // { user_id, token }
  }

  async saveByUser(token, user) {
    const userId = user.id;
    const authToken = await this.ctx.model.AuthToken.findOne({
      where: {
        user_id: userId
      }
    });

    return authToken
      ? this.save(token, authToken.id)
      : this.save({
          user_id: userId,
          token
        });
  }
}

module.exports = AuthTokenService;
