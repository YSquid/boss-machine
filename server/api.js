const express = require("express");
const apiRouter = express.Router();
const ideasRouter = require("./ideas.js");
const meetingsRouter = require("./meetings.js");
const minionsRouter = require("./minions.js");

apiRouter.use('/minions/', minionsRouter)
apiRouter.use('/ideas/', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)

module.exports = apiRouter;
