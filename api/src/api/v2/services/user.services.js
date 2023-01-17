const { UserModel } = require('../databases/models');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../helpers/jwt.helpers');

module.exports = {
  registerUserService: async (userRegisterDetailData) => {
    const {
      username, email, password, role,
    } = userRegisterDetailData;

    const accessToken = await generateAccessToken(userRegisterDetailData);
    const refreshToken = await generateRefreshToken(userRegisterDetailData);

    try {
      const user = await UserModel.create({
        username,
        email,
        password,
        role,
      });

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  },
};
