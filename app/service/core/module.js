const Service = require('egg').Service;

class ModuleService extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Core.Module.findAndCountAll({
      offset,
      limit,
      order: [
        ['created_at', 'desc'],
        ['id', 'desc']
      ]
    });
  }

  async find(id) {
    const module = await this.ctx.model.Core.Module.findByPk(id);
    if (!module) {
      this.ctx.throw(404, 'module not found');
    }
    return module;
  }

  async create(module) {
    return this.ctx.model.Core.Module.create(module);
  }

  async update({ id, updates }) {
    const module = await this.ctx.model.Core.Module.findByPk(id);
    if (!module) {
      this.ctx.throw(404, 'module not found');
    }
    return module.update(updates);
  }

  async del(id) {
    const module = await this.ctx.model.Core.Module.findByPk(id);
    if (!module) {
      this.ctx.throw(404, 'module not found');
    }
    return module.destroy();
  }
}

module.exports = ModuleService;
