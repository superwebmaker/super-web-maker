module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const AccessToken = app.model.define('access_tokens', {
    id: { type: STRING(40), primaryKey: true },
    user_id: { type: INTEGER, allowNull: false },
    last_activity: { type: DATE, allowNull: false },
    lifetime: { type: INTEGER, allowNull: false }
  });

  AccessToken.associate = function () {
    app.model.AccessToken.belongsTo(app.model.User, {
      as: 'user',
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };

  return AccessToken;
};
