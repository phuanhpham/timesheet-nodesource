const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const log = require('./logger');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/v1/routes/index.js', './src/api/v1/models/*.model.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDoc = (app, port) => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  log.info(`Docs available at http://localhost:${port}/docs`);
};

module.exports = swaggerDoc;
