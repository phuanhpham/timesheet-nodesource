const express = require("express");
const app = express();
const helmet = require("helmet");
const morganMiddleware = require("./api/v1/middlewares/morgan/morgan.middleware");

//user middleware
app.use(helmet());
app.use(morganMiddleware);

// add body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/v1", require("./api/v1/routes"));

// Error Handling Middleware called

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      msg: error.message || "Internal Server Error",
    },
  });
});

module.exports = app;
