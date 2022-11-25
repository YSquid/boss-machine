const express = require("express");
const apiRouter = express.Router();
const db = require("./db.js");

/**
 Minion Schema:
  Minion:
    id: string
    name: string
    title: string
    salary: number
**/

//GET array of all minions
apiRouter.get("/minions/", (req, res, next) => {
  const response = db.getAllFromDatabase("minions");
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("cannot GET minions");
  }
});

//POST new minion to DB
apiRouter.post("/minions/", (req, res, next) => {
  const newMinion = req.query;
  const response = db.addToDatabase("minions", newMinion);
  if (response) {
    res.send(response);
  } else {
    res.status(400).send("could not POST new minion");
  }
});

//GET single minion by ID
apiRouter.get("/minions/:minionId", (req, res, next) => {
  const id = req.params.minionId;
  response = db.getFromDatabaseById("minions", id);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("No minion found for that id");
  }
});

//PUT minion by ID
apiRouter.put("/minions/:minionId", (req, res, next) => {
  const id = req.params.minionId;
  const updatedInstance = {
    id: id,
    name: req.query.name,
    title: req.query.title,
    weaknesses: req.query.weaknesses,
    salary: req.query.salary,
  };
  response = db.updateInstanceInDatabase("minions", updatedInstance);

  if (response) {
    res.send(response);
  } else {
    res.status(400).send("bad update request");
  }
});

//DELETE minion by ID
apiRouter.delete("/minions/:minionId", (req, res, next) => {
  const id = req.params.minionId;
  const response = db.deleteFromDatabasebyId("minions", id);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("minion with that ID not found");
  }
});

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
  const newIdea = req.query;
  const response = db.addToDatabase("ideas", newIdea);
  if (response) {
    res.send(response);
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
  const { name, description, numWeeks, weeklyRevenue } = req.query;
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
    res.status(400).send("bad update request");
  }
});

//DELETE idea by ID
apiRouter.delete("/ideas/:ideaId", (req, res, next) => {
    const id = req.params.ideaId;
    const response = db.deleteFromDatabasebyId('ideas', id)
    if (response) {
        res.send(response)
    } else {
        res.status(404).send('idea not found')
    }
})
module.exports = apiRouter;
