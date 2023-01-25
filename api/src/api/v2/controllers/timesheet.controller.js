const { getAllTimesheetService } = require('../services/timesheet.services');

module.exports = {
  getAllTimesheetController: async (req, res, next) => {
    try {
      const timesheets = await getAllTimesheetService();
      res.status(200).json(timesheets);
    } catch (error) {
      next(error);
    }
  },
};
