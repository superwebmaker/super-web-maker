const Controller = require('egg').Controller;

class MakerController extends Controller {
  async index() {
    const { ctx } = this;
    const data = { name: 'egg' };

    await ctx.render('maker', data);
  }
}

module.exports = MakerController;
