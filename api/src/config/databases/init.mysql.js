const { sequelize } = require('../../api/v2/databases/models');
const logger = require('../../api/v2/helpers/logger');

const initMysql = async () => {
  try {
    // await sequelize.sync({ force: true });
    // await sequelize.sync();
    await sequelize.authenticate();
    logger.log({
      level: 'info',
      message: 'MYSQL::: Connect successfully',
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `\n ${error}`,
    });
  }
};

module.exports = initMysql;
