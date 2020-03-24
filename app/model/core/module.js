module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Module = app.model.define('modules', {
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    alias: { type: STRING, allowNull: true },
    created_at: DATE,
    updated_at: DATE
  });

  return Module;
};
