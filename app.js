var express = require("express")
var mongoose = require('mongoose')
bodyParser = require('body-parser')
const usersRouter = require('./routes/usersv1')
const usersModel = require('./models/users')

mongoose
    .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
    .then(() => {
        var app = express()
        app.use(bodyParser.json())
        app.use("/users", usersRouter)
    })