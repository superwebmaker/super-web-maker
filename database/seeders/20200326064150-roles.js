const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = Sequelize.literal('NOW()');

    await queryInterface.bulkInsert(
      table.roles,
      [
        {
          id: 62,
          name: 'ADMIN',
          created_at: now,
          updated_at: now
        },
        {
          id: 63,
          name: 'USER',
          created_at: now,
          updated_at: now
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      table.roles,
      { id: { [Op.in]: [62, 63] } },
      {}
    );
  }
};
