const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "200",
    message: "api ok",
  });
});

router.use("/users", userRoutes);

module.exports = router;
