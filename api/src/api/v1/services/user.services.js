const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

module.exports = {
  getAllUserService: async () => {
    try {
      const users = await UserModel.find().select('_id username email isAdmin');

      return {
        status: '10200',
        users,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  registerUserService: async (userRegisterDetails) => {
    const newUser = new UserModel({ ...userRegisterDetails });
    const accessToken = signAccessToken(newUser);
    const refreshToken = signRefreshToken(newUser);

    try {
      const createdUser = await newUser.save();
      const { password, sailtKey, ...others } = createdUser._doc;
      return {
        ...others,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error.stack);
    }
  },
  loginUserService: async (userLoginDetails) => {
    const { username, email, password } = userLoginDetails;
    try {
      const user = await UserModel.findOne({
        username,
      });

      if (!user) {
        return {
          status: '10402',
          msg: 'Cannot find user!',
        };
      }

      const isPass = await bcrypt.compare(password, user.password);
      if (!isPass) {
        return {
          status: '10401',
          msg: 'Password is invalid!',
        };
      }
      const accessToken = signAccessToken(user);
      const refreshToken = signRefreshToken(user);
      return {
        status: '10200',
        msg: 'Login success!',
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

const signAccessToken = ({ username, isAdmin }) => jwt.sign(
  {
    data: { username, isAdmin },
  },
  process.env.KEY_SECRET,
  { expiresIn: '1h' },
);

const signRefreshToken = ({ username, isAdmin }) => jwt.sign(
  {
    data: { username, isAdmin },
  },
  process.env.KEY_SECRET,
  { expiresIn: '365d' },
);
