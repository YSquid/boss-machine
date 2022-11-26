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

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById("minions", id)
    if (minion) {
        req.minion = minion
        next();
    } else {
        res.status(404).send()
    }
})

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
    res.send(req.minion)
  });
  
  //PUT minion by ID
  minionsRouter.put("/:minionId", (req, res, next) => {
    const id = req.minion.id
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
    const id = req.params.minionId;
    const response = db.deleteFromDatabasebyId("minions", id);
    if (response) {
      res.status(204).send(response);
    } else {
      res.status(500).send();
    }
  });