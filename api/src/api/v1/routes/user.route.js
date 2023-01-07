const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "200",
    msg: "users endpoint ok",
  });
});

module.exports = router;
