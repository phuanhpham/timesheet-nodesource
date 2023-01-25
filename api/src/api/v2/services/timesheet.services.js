const { UserTimesheetsModel, UserModel } = require('../databases/models');

module.exports = {
  getAllTimesheetService: async () => {
    try {
      const timesheets = await UserTimesheetsModel.findAll({
        icludes: [
          {
            model: UserModel,
            as: 'users',
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
};
