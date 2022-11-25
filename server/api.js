const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js')

//get array of all minions
apiRouter.get('/minions/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions')
    console.log(minions)
    res.send(minions)
})


module.exports = apiRouter;
