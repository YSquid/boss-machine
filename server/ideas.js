const express = require("express");
const db = require("./db.js");
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

module.exports = ideasRouter;

/**
 Idea Schema:
  Idea:
    id: string
    name: string
    description: string
    numWeeks: number
    weeklyRevenue: number
**/


//Idea by ID param
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id)
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
})

//GET all ideas
ideasRouter.get("/", (req, res, next) => {
  const response = db.getAllFromDatabase("ideas");
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("cannot GET ideas");
  }
});

//POST new idea
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  const response = db.addToDatabase("ideas", newIdea);
  if (response) {
    res.status(201).send(response);
  } else {
    res.status(400).send("cannot POST new idea");
  }
});

//GET idea by ID
ideasRouter.get("/:ideaId", (req, res, next) => {
    res.send(req.idea)
});

//PUT idea by ID
ideasRouter.put("/:ideaId", (req, res, next) => {
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
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const id = req.params.ideaId;
  const response = db.deleteFromDatabasebyId("ideas", id);
  if (response) {
    res.status(204).send(response);
  } else {
    res.status(500).send("idea not found");
  }
});
