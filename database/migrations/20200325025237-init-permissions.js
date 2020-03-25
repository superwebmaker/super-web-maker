module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable('permissions', {
      role_id: { type: INTEGER, primaryKey: true },
      permission: { type: STRING(100), primaryKey: true }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('permissions');
  }
};
