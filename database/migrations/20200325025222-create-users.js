const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, BIGINT, STRING, BOOLEAN } = Sequelize;

    await queryInterface.createTable(table.users, {
      id: { type: BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      role_id: {
        type: INTEGER.UNSIGNED,
        references: { model: 'roles', key: 'id' }
      },
      name: { type: STRING, allowNull: false },
      mobile: { type: STRING(15), allowNull: true },
      email: { type: STRING(50), allowNull: false },
      email_verified_at: { type: 'TIMESTAMP', allowNull: true },
      password: { type: STRING, allowNull: false },
      remember_token: STRING(100),
      created_at: 'TIMESTAMP',
      updated_at: 'TIMESTAMP',
      deleted: { type: BOOLEAN, defaultValue: false }
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
