const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ModuleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset)
    };
    ctx.body = await ctx.model.Module.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Module.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const module = await ctx.model.Module.create({ name });
    ctx.status = 201;
    ctx.body = module;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const module = await ctx.model.Module.findByPk(id);
    if (!module) {
      ctx.status = 404;
      return;
    }

    const { name, alias } = ctx.request.body;
    await module.update({ name, alias });
    ctx.body = module;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const module = await ctx.model.Module.findByPk(id);
    if (!module) {
      ctx.status = 404;
      return;
    }

    await module.destroy();
    ctx.status = 200;
  }
}

module.exports = ModuleController;
