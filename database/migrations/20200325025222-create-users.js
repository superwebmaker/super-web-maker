const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, BIGINT, STRING, DATE } = Sequelize;

    await queryInterface.createTable(table.users, {
      id: {
        type: BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: INTEGER.UNSIGNED,
        references: {
          model: table.roles,
          key: 'id'
        } // User belongsTo Role 1:1
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
      last_sign_in_at: DATE,
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      deleted_at: DATE
    });

    await queryInterface.addIndex(table.users, {
      name: 'user_email_unique',
      fields: ['email'],
      unique: true
    });

    await queryInterface.addIndex(table.users, {
      name: 'user_mobile_unique',
      fields: ['mobile'],
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.users);
  }
};
