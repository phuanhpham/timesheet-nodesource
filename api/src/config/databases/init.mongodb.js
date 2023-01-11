const mongoose = require("mongoose");

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(() => {
    console.log("Connected mongoose!");
  })
  .catch((err) => {
    console.log(err);
  });
// all executed methods log output to console
mongoose.set("debug", true);

// disable colors in debug mode
mongoose.set("debug", { color: false });

// get mongodb-shell friendly output (ISODate)
mongoose.set("debug", { shell: true });


module.exports = mongoose;
