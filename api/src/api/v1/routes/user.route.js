const express = require('express');

const router = express.Router();
const passport = require('passport');
const {
  getUserController,
  registerUserController,
  loginUserController,
} = require('../controllers/user.controller');
const { userRegisterDto, userLoginDto } = require('../validate/user.validate');
const passportMidlleware = require('../middlewares/passport/passport');

// GETALLUSERS [GET]
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getUserController,
);

// REGISTER [POST]
router.post('/register', userRegisterDto, registerUserController);

// LOGIN [POST]
router.post('/login', userLoginDto, loginUserController);

module.exports = router;
