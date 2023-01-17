const bcrypt = require('bcryptjs');

module.exports = {
  registerUserValidate: async (req, res, next) => {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;

    next();
  },
};
