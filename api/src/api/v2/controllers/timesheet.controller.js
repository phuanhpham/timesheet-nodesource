const {
  getAllTimesheetService,
  getTimesheetByUserService,
  createTimesheetService,
} = require('../services/timesheet.services');

module.exports = {
  getAllTimesheetController: async (req, res, next) => {
    try {
      const timesheets = await getAllTimesheetService();
      res.status(200).json(timesheets);
    } catch (error) {
      next(error);
    }
  },
  getTimesheetByUserController: async (req, res, next) => {
    try {
      const timesheets = await getTimesheetByUserService(req.params.id);
      res.status(200).json({
        ...timesheets,
      });
    } catch (error) {
      next(error);
    }
  },
  createTimesheetController: async (req, res, next) => {
    try {
      const createdTimesheets = await createTimesheetService(req.body);
      res.status(200).json({ ...createdTimesheets });
    } catch (error) {
      next(error);
    }
  },
};
