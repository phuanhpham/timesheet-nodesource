const {
  registerUserService,
  loginUserService,
  getAllUserService,
  googleAuthService,
} = require('../services/user.services');

module.exports = {
  getAllUsersController: async (req, res, next) => {
    try {
      const users = await getAllUserService();

      res.status(200).json(users);
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
      const user = await loginUserService(req.body);
      switch (user.status) {
        case '10402':
          res.status(402).json(user);
          break;

        case '10403':
          res.status(403).json(user);
          break;

        case '10200':
          res.status(200).json(user);
          break;

        default:
          throw new Error('500');
      }
    } catch (error) {
      next(error);
    }
  },

  registerGoogleUserController: async (req, res, next) => {
    try {
      const user = await googleAuthService(req.user || req.createNewUser);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
