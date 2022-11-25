const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js')

//GET array of all minions
apiRouter.get('/minions/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions')
    console.log(minions)
    res.send(minions)
})

//POST new minion to DB
//name == string, weaknesses ==== string, title===string, salary ===number
//addToDatabase does the validation and incremeting of id
//we just need to provide the model type and instance values (i.e post body)
apiRouter.post('/minions/', (req, res, next) => {
    const newMinion = req.query
    res.send(db.addToDatabase('minions', newMinion))
})

//GET single minion by Id
apiRouter.get('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId
    response = db.getFromDatabaseById('minions', id)
    if (response) {
        res.send(response)
    } else {
        res.status(404).send('No minion found for that id')
    }
})

//PUT minion by Id
apiRouter.put('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId
    const updatedInstance = {
        id: id,
        name: req.query.name,
        title: req.query.title,
        weaknesses: req.query.weaknesses,
        salary: req.query.salary,
    }
    response = db.updateInstanceInDatabase('minions', updatedInstance)

    if(response) {
        res.send(response)
    } else {
        res.status(400).send('bad update request')
    }
})

//DELETE minion by Id
apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId
    const response = db.deleteFromDatabasebyId('minions', id)
    if (response) {
        res.send(response)
    } else {
        res.status(404).send('minion with that ID not found')
    }
})


module.exports = apiRouter;
