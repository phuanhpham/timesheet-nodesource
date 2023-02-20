const {
  UserTimesheetManagementsModel,
  UserTimesheetDetailsModel,
} = require('../databases/models');

module.exports = {
  getAllTimesheetService: async () => {
    try {
      const timesheets = await UserTimesheetManagementsModel.findAll({
        icludes: [
          {
            model: UserTimesheetDetailsModel,
          },
        ],
      });

      if (!timesheets) {
        return {
          status: '10400',
          msg: 'Can not found',
        };
      }
      return {
        status: '10200',
        timesheets,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  getTimesheetByUserService: async (userId) => {
    try {
      const timesheets = await UserTimesheetDetailsModel.findAll(
        {
          where: {
            userId,
          },
        },
        {
          order: [['date_time', 'DESC']],
        },
      );

      if (!timesheets.length) {
        return {
          status: '10200',
          msg: 'Dont have any timesheets',
        };
      }

      return {
        status: '10200',
        timesheets,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  createTimesheetService: async (timesheetDetailData) => {
    try {
      const createdTimesheet = await UserTimesheetDetailsModel.create({
        ...timesheetDetailData,
      });

      if (!createdTimesheet) {
        return {
          status: '10500',
          msg: 'Can not create timesheet',
        };
      }
      return {
        status: '10200',
        createdTimesheet,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
