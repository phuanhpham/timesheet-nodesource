const {
  testUserService,
  registerUserService,
} = require("../services/user.services");
module.exports = {
  getUserController: (req, res, next) => {
    if (testUserService()) {
      res.status(200).json({
        status: "10200",
        msg: "Api ok!",
      });
    }
  },
  registerUserController: async (req, res, next) => {

    try {
      const user = await registerUserService(req.body);
      const {password, sailtKey, ...others} = user._doc;
      res.status(200).json({
        status: "10200",
        user: others,
      });
    } catch (error) {
      next(error);
    }
  },
};
