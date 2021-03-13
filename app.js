const express = require('express')
const app = express()
const mongoose = require("mongoose")
const path = require("path")
require('dotenv').config()

app.use(express.json())

const profileSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  location: String,
  team: String,
  gender: String,
  sports: String,
  about: String,
  interests: String,
  // profileImage: {
  //   data: Buffer,
  //   contentType: String,
  // },
})

const Profile = mongoose.model("Profile", profileSchema)

app.get("/", (req, res) => {
  res.send("api is up")
})

app.get("/api/profiles", (req, res) => {
  res.send("unimplemented")
})

app.post("/api/profiles/create", async (req, res) => {
  // name: "John Doe",
  // sport: "N/A",
  // gender: "Male",
  // dob: currentDate.toString(),
  // description: "N/A",
  // location: "20 W 34th St, New York, NY 10001",
  // teamName: "New York Yankees",
  // interests: "None"
  // get the request data
  console.log(req.body)
  const {
    name,
    sport,
    gender,
    dob,
    description,
    location,
    teamName,
    interests,
  } = req.body

  const newProfile = new Profile({
    name,
    dob,
    location,
    team: teamName,
    gender,
    sports: sport,
    about: description,
    interests,
  })

  await newProfile.save()

  console.log(newProfile)
  
  // finish
  res.send({ msg: "Success", status: 200 })
})

app.put("/api/profiles/create", (req, res) => {
  res.send("unimplemented")
})

app.use(express.static(path.join(__dirname, "build")))
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

mongoose.connect(process.env.MONGO_ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', console.error.bind(console, "connection error: "))
mongoose.connection.once('connected', () => {
  let port = process.env.PORT
  if (port == null || port == "") {
    port = 3001
  }

  app.listen(port, () => console.log(`listening at http://localhost:${port}/`))
})
