const express = require('express');

const app = express();
const helmet = require('helmet');
const cors = require('cors');
// const morganMiddleware = require('./api/v1/middlewares/morgan/morgan.middleware');
const morganMiddlewarev2 = require('./api/v2/middlewares/morgan/morgan.middlewares');
// const swaggerDoc = require('./api/v1/utils/swagger');

// innit api docs with swagger
// swaggerDoc(app, process.env.PORT);

// init db connection
require('./config/databases/init.mysql')();

// user middleware
app.use(helmet());
// app.use(morganMiddleware);
app.use(morganMiddlewarev2);
app.use(cors({
  origin: '*',
}));

// add body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/v1', require('./api/v1/routes'));
app.use('/v2', require('./api/v2/routes'));

// Error Handling Middleware called
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
// Error handler middleware
app.use((error, req, res) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      msg: error.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
