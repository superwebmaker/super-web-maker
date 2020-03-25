module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    email_verified_at: { type: DATE, allowNull: true },
    password: { type: STRING, allowNull: false },
    remember_token: STRING(100),
    created_at: DATE,
    updated_at: DATE
  });

  return User;
};
