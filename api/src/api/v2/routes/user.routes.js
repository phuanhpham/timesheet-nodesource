const router = require('express').Router();
const passport = require('passport');
const {
  getAllUsersController,
  registerUserController,
  loginUserController,
  registerGoogleUserController,
  getUserInfosByIdController,
} = require('../controllers/user.controller');

const { registerUserValidate, loginUserValidate } = require('../validate/users/user.validate');

require('../middlewares/passport/passport.middleware');

// GetAllUser [GET]
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  getAllUsersController,
);

// GetUserInfos [GET]
router.get('/:id', passport.authenticate('jwt', {
  session: false,
}), getUserInfosByIdController);

// Register [POST]
router.post('/register', registerUserValidate, registerUserController);

// Register With Google [POST]
router.post('/google', passport.authenticate('google-plus-token', { session: false }), registerGoogleUserController);

// Login [POST]
router.post('/login', loginUserValidate, loginUserController);

module.exports = router;
