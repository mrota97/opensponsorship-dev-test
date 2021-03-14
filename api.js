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

router.post("/profile/create", async (req, res, next) => {
  try {
    // we'll just use the spread syntax here to fill all of the
    // required fields. mongoose validation will catch any isseus
    const newProfile = new Profile({ ...req.body })

    await newProfile.save()

    // finish
    res.send({
      msg: "Success",
      status: 200,
      data: newProfile._id.toString()
    })
  } catch (error) {
    next(error)
  }
})

router.put("/profile/edit/:profileId", async (req, res, next) => {
  const newProfileData = req.body
  const profileId = req.params.profileId

  try {
    // find the profile document with the requested id
    const oldProfile = await Profile.findById(profileId)

    // make sure all fields are updated
    // we're expecting to get all fields from the body
    oldProfile.name = newProfileData.name
    oldProfile.sports = newProfileData.sports
    oldProfile.gender = newProfileData.gender
    oldProfile.dob = newProfileData.dob
    oldProfile.about = newProfileData.about
    oldProfile.location = newProfileData.location
    oldProfile.team = newProfileData.team
    oldProfile.interests = newProfileData.interests

    // save the document
    await oldProfile.save()

    res.send({
      msg: `Profile ${profileId} updated`,
      status: 200,
    })

  } catch (error) {
    next(error)
  }
})

router.delete("/profile/delete/:profileId?", async (req, res, next) => {
  const profileId = req.params.profileId
  try {
    let result
    if (profileId) {
      result = await Profile.deleteOne({ _id: profileId })
    } else {
      result = await Profile.deleteMany({})
    }
    
    if (!result.ok) throw "error";
    res.send({
      msg: `${result.deletedCount} profiles deleted`,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router