const express = require("express")
const router = express.Router()
const Profile = require("./ProfileModel")

router.get("/profile", async (req, res, next) => {
  try {
    const allProfiles = await Profile.find()
    res.send({ msg: "Success", status: 200, data: allProfiles })
  } catch (error) {
    next(error)
  }
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