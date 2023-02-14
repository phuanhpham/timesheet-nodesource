const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: async ({ username, role }) => jwt.sign(
    {
      data: {
        username,
        role,
      },
    },
    process.env.KEY_SECRET,
    {
      expiresIn: '365d',
    },
  ),

  generateRefreshToken: async ({ username, role }) => jwt.sign(
    {
      data: {
        username,
        role,
      },
    },
    process.env.KEY_SECRET,
    {
      expiresIn: '365d',
    },
  ),
};
