const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BOOLEAN } = Sequelize;

    await queryInterface.createTable(table.modules, {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING(100), allowNull: false },
      alias: { type: STRING, allowNull: true },
      created_at: 'TIMESTAMP',
      updated_at: 'TIMESTAMP',
      deleted: { type: BOOLEAN, defaultValue: false }
    });

    await queryInterface.addIndex(table.modules, {
      name: 'module_name_unique',
      fields: ['name'],
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table.modules);
  }
};
