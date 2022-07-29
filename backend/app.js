const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var cors = require('cors')

const recipes = require('./routes/recipes')
const userInfo = require('./routes/userInfo')
const { NotFoundError } = require('./utils/errors')

const app = express()

app.use(cors());
app.use(morgan('tiny'))
app.use(express.json())
app.use ('/', recipes)
app.use('/api', userInfo)

app.use((req,res,next) => {
    next(new NotFoundError())
})

app.use((error, req, res, next) => {
    let status, message
    status = error.status || 500
    if(!error.message) {
        message = "Something went wrong in the application"
    } else {
        message = error.message
    }

    let errorObj = {status: status, message: message}

    res.status(status).send({error: errorObj})
})

module.exports = app