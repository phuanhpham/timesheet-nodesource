const {
  Model,
} = require('sequelize');

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
        as: 'users',
      });
    }
  }
  userRequests.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_timesheet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['schedule', 'holiday', 'absenteeism'],
    },

  }, {
    sequelize,
    tableName: 'user_requests',
    modelName: 'UserRequestsModel',
  });
  return userRequests;
};
