const table = require('../table');
const config = require('../../config/plugins/bcrypt');
const HASH = require('../../app/extend/context');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = Sequelize.literal('NOW()');
    const password = await HASH.genHash('123456', config.saltRounds);

    await queryInterface.bulkInsert(
      table.users,
      [
        {
          name: 'admin',
          role_id: 62,
          email: 'admin@123.com',
          password,
          created_at: now,
          updated_at: now
        },
        {
          name: 'user1',
          role_id: 63,
          email: 'user1@123.com',
          password,
          created_at: now,
          updated_at: now
        },
        {
          name: 'user2',
          role_id: 63,
          email: 'user2@123.com',
          password,
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
