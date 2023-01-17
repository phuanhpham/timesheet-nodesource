const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *
 */

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    saltKey: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    info: Array,
  },
  {
    collections: 'users',
    timestamp: true,
  },
);

module.exports = mongoose.model('User', userSchema);
