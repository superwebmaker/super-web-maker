const table = require('../table');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = Sequelize.literal('NOW()');

    await queryInterface.bulkInsert(
      table.modules,
      [
        {
          name: 'users',
          created_at: now,
          updated_at: now
        },
        {
          name: 'roles',
          created_at: now,
          updated_at: now
        },
        {
          name: 'permissions',
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
      table.modules,
      { id: { [Op.in]: [1, 2, 3] } },
      {}
    );
  }
};
