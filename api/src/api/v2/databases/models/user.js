const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserInfoModel, UserTimesheetsModel, UserRequestsModel }) {
      // define association here
      this.hasMany(UserInfoModel, {
        as: 'userInfo',
        foreignKey: 'userId',
      });
      this.hasMany(UserTimesheetsModel, {
        as: 'userTimesheets',
        foreignKey: 'userId',
      });
      this.hasMany(UserRequestsModel, {
        as: 'userRequests',
        foreignKey: 'userId',
      });
    }

    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      };
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
      registerType: {
        type: DataTypes.STRING,
        defaultValue: '1',
      },
      authGoogleID: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'UserModel',
    },
  );
  return User;
};
