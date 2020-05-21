const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING } = Sequelize;

    await queryInterface.createTable(
      table.authTokens,
      {
        id: {
          type: BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: BIGINT.UNSIGNED,
          references: {
            model: table.users,
            key: 'id'
          } // Auth Tokens belongsTo User 1:1
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.authTokens);
  }
};
