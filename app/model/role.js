module.exports = (app) => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Role = app.model.define(
    'roles',
    {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING(100), allowNull: false },
      description: { type: STRING, allowNull: true },
      deleted: { type: BOOLEAN, defaultValue: false }
    },
    {
      timestamps: true
    }
  );

  Role.prototype.associate = function () {
    app.model.Role.hasMany(app.model.User, {
      // as: 'users',
      foreignKey: 'role_id',
      targetKey: 'id'
    });
  };

  return Role;
};
