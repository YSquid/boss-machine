const express = require("express");
const db = require("./db.js");
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

/*
MEETING SCHEMA:
Meeting
  time: string
  date: JS Date object
  day: string
  note: string
*/

//GET Meetings
meetingsRouter.get("/", (req, res, next) => {
  res.send(db.getAllFromDatabase("meetings"));
});

//POST Meeting
meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = db.createMeeting();
  res.status(201).send(db.addToDatabase("meetings", newMeeting));
});

//DELETE All Meetings
meetingsRouter.delete("/", (req, res, body) => {
  res.status(204).send(db.deleteAllFromDatabase("meetings"));
});
