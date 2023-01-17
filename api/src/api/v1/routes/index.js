const express = require('express');

const router = express.Router();
const userRoutes = require('./user.route');

/**
 * @openapi
 * /v1/heathcheck:
 *  get:
 *    tags:
 *    - API HealthCheck
 *    description: Response if the app is up and running
 *    responses:
 *      200:
 *        description: App is already running healthy
 */
router.get('/heathCheck', (req, res) => {
  res.status(200).json({
    status: '200',
    message: 'api ok',
  });
});

/**
 * @openapi
 *'/v1/users':
 *  get:
 *    tags:
 *    - Users API
 *    description: Response all users
 *    responses:
 *      200:
 *        description: App is already running healthy
 */
router.use('/users', userRoutes);

module.exports = router;
