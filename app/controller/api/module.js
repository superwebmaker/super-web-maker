const Controller = require('egg').Controller;

class ModuleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset)
    };
    ctx.body = await ctx.service.core.module.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.core.module.find(
      ctx.helper.parseInt(ctx.params.id)
    );
  }

  async create() {
    const ctx = this.ctx;
    const module = await ctx.service.core.module.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = module;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.status = 204;
    ctx.body = await ctx.service.core.module.update({ id, updates: body });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.core.module.del(id);
    ctx.status = 200;
  }
}

module.exports = ModuleController;
