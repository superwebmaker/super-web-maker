module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true },
      name: { type: STRING(100), allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};
