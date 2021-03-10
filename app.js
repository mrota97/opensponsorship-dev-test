const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "build")))
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

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

// normally you would pull the password from the enviornment/secret storage
// I'm just putting it in plaintext here
const uri = "mongodb+srv://matt:fiLN01hmHlZUkRUq@cluster0.hvskf.mongodb.net/athlete-profiles?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error: "))
db.once('connected', () => {
  let port = process.env.PORT
  if (port == null || port == "") {
    port = 3001
  }

  app.listen(port)

})
