const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.model.User.find({});
  }

  async add() {
    const { ctx } = this;
    const result = await this.ctx.model.User.create({
      username: 'aaa',
      password: '111'
    });

    ctx.body = `created: ${result}`;
  }
}

module.exports = UserController;
