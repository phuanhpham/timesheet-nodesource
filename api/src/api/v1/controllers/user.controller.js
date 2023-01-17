const UserModel = require('../models/User.model');
const {
  getAllUserService,
  registerUserService,
  loginUserService,
} = require('../services/user.services');

module.exports = {
  getUserController: async (req, res, next) => {
    if (!req.user.isAdmin) {
      res.status(403).json({
        status: '10403',
        msg: 'Action invalid!',
      });
    }
    try {
      const users = await getAllUserService();
      res.status(200).json({
        ...users,
      });
    } catch (error) {
      next(error);
    }
  },
  registerUserController: async (req, res, next) => {
    try {
      const user = await registerUserService(req.body);

      res.status(200).json({
        status: '10200',
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  loginUserController: async (req, res, next) => {
    try {
      const logedIn = await loginUserService(req.body);
      res.status(200).json({
        logedIn,
      });
    } catch (error) {
      next(error);
    }
  },
};
