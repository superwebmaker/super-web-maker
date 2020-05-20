module.exports = (app) => {
  const { BIGINT, STRING } = app.Sequelize;

  const AuthToken = app.model.define(
    'auth_tokens',
    {
      id: {
        type: BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: BIGINT.UNSIGNED,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      token: {
        type: STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      paranoid: false
    }
  );

  AuthToken.associate = function () {
    app.model.AuthToken.belongsTo(app.model.User, {
      foreignKey: 'user_id'
    });
  };

  return AuthToken;
};
