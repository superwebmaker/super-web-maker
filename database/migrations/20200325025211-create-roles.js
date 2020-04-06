const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable(table.roles, {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(100),
        allowNull: false
      },
      description: STRING,
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

    await queryInterface.addIndex(table.roles, {
      name: 'role_name_unique',
      fields: ['name'],
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.roles);
  }
};
