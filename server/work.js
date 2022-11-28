const express = require("express");
const db = require("./db.js");
const workRouter = express.Router();

workRouter.get("/", (req, res, next) => {
  const allWork = db.getAllFromDatabase("work");
  res.send(allWork);
});

module.exports = workRouter;
