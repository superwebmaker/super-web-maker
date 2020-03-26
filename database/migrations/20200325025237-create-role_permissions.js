const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM } = Sequelize;

    await queryInterface.createTable(table.permissions, {
      role_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: { model: 'roles', key: 'id' }
      },
      permission: { type: STRING(100), primaryKey: true }, // moduleName
      basic_function: {
        type: ENUM,
        values: ['create', 'read', 'update', 'delete']
      },
      created_at: 'TIMESTAMP',
      updated_at: 'TIMESTAMP'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.permissions);
  }
};
