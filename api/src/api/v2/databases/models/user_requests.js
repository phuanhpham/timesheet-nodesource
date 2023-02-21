const { Model } = require('sequelize');

const TRIGGER_CONDITIONS = ['approved'];
const TRIGGER_CONDITIONS_2 = ['timesheets'];

module.exports = (sequelize, DataTypes) => {
  class userRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModel }) {
      // define association here
      this.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  userRequests.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['timesheets', 'assets'],
        allowNull: false,
      },
      user_timesheet_details_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_timesheets_managements_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved'],
      },
      approver: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'user_requests',
      modelName: 'UserRequestsModel',
    },
  );

  userRequests.addHook('afterUpdate', async (userRequestsDetails) => {
    if (
      TRIGGER_CONDITIONS.includes(userRequestsDetails.status)
      && TRIGGER_CONDITIONS_2.includes(userRequestsDetails.type)
    ) {
      await sequelize.models.UserTimesheetDetailsModel.update(
        { status: 'done' },
        {
          where: {
            id: userRequestsDetails.user_timesheet_details_id,
          },
        },
      );
    }
  });

  return userRequests;
};
