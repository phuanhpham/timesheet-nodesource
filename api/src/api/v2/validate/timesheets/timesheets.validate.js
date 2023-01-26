const { UserTimesheetManagementsModel } = require('../../databases/models');

const TYPE_CONDITIONS = ['holiday', 'absenteeism'];

const checkExistDatetime = async (created_date, id) => {
  try {
    const dateManagements = await UserTimesheetManagementsModel.findOne({
      where: {
        date_time: created_date,
      },
    });
    if (!dateManagements) {
      const createdDateManagements = await UserTimesheetManagementsModel.create({
        date_time: created_date,
        userId: id,
      });

      return createdDateManagements;
    }

    return dateManagements;
  } catch (error) {
    throw new Error(error);
  }
};

const checkType = (timesheetDetailsData) => {
  if (TYPE_CONDITIONS.includes(timesheetDetailsData.type)) {
    const { status, ...others } = timesheetDetailsData;
    return {
      ...others,
      status: 'pending',
    };
  }

  return timesheetDetailsData;
};

module.exports = {
  timesheetValidator: async (req, res, next) => {
    try {
      const inDate = await checkExistDatetime(req.body.date, req.user.id);
      const timesheetDetailsData = checkType(req.body);
      timesheetDetailsData.user_timesheets_managements_id = inDate.id;
      timesheetDetailsData.userId = req.user.id;
      req.body = timesheetDetailsData;
      next();
    } catch (error) {
      res.status(200).json({
        msg: 'Cannot create',
      });
    }
  },
};
