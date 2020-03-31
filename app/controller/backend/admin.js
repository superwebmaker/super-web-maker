const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;

    await (ctx.session.user
      ? ctx.render('admin/index')
      : ctx.render('admin/login'));
  }
}

module.exports = AdminController;
