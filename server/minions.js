const express = require("express");
const db = require("./db.js");
const minionsRouter = express.Router();

module.exports = minionsRouter;

/**
 Minion Schema:
  Minion:
    id: string
    name: string
    title: string
    salary: number
**/

//Params middleware

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = db.getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

//GET array of all minions
minionsRouter.get("/", (req, res, next) => {
  const response = db.getAllFromDatabase("minions");
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("cannot GET minions");
  }
});

//POST new minion to DB
minionsRouter.post("/", (req, res, next) => {
  const newMinion = db.addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

//GET single minion by ID
minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

//PUT minion by ID
minionsRouter.put("/:minionId", (req, res, next) => {
  const id = req.minion.id;
  const updatedInstance = {
    id: id,
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: req.body.salary,
  };
  response = db.updateInstanceInDatabase("minions", updatedInstance);

  if (response) {
    res.send(response);
  } else {
    res.status(404).send("bad update request");
  }
});

//DELETE minion by ID
minionsRouter.delete("/:minionId", (req, res, next) => {
  const id = req.minion.id;
  const response = db.deleteFromDatabasebyId("minions", id);
  if (response) {
    res.status(204).send(response);
  } else {
    res.status(500).send();
  }
});

/* WORK SCHEMA
  Work:
    id: string
    title: string
    description: string
    hours: number
    minionId: string
  */

//GET all work for minion by ID from work part of db
minionsRouter.get("/:minionId/work", (req, res, next) => {
  const id = req.params.minionId;
  const minionWork = db.getAllFromDatabase("work").filter((work) => {
    return work.minionId === id;
  });
  res.send(minionWork);
});

//POST and assign to correct minion Id - use body of request to define
minionsRouter.post("/:minionId/work", (req, res, next) => {
  const minionId = req.params.minionId
  const newWork = req.body
  newWork.minionId = minionId
  const response = db.addToDatabase('work', newWork)
  res.status(201).send(response)
});

//PUT a piece of work by work ID and minion ID
minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send()
  } else {
    res.send(db.updateInstanceInDatabase('work', req.body))
  }
})

//DELET a piece of work by ID
minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  const deletedWork = db.deleteFromDatabasebyId('work', req.params.workId)
  res.status(204).send(deletedWork)
})