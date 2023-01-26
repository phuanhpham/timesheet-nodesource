const IS_ADMIN_CONDITION = ['admin'];
const IS_USER_CONDITION = ['admin', 'user'];

module.exports = {
  isAdmin: (req, res, next) => {
    if (IS_ADMIN_CONDITION.includes(req.user.role)) {
      next();
    } else {
      res.status(200).json({
        status: '10403',
        msg: 'Permission denined',
      });
    }
  },
  isUser: (req, res, next) => {
    if (IS_USER_CONDITION.includes(req.user.role)) {
      next();
    } else {
      res.status(200).json({
        status: '10403',
        msg: 'Permission denined',
      });
    }
  },
};
