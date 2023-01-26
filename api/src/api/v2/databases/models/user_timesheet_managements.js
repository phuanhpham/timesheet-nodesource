const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTimesheetManagements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModel, UserTimesheetDetailsModel }) {
      // define association here

      this.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'user',
      });
      this.hasMany(UserTimesheetDetailsModel, {
        foreignKey: 'user_timesheets_managements_id',
      });
    }
  }
  UserTimesheetManagements.init({
    date_time: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'user_timesheets_managements',
    modelName: 'UserTimesheetManagementsModel',
  });
  return UserTimesheetManagements;
};
