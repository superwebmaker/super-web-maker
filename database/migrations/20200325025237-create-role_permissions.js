const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, ENUM, DATE } = Sequelize;

    await queryInterface.createTable(table.permissions, {
      role_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: table.roles,
          key: 'id'
        } // Permissions hasMany Roles n:n
      },
      permission: {
        type: STRING(100),
        primaryKey: true
      }, // moduleName
      basic_function: {
        type: ENUM,
        values: ['create', 'read', 'update', 'delete']
      },
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.permissions);
  }
};
