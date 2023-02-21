/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
      },
      type: {
        type: Sequelize.ENUM,
        values: ['timesheets', 'assets'],
      },
      user_timesheet_details_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_timesheets_managements_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'approved'],
      },
      approver: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_requests');
  },
};
