const Service = require('egg').Service;

class UserService extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [
        ['created_at', 'desc'],
        ['id', 'desc']
      ]
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(user) {
    return this.ctx.model.User.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }

  async login({ username, password }) {
    const user = await this.ctx.model.User.findOne({
      where: {
        name: username,
        password
      },
      include: [
        {
          model: this.ctx.model.Role
        }
      ]
    });

    user.logSignin();

    return user;
  }
}

module.exports = UserService;
