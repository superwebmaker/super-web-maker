const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM } = Sequelize;

    await queryInterface.createTable(table.permissions, {
      role_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: { model: table.roles, key: 'id' } // Permissions hasMany Roles n:n
      },
      permission: { type: STRING(100), primaryKey: true }, // moduleName
      basic_function: {
        type: ENUM,
        values: ['create', 'read', 'update', 'delete']
      },
      created_at: 'TIMESTAMP',
      updated_at: 'TIMESTAMP',
      deleted_at: { type: 'TIMESTAMP', allowNull: true }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.permissions);
  }
};
