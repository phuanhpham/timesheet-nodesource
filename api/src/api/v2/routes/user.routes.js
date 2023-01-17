const router = require('express').Router();
const {
  registerUserController,
} = require('../controllers/user.controller');

const {
  registerUserValidate,
} = require('../validate/users/user.validate');

router.post('/register', registerUserValidate, registerUserController);

module.exports = router;
