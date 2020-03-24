module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable('users', {
      id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      email_verified_at: { type: DATE, allowNull: true },
      password: { type: STRING, allowNull: false },
      remember_token: STRING(100),
      created_at: DATE,
      updated_at: DATE
    });

    await queryInterface.addIndex('users', {
      fields: ['email'],
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
