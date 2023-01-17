const { sequelize } = require('../../api/v2/databases/models');

const initMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log('MYSQL::: Connect successfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = initMysql;
