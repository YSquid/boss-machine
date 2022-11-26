const express = require("express");
const apiRouter = express.Router();
const db = require("./db.js");
const minionsRouter = require("./minions.js");

apiRouter.use('/minions/', minionsRouter)

/**
 Idea Schema:
  Idea:
    id: string
    name: string
    description: string
    numWeeks: number
    weeklyRevenue: number
**/

//GET all ideas
apiRouter.get("/ideas/", (req, res, next) => {
  const response = db.getAllFromDatabase("ideas");
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("cannot GET ideas");
  }
});

//POST new idea
apiRouter.post("/ideas/", (req, res, next) => {
  const newIdea = req.body;
  const response = db.addToDatabase("ideas", newIdea);
  if (response) {
    res.status(201).send(response);
  } else {
    res.status(400).send("cannot POST new idea");
  }
});

//GET idea by ID
apiRouter.get("/ideas/:ideaId", (req, res, next) => {
  const id = req.params.ideaId;
  const response = db.getFromDatabaseById("ideas", id);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("cannot GET idea with that ID");
  }
});

//PUT idea by ID
apiRouter.put("/ideas/:ideaId", (req, res, next) => {
  const id = req.params.ideaId;
  const { name, description, numWeeks, weeklyRevenue } = req.body;
  const updatedInstance = {
    id: id,
    name: name,
    description: description,
    numWeeks: numWeeks,
    weeklyRevenue: weeklyRevenue,
  };

  response = db.updateInstanceInDatabase("ideas", updatedInstance);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("bad update request");
  }
});

//DELETE idea by ID
apiRouter.delete("/ideas/:ideaId", (req, res, next) => {
  const id = req.params.ideaId;
  const response = db.deleteFromDatabasebyId("ideas", id);
  if (response) {
    res.status(204).send(response);
  } else {
    res.status(404).send("idea not found");
  }
});

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
