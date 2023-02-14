const { Model } = require('sequelize');

const TRIGGER_CONDITIONS = ['holiday'];

module.exports = (sequelize, DataTypes) => {
  class UserTimesheetDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserTimesheetManagementsModel }) {
      // define association here

      this.belongsTo(UserTimesheetManagementsModel, {
        foreignKey: 'user_timesheets_managements_id',
      });
    }
  }
  UserTimesheetDetails.init(
    {
      user_timesheets_managements_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
      },
      end: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['schedule', 'holiday', 'leave'],
        defaultValue: 'schedule',
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'done'],
        defaultValue: 'done',
      },
      approver: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'user_timesheet_details',
      modelName: 'UserTimesheetDetailsModel',
    },
  );
  UserTimesheetDetails.addHook('afterCreate', async (timesheetDetails) => {
    if (TRIGGER_CONDITIONS.includes(timesheetDetails.type)) {
      await sequelize.models.UserRequestsModel.create({
        userId: timesheetDetails.userId,
        user_timesheet_details_id: timesheetDetails.id,
        user_timesheets_managements_id: timesheetDetails.user_timesheets_managements_id,
        status: 'pending',
        approver: timesheetDetails.approver,
      });
    }
  });
  return UserTimesheetDetails;
};
