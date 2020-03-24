module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable('modules', {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      alias: { type: STRING, allowNull: true },
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('modules');
  }
};
