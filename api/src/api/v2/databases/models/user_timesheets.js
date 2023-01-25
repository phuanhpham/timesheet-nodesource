const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userTimesheets extends Model {
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
  userTimesheets.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      date_time: {
        type: DataTypes.DATE,
      },
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved', 'done'],
      },
      status: {
        type: DataTypes.ENUM,
        values: ['schedule', 'holiday', 'absenteeism'],
      },
      approver: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'user_timesheets',
      modelName: 'UserTimesheetsModel',
    },
  );
  return userTimesheets;
};
