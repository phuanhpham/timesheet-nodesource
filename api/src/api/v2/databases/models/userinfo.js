const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModel }) {
      // define association here
      this.belongsTo(UserModel, { foreignKey: 'userId' });
    }
  }
  UserInfo.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    name: 'user_infos',
    modelName: 'UserInfoModel',
  });
  return UserInfo;
};
