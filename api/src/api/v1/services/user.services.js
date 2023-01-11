const UserModel = require("../models/User.model");

module.exports = {
  testUserService: async () => {
    return true;
  },

  registerUserService: async (userRegisterDetails) => {
    
    const newUser = new UserModel({...userRegisterDetails});
    try {
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw new Error(error.stack)
    }
  },
};
