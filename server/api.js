const express = require("express");
const apiRouter = express.Router();
const db = require("./db.js");
const ideasRouter = require("./ideas.js");
const minionsRouter = require("./minions.js");

apiRouter.use('/minions/', minionsRouter)
apiRouter.use('/ideas/', ideasRouter)

/*
MEETING SCHEMA:
Meeting
  time: string
  date: JS Date object
  day: string
  note: string
*/

//GET Meetings
apiRouter.get("/meetings/", (req, res, next) => {
  res.send(db.getAllFromDatabase("meetings"));
});

//POST Meeting
apiRouter.post("/meetings/", (req, res, next) => {
  const newMeeting = db.createMeeting()
  res.status(201).send(db.addToDatabase("meetings", newMeeting))

});

//DELETE All Meetings
apiRouter.delete("/meetings/", (req, res, body) => {
  res.status(204).send(db.deleteAllFromDatabase('meetings'))
})

module.exports = apiRouter;
