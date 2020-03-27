module.exports = (app) => {
  const { INTEGER, STRING } = app.Sequelize;

  const Role = app.model.define('roles', {
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: STRING(100), allowNull: false },
    description: { type: STRING, allowNull: true }
  });

  Role.associate = function () {
    app.model.Role.hasMany(app.model.User, {
      foreignKey: 'role_id'
    });
  };

  return Role;
};
