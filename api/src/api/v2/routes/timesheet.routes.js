const router = require('express').Router();
const passport = require('passport');

require('../middlewares/passport/passport.middleware');

const {
  getAllTimesheetController,
} = require('../controllers/timesheet.controller');

// getAllTimeSheet [GET]
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  getAllTimesheetController,
);

module.exports = router;
