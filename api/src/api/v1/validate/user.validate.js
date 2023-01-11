const bcrypt = require("bcryptjs");

module.exports = {
  userRegisterDto: async (req, res, next) => {
    const { username, email, password } = req.body;

    //TODO validate email password

    const saltKey = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltKey);
    req.body.password = hashedPassword;
    req.body.saltKey = saltKey;

    next();
  },
};
