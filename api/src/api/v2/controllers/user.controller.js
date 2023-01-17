const { registerUserService } = require('../services/user.services');

module.exports = {
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
};
