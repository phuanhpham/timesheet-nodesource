const bcrypt = require('bcryptjs');
const { UserModel } = require('../databases/models');
const {
  generateAccessToken,
} = require('../helpers/jwt.helpers');

module.exports = {
  getAllUserService: async () => {
    try {
      const users = await UserModel.findAll();

      return {
        status: '10200',
        users,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  registerUserService: async (userRegisterDetailData) => {
    const {
      username, email, password, role,
    } = userRegisterDetailData;

    const accessToken = await generateAccessToken(userRegisterDetailData);

    try {
      const user = await UserModel.create({
        username,
        email,
        password,
        role,
      });

      return { user, accessToken };
    } catch (error) {
      throw new Error(error);
    }
  },

  loginUserService: async (userLoginDetailData) => {
    const { username, password } = userLoginDetailData;
    try {
      const user = await UserModel.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return {
          status: '10402',
          msg: 'Cannot find user!',
        };
      }

      const isPass = bcrypt.compare(password, user.password);

      if (!isPass) {
        return {
          status: '10403',
          msg: 'Password incorrect!',
        };
      }

      const accessToken = await generateAccessToken(userLoginDetailData);

      return {
        status: '10200',
        user,
        accessToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  googleAuthService: async (googleAuthDetail) => {
    const accessToken = await generateAccessToken(googleAuthDetail);
    return {
      status: '1200',
      googleAuthDetail,
      accessToken,
    };
  },
};
