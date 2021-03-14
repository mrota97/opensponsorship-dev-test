const express = require("express")
const router = express.Router()
const Profile = require("./ProfileModel")

router.get("/profile", (req, res) => {
  res.send("unimplemented")
})

router.post("/profile/create", async (req, res) => {
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

router.put("/profile/edit/:profileId", (req, res) => {
  res.send("unimplemented")
})

module.exports = router