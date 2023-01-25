const router = require('express').Router();

router.get('/healthCheck', (req, res) => {
  res.status(200).json({
    msg: 'Api ok !',
  });
});

router.use('/users', require('./user.routes'));
router.use('/timesheets', require('./timesheet.routes'));

module.exports = router;
