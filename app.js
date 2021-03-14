const express = require('express')
const mongoose = require("mongoose")
const path = require("path")
require('dotenv').config()

mongoose.connect(process.env.MONGO_ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', console.error.bind(console, "connection error: "))
mongoose.connection.once('connected', () => {
  const app = express()
  app.use(express.json())

  // register our routes
  app.use('/api', require('./api'))

  // serve our built React code
  app.use(express.static(path.join(__dirname, "build")))
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
  })

  // set the port from the env for Heroku
  let port = process.env.PORT
  if (port == null || port == "") {
    port = 3001
  }

  app.listen(port, () => console.log(`listening at http://localhost:${port}/`))
})
