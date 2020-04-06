module.exports = (app) => {
  const { INTEGER, BIGINT, STRING, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: INTEGER.UNSIGNED,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    name: {
      type: STRING,
      allowNull: false
    },
    mobile: {
      type: STRING(15),
      allowNull: true
    },
    email: {
      type: STRING(50),
      allowNull: false
    },
    email_verified_at: DATE,
    password: {
      type: STRING,
      allowNull: false
    },
    remember_token: STRING(100),
    last_sign_in_at: DATE
  });

  User.associate = function () {
    app.model.User.belongsTo(app.model.Role, {
      foreignKey: 'role_id'
    });
  };

  // don't use arraw function
  User.prototype.logSignin = async function () {
    return await this.update({ last_sign_in_at: app.Sequelize.fn('NOW') });
  };

  return User;
};
