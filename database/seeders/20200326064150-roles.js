const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = Sequelize.fn('NOW');

    await queryInterface.bulkInsert(
      table.roles,
      [
        {
          id: 62,
          name: 'admin',
          created_at: now,
          updated_at: now
        },
        {
          id: 63,
          name: 'user',
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
