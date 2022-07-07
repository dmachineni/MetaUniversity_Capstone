const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const store = require('./routes/store')
// const { NotFoundError } = require('./utils/errors')
var cors = require('cors')


const app = express()


app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
// app.use ('/store', store)
