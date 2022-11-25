const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js')

//get array of all minions
apiRouter.get('/minions/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions')
    console.log(minions)
    res.send(minions)
})

//post new minion to DB
//name == string, weakness ==== string, title===string, salary ===number
//addToDatabase does the validation and incremeting of id
//we just need to provide the model type and instance values (i.e post body)
apiRouter.post('/minions/', (req, res, next) => {
    const newMinion = req.query
    res.send(db.addToDatabase('minions', newMinion))
})


module.exports = apiRouter;
