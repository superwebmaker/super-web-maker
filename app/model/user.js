module.exports = (app) => {
  const { INTEGER, BIGINT, STRING, BOOLEAN } = app.Sequelize;

  const User = app.model.define(
    'users',
    {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      role_id: {
        type: INTEGER.UNSIGNED,
        references: { model: 'roles', key: 'id' }
      },
      mobile: { type: STRING(15), allowNull: true },
      email: { type: STRING(50), allowNull: false },
      email_verified_at: { type: 'TIMESTAMP', allowNull: true },
      password: { type: STRING, allowNull: false },
      remember_token: STRING(100),
      deleted: { type: BOOLEAN, defaultValue: false }
    },
    {
      timestamps: true
    }
  );

  User.prototype.associate = function () {
    app.model.User.belongsTo(app.model.Role, {
      // as: 'role',
      foreignKey: 'role_id',
      targetKey: 'id'
    });
  };

  return User;
};
