const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = Sequelize.fn('NOW');

    await queryInterface.bulkInsert(
      table.users,
      [
        {
          name: 'admin',
          role_id: 62,
          email: 'admin@123.com',
          password: '123456',
          created_at: now,
          updated_at: now
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(table.users, { id: 1 }, {});
  }
};
