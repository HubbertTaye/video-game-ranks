const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const configDB = require('./config/database.js')

var db

mongoose.connect(configDB.url, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, db);
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.listen(port);
console.log(`When you wish upon port ${port}...`)
