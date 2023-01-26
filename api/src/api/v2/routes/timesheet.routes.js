const router = require('express').Router();
const passport = require('passport');
const { isAdmin, isUser } = require('../middlewares/authorizer/authorizer.middlewares');
require('../middlewares/passport/passport.middleware');

const {
  getAllTimesheetController,
  getTimesheetByUserController,
  createTimesheetController,
} = require('../controllers/timesheet.controller');

const { timesheetValidator } = require('../validate/timesheets/timesheets.validate');

// getAllTimeSheet [GET]
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  isAdmin,
  getAllTimesheetController,
);

// getTimesheetByUser [GET]
router.get(
  '/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  isUser,
  getTimesheetByUserController,
);

// createTimesheet [POST]
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  isUser,
  timesheetValidator,
  createTimesheetController,
);

module.exports = router;
