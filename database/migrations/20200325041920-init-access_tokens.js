module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable('access_tokens', {
      id: { type: STRING(40), primaryKey: true },
      user_id: { type: INTEGER, allowNull: false },
      last_activity: { type: DATE, allowNull: false },
      lifetime: { type: INTEGER, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('access_tokens');
  }
};
