/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_timesheet_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_timesheets_managements_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'user_timesheets_managements',
          key: 'id',
          as: 'user_timesheets_managements_id',
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        ref: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
      },
      start: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['schedule', 'holiday', 'absenteeism'],
        defaultValue: 'schedule',
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'done'],
        defaultValue: 'done',
      },
      approver: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('user_timesheet_details');
  },
};
