const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(UserInfoModel, {
      //   sourceKey: 'id',
      //   foreignKey: 'userId',
      // });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
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
