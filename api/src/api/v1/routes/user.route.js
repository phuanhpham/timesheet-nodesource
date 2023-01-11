const express = require("express");
const router = express.Router();
const {
  getUserController,
  registerUserController,
} = require("../controllers/user.controller");
const { userRegisterDto } = require("../validate/user.validate");


// TEST
router.get("/", getUserController);

// LOGIN [POST]
router.post("/register", userRegisterDto, registerUserController);

module.exports = router;
